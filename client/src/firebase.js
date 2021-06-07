import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCCOivEuSgtDqLABpvjpn23hjz5edKjl7I",
    authDomain: "ecomapp-c0900.firebaseapp.com",
    projectId: "ecomapp-c0900",
    storageBucket: "ecomapp-c0900.appspot.com",
    messagingSenderId: "487298725093",
    appId: "1:487298725093:web:8046d69242f4343c69100c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();