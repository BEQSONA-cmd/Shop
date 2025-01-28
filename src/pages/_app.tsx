import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

function Sign_In( {closeModal }: {closeModal: () => void} ) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white bg-red-600 px-4 py-2 rounded-lg mr-2 hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}

export const metadata = {
  title: 'Template',
  description: "Welcome to Beqa Tvildiani's personal Template",
};

export default function App({ Component, pageProps }: AppProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Shared Navbar */}
      <nav className="bg-gray-800 p-4">
        <ul className="container mx-auto flex gap-1 items-center">
          <li>
            <a href="/" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Home</a>
          </li>
          <li>
            <a href="Shop" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Shop</a>
          </li>
          <li>
            <a href="Page_2" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Page 2</a>
          </li>
          <li>
            <a href="Page_3" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Page 3</a>
          </li>
          <li className="ml-auto">
            <button
              onClick={openModal}
              className="text-white bg-blue-600 duration-300 hover:bg-blue-700 p-3 rounded-lg"
            >
              Sign In
            </button>
          </li>
        </ul>
      </nav>
      {
        isModalOpen && <Sign_In closeModal={closeModal} />
      }

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
