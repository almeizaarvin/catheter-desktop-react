import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const toolTypes = [
  {
    id: "type1",
    title: "Type 1",
    tools: ["J1-1", "J1-2", "J1-3", "J1-4", "J1-5", "J1-6"],
  },
  {
    id: "type2",
    title: "Type 2",
    tools: ["J2-1", "J2-2", "J2-3", "J2-4", "J2-5"],
  },
  {
    id: "type3",
    title: "Type 3",
    tools: ["J3-1", "J3-2", "J3-3"],
  },
];

export default function ToolsTypeSelect() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (tool: string) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    navigate("/tools-select");
  };

  const handleNext = () => {
    if (!selectedTool) return;
    navigate("/scenario-preview");
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] min-h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-6">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Pilih Peralatan
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          Guide Wire <span className="mx-2">&gt;</span>  <strong>Catheter</strong>{" "}
        </p>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-start gap-12 p-6 mt-8">
        {toolTypes.map((group) => (
          <div
            key={group.id}
            className="flex flex-col items-center gap-4 min-h-[280px]"
          >
            <div className="text-lg font-semibold text-yellow-400">
              {group.title}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {group.tools.map((tool, idx) => (
                <div
                  key={tool}
                  onClick={() => handleSelect(tool)}
                  className={`w-[80px] h-[70px] rounded-lg flex justify-center items-center cursor-pointer transition-all
                    ${
                      selectedTool === tool
                        ? "border-4 border-yellow-400 shadow-lg shadow-yellow-400/40 bg-[#4a6277] text-white"
                        : "bg-[#3e5163] text-gray-300 hover:bg-[#4a6277]"
                    }`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between p-6">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-medium transition"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedTool}
          className={`px-6 py-3 rounded-xl font-semibold transition shadow-lg
            ${
              selectedTool
                ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                : "opacity-50 cursor-not-allowed bg-yellow-400 text-white shadow-none"
            }`}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}
