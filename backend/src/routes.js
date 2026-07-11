import { Router } from "express";
import upload from "./middlewares/upload.middleware.js";
import { importCSV } from "./controllers/import.controller.js";


const router = Router()

router.post("/import",upload.single("file"),importCSV)

export default router