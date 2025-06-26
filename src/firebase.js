// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "shipment-app-c3f14.firebaseapp.com",
  projectId: "shipment-app-c3f14",
  storageBucket: "shipment-app-c3f14.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const timestamp = serverTimestamp;

