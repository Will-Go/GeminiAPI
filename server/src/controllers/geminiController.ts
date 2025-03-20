import { Request, Response } from "express";
import { model, contentModerator } from "../config/geminiConfig";

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

export const moderator = async (req: Request, res: Response): Promise<void> => {
  // Access the request body
  const requestBody = req.body;

  // Example response using the body
  if (!requestBody || Object.keys(requestBody).length === 0) {
    res.status(400).json({ error: "No body provided" });
    return;
  }

  const { text } = requestBody;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "No text provided" });
    return;
  }

  try {
    const result =
      (await contentModerator.generateContent(text)).response?.candidates?.[0]
        .content.parts[0].text ?? null;

    if (!result) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    res.status(200).json({ result: result.trim() === "FALSE" });
    // The response is a boolean, where `true` means the content is inappropriate
    // and `false` means the content is appropriate
    // isSafe:result.trim() === "FALSE"
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
