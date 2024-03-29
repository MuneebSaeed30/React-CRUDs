import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('notes').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const note = doc.data();
        this.setState({
          key: doc.id,
          title: note.title,
          description: note.description,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({note:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description } = this.state;

    const updateRef = firebase.firestore().collection('notes').doc(this.state.key);
    updateRef.set({
      title,
      description,
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
      });
      alert('Note has been updated successfully!')
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      alert("Error updating note: ", error);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Edit Note
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Back To Note</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;