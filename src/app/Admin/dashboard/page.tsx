"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  balance: number;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) 
      router.push("/Admin");
    else
    {
        fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [router]);

  const handleUpdate = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    if (editingUser) {
      fetch("/api/admin/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      })
        .then((res) => res.json())
        .then(() => {
          setEditingUser(null);
          fetch("/api/admin/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/Admin");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-700">ID</th>
              <th className="px-6 py-3 border-b border-gray-700">Username</th>
              <th className="px-6 py-3 border-b border-gray-700">Balance</th>
              <th className="px-6 py-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 border-b border-gray-700">{user.id}</td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.username}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, username: e.target.value })
                      }
                      className="bg-gray-700 text-white p-1 rounded"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {editingUser?.id === user.id ? (
                    <input
                      type="number"
                      value={editingUser.balance}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, balance: parseFloat(e.target.value) })
                      }
                      className="bg-gray-700 text-white p-1 rounded"
                    />
                  ) : (
                    user.balance
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-700">
                  {editingUser?.id === user.id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdate(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}