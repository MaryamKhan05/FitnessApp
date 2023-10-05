import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpNH7x9OcRZgfsn_jvM3frYGQPXrI3IJA",
  authDomain: "workoutflow-e448b.firebaseapp.com",
  projectId: "workoutflow-e448b",
  storageBucket: "workoutflow-e448b.appspot.com",
  messagingSenderId: "801699316776",
  appId: "1:801699316776:web:8cc6941d3ceef46a0e211d"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);