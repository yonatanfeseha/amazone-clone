// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR6jievv7pLlkfgMDLhiZ4RZ19XFBdQNg",
  authDomain: "clone-2eaee.firebaseapp.com",
  projectId: "clone-2eaee",
  storageBucket: "clone-2eaee.firebasestorage.app",
  messagingSenderId: "941098119887",
  appId: "1:941098119887:web:5dfe0d264bba6c6a4a3dba",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
