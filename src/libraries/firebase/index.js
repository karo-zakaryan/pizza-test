import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAG_KYbpiqh8SI9QCgx6OZgOt6LJK4zthU',
  authDomain: 'pizza-d8994.firebaseapp.com',
  databaseURL: 'https://pizza-d8994.firebaseio.com',
  projectId: 'pizza-d8994',
  storageBucket: 'pizza-d8994.appspot.com',
  messagingSenderId: '794922656763',
  appId: '1:794922656763:web:76a8f23bacc76fb68ae15e',
  measurementId: 'G-50XVFJQTKS',
};

const fire = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = fire.auth();
export const database = fire.database();
