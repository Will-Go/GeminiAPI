import express from "express";
import { say, moderator } from "../controllers/geminiController";

const router = express.Router();

router.post("/", say);
router.post("/moderator", moderator);

export default router;
