"use client";

import { useEffect, useState } from "react";
import { Sparkles, FileSpreadsheet } from "lucide-react";

const processingMessages = [
  "Reading CSV file headers...",
  "Applying rule-based mappings...",
  "Running AI-based header alignment...",
  "Extracting contacts & normalizing phone formats...",
  "Batching leads for CRM enrichment...",
  "Enriching records using Llama 3.3 models...",
  "Polishing CRM notes and final structures...",
  "Almost there! Preparing results dashboard...",
];

export default function ProcessingState({ fileName }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % processingMessages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
      {/* Decorative Sparkles and File Container */}
      <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 text-violet-600">
        <FileSpreadsheet className="h-10 w-10 animate-pulse" />
        <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-white shadow-md animate-bounce">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <h3 className="mb-2 text-xl font-bold text-slate-800">
        AI is processing your CSV
      </h3>
      <p className="mb-8 text-sm text-slate-500">
        Your records are being mapped to GrowEasy CRM fields.
      </p>

      {/* File Info pill */}
      {fileName && (
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 border border-slate-100 text-xs font-semibold text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {fileName}
        </div>
      )}

      {/* Indeterminate Progress Bar */}
      <div className="mx-auto mb-6 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-full rounded-full bg-violet-600 animate-[infinite-scroll_1.5s_ease-in-out_infinite]"
          style={{
            backgroundImage: "linear-gradient(to right, #7c3aed, #a78bfa, #7c3aed)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite linear"
          }}
        />
      </div>

      {/* Cycling Status Messages */}
      <p className="text-sm font-semibold text-violet-600 animate-fade-in-out">
        {processingMessages[messageIndex]}
      </p>
      <p className="mt-3 text-xs text-slate-400">
        This may take up to a minute depending on the row count. Please do not close this window.
      </p>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
