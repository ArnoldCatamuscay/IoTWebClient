// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6kEl39DKBGOKBCT8DJYm9apcW_ScYZ5Y',
  authDomain: 'iot-react-9540f.firebaseapp.com',
  projectId: 'iot-react-9540f',
  storageBucket: 'iot-react-9540f.appspot.com',
  messagingSenderId: '299346434599',
  appId: '1:299346434599:web:ff9f79037bad674e898c02'
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);