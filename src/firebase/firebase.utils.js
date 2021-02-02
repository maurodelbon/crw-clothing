import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDWiyUjXfNxatcmG2ErYm_7BMkOS4cdbw4",
    authDomain: "commerce-35053.firebaseapp.com",
    projectId: "commerce-35053",
    storageBucket: "commerce-35053.appspot.com",
    messagingSenderId: "154319464226",
    appId: "1:154319464226:web:44da0c094295d9369ea77b",
    measurementId: "G-067T233MZQ"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData

      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

return userRef;
};



  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;