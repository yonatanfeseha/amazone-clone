// src/Utility/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR6jievv7pLlkfgMDLhiZ4RZ19XFBdQNg",
  authDomain: "clone-2eaee.firebaseapp.com",
  projectId: "clone-2eaee",
  storageBucket: "clone-2eaee.firebasestorage.app",
  messagingSenderId: "941098119887",
  appId: "1:941098119887:web:5dfe0d264bba6c6a4a3dba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
