import express from "express";
import { sendData } from "../controllers/fileHandler";
const router = express.Router();

router.get("/", sendData);

export default router;
