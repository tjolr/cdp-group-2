import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBbu20RqV6kmgZSg-BYvLEVvn728MXNUYs',
  authDomain: 'kegeland-dev.firebaseapp.com',
  projectId: 'kegeland-dev',
  messagingSenderId: '1076179588401',
  appId: '1:1076179588401:android:5182486ac138ca56fa4c10',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const firestoredb = firebase.firestore();
