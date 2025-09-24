import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // tambah import di atas

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState<{ type: string; message: string } | null>(
    null
  );

  const navigate = useNavigate();

  // Fungsi toast sederhana
  const showToast = (type: string, message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("error", "Password dan Confirm Password tidak sama!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Format email tidak valid!");
      return;
    }

    try {
      // ⚡ panggil IPC lewat electronAPI (sama kayak login)
      const res = await (window as any).electronAPI.register(
        username,
        email,
        password
      );

      if (res.ok) {
        showToast("success", "Registrasi berhasil! Silakan login.");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        showToast("error", res.message || "Registrasi gagal!");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "IPC Error / DB Error!");
    }
  };


  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] flex justify-center items-center h-screen text-gray-100 font-poppins">
      <div className="bg-[#2c3e50] p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] w-[400px] text-center animate-fadeIn border border-gray-700">
        <h1 className="mb-8 text-3xl font-semibold text-green-400 tracking-wide">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#3e5163] text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#3e5163] text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#3e5163] text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#3e5163] text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5 hover:shadow-2xl transition duration-200"
          >
            Daftar
          </button>
        </form>

        <div className="mt-6 text-gray-400 text-sm">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
                Login di sini
            </Link>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "warning"
                ? "bg-yellow-500"
                : "bg-gray-600"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
