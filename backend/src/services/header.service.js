export const analyzeHeaders = (headers = []) => {
  // Clean the headers
  const cleanedHeaders = headers
    .map((header) => header?.trim())
    .filter(Boolean);

  return {
    totalHeaders: cleanedHeaders.length,
    headers: cleanedHeaders,
  };
};