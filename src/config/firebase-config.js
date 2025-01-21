// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjbdBsDveKt4M461ovi-HzhDvBaEpr5gA",
  authDomain: "finance-manager-3ea3d.firebaseapp.com",
  projectId: "finance-manager-3ea3d",
  storageBucket: "finance-manager-3ea3d.appspot.com",
  messagingSenderId: "286844061510",
  appId: "1:286844061510:web:7141384f6b69875ff9c747"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db = getFirestore(app);