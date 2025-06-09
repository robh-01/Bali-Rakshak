import React, { useState } from "react";
import "./AskAi.css";

function AskAi() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello, How can I assist you with your farming needs today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add the user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Clear the input field
    const userInput = input;
    setInput("");

    // Add a placeholder for the AI response that will be updated gradually
    setMessages((prev) => [...prev, { sender: "ai", text: "" }]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/aiAnswer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userInput }),
        }
      );

      if (!res.ok) {
        throw new Error("AI request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      const updateAiMessage = (chunk) => {
        aiText += chunk;
        setMessages((prevMessages) => {
          // Update the last message (placeholder) with the new AI text
          const updated = [...prevMessages];
          updated[updated.length - 1] = { sender: "ai", text: aiText };
          return updated;
        });
      };

      const readStream = () => {
        reader.read().then(({ done, value }) => {
          if (done) return;
          const chunk = decoder.decode(value, { stream: true });
          updateAiMessage(chunk);
          readStream();
        });
      };

      readStream();
    } catch (error) {
      console.error("Error during AI conversation:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Agro AI Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about farming..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default AskAi;
