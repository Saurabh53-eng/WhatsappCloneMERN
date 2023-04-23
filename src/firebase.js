import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl0yzZaBi5xTQiwlPuK9hveIFxY8p2mxc",
  authDomain: "whatsappclone-a05ce.firebaseapp.com",
  projectId: "whatsappclone-a05ce",
  storageBucket: "whatsappclone-a05ce.appspot.com",
  messagingSenderId: "186934205450",
  appId: "1:186934205450:web:798ee3aac00bb085fd53f3",
  measurementId: "G-P7RXHNCBHK"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
export { auth, provider };
export default db;
