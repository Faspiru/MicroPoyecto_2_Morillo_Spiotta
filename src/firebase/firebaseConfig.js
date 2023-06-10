import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXY8nM87BbCAng-K7YZqgulXlfB4uIFAk",
  authDomain: "microproyecto2-morillo-s-e3cd2.firebaseapp.com",
  projectId: "microproyecto2-morillo-s-e3cd2",
  storageBucket: "microproyecto2-morillo-s-e3cd2.appspot.com",
  messagingSenderId: "116656831665",
  appId: "1:116656831665:web:7300ad5e1d11f8d0e47690",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
