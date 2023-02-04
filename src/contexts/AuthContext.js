import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, beforeAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();


    async function signIn(email, password) {
        return await signInWithEmailAndPassword(auth, email, password)
    }
    async function signUp(email, password, username) {
        await createUserWithEmailAndPassword(auth, email, password);
        return await updateProfile(auth.currentUser, { displayName: username });
    }
    async function forgotPassword(email) {
        return await sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = beforeAuthStateChanged(auth, (user) => {
           return setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signIn,
        signUp,
        forgotPassword
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
