import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Live Config
const firebaseConfig = {
  apiKey: "AIzaSyB-rwxK-0S-GG0bVLffPa01caPfRv6VQnk",
  authDomain: "dbdtracker.firebaseapp.com",
  projectId: "dbdtracker",
  storageBucket: "dbdtracker.appspot.com",
  messagingSenderId: "167066146805",
  appId: "1:167066146805:web:1dbc2d32e58165859bb2bc",
  measurementId: "G-TR7R7E24R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth , db };