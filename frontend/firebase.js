// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey : import.meta.env.VITE_FIREBASE_APIKEY, //this is the method for extracting the env variables in frontend
  authDomain: "crave-cart-d11dd.firebaseapp.com",
  projectId: "crave-cart-d11dd",
  storageBucket: "crave-cart-d11dd.firebasestorage.app",
  messagingSenderId: "201031159203",
  appId: "1:201031159203:web:c266631512364d98aa1e16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //ab iss initialised app k through hum koi b cheez initialise kr skte h 

//ye auth k through hum apna google authentication implement krenge
const firebaseauth = getAuth(app);

export {app, firebaseauth};