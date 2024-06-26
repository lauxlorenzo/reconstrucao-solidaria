import firebase from "firebase/app";
import { getStorage } from "firebase/storage";

if (!firebase.getApps.length) {
   firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
   });
}

const storage = getStorage();

export { firebase, storage };