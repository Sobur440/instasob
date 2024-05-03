// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "instasob.firebaseapp.com",
  projectId: "instasob",
  storageBucket: "instasob.appspot.com",
  messagingSenderId: "801916769202",
  appId: "1:801916769202:web:7c03482cdf2e9ad33ccaab",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
