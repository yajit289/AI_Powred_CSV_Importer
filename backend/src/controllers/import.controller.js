import { importLeads } from "../services/import.service.js";

export const importCSV = async (req, res) => {
  try {
    console.log("Processing uploaded file:", req.file ? req.file.originalname : "No file info");
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "No CSV file uploaded",
      });
    }

    const result = await importLeads(req.file.buffer);
    res.json(result);
  } catch (error) {
    console.error("Import CSV Controller Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process CSV file",
    });
  }
};