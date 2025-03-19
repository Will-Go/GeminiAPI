import express from "express";
import config from "./config/envConfig";
import healthRoutes from "./routes/healthRoutes";
import geminiRoutes from "./routes/geminiRoutes";
const PORT = config.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});
app.use("/api/health", healthRoutes);
app.use("/api/gemini", geminiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
