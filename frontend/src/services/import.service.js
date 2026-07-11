import api from "@/lib/api";

/**
 * Uploads the original CSV File to the backend for AI parsing and CRM import.
 * @param {File} file - The original CSV File object.
 * @returns {Promise<Object>} - The backend enrichment and validation response.
 */
export const importCsvFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/import`, formData);
  return response.data;
};
