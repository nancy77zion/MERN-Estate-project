// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e9270.firebaseapp.com",
  projectId: "mern-estate-e9270",
  storageBucket: "mern-estate-e9270.appspot.com",
  messagingSenderId: "619864727160",
  appId: "1:619864727160:web:b01fb8913a75539931d78d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);