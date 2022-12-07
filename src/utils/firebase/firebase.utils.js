import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "react-crud-5c959.firebaseapp.com",
    projectId: "react-crud-5c959",
    storageBucket: "react-crud-5c959.appspot.com",
    messagingSenderId: "458351456034",
    appId: "1:458351456034:web:77016348f26f713dbf7f7b",
    measurementId: "G-V6WYX4K4J9"
  };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore()