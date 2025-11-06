import React, { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup,    
    signOut,            
    updateProfile     
} from 'firebase/auth';
import { auth } from '../firebase/firebase'; 


export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider(); 
const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoURL
        });
    }

   
    const signInUser = (email, password) => {
        setLoading(true); 
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

  
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    
    useEffect (() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log("Current User:", currentUser); // 
            setLoading(false); 
        });
        
       
        return () => {
            unsubscribe();
        };
    }, []);
    
    const authInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,         
        signInUser,
        googleSignIn,      
        signOutUser        
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;