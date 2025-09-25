import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResultHistory() {
  const navigate = useNavigate();

  const histories = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    label: `Hasil Kateterisasi #${i + 1}`,
  }));

  const handleSelectHistory = (id: number) => {
    console.log("Selected History:", id);
    navigate(`/result-detail?id=${id}`);
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-10">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Hasil Kateterisasi Sebelumnya
        </h1>
      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto px-10 pb-10 pr-6">
        <div className="flex flex-col gap-4">
          {histories.map((h) => (
            <button
              key={h.id}
              onClick={() => handleSelectHistory(h.id)}
              className="w-full text-left p-4 rounded-lg bg-[#3e5163] text-gray-300 transition hover:bg-[#4a6277]"
            >
              {h.label}
            </button>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-start p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium transition-all hover:bg-gray-700"
        >
          ← Back
        </button>
      </footer>
    </div>
  );
}
