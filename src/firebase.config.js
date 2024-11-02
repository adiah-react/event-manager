import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpOuG7f21z_IAc_5zvvkExmjfTjqqdFhc",
  authDomain: "events-8b504.firebaseapp.com",
  projectId: "events-8b504",
  storageBucket: "events-8b504.firebasestorage.app",
  messagingSenderId: "727472486353",
  appId: "1:727472486353:web:755ce87dbe20eb2d9d92f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();
