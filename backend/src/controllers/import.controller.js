import { parseCSV } from "../services/csv.service.js";
import { importLeads } from "../services/import.service.js";

export const importCSV = async (req, res) => {
  console.log(req.file);
  const result = await importLeads(req.file.buffer)

  res.json({
    success: true,
    message: "CSV received",
  });
};