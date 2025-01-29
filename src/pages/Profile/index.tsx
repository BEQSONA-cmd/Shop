import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Profile() {
  const [user, setUser] = useState<{ username: string, balance: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() 
    {
      const token = Cookies.get("authToken");
      if (!token) 
      {
        router.push("/");
        return;
      }

      try 
      {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } 
      catch 
      {
        Cookies.remove("authToken");
        router.push("/");
      }
    }
    checkAuth();
  }, [router]);

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
              <span className="font-semibold">Balance:</span> ${user.balance}
            </p>
            <button
              className="w-full bg-red-600 hover:bg-red-700 font-bold py-2 rounded-lg transition-all"
              onClick={() => {
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
