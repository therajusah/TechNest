import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFE0B3F-PNYJyL5QvMk7h96Bkp9caVwKU",
  authDomain: "technest-f2db6.firebaseapp.com",
  databaseURL:
    "https://technest-f2db6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "technest-f2db6",
  storageBucket: "technest-f2db6.appspot.com",
  messagingSenderId: "489982121682",
  appId: "1:489982121682:web:5fa1cf377fc97a2febff0b",
  measurementId: "G-N0M6FY7YVC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
