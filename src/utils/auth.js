import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; // Import Realtime Database

// Firebase Authentication
const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

// Check if a user exists in Realtime Database
const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/users/${uid}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val()); // Return user data
        } else {
          resolve({}); // Return empty object if user does not exist
        }
      })
      .catch(reject);
  });

// Register a new user in Realtime Database
const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/users/${userInfo.uid}`)
      .set(userInfo)
      .then(() => resolve(userInfo)) // Resolve with the registered user info
      .catch(reject);
  });

export { signIn, signOut, checkUser, registerUser };
