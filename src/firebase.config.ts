import {getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDX7paKpE0QTYoIzYYYqZRvfSXfalsrDzw",
    authDomain: "restaurant-app-5fcc8.firebaseapp.com",
    projectId: "restaurant-app-5fcc8",
    storageBucket: "restaurant-app-5fcc8.appspot.com",
    messagingSenderId: "340433454392",
    appId: "1:340433454392:web:589b479212cf297e202dcd"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage};