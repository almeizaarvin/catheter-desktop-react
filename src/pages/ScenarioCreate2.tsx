import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScenarioCreate2() {
  const navigate = useNavigate();
  const [selectedHR, setSelectedHR] = useState<string | null>(null);

  const hrOptions = [
    { id: "1", label: "HR 1" },
    { id: "2", label: "HR 2" },
    { id: "3", label: "HR 3" },
    { id: "4", label: "HR 4" },
    { id: "5", label: "HR 5" },
    { id: "6", label: "HR 6" },
  ];

  const handleSelect = (hrId: string) => {
    setSelectedHR(hrId);
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-6">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Buat Skenario
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          Usia <span className="mx-2">&gt;</span>
          <strong>Keadaan</strong>
          <span className="mx-2">&gt;</span> Jenis Penyumbatan
          <span className="mx-2">&gt;</span> Jenis Kebocoran
        </p>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center gap-20">
        {/* KIRI */}
        <div className="text-3xl font-semibold text-yellow-300">
          Heart Rate
        </div>

        {/* KANAN */}
        <div className="grid grid-cols-3 gap-6">
          {hrOptions.map((hr) => (
            <button
              key={hr.id}
              onClick={() => handleSelect(hr.id)}
              className={`w-28 h-20 rounded-lg flex justify-center items-center text-lg font-medium transition-all ${
                selectedHR === hr.id
                  ? "border-4 border-yellow-400 shadow-lg shadow-yellow-400/40 bg-[#3e5163]"
                  : "bg-[#3e5163] text-gray-300 hover:bg-[#4a6277]"
              }`}
            >
              {hr.label}
            </button>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between p-6">
        <button
          onClick={() => navigate("/tools-select")}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium transition-all hover:bg-gray-700"
        >
          ← Back
        </button>
        <button
          disabled={!selectedHR}
          onClick={() => {
            console.log("Selected Heart Rate:", selectedHR);
            navigate("/scenario-create-3");
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selectedHR
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
