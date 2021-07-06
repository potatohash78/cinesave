import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCR-OxZFo_n4OWMH5ctrCoSLvf1T_NeiBA",
  authDomain: "cinesave-3c2b3.firebaseapp.com",
  projectId: "cinesave-3c2b3",
  storageBucket: "cinesave-3c2b3.appspot.com",
  messagingSenderId: "140665001314",
  appId: "1:140665001314:web:ed3137e94f73f81511083b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
