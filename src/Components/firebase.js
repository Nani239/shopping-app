import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUfaM7Qj8GEFr3R9iYTZTfWEtwQX4p96w",
  authDomain: "shopping-app-fdf00.firebaseapp.com",
  projectId: "shopping-app-fdf00",
  storageBucket: "shopping-app-fdf00.appspot.com",
  messagingSenderId: "99545034016",
  appId: "1:99545034016:web:fd6988fbe63162fe6d7b45",
  measurementId: "G-KTTQ45H7HS",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
