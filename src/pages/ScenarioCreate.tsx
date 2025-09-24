import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToolsSelect() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    { id: "1", name: "Tool 1" },
    { id: "2", name: "Tool 2" },
    { id: "3", name: "Tool 3" },
  ];

  const handleSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-6">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Buat Skenario
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          <strong>Usia</strong> <span className="mx-2">&gt;</span> Keadaan
          <span className="mx-2">&gt;</span> Jenis Penyumbatan
          <span className="mx-2">&gt;</span> Jenis Kebocoran
        </p>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center gap-8">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleSelect(tool.id)}
            className={`w-40 h-32 rounded-xl flex justify-center items-center text-lg font-medium transition-all ${
              selectedTool === tool.id
                ? "border-4 border-yellow-400 shadow-lg shadow-yellow-400/40 bg-[#3e5163]"
                : "bg-[#3e5163] text-gray-300 hover:bg-[#4a6277]"
            }`}
          >
            {tool.name}
          </button>
        ))}
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
          disabled={!selectedTool}
          onClick={() => navigate("/scenario-create-2")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selectedTool
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
