// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsfFo5MG4CdG32yJORqeUZD_onUu6dg18",
  authDomain: "messenger-dev-8fcf3.firebaseapp.com",
  projectId: "messenger-dev-8fcf3",
  storageBucket: "messenger-dev-8fcf3.appspot.com",
  messagingSenderId: "212661153134",
  appId: "1:212661153134:web:d7a14bb6e6192f1acd657f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
