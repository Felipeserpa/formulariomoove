// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB0r93v34qdLEDZCtsuV_cPCCnB3xAbq0",
  authDomain: "formulario-moove.firebaseapp.com",
  databaseURL: "https://formulario-moove-default-rtdb.firebaseio.com",
  projectId: "formulario-moove",
  storageBucket: "formulario-moove.firebasestorage.app",
  messagingSenderId: "272700821198",
  appId: "1:272700821198:web:4b9e13477650c174700a9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
