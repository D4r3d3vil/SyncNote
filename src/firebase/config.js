import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";
import {user} from "../../../../Diginote/src/stores.js";
import {redirect} from "@sveltejs/kit";
import {browser} from "$app/environment";
const firebaseConfig = {
    apiKey: "AIzaSyAncsG46Jbf3_o8uFjzIe_Nqh3UiDD7cyo",
    authDomain: "diginote-7d09d.firebaseapp.com",
    projectId: "diginote-7d09d",
    storageBucket: "diginote-7d09d.firebasestorage.app",
    messagingSenderId: "642615247356",
    appId: "1:642615247356:web:f55ce35d1ea763258a7279",
    measurementId: "G-H7N6ZQENMJ"
};

const application = initializeApp(firebaseConfig);
const database = getFirestore(application);
export const provider = new GoogleAuthProvider();
export const app = application;
export const db = database;
export const auth = getAuth(application);

onAuthStateChanged(auth, (authedUser)=>{
    if(!browser) return
    if(authedUser){
        document.cookie = `auth=${authedUser.uid}; path=/;`;
        if(window.location.pathname == '/login') window.location.href = '/';
    }
    user.set(authedUser);
})