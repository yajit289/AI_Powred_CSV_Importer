import { useState, useCallback } from "react";
import Papa from "papaparse";

export default function useCsvParser() {
  const [data, setData] = useState({ headers: [], rows: [], error: null });
  const [isParsing, setIsParsing] = useState(false);

  const parseCsv = useCallback((file) => {
    return new Promise((resolve) => {
      if (!file) {
        const err = "No file provided";
        setData({ headers: [], rows: [], error: err });
        resolve({ headers: [], rows: [], error: err });
        return;
      }

      setIsParsing(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: "greedy",
        complete: (results) => {
          setIsParsing(false);
          const headers = results.meta.fields || [];
          const rows = results.data || [];

          if (headers.length === 0) {
            const err = "CSV file has no headers or is empty";
            setData({ headers: [], rows: [], error: err });
            resolve({ headers: [], rows: [], error: err });
            return;
          }

          if (rows.length === 0) {
            const err = "CSV file contains no data rows";
            setData({ headers, rows: [], error: err });
            resolve({ headers, rows: [], error: err });
            return;
          }

          setData({ headers, rows, error: null });
          resolve({ headers, rows, error: null });
        },
        error: (error) => {
          setIsParsing(false);
          const errMsg = error.message || "Failed to parse CSV file";
          setData({ headers: [], rows: [], error: errMsg });
          resolve({ headers: [], rows: [], error: errMsg });
        },
      });
    });
  }, []);

  const resetParser = useCallback(() => {
    setData({ headers: [], rows: [], error: null });
    setIsParsing(false);
  }, []);

  return {
    ...data,
    isParsing,
    parseCsv,
    resetParser,
  };
}
