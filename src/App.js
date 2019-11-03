import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { connect } from "react-redux";
import {getNotes} from './actions/index.js';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getNotes();
  }
 
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Notes List
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create">Add Note</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.props.notes.map(note =>
                  <tr>
                    <td><Link to={`/show/${note.id}`}>{note.title}</Link></td>
                    <td>{note.description}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{  notes : state.notes }
}

export default connect(mapStateToProps, {getNotes})(App);