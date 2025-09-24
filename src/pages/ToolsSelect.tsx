import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  { id: 1, name: "Tool 1" },
  { id: 2, name: "Tool 2" },
  { id: 3, name: "Tool 3" },
];

export default function ToolsSelect() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSelect = (id: number) => {
    setSelectedTool(id);
  };

  const handleBack = () => {
    navigate("/scenario-select");
  };

  const handleNext = () => {
    if (!selectedTool) return;
    navigate("/toolstype-select");
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] min-h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-6">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Pilih Peralatan
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          <strong>Guide Wire</strong> <span className="mx-2">&gt;</span> Catheter
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center items-center gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleSelect(tool.id)}
            className={`w-[150px] h-[120px] rounded-xl flex justify-center items-center cursor-pointer transition-all
              ${
                selectedTool === tool.id
                  ? "border-4 border-yellow-400 shadow-lg shadow-yellow-400/40 bg-[#4a6277] text-white"
                  : "bg-[#3e5163] text-gray-300 hover:bg-[#4a6277]"
              }`}
          >
            {tool.name}
          </div>
        ))}
      </main>

      {/* FOOTER BUTTONS */}
      <footer className="flex justify-between p-6">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium transition hover:bg-gray-700"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedTool}
          className={`px-6 py-3 rounded-xl font-semibold transition
            ${
              selectedTool
                ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md shadow-black/20"
                : "opacity-50 cursor-not-allowed bg-yellow-400 text-white"
            }`}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}
