import { initializeApp,getApps,getApp,} from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyD2tRJOnmSzgSmFR5OyG_jLgcEWRNe96cg",
  authDomain: "test-df5ac.firebaseapp.com",
  projectId: "test-df5ac",
  storageBucket: "test-df5ac.appspot.com",
  messagingSenderId: "495611272405",
  appId: "1:495611272405:web:7162a02ee72752eb8e965c",
  measurementId: "G-8K9VMXQ5WB"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

const provider = new GoogleAuthProvider();
export {app,db,storage,auth,provider}