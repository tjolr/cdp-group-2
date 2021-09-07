import { initializeApp, getApps, getApp } from 'firebase/app';
import { FIREBASE_API_KEY } from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'kegeland-dev.firebaseapp.com',
  projectId: 'kegeland-dev',
  messagingSenderId: '1076179588401',
  appId: '1:1076179588401:android:5182486ac138ca56fa4c10',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const firebase = getApp();
export { firebase };
