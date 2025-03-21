// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_PASSKEY_API_KEY,
  authDomain: "lankaestate-7c36a.firebaseapp.com",
  projectId: "lankaestate-7c36a",
  storageBucket: "lankaestate-7c36a.firebasestorage.app",
  messagingSenderId: "780571650031",
  appId: "1:780571650031:web:33af57434bcf9e08de781a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);