import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Estos valores deben ser reemplazados por los de tu consola de Firebase
// Ir a: Project Settings > General > Your Apps > Config
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "zolla-web.firebaseapp.com",
  projectId: "zolla-web",
  storageBucket: "zolla-web.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
