import Papa from "papaparse";

export const parseCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    try {
      // Convert Buffer → String
      const csvString = buffer.toString("utf-8");

      Papa.parse(csvString, {
        header: true,
        skipEmptyLines: true,

        complete: (results) => {
          if (results.errors.length > 0) {
            return reject(results.errors);
          }

          resolve({
            records: results.data,
            headers: results.meta.fields || [],
          });
        },

        error: (error) => {
          reject(error);
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};