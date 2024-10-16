// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ-vEvI8qf-fpRkCgMIyXi0Av12wmbdug",
  authDomain: "bybartr.firebaseapp.com",
  databaseURL: "https://bybartr-default-rtdb.firebaseio.com",
  projectId: "bybartr",
  storageBucket: "bybartr.appspot.com",
  messagingSenderId: "756943244174",
  appId: "1:756943244174:web:0139e28eaae20fb0f3f2df",
  measurementId: "G-5N88FPTZMN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
