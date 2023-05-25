// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwXE6K4i3FXlvYoHPlxHJuiKOBQ8rjnzg",
    authDomain: "esp-firebase-22c67.firebaseapp.com",
    databaseURL: "https://esp-firebase-22c67-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp-firebase-22c67",
    storageBucket: "esp-firebase-22c67.appspot.com",
    messagingSenderId: "285861200683",
    appId: "1:285861200683:web:a03af4f2241d4e6f99fb6e"
};

import { getDatabase, ref, child, onValue, get }
from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
// Initialize Firebase


export const app = await initializeApp(firebaseConfig);
export const db = getDatabase();

