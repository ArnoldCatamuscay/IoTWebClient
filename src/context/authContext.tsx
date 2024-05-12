import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

export const authContext = createContext<any>({ user: null });

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no AuthProvider");
  return context;
}

export function AuthProvider({ children }: any) {

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const signUpWithEmailAndPassword = (email: string, password: string) =>  
    createUserWithEmailAndPassword(auth, email, password);

  const logInWithEmailAndPassword = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  },[]);

  return (
    <authContext.Provider 
      value={{ 
        signUpWithEmailAndPassword, 
        logInWithEmailAndPassword, 
        logOut, 
        loginWithGoogle,
        user, 
        loading 
      }}
    >
      {children}
    </authContext.Provider>
  );
}
