import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0zB9Ix_yO20_l93d4FXmDhOQRRWW5wVE",
  authDomain: "muzik-cf116.firebaseapp.com",
  projectId: "muzik-cf116",
  storageBucket: "muzik-cf116.appspot.com",
  messagingSenderId: "465744857281",
  appId: "1:465744857281:web:7f5afa0a4cea80fabdac40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);