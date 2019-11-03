import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCY9pz4gZuePRKsHN4kb-0lUHxDY9KS0K4",
  authDomain: "react-crud-374cd.firebaseapp.com",
  databaseURL: "https://react-crud-374cd.firebaseio.com",
  projectId: "react-crud-374cd",
  storageBucket: "react-crud-374cd.appspot.com",
  messagingSenderId: "685587555400"
};

firebase.initializeApp(config);
// firebase.firestore().settings(settings);

export default firebase;