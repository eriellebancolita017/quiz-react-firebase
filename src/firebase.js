// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCiZJn-cTp51RHk1BcLmF8L3qGKwfEuRYM",
  authDomain: "quiz-liran-15.firebaseapp.com",
  projectId: "quiz-liran-15",
  storageBucket: "quiz-liran-15.appspot.com",
  messagingSenderId: "767125988161",
  appId: "1:767125988161:web:e29d89cf9a176f70d6f7c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
