// app/layout.tsx
"use client";
import type { ReactNode } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import Sign_In from "@/components/sign";
import "./globals.css";
import { useState } from "react";
import { AuthProvider, useAuth } from "@/components/contexts/AuthContext";

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
                <a href="/" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Home</a>
              </li>
              <li>
                <a href="Shop" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Shop</a>
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

const AuthNav = ({ openModal }: { openModal: () => void }) => {
  const { isLogged, logout } = useAuth();

  return isLogged ? (
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
        Login <IoMdLogIn size={32} />
      </button>
    </li>
  );
};


// export default function RootLayout({ children }: AppProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const [is_logged, setLogged] = useState(false);


//   useEffect(() => {
//     if(Cookies.get("is_logged_in") === "true")
//       setLogged(true);
//   },[])

//   return (
//     <html lang="en">
//       <body>
//       {/* Shared Navbar */}
//       <nav className="bg-gray-800 p-4">
//         <ul className="container mx-auto flex gap-1 items-center text-lg">
//           <li>
//             <a href="/" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Home</a>
//           </li>
//           <li>
//             <a href="Shop" className="text-white duration-300 hover:bg-gray-700 p-3 rounded-lg">Shop</a>
//           </li>
//           {is_logged ? ( 
//             <li className="ml-auto">
//               <a href="/Profile" className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-4 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2">
//                 Profile <IoPersonCircleOutline size={32} />
//               </a>
//             </li>
//           ) : (
//             <li className="ml-auto">
//               <button
//                 onClick={openModal}
//                 className="bg-purple-600 hover:bg-purple-700 font-black py-3 px-4 hover:scale-105 duration-300 rounded-full flex text-xl items-center gap-2"
//               >
//                 Login <IoMdLogIn size={32} />
//               </button>
//             </li>
//           )}
//         </ul>
//       </nav>
//       { isModalOpen && <Sign_In closeModal={closeModal} />}
//       {/* Main Content */}
//       <main className="bg-gray-900 min-h-[85vh]"> 
//         {children}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 p-4 absolute b-0 w-full">
//         <div className="container mx-auto text-center">
//           <p>&copy; chxikvia.tech | Design by <a href="https://github.com/BEQSONA-cmd" className="text-blue-400">BEQSONA-cmd</a></p>
//         </div>
//       </footer>
//       </body>
//     </html>
//   );
// }
