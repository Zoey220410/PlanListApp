import * as React from "react";
import MainContainer from "./navigation/mainContainer";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AuthenticatedUserProvider from "./Context/AuthenticationContext";
const firebaseConfig = {
  apiKey: "AIzaSyDwgwsrPdFxnyx1R8w7LEP6nFEJv4XP_6s",
  authDomain: "timeleaf-44f2c.firebaseapp.com",
  databaseURL: "https://timeleaf-44f2c-default-rtdb.firebaseio.com",
  projectId: "timeleaf-44f2c",
  storageBucket: "timeleaf-44f2c.appspot.com",
  messagingSenderId: "841214137933",
  appId: "1:841214137933:web:7287f7944f7c3cbd24ee04",
  measurementId: "G-GH5KT0P43P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
    return (
       <AuthenticatedUserProvider>
          <MainContainer />
       </AuthenticatedUserProvider>
    );
}

export default App;
export { db };
export const auth = getAuth();

