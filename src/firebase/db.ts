import firebase from 'firebase';
import 'firebase/firestore';

const options = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

const db = firebase
  .initializeApp(options)
  .firestore()

export { db }