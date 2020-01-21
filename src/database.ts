import * as firebase from "firebase/app";
import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGhKjChQ_xZneDJEowZa2SeMltfKWvlTs",
  authDomain: "cabin-6b37d.firebaseapp.com",
  databaseURL: "https://cabin-6b37d.firebaseio.com",
  projectId: "cabin-6b37d",
  storageBucket: "cabin-6b37d.appspot.com",
  messagingSenderId: "538446418695",
  appId: "1:538446418695:web:d9513245956a540751aba2",
  measurementId: "G-ZXXD1ZKT4Y"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
