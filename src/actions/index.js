// import _ from 'lodash';
import firebase from '../Firebase.js';

export const GET_NOTES = 'GET_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const GET_NOTE = 'GET_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

var ref = firebase.firestore().collection("notes");

export function getNotes() {  
    return dispatch => {
        ref.get()
        .then((querySnapshot) => {
            const notes = [];
            querySnapshot.forEach(item => {
                notes.push({
                    id: item.id,
                    ...item.data()
                });
            });
            dispatch({
                type: 'GET_NOTES',
                payload: notes
            })
        });
    }
}

export function createNote(note) {
    return function(dispatch){
        ref.add(note)
        .then((note) => {
            dispatch({type: "CREATE_NOTE", payload: note});
            alert("Note has been added successfully!")
        }).catch(err => {
            alert("Note Failed");
        });
    }
}