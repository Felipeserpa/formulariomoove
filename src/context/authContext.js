// context/authContext.js
import { createContext, useState, useEffect } from "react";
import { auth } from ".././services/firebaseConection";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
      console.log("Estado do usuário:", user);
      console.log("Carregando:", loading);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === "moove@gmail.com";

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
