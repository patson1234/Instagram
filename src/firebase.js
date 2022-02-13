import { initializeApp,getApps,getApp,} from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  //FIREBASE CONFIG
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()
const auth = getAuth()

const provider = new GoogleAuthProvider();
export {app,db,storage,auth,provider}
