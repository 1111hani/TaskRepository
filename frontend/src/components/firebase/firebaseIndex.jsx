import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyAenX8RBYYxwgw6bVT-kn-oNIJCyziGYaY",
    authDomain: "tasks-project-340bf.firebaseapp.com",
    projectId: "tasks-project-340bf",
    storageBucket: "tasks-project-340bf.appspot.com",
    messagingSenderId: "44301221635",
    appId: "1:44301221635:web:93a1a097b5d090c4a73336",
    measurementId: "G-YR5FK9XMX6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  firebase.auth()

  export default firebaseConfig