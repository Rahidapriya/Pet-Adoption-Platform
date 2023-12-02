// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-c8Z6lkSQOEohRmngvJ1POK2q3sOcBI0",
    authDomain: "pet-adoption-platform-cc33e.firebaseapp.com",
    projectId: "pet-adoption-platform-cc33e",
    storageBucket: "pet-adoption-platform-cc33e.appspot.com",
    messagingSenderId: "295572274889",
    appId: "1:295572274889:web:946f0389e3acdbb90d5718"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;