// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtH5Y7htBTNdsjRSBSKbiucKG8maxRJto",
  authDomain: "personal-finance-webapp.firebaseapp.com",
  projectId: "personal-finance-webapp",
  storageBucket: "personal-finance-webapp.firebasestorage.app",
  messagingSenderId: "911707954596",
  appId: "1:911707954596:web:09c754be29a2d34d703531",
  measurementId: "G-N153RVVTXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db = getFirestore(app);