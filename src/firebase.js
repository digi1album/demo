// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs, } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig_ENV = {
// apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDERID,
// appId: process.env.REACT_APP_FIREBASE_APPID,
// measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
// };

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const DB_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL
const ID = process.env.REACT_APP_FIREBASE_PROJECTID
const BUCKET= process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const SENDER_ID = process.env.REACT_APP_FIREBASE_MSG_SENDERID
const APP_ID = process.env.REACT_APP_FIREBASE_APPID
const MEAS_ID = process.env.REACT_APP_FIREBASE_MEASURMENTID

const firebaseConfig = {

    apiKey: API_KEY,
  
    authDomain: AUTH_DOMAIN,
  
    databaseURL: DB_URL,
  
    projectId: ID,
  
    storageBucket: BUCKET,
  
    messagingSenderId: SENDER_ID,
  
    appId: APP_ID,
  
    measurementId: MEAS_ID
  
  };
  
// Initialize Firebase
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore()


export default app