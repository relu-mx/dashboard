// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcxqgRULh1L3gZriRS1cPAs8ND7224org",
    authDomain: "concierge-ai-273ef.firebaseapp.com",
    projectId: "concierge-ai-273ef",
    storageBucket: "concierge-ai-273ef.appspot.com",
    messagingSenderId: "594149012239",
    appId: "1:594149012239:web:2ac85ab7b20d8f0b30447a",
    measurementId: "G-LBWWGDW2BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);