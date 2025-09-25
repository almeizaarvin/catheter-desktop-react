import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScenarioPreview: React.FC = () => {
  const navigate = useNavigate();
  const [scenarioName, setScenarioName] = useState("");
  const [toasts, setToasts] = useState<{ id: number; type: string; message: string }[]>([]);

  const showToast = (type: string, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2000);
  };

  const handleBack = () => {
    navigate("/scenario-create-4");
  };

  const handleNewScenario = () => {
    if (!scenarioName.trim()) {
      showToast("warning", "⚠️ Nama skenario harus diisi dulu!");
      return;
    }

    showToast("success", "🎉 Skenario baru berhasil dibuat!");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] min-h-screen flex flex-col text-gray-100 font-poppins">
      {/* TOAST */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium text-white transition-all ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                ? "bg-red-500"
                : toast.type === "warning"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* HEADER */}
      <header className="p-6 text-left">
        <h1 className="text-2xl font-semibold text-yellow-400">Preview Skenario Baru</h1>

        <div className="mt-4 flex items-center gap-4">
          <label htmlFor="scenarioName" className="text-lg font-medium text-gray-200">
            Nama Skenario
          </label>
          <input
            type="text"
            id="scenarioName"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            placeholder="Masukkan nama skenario"
            className="px-3 py-2 rounded-lg bg-gray-700 text-gray-100 w-80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-center overflow-y-auto p-6">
        <div className="w-full max-w-3xl bg-white/5 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-2 gap-x-16 gap-y-6 text-lg">
            <div className="font-semibold text-yellow-300">Usia</div>
            <div className="text-gray-100">Dewasa</div>

            <div className="font-semibold text-yellow-300">Keadaan</div>
            <div className="text-gray-100">Normal</div>

            <div className="font-semibold text-yellow-300">Penyumbatan</div>
            <div className="text-gray-100">
              <ul className="list-disc ml-6 space-y-1">
                <li>di X</li>
                <li>di Y</li>
              </ul>
            </div>

            <div className="font-semibold text-yellow-300">Kebocoran</div>
            <div className="text-gray-100">
              <ul className="list-disc ml-6 space-y-1">
                <li>di Z</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-between items-center px-8 py-6">
        <button
          onClick={handleBack}
          className="px-6 py-3 rounded-xl font-semibold bg-gray-600 text-white hover:bg-gray-700 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleNewScenario}
          className="px-6 py-3 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md"
        >
          + Skenario Baru
        </button>
      </footer>
    </div>
  );
};

export default ScenarioPreview;
