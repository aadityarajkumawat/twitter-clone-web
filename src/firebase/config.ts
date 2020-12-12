import firebase from "firebase";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuM-K2DkalOuQq4xEgHs86pgEW3zidMPQ",
  authDomain: "twitter-e21d1.firebaseapp.com",
  projectId: "twitter-e21d1",
  storageBucket: "twitter-e21d1.appspot.com",
  messagingSenderId: "853034428602",
  appId: "1:853034428602:web:240fd1903f0b84e347ba83",
};

firebase.initializeApp(firebaseConfig);
// const profileImgRef = firebase.storage().ref().child('profile-images')