import firebase from "firebase/compat/app";
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyB8sW9P3l5jXqJlMO6cY3pyROIDvegu9go",
  authDomain: "reconstrucao-solidaria.firebaseapp.com",
  projectId: "reconstrucao-solidaria",
  storageBucket: "reconstrucao-solidaria.appspot.com",
  messagingSenderId: "317070804549",
  appId: "1:317070804549:web:3d402651ea1b32dfa0852c",
  measurementId: "G-DG6GTSCVMC"
})

// Initialize Firebase
export const auth = app.auth()
export default app