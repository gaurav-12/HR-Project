import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDTNqxQrMA8eGn3yPjiEuHPVDTOSH6simc",
    authDomain: "hr-project-login.firebaseapp.com",
    databaseURL: "https://hr-project-login.firebaseio.com",
    projectId: "hr-project-login",
    storageBucket: "hr-project-login.appspot.com",
    messagingSenderId: "160619719032",
    appId: "1:160619719032:web:8786f002baebda2c75c08d"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;