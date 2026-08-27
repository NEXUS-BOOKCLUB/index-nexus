import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHyCtNUe3F9PeItgnW3qXJzIkBasDTsaw",
    authDomain: "nexus-book-club.firebaseapp.com",
    databaseURL: "https://nexus-book-club-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nexus-book-club",
    storageBucket: "nexus-book-club.firebasestorage.app",
    messagingSenderId: "590996035344",
    appId: "1:590996035344:web:31522b0597b9cf299e7795"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };