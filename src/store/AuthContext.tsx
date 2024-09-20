import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

interface AuthModal {
  user: User | null;
  isLoading: boolean;
}

const authState: AuthModal = {
  user: null,
  isLoading: true,
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext(authState);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ctxValue: AuthModal = {
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
