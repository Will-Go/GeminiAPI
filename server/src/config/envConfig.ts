import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: number;
  GEMINI_API_KEY: string;
}

const config: EnvConfig = {
  PORT: parseInt(process.env.PORT || "8000", 10),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "api_key",
};
export default config;
