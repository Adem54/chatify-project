//import firebase from "firebase/app";
import firebase from "firebase/compat/app";
//import "firebase/compat/firestore";

//import firebase from 'firebase/compat/app';
//Daha sonra firebase in kullanmak istedigimiz firebase paketlerini kullaniriz
//Authentication islemleri icin
import "firebase/compat/auth";
//import "firebase/auth";
//Real time database islemleri icin
import "firebase/compat/database";
//veri depolamak icin
import "firebase/compat/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPSeQLV_HzbGx3ekdH3s8mqGyGENMZooE",
  authDomain: "chatify-project-335d4.firebaseapp.com",
  projectId: "chatify-project-335d4",
  storageBucket: "chatify-project-335d4.appspot.com",
  messagingSenderId: "562250018576",
  appId: "1:562250018576:web:4398e46a771be276947f95",
  measurementId: "G-89ZLD5639D",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Burda bu config dosyasina gore firebase i initialize ederiz
export default firebase;
