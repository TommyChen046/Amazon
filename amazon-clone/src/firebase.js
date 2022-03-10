import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDPdJEzKecGErOrqBvmrKK3owtwliv9hKM",
    authDomain: "clone-hj.firebaseapp.com",
    projectId: "clone-hj",
    storageBucket: "clone-hj.appspot.com",
    messagingSenderId: "1059171460158",
    appId: "1:1059171460158:web:7c8362037db6b85adadd6f",
    measurementId: "G-N7F117S6JT"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const db = getFirestore(firebaseApp); //firestore() is the real time firebase database
  const auth = getAuth(); //variable to handle signIn

  export { db, auth };