import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyBqP7PmU5ZX_gR7iSE6WT8zmJTWLKeNA_Q",
  authDomain: "tlbc-office-application-form.firebaseapp.com",
  projectId: "tlbc-office-application-form",
  storageBucket: "tlbc-office-application-form.appspot.com",
  messagingSenderId: "266083877646",
  appId: "1:266083877646:web:36a61bbcb5d2b210f50d5f",
  measurementId: "G-824GJN374S",
};

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;



// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };