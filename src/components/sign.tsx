import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/components/contexts/AuthContext";


export default function Sign_In({ closeModal }: { closeModal: () => void }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (res.ok)
    {
      login();
      closeModal();
      router.push("/Profile");
    }
    else
      alert("Invalid username or password");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <div className="relative w-64 h-12 bg-gray-700 rounded-full p-1 flex items-center shadow-lg mx-auto">
          <div
            className={`absolute top-1 left-0 h-10 w-32 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500 -mx-[6px]
              ${isSignIn ? "translate-x-[12px]" : "translate-x-32"}`}
          />
          <button
            className={`w-1/2 text-white font-bold z-10 transition-all duration-500 ${
              isSignIn ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Log In
          </button>
          <button
            className={`w-1/2 text-white font-bold z-10 transition-all duration-500 ${
              isSignIn ? "text-gray-400" : "text-white"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Register
          </button>
        </div>
        <div className="h-4"></div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 mb-4"
              required
            />
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 mb-4"
              required
            />
            {!isSignIn && (
              <>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 mb-4"
                  required
                />
              </>
            )}
            <div className="flex justify-between mt-2">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 bg-gray-700 hover:bg-gray-600 font-black py-3 px-6 rounded-lg hover:scale-105 duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 font-black py-3 px-6 rounded-lg hover:scale-105 duration-300"
              >
                {isSignIn ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
