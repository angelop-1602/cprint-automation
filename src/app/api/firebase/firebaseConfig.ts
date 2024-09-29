import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

console.log("Firebase Config:", firebaseConfig); // Log the config

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);

export { Auth };