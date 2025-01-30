"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { I_user } from "../utils/types";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";

export const AuthNav = ({ openModal }: { openModal: () => void }) => 
{
  const { isLogged, loading, user } = useAuth();

  if (loading) 
  {
    return (
      <li className="ml-auto">
        <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-purple-500"></div>
      </li>
    );
  }

  return isLogged ? (
    <li className="ml-auto flex flex-col items-end gap-1">
      <a
        href="/Profile"
        className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-6 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2"
      >
        {user?.username} <IoPersonCircleOutline size={32} />
      </a>
      <p className="text-m text-gray-300">
        Balance: <span className="font-bold">₮{user?.balance.toFixed(2)}</span>
      </p>
    </li>
  ) : (
    <li className="ml-auto">
      <button
        onClick={openModal}
        className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-6 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2"
      >
        Login <IoMdLogIn size={32} />
      </button>
    </li>
  );
};

interface AuthContextType {
  isLogged: boolean;
  loading: boolean;
  user: I_user | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<I_user | null>(null);

  const fetchUser = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      Cookies.remove("authToken");
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loggedIn = Cookies.get("is_logged_in") === "true";
    setIsLogged(loggedIn);

    if (loggedIn) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = () => {
    Cookies.set("is_logged_in", "true");
    setIsLogged(true);
    fetchUser();
  };

  const logout = () => {
    Cookies.remove("is_logged_in");
    Cookies.remove("authToken");
    setIsLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, loading, user, login, logout }}>
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