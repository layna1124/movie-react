import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyD9V4NSKpycrkejcWFzABZR0w4qJDc0Z08",
  authDomain: "mooviereact.firebaseapp.com",
  databaseURL: "https://mooviereact.firebaseio.com",
  projectId: "mooviereact",
  storageBucket: "",
  messagingSenderId: "796835482052"
}

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const storage = firebase.storage();
export const auth = firebase.auth();
