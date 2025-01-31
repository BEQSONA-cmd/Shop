"use client";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useAuth } from "@/components/contexts/AuthContext";

export default function Profile() {
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white py-10">
      <div className="w-96 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">👤 Profile</h1>
        {user ? (
          <>
            <p className="text-lg mb-2">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-lg mb-6">
              <span className="font-semibold">Balance:</span> ₮{user.balance.toFixed(2)}
            </p>
            <button
              className="w-full bg-red-600 hover:bg-red-700 font-bold py-2 rounded-lg transition-all"
              onClick={() => {
                logout();
                Cookies.remove("authToken");
                router.push("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-lg">Loading...</p>
        )}
      </div>
    </div>
  );
}