// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setUsername(parsed?.name || "User");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] flex flex-col h-screen text-gray-100">
      {/* HEADER */}
      <header className="p-6 text-left">
        <h2 className="text-2xl font-semibold text-yellow-400">
          Hello, <span>{username}</span>
        </h2>
      </header>

      {/* MAIN BUTTONS */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-10">
        <button
          onClick={() => navigate("/scenario-select")}
          className="w-[420px] py-6 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-2xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:-translate-y-1 hover:shadow-2xl transition duration-200"
        >
          Pilih Skenario
        </button>

        <button
          onClick={() => navigate("/scenario-create")}
          className="w-[420px] py-6 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-2xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:-translate-y-1 hover:shadow-2xl transition duration-200"
        >
          Buat Skenario
        </button>

        <button
          onClick={() => navigate("/result-history")}
          className="w-[420px] py-6 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-2xl font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:-translate-y-1 hover:shadow-2xl transition duration-200"
        >
          Riwayat Hasil Kateterisasi
        </button>
      </main>

      {/* FOOTER */}
      <footer className="p-6">
        <button
          onClick={handleLogout}
          className="w-[180px] py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 hover:shadow-2xl transition duration-200"
        >
          Keluar
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
