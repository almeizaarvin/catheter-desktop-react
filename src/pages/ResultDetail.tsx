// src/pages/ResultDetail.tsx
import React from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

type ResultData = {
  date: string;
  start: string;
  end: string;
  scenario: string[];
  procedure: string;
  xray: string;
  radiation: string[];
};

const dummyData: Record<string, ResultData> = {
  "1": {
    date: "28/08/2025",
    start: "07.46",
    end: "08.23",
    scenario: ["Dewasa", "Normal", "Penyumbatan di X"],
    procedure: "00h:37m:00s",
    xray: "00h:26m:12s",
    radiation: ["Parameter 1 = 120 mGy", "Parameter 2 = 85 mGy", "Parameter 3 = 60 mGy"],
  },
  "2": {
    date: "29/08/2025",
    start: "09.00",
    end: "09.45",
    scenario: ["Anak-anak", "Kondisi Darurat", "Penyumbatan di Y"],
    procedure: "00h:42m:15s",
    xray: "00h:31m:20s",
    radiation: ["Parameter 1 = 130 mGy", "Parameter 2 = 90 mGy", "Parameter 3 = 65 mGy"],
  },
  "3": {
    date: "30/08/2025",
    start: "10.15",
    end: "11.05",
    scenario: ["Dewasa", "Hipertensi", "Tanpa Penyumbatan"],
    procedure: "00h:28m:50s",
    xray: "00h:19m:33s",
    radiation: ["Parameter 1 = 110 mGy", "Parameter 2 = 70 mGy", "Parameter 3 = 55 mGy"],
  },
  "4": {
    date: "01/09/2025",
    start: "08.00",
    end: "08.30",
    scenario: ["Lansia", "Normal", "Penyumbatan di Z"],
    procedure: "00h:33m:40s",
    xray: "00h:25m:05s",
    radiation: ["Parameter 1 = 125 mGy", "Parameter 2 = 82 mGy", "Parameter 3 = 59 mGy"],
  },
  // ... lanjutkan sampai 10 sesuai kebutuhan
};

export default function ResultDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const historyId = searchParams.get("id") || "";

  if (!dummyData[historyId]) {
    return <Navigate to="/result-history" replace />;
  }

  const data = dummyData[historyId];

  return (
    <div className="bg-gradient-to-br from-[#1f2b38] to-[#34495e] min-h-screen flex flex-col text-gray-100 font-poppins">
      {/* HEADER */}
      <header className="p-6 text-left">
        <h1 className="text-2xl font-semibold text-yellow-400">{data.date}</h1>
        <p className="mt-2">
          <span className="font-semibold">Mulai:</span>
          <span className="ml-2">{data.start}</span>
        </p>
        <p>
          <span className="font-semibold">Selesai:</span>
          <span className="ml-2">{data.end}</span>
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex justify-center items-center overflow-y-auto p-6">
        <div className="w-full max-w-3xl bg-white/5 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-2 gap-x-16 gap-y-6 text-lg">
            <div className="font-semibold text-yellow-300">Skenario</div>
            <div className="text-gray-100">
              <ul className="list-disc ml-6 space-y-1">
                {data.scenario.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="font-semibold text-yellow-300">Skema Prosedur</div>
            <div className="text-gray-100">{data.procedure}</div>

            <div className="font-semibold text-yellow-300">Skema X-Ray</div>
            <div className="text-gray-100">{data.xray}</div>

            <div className="font-semibold text-yellow-300">Dosis Radiasi</div>
            <div className="text-gray-100">
              <ul className="list-disc ml-6 space-y-1">
                {data.radiation.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="flex justify-start items-center px-8 py-6">
        <button
          onClick={() => navigate("/result-history")}
          className="px-6 py-3 rounded-xl font-semibold bg-gray-600 hover:bg-gray-700 text-white transition"
        >
          ← Back
        </button>
      </footer>
    </div>
  );
}
