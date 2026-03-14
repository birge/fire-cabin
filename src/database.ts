import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
