"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Loader2, Shield, User, Palette } from "lucide-react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  const fetchUsers = async () => {
    try {
      const token = session?.session?.token || session?.token;
      if (!token) return;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (session) fetchUsers();
  }, [session]);

  const handleRoleChange = async (id, role) => {
    try {
      const token = session?.session?.token || session?.token;
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/role/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      toast.error("Role update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <section className="text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Manage Users
        </h1>
      </div>

      <div className="bg-[#09122E]/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0D183B]/80">
              <tr>
                <th className="p-5 font-semibold text-gray-300">Name</th>
                <th className="p-5 font-semibold text-gray-300">Email</th>
                <th className="p-5 font-semibold text-gray-300">Role</th>
                <th className="p-5 font-semibold text-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-5 font-medium">{user.name}</td>
                  <td className="p-5 text-gray-400">{user.email}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                      user.role === 'artist' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5 flex justify-center gap-2">
                    <ActionButton onClick={() => handleRoleChange(user._id, "buyer")} color="bg-blue-600" icon={<User size={14} />} label="User" />
                    <ActionButton onClick={() => handleRoleChange(user._id, "artist")} color="bg-green-600" icon={<Palette size={14} />} label="Artist" />
                    <ActionButton onClick={() => handleRoleChange(user._id, "admin")} color="bg-pink-600" icon={<Shield size={14} />} label="Admin" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


function ActionButton({ onClick, color, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition-all ${color}`}
    >
      {icon} {label}
    </button>
  );
}