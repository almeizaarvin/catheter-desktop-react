import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScenarioSelect() {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const scenarios = [
    {
      id: "scenario1",
      title: "Skenario 1",
      description:
        "Disini adalah deskripsi singkat skenario 1 berupa paragraf. Kamu bisa menambahkan detail kondisi, alur, atau instruksi sesuai kebutuhan.",
    },
    {
      id: "scenario2",
      title: "Skenario 2",
      description:
        "Disini adalah deskripsi singkat skenario 2 berupa paragraf. Kamu bisa menyesuaikan penjelasan sesuai konteks yang mau ditampilkan.",
    },
  ];

  const handleSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-6 text-left text-2xl font-semibold text-yellow-400">
        Pilih Skenario
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center gap-12">
        {/* KIRI: LIST SKENARIO */}
        <div className="flex flex-col gap-6">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className={`w-56 p-4 rounded-xl bg-[#3e5163] text-white text-lg font-medium transition-all border-2 ${
                selectedScenario === s.id
                  ? "border-4 border-yellow-400 shadow-lg shadow-yellow-400/40"
                  : "border-transparent hover:bg-[#4a6277]"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* KANAN: DESKRIPSI */}
        <div className="w-[400px] bg-[#2c3e50] p-6 rounded-xl shadow-lg border border-gray-700 text-gray-300 text-justify">
          {selectedScenario
            ? scenarios.find((s) => s.id === selectedScenario)?.description
            : "Klik salah satu skenario di kiri untuk melihat deskripsinya."}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium transition-all hover:bg-gray-700"
        >
          ← Back
        </button>
        <button
          disabled={!selectedScenario}
          onClick={() => navigate("/tools-select")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selectedScenario
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md"
              : "bg-yellow-500/50 text-white cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}
