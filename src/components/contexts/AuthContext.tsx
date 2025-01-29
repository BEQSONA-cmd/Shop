// components/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => 
{
    setIsLogged(Cookies.get("is_logged_in") === "true");
  }, []);

  const login = () => {
    Cookies.set("is_logged_in", "true");
    setIsLogged(true);
  };

  const logout = () => {
    Cookies.remove("is_logged_in");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};