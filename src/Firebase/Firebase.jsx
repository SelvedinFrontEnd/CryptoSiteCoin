import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxkUIyBuDcurszKtbELi0UxTT0wmlhWoM",
  authDomain: "cryptosite-2c428.firebaseapp.com",
  projectId: "cryptosite-2c428",
  storageBucket: "cryptosite-2c428.firebasestorage.app",
  messagingSenderId: "732746999100",
  appId: "1:732746999100:web:90330d5a2a7946091aaa39",
  measurementId: "G-6N692CZ466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export {  doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove }