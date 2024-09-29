"use client";

import { useEffect, useState } from "react";
import { signOutUser, signInWithMicrosoft, fetchUserFromRedirect, initializeAuth } from "./api/firebase/authervice"; 
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./api/firebase/firebaseConfig"; // Adjust the import path as necessary

const Home = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const handleSignIn = async () => {
        try {
            const { user, accessToken } = await signInWithMicrosoft();
            setUser(user);
            if (accessToken) {
                await fetchProfilePhoto(accessToken);
            } else {
                console.error("Access token is undefined");
            }
        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOutUser();
            setUser(null);
            setPhotoUrl(null);
        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    const fetchProfilePhoto = async (accessToken: string) => {
        try {
            const response = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "image/jpeg",
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setPhotoUrl(url);
            } else {
                console.error("Failed to fetch profile photo:", response.status);
            }
        } catch (error) {
            console.error("Error fetching profile photo:", error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const result = await fetchUserFromRedirect();
                if (result && result.accessToken) {
                    setUser(result.user);
                    await fetchProfilePhoto(result.accessToken);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        initializeAuth(); // Initialize authentication persistence
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome to the App</h1>
            {user ? (
                <>
                    <h2>User Profile</h2>
                    <p><strong>Name:</strong> {user.displayName || "No name available"}</p>
                    <p><strong>Email:</strong> {user.email || "No email available"}</p>
                    {photoUrl ? (
                        <p>
                            <strong>Photo:</strong> 
                            <img src={photoUrl} alt="Profile" style={{ width: '100px', height: '100px' }} />
                        </p>
                    ) : (
                        <p><strong>Photo:</strong> No photo available</p>
                    )}
                    <button onClick={handleSignOut}>Sign out</button>
                </>
            ) : (
                <button onClick={handleSignIn}>Sign in with Microsoft</button>
            )}
        </div>
    );
};

export default Home;
