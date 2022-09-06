import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOV8pnRwVt73cSntBTNLeuzFWtfAZJDU4",
  authDomain: "reactshop-2b57f.firebaseapp.com",
  projectId: "reactshop-2b57f",
  storageBucket: "reactshop-2b57f.appspot.com",
  messagingSenderId: "1004526753688",
  appId: "1:1004526753688:web:2513745920a44a1e553ded"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
