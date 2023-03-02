import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbigrMOjodHxZujZa7djMmm0lCrWGd_-g",
  authDomain: "room-chat-1ec02.firebaseapp.com",
  projectId: "room-chat-1ec02",
  storageBucket: "room-chat-1ec02.appspot.com",
  messagingSenderId: "258256626854",
  appId: "1:258256626854:web:4472ef6ace91c9d4e74067"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Initialize FireStore DB
const db = getFirestore(app);

export {auth, provider, db};