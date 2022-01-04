// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu1TB_yGE--hItiqv-CN1tR8PrCSbR8xs",
  authDomain: "property-listings-app-a154f.firebaseapp.com",
  projectId: "property-listings-app-a154f",
  storageBucket: "property-listings-app-a154f.appspot.com",
  messagingSenderId: "486078640648",
  appId: "1:486078640648:web:cefd6538b42f19f11b97bd"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()