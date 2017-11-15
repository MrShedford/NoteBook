import firebase from 'firebase'
 
var config = {
    apiKey: "AIzaSyDyaZ14wwxOW6toxz7OvCUYejMWtB4HsEw",
    authDomain: "testproject-d02b1.firebaseapp.com",
    databaseURL: "https://testproject-d02b1.firebaseio.com",
    projectId: "testproject-d02b1",
    storageBucket: "testproject-d02b1.appspot.com",
    messagingSenderId: "2781659558"
  };
var fire = firebase.initializeApp(config);
 
export default fire;

