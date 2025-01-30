"use client";
import "./globals.css";
import { AuthProvider, useAuth } from "@/components/contexts/AuthContext";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import Sign_In from "@/components/sign";
import type { ReactNode } from "react";
import { useState } from "react";

interface AppProps {
  children: ReactNode;
}

export default function RootLayout({ children }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Shared Navbar */}
          <nav className="bg-gray-800 p-4">
            <ul className="container mx-auto flex gap-1 items-center text-lg">
              <li>
                <a href="/" className="text-white text-xl duration-300 hover:bg-gray-700 px-4 p-4 rounded-xl font-bold"> Home </a>
              </li>
              <li>
                <a href="Shop" className="text-white text-xl duration-300 hover:bg-gray-700 px-4 p-4 rounded-xl font-bold"> Shop </a>
              </li>
              <AuthNav {...{ openModal }} />
            </ul>
          </nav>
          { isModalOpen && <Sign_In closeModal={closeModal} />}
          {/* Main Content */}
          <main className="bg-gray-900 min-h-[85vh]"> 
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 p-4 absolute b-0 w-full">
            <div className="container mx-auto text-center">
              <p>&copy; chxikvia.tech | Design by <a href="https://github.com/BEQSONA-cmd" className="text-blue-400">BEQSONA-cmd</a></p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

const AuthNav = ({ openModal }: { openModal: () => void }) => 
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