import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBFpfl4zF-u2C4uLre9NoAHGGXfTOP2_zk",
    authDomain: "securiteweb-f821a.firebaseapp.com",
    projectId: "securiteweb-f821a",
    storageBucket: "securiteweb-f821a.appspot.com",
    messagingSenderId: "781097714402",
    appId: "1:781097714402:web:a9c221897b9e3a41e2d4bb",
    measurementId: "G-66XQHK8SVY"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };