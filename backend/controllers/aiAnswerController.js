async function getAiAnswer(req, res) {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question parameter is required" });
  }
  try {
    // Simulate AI processing (replace with actual AI logic)
    const answer = `AI response to: ${question}`;

    // Return the AI-generated answer
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error generating AI answer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export { getAiAnswer };
