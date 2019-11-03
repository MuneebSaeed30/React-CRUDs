import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      note: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('notes').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          note: doc.data(),
          key: doc.id,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('notes').doc(id).delete().then(() => {
      alert("Note successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing note: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
          <h4><Link to="/">Notes List</Link></h4>
            <h3 className="panel-title">
              {this.state.note.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.note.description}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;