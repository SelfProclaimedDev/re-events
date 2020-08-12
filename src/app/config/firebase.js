import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyALwzt7wik7jJdt4myV3yLCGqpjoqKwDJM",
    authDomain: "revents-b9325.firebaseapp.com",
    databaseURL: "https://revents-b9325.firebaseio.com",
    projectId: "revents-b9325",
    storageBucket: "revents-b9325.appspot.com",
    messagingSenderId: "658961381075",
    appId: "1:658961381075:web:e78ad4d879dae9b6064626",
    measurementId: "G-DBFFZZ8B6G"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;