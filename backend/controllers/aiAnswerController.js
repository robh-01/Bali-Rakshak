import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function getAiAnswer(req, res) {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question parameter is required" });
  }
  try {
    // Simulate AI processing (replace with actual AI logic)
    // const answer = `AI response to: ${question}`;
    // Set headers to enable streaming (chunked transfer)
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-05-20",
      contents: `Act like a local agriculture expert responding to a question from a Nepali farmer. Write a helpful, clear, and practical response in English using the following structure:
"""
farmer question: ${question}
"""

Write a helpful, clear, and natural response to a Nepali farmer, using the following structure:
1. Introduction: Briefly acknowledge the farmer’s concern which is "${question}". Provide general context relevant to Nepal’s climate, soil, and farming practices when helpful.  
2. Causes or Key factors: List the most important factors that influence success (e.g., soil quality, seed type, irrigation, weather).
3. Recommendations: :
    - Natural or Traditional Methods: Suggest proven practices that are accessible and low-cost. Use examples familiar to Nepali farmers.
    - Modern or Technical Methods: Recommend effective modern techniques, tools, or products (e.g., certified seeds, fertilizers, machinery). Include any precautions or guidelines needed for success.

Additional Guidelines:
- Do not refer to crop diseases unless specifically asked.
- Start responses with friendly and observational phrases like "It sounds like you're trying to..." or "To improve your potato production, here's what I recommend..."
- Keep the language farmer-friendly (but not overly simplified).
- Use only English, but make sure it is clear and accessible to someone who may not speak it fluently.
- - Avoid mixing English with Nepali in unnatural or awkward ways unless specifically asked by the farmer.`,
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

    // Return the AI-generated answer
    // return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error generating AI answer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getAiAnswer };
