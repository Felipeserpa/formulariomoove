// context/authContext.js
import { createContext, useState, useEffect } from "react";
import { auth } from ".././services/firebaseConection";
import { signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Atualiza o estado com o usuário atual ou null
      setLoading(false);
      console.log("Estado do usuário:", currentUser);
      console.log("Carregando:", loading);
    });
    return () => unsubscribe();
  }, []); // Removido 'loading' das dependências, pois não é necessário

  //deslogar o admin
  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      if (error && error.code) {
        console.error("Código do erro:", error.code);
        console.error("Mensagem do erro:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const isAdmin = user?.email === "moove@gmail.com";

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
