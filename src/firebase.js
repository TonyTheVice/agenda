// src/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5ED_qIxmFdKw2dh1r8Qf0PXKi73l4fj0",
  authDomain: "agenda-8640a.firebaseapp.com",
  databaseURL: "https://agenda-8640a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "agenda-8640a",
  storageBucket: "agenda-8640a.firebasestorage.app",
  messagingSenderId: "641076797686",
  appId: "1:641076797686:web:09e0106d2e2b7f3f39ccd7",
  measurementId: "G-8QNZ76PHEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

export { db, ref, set, get, child };
