"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function UploadCard({ onFileSelected }) {
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setError(null);

      // Handle rejections
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        const { errors } = rejection;
        if (errors[0]?.code === "file-too-large") {
          const msg = "File is too large. Maximum size is 20 MB.";
          setError(msg);
          toast.error(msg);
        } else if (errors[0]?.code === "file-invalid-type") {
          const msg = "Invalid file type. Only CSV files are allowed.";
          setError(msg);
          toast.error(msg);
        } else {
          const msg = errors[0]?.message || "File validation failed.";
          setError(msg);
          toast.error(msg);
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (!file.name.toLowerCase().endsWith(".csv")) {
          const msg = "Invalid file format. Please select a .csv file.";
          setError(msg);
          toast.error(msg);
          return;
        }

        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "text/plain": [".csv"],
      "application/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    maxSize: 20 * 1024 * 1024, // 20 MB
    multiple: false,
    noClick: false,
  });

  return (
    <div className="mx-auto mt-12 max-w-xl px-4">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300
          ${isDragActive
            ? "border-violet-500 bg-violet-50/50 shadow-inner"
            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
          }`}
      >
        <input {...getInputProps()} />

        {/* Upload Icon */}
        <div
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300
            ${isDragActive ? "bg-violet-100 text-violet-600" : "bg-slate-50 text-slate-400"}`}
        >
          <UploadCloud className="h-7 w-7" />
        </div>

        {/* Action text */}
        <h3 className="mb-2 text-lg font-semibold text-slate-800">
          Drop your CSV file here
        </h3>
        <p className="mb-6 text-sm text-slate-400">
          or browse from your computer
        </p>

        {/* Browse Button */}
        <button
          type="button"
          onClick={open}
          className="mb-4 inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all cursor-pointer"
        >
          Browse Files
        </button>

        <span className="text-xs text-slate-400 font-medium">
          CSV only &bull; Maximum 20 MB
        </span>
      </div>

      {/* Error state */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}