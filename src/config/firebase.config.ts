import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase/database";
import "firebase/storage";
import "firebase/functions";
import { FirebaseConfig } from "../types/firebase-config";

var firebaseConfig: FirebaseConfig = {
    apiKey: "AIzaSyCJ4PMolZ40N6FXuh2nLcwF91ngBqizjDE",
    authDomain: "meme-generator-e6065.firebaseapp.com",
    databaseURL: "https://meme-generator-e6065.firebaseio.com",
    projectId: "meme-generator-e6065",
    storageBucket: "meme-generator-e6065.appspot.com",
    messagingSenderId: "1023210383140",
    appId: "1:1023210383140:web:3e1df3df9135dc1853b5b1",
    measurementId: "G-T1VWR7HGHQ"
};

// change

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
firebase.functions();

export default firebase;