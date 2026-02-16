import { initializeApp } from "firebase/app";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  // @ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEMJjaS0psUdPh2fqYbxDXzZ2pZuc-vHM",
  authDomain: "couplesyncapp-31dcf.firebaseapp.com",
  projectId: "couplesyncapp-31dcf",
  storageBucket: "couplesyncapp-31dcf.firebasestorage.app",
  messagingSenderId: "107997509387",
  appId: "1:107997509387:web:3ce0014cf32bb72aa2540e",
  measurementId: "G-7HJS1VJV9L",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
