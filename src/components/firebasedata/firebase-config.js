import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2pSmRUuveBRGEwmPaFi8rzY1trJWqDYg",
  authDomain: "simple-movie-app.firebaseapp.com",
  projectId: "simple-movie-app",
  storageBucket: "simple-movie-app.appspot.com",
  messagingSenderId: "300752906329",
  appId: "1:300752906329:web:4ad2c029685b578d3ca948",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Init service
export const db = getFirestore(app);
export const auth = getAuth(app);
