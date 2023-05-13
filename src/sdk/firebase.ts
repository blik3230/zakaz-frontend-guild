// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcFNSnyhRbDFbDI4KDtqPDUfCCOBfTwaQ',
  authDomain: 'zakaz-frontend-guild.firebaseapp.com',
  projectId: 'zakaz-frontend-guild',
  storageBucket: 'zakaz-frontend-guild.appspot.com',
  messagingSenderId: '217750990950',
  appId: '1:217750990950:web:a86cca0bbec9e21051bda7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
