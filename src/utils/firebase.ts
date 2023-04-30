import { initializeApp } from "firebase/app";
import { getAuth as fbGetAuth } from "firebase/auth";

const firebaseConfig = {
  //
  apiKey: "AIzaSyCKcRO1HNIvZdK0UdnpO3pZfKu1wG5ZhVs",

  authDomain: "online-classroom-de70d.firebaseapp.com",
  projectId: "online-classroom-de70d",
  storageBucket: "online-classroom-de70d.appspot.com",
  messagingSenderId: "862093748361",
  appId: "1:862093748361:web:cfc64b84080d8861b07e58",
  measurementId: "G-LMXVLSZ36X",
};

const app = initializeApp(firebaseConfig);

export const getApp = () => app;
export const getAuth = () => fbGetAuth();
