import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8tHVRZ02bL8WELjDsyw4LK3Eosnzai6w",
  authDomain: "vibejam-10d80.firebaseapp.com",
  projectId: "vibejam-10d80",
  storageBucket: "vibejam-10d80.appspot.com",
  messagingSenderId: "1010187154888",
  appId: "1:1010187154888:web:b057092517febff573fcfd",
  measurementId: "G-ETH3QERT5T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);