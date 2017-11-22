import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCNguIcdYYuPEEya4x_4Lb7CvYkgz-cFko",
  authDomain: "notebook-b37b1.firebaseapp.com",
  databaseURL: "https://notebook-b37b1.firebaseio.com",
  projectId: "notebook-b37b1",
  storageBucket: "",
  messagingSenderId: "696548246210"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
