import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState<{
    title: string;
    message: string;
    closable: boolean;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await (window as any).electronAPI.login(username, password);

    if (res.ok) {
      sessionStorage.setItem("user", JSON.stringify(res.user));
      setPopup({ title: "Login berhasil!", message: "Redirecting...", closable: false });
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setPopup({ title: "Error", message: res.message || "Login gagal!", closable: true });
    }
  } catch (err) {
    console.error(err);
    setPopup({ title: "Error", message: "IPC Error / DB Error", closable: true });
  }
};

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] flex justify-center items-center h-screen text-gray-100">
      <div className="bg-[#2c3e50] p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] w-[360px] text-center animate-fadeIn border border-gray-700">
        <h1 className="mb-8 text-3xl font-semibold text-blue-400 tracking-wide">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#3e5163] text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 pr-12 rounded-xl bg-[#3e5163] text-gray-100 placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {showPassword ? (
                  // eye off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.978 9.978 0 012.325-4.434m2.517-2.312A9.967 9.967 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.958 9.958 0 01-4.07 5.162M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 hover:shadow-2xl transition duration-200"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 text-gray-400 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Daftar di sini
          </Link>
        </div>
      </div>

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-[#2c3e50] p-8 rounded-xl shadow-lg w-[320px] text-center border border-gray-700">
            <h3 className="text-xl font-bold mb-4">{popup.title}</h3>
            <p className="text-gray-300 mb-6">{popup.message}</p>
            {popup.closable && (
              <button
                onClick={() => setPopup(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Tutup
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
