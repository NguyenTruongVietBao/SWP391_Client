// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArG3bEUNnrquDr0uMwUMGpMHgnfqwaL-0",
  authDomain: "imguploadswp.firebaseapp.com",
  projectId: "imguploadswp",
  storageBucket: "imguploadswp.appspot.com",
  messagingSenderId: "245122206178",
  appId: "1:245122206178:web:c841d3a17e4bb8c2b2d1bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app); 