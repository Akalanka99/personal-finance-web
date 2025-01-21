// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQXowqSK2E0Emjg2xJjB05z7AOBf03BVo",
  authDomain: "finance-manager-9c05b.firebaseapp.com",
  projectId: "finance-manager-9c05b",
  storageBucket: "finance-manager-9c05b.appspot.com",
  messagingSenderId: "835575527387",
  appId: "1:835575527387:web:14fcb12bb47dd0ce3499fe"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db = getFirestore(app);