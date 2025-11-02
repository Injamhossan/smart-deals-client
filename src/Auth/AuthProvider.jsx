import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext'; 
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const  createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true); 
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    useEffect (() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); 
        })
        return () => {
            unsubcribe();
        }
    }, [])

    const authInfo = {
        createUser,
        signInUser,
        user,
        loading
    }

    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;