// ScenarioPreview.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ScenarioPreview() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/scenario-select"); // balik ke halaman pilih skenario
  };

  const handleLaunch = () => {
    alert("🚀 Launching skenario statis...");
    navigate("/dashboard");
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] min-h-screen flex flex-col text-gray-100 font-poppins">
      {/* HEADER */}
      <header className="p-6 text-left text-2xl font-semibold text-yellow-400">
        Preview Skenario
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-10 py-6">
        <div className="grid grid-cols-[200px_1fr] gap-8 flex-1">
          {/* LEFT COL */}
          <div className="flex flex-col gap-8 text-xl font-semibold text-yellow-400">
            <div>Skenario</div>
            <div>Peralatan</div>
          </div>

          {/* RIGHT COL */}
          <div className="flex flex-col gap-8 text-gray-200">
            <div>
              Ini adalah deskripsi statis untuk skenario 1. Kamu bisa isi
              penjelasan singkat tentang kondisi, alur, atau instruksi yang ada
              di dalam skenario ini.
            </div>

            <div>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Peralatan 1</li>
                <li>Peralatan 2</li>
                <li>Peralatan 3</li>
              </ol>

              <div className="flex gap-4 mt-4">
                <div className="flex-1 h-24 bg-[#3e5163] rounded-xl"></div>
                <div className="flex-1 h-24 bg-[#3e5163] rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between p-6">
        {/* Back */}
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium transition-all hover:bg-gray-700"
        >
          ← Back
        </button>

        {/* Launch */}
        <button
          onClick={handleLaunch}
          className="px-6 py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:shadow-lg"
        >
          🚀 Launch
        </button>
      </footer>
    </div>
  );
}
