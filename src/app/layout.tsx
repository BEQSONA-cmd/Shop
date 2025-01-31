"use client";
import "./globals.css";
import { AuthProvider, AuthNav } from "@/components/contexts/AuthContext";
import Sign_In from "@/components/sign";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

interface AppProps {
    children: ReactNode;
}

export default function RootLayout({ children }: AppProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [path, setPath] = useState("");

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    const AuthComponent = ({ children }: any) => {
        return (
            <AuthProvider>
                {/* Shared Navbar */}
                <nav className="bg-gray-800 p-4">
                    <ul className="container mx-auto flex gap-1 items-center text-lg">
                        <li>
                            <a
                                href="/"
                                className="text-white text-xl duration-300 hover:bg-gray-700 px-4 p-4 rounded-xl font-bold"
                            >
                                {" "}
                                Home{" "}
                            </a>
                        </li>
                        <li>
                            <a
                                href="Shop"
                                className="text-white text-xl duration-300 hover:bg-gray-700 px-4 p-4 rounded-xl font-bold"
                            >
                                {" "}
                                Shop{" "}
                            </a>
                        </li>
                        <AuthNav {...{ openModal }} />
                    </ul>
                </nav>
                {isModalOpen && <Sign_In closeModal={closeModal} />}

                {/* Main Content */}
                <main className="bg-gray-900 min-h-[85vh]">{children}</main>

                {/* Footer */}
                <footer className="bg-gray-800 p-4 absolute b-0 w-full">
                    <div className="container mx-auto text-center">
                        <p>
                            &copy; chxikvia.tech | Design by{" "}
                            <a href="https://github.com/BEQSONA-cmd" className="text-blue-400">
                                BEQSONA-cmd
                            </a>
                        </p>
                    </div>
                </footer>
            </AuthProvider>
        );
    };

    return (
        <html lang="en">
            <body>{path != "/Admin" && path != "/Admin/dashboard" ? AuthComponent({ children }) : children}</body>
        </html>
    );
}
