import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "baycanja-ranks",
  appId: "1:579070689958:web:4ad9d2e5c417fdfbb26a67",
  apiKey: "AIzaSyAYiehaz9zL6dIVl2ZFSoV0QUGSzyflxyg",
  authDomain: "baycanja-ranks.firebaseapp.com",
  messagingSenderId: "579070689958",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
