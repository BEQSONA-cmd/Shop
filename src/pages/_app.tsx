import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import Sign_In from "@/components/sign";
import Cookies from "js-cookie";

export const metadata = {
  title: 'Template',
  description: "Welcome to Beqa Tvildiani's personal Template",
};

export default function App({ Component, pageProps }: AppProps) 
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [is_logged, setLogged] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if(Cookies.get("is_logged_in") === "true")
      setLogged(true);
  },[])

  return (
    <>
      {/* Shared Navbar */}
      <nav className="bg-gray-800 p-4">
        <ul className="container mx-auto flex gap-1 items-center text-lg">
          <li>
            <a href="/" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Home</a>
          </li>
          <li>
            <a href="Shop" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Shop</a>
          </li>
          
          {/* if is not logged this otherwise herf /Profile */}
          {/* <li className="ml-auto">
            <button
              onClick={openModal}
              className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-4 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2"
            >
              Profile <IoPersonCircleOutline size={32} />
            </button>
          </li> */}
          {is_logged ? ( 
            <li className="ml-auto">
              <a href="/Profile" className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-4 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2">
                Profile <IoPersonCircleOutline size={32} />
              </a>
            </li>
          ) : (
            <li className="ml-auto">
              <button
                onClick={openModal}
                className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-4 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2"
              >
                Login <IoPersonCircleOutline size={32} />
              </button>
            </li>
          )}


        </ul>
      </nav>
      { isModalOpen && <Sign_In closeModal={closeModal} />}
      {/* Main Content */}
      <main className="bg-gray-900 min-h-[85vh]">
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 absolute b-0 w-full">
        <div className="container mx-auto text-center">
          <p>&copy; chxikvia.tech | Design by <a href="https://github.com/BEQSONA-cmd" className="text-blue-400">BEQSONA-cmd</a></p>
        </div>
      </footer>
    </>
  );
}
