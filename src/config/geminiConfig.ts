import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./envConfig";
const GEMINI_API_KEY = config.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export { model };
