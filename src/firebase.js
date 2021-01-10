import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDA6p4v6g06A0GryztDqa-FGncCaHhImpU",
    authDomain: "wikiapp-test.firebaseapp.com",
    projectId: "wikiapp-test",
    storageBucket: "wikiapp-test.appspot.com",
    messagingSenderId: "100724914799",
    appId: "1:100724914799:web:2a9dadfe560518d84feb9a"
  };

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth =firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };