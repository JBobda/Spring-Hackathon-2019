import firebase from 'firebase-admin';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAgZeN8OWGl8Iv7ph6J7To6oCXl4rJ7LTc',
  authDomain: 'fall-2019-hackathon.firebaseapp.com',
  databaseURL: 'https://fall-2019-hackathon.firebaseio.com',
  projectId: 'fall-2019-hackathon',
  storageBucket: 'fall-2019-hackathon.appspot.com',
  messagingSenderId: '310484093274',
};
firebase.initializeApp(config);