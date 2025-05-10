// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu0gYbsAKZ7bJxixdqIlCQmBUwa-sqtvo",
  authDomain: "netflixgpt-97b75.firebaseapp.com",
  projectId: "netflixgpt-97b75",
  storageBucket: "netflixgpt-97b75.appspot.com",
  messagingSenderId: "414460552922",
  appId: "1:414460552922:web:475be076c7f1cebdb9a7e3",
  measurementId: "G-L6R9XPZKYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();
