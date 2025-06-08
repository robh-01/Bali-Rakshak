import multer from "multer";

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

import predictCropDisease from "../utils/predictCropDisease.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const prescriptionGet = [
  upload.single("crop-image"),
  async (req, res, next) => {
    // console.log("getting request on the prediction route");
    const imageBuffer = req.file?.buffer;
    const mimeType = req.file?.mimeType;

    const prediction = await predictCropDisease(imageBuffer);
    console.log(prediction);
    req.diseaseName = prediction;
    next();
  },
  async (req, res) => {
    const diseaseName = req.diseaseName || "healthy crop";

    // Set headers to enable streaming (chunked transfer)
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-05-20",
      contents: `Act like you just saw a photo of a crop and identified the disease as:
"""
${diseaseName}
"""
Write a helpful, clear, and natural response to a Nepali farmer, using the following structure:
1. Introduction: Briefly explain what this disease is, including its common effects on the crop. Add context relevant to farmers in Nepal (e.g., climate, typical farming practices).  
2. Causes: List the most likely reasons this disease occurs.
3. Solutions:
    - Organic solutions: Explain what can be done naturally, using methods or materials that are accessible to farmers in Nepal.
    - Chemical solutions: Suggest safe and effective treatments, including the names of products or compounds where possible. Include warnings or usage instructions if needed.

Additional Guidelines:
- If there is no disease name above, that means the crop is healthy so don't regard the above structure and make a short about 30 words response about whatever you think is appropriate.
- Start response with phrases like "Looking from the photo..", "Looks like.."
- Give Response in English only.
- Avoid mixing English with Nepali in unnatural or awkward ways.
- Use clear and farmer-friendly language (but not overly simplified).
- Don't repeat the disease name unnecessarily.`,
    });
    // res.json({
    //   answer: response,
    // });
    // res.send(response.candidates[0].content.parts[0].text);
    for await (const chunk of response) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  },
];
