import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScenarioCreate4() {
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [selectedLeak, setSelectedLeak] = useState<string | null>(null);

  const leakOptions = [
    { id: "1", label: "Leak 1" },
    { id: "2", label: "Leak 2" },
    { id: "3", label: "Leak 3" },
    { id: "4", label: "Leak 4" },
    { id: "5", label: "Leak 5" },
  ];

  const handleSelectLeak = (id: string) => {
    setSelectedLeak(id);
    console.log("Selected Leak:", id);
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] h-screen text-gray-100 flex flex-col font-poppins">
      {/* HEADER */}
      <header className="p-6">
        <h1 className="text-2xl font-semibold text-yellow-400">
          Buat Skenario
        </h1>
        <p className="mt-2 text-gray-300 text-lg">
          Usia <span className="mx-2">&gt;</span> Keadaan{" "}
          <span className="mx-2">&gt;</span> Jenis Penyumbatan{" "}
          <span className="mx-2">&gt;</span>
          <strong>Jenis Kebocoran</strong>
        </p>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center gap-20">
        {/* KIRI */}
        <div className="flex flex-col items-start gap-4">
          <div className="text-3xl font-semibold text-yellow-300">Kebocoran</div>

          {/* Toggle */}
          <label className="relative inline-block w-[60px] h-[34px]">
            <input
              type="checkbox"
              checked={toggle}
              onChange={(e) => {
                setToggle(e.target.checked);
                console.log("Toggle:", e.target.checked ? "On" : "Off");
              }}
              className="opacity-0 w-0 h-0"
            />
            <span
              className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition ${
                toggle ? "bg-yellow-400" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute h-[26px] w-[26px] left-1 bottom-1 bg-white rounded-full transition ${
                  toggle ? "translate-x-[26px]" : ""
                }`}
              />
            </span>
          </label>
        </div>

        {/* KANAN */}
        <div className="flex flex-col gap-6">
          {/* Dropdown */}
          <select
            value={dropdown}
            onChange={(e) => {
              setDropdown(e.target.value);
              console.log("Dropdown value:", e.target.value);
            }}
            className="px-4 py-2 rounded-lg bg-[#3e5163] text-gray-100 font-medium cursor-pointer focus:outline-none"
          >
            <option value="">Pilih Kategori</option>
            <option value="kategori-1">Kategori 1</option>
            <option value="kategori-2">Kategori 2</option>
            <option value="kategori-3">Kategori 3</option>
          </select>

          {/* Leak Cards */}
          <div className="grid grid-cols-3 gap-6">
            {leakOptions.map((leak) => (
              <button
                key={leak.id}
                onClick={() => handleSelectLeak(leak.id)}
                className={`w-28 h-20 rounded-lg flex justify-center items-center text-lg font-medium transition-all ${
                  selectedLeak === leak.id
                    ? "border-4 border-yellow-400 shadow-lg shadow-yellow-400/40 bg-[#3e5163]"
                    : "bg-[#3e5163] text-gray-300 hover:bg-[#4a6277]"
                }`}
              >
                {leak.label}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between p-6">
        <button
          onClick={() => navigate("/scenario-create-3")}
          className="px-6 py-3 rounded-xl bg-gray-600 text-white font-medium transition-all hover:bg-gray-700"
        >
          ← Back
        </button>
        <button
          disabled={!selectedLeak}
          onClick={() => {
            console.log("Final Leak Selected:", selectedLeak);
            navigate("/scenario-create-5");
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            selectedLeak
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
