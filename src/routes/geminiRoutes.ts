import express from "express";
import { say } from "../controllers/geminiController";

const router = express.Router();

router.post("/", say);

export default router;
