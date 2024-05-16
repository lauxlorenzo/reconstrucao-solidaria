
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8sW9P3l5jXqJlMO6cY3pyROIDvegu9go",
  authDomain: "reconstrucao-solidaria.firebaseapp.com",
  projectId: "reconstrucao-solidaria",
  storageBucket: "reconstrucao-solidaria.appspot.com",
  messagingSenderId: "317070804549",
  appId: "1:317070804549:web:3d402651ea1b32dfa0852c",
  measurementId: "G-DG6GTSCVMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);