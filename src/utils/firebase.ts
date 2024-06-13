import { UserRole } from "@/types/permission";
import { initializeApp } from "firebase/app";
import { getAuth as fbGetAuth } from "firebase/auth";
import type { FirebaseOptions } from "firebase/app";

// const firebaseConfig: FirebaseOptions = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
//   authDomain: "online-classroom-de70d.firebaseapp.com",
//   projectId: "online-classroom-de70d",
//   storageBucket: "online-classroom-de70d.appspot.com",
//   messagingSenderId: "862093748361",
//   appId: "1:862093748361:web:cfc64b84080d8861b07e58",
//   measurementId: "G-LMXVLSZ36X",
//   databaseURL:
//     "https://online-classroom-de70d-default-rtdb.asia-southeast1.firebasedatabase.app/",
// };

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
  authDomain: "dohoangtu-5ae0c.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "dohoangtu-5ae0c.appspot.com",
  messagingSenderId: "697997266316",
  appId: "1:697997266316:web:0f5078a4e1a10d6a061aa9",
  measurementId: "",
  databaseURL:
    "https://dohoangtu-5ae0c-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const getApp = () => app;
export const getAuth = () => fbGetAuth();

export const getUserRole: () => Promise<UserRole | null> = async () => {
  const auth = getAuth();
  const idTokenResult = await auth.currentUser?.getIdTokenResult();
  const role = idTokenResult?.claims.role;
  if (!role) return null;
  return role as UserRole;
};
