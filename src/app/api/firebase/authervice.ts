import { getAuth, signInWithPopup, OAuthProvider, signOut, getRedirectResult, setPersistence, browserLocalPersistence } from "firebase/auth";
import { Auth } from "./firebaseConfig"; // Ensure this is the correct import

const provider = new OAuthProvider('microsoft.com');

export const signInWithMicrosoft = async () => {
    try {
        const result = await signInWithPopup(Auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return { user: result.user, accessToken: credential.accessToken };
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const signOutUser = async () => {
    try {
        await signOut(Auth);
    } catch (error) {
        console.error("Error during sign-out:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const fetchUserFromRedirect = async () => {
    try {
        const result = await getRedirectResult(Auth);
        return result ? { user: result.user, accessToken: OAuthProvider.credentialFromResult(result).accessToken } : null;
    } catch (error) {
        console.error("Error fetching user from redirect:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const initializeAuth = () => {
    setPersistence(Auth, browserLocalPersistence) // Set persistence to local
        .then(() => {
            console.log("Persistence set to local");
        })
        .catch((error) => {
            console.error("Error setting persistence:", error);
        });
};

// Call this function in your main component or wherever appropriate
initializeAuth();