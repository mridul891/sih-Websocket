// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5QqX9CxVYiYb9gqRzieO-XMO4HB3fcJ4",
  authDomain: "sih-project-nomorespills.firebaseapp.com",
  databaseURL:
    "https://sih-project-nomorespills-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sih-project-nomorespills",
  storageBucket: "sih-project-nomorespills.firebasestorage.app",
  messagingSenderId: "243119276303",
  appId: "1:243119276303:web:a064136924e47146ff7e7a",
  measurementId: "G-S67EW644D7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
