import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPDXe8gq1deofFk-mlx0dULGRpABSD7Io",
  authDomain: "gniauziai.firebaseapp.com",
  projectId: "gniauziai",
  storageBucket: "gniauziai.appspot.com",
  messagingSenderId: "556981625853",
  appId: "1:556981625853:web:2cdbfac366d7a32d382f94",
  measurementId: "G-XQ407R47S1",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
