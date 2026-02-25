import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config - thay thế bằng config của bạn
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBngId0Wq0xKcqcH9JXlKyJ_-9_k5n5VyI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "traocha-orders.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "traocha-orders",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "traocha-orders.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
