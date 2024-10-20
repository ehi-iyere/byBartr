// const { initializeApp } = require("firebase/app");

// const firebaseConfig = {
//   apiKey: proccess.env.FIREBASE_APIKEY,
//   authDomain: proccess.env.FIREBASE_AUTHDOMAIN,
//   projectId: proccess.env.FIREBASE_PROJECTID,
//   storageBucket: proccess.env.FIREBASE_STORAGEBUSCKET,
//   messagingSenderId: proccess.env.FIREBASE_MESSAGINGID,
//   appId: proccess.env.FIREBASE_APPID,
//   measurementId: proccess.env.FIREBASE_MEASUREMENTID,
// };
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("./path/to/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
