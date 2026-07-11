import { useState, useCallback } from "react";
import { importCsvFile } from "@/services/import.service";

export default function useImport() {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const importFile = useCallback(async (file) => {
    setIsImporting(true);
    setError(null);
    try {
      const data = await importCsvFile(file);
      if (data && data.success) {
        setResult(data);
        return data;
      } else {
        const msg = data?.message || "Import failed without specific error message";
        setError(msg);
        return { success: false, message: msg };
      }
    } catch (err) {
      console.error("useImport Error:", err);
      const errMsg = err.response?.data?.message || err.message || "Network error while importing file";
      setError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setIsImporting(false);
    }
  }, []);

  const resetImport = useCallback(() => {
    setIsImporting(false);
    setError(null);
    setResult(null);
  }, []);

  return {
    isImporting,
    error,
    result,
    importFile,
    resetImport,
  };
}
