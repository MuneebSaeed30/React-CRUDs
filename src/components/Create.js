import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import {createNote} from '../actions/index.js';
import {connect} from 'react-redux';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      submitDisabled: true
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

    this.setState({submitDisabled : this.state.title.trim() === '' || this.state.description.trim() === ''? true : false});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const note = {
      title : this.state.title,
      description :  this.state.description
    }
    this.props.createNote(note);
    this.props.history.push("/")
  }

  render() {
    const { title, description } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Add Note
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Notes List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textarea>
              </div>
              <button type="submit" className="btn btn-success" disabled={this.state.submitDisabled}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return{  notes : state.notes }
}

export default connect(mapStateToProps, {createNote})(Create);