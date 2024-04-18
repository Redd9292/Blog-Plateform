import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null); 
      },
      (error) => {
        setError(error);
        setLoading(false); 
      }
    );

    
    return () => unsubscribe();  
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); 
    } catch (error) {
      setError(error); 
    }
  };

  
  const contextValue = useMemo(() => ({ currentUser, logout, error }), [currentUser, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div>Loading...</div> 
      ) : error ? (
        <div>Error: {error.message}</div> 
      ) : (
        children 
      )}
    </AuthContext.Provider>
  );
}
