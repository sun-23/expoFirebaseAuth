// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyB4OuHbo2vCpqQKCyN9QS7hYOKEpatfT6s",
    authDomain: "ractfirebaseauth.firebaseapp.com",
    databaseURL: "https://ractfirebaseauth.firebaseio.com",
    projectId: "ractfirebaseauth",
    storageBucket: "ractfirebaseauth.appspot.com",
    messagingSenderId: "355533595933",
    appId: "1:355533595933:web:cd001b376a77ee59852df4"
};
 // Initialize Firebase App
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const uploadImage =  async (uri, filename, callback) => {
    const response = await fetch(uri);
    const file = await response.blob();

    let uploadTask = firebase
      .storage()
      .ref(filename)
      .put(file);

    uploadTask.on('state_changed', function(snapshot){
        //
    }, function(error) {
        // Handle unsuccessful uploads
        alert('Cannot upload Image' + error)
    }, function() {
         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            callback(downloadURL)
        });
    });
    
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export default firebase;
