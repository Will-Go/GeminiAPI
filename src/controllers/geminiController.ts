import { Request, Response } from "express";
import { model } from "../config/geminiConfig";

export const say = async (req: Request, res: Response): Promise<void> => {
  // Access the request body
  const requestBody = req.body;

  // Example response using the body
  if (!requestBody || Object.keys(requestBody).length === 0) {
    res.status(400).json({ error: "No body provided" });
    return;
  }

  const { prompt } = requestBody;

  if (!prompt || typeof prompt !== "string") {
    res.status(400).json({ error: "No prompt provided" });
    return;
  }

  try {
    const result =
      (await model.generateContent(prompt)).response?.candidates?.[0].content
        .parts[0].text ?? null;

    if (!result) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
