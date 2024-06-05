import React, { createContext, useEffect, useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import useSecureAxios from "../hooks/useSecureAxios";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  googleProvider: () => Promise<UserCredential>;
  logOutUser: () => Promise<void>;
}

interface ChildProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<ChildProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);
  const secureAxios = useSecureAxios();
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOutUser = () => {
    return signOut(auth);
  };
  const googleProvider = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        secureAxios
          .post(`/users/jwt`, { email: user.email })
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
      } else {
        secureAxios
          .post(`/users/clearCookie`)
          .then((res) => console.log(res.data))
          .catch((err) => console.error(err));
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [secureAxios]);
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    logOutUser,
    googleProvider,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
