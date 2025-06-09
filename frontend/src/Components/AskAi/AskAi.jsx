import React, { useState, useEffect, useRef } from "react";
import "./AskAi.css";
import ReactMarkdown from "react-markdown";

function AskAi() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! How can I assist you with your farming needs today?",
    },
  ]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Placeholder for AI response
    const aiPlaceholder = { sender: "ai", text: "" };
    setMessages((prev) => [...prev, aiPlaceholder]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/aiAnswer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input }),
        }
      );

      if (!res.ok) throw new Error("AI request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { sender: "ai", text: aiText };
          return updated;
        });
      }
    } catch (error) {
      console.error("Error during AI conversation:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "ai",
          text: "Oops! Something went wrong.",
        };
        return updated;
      });
    }
  };

  return (
    <div className="ask-ai-container">
      {/* Header Section */}
      <div className="ask-ai-header">
        <div className="ask-ai-header-content">
          <h2>Rakshak AI</h2>
          <p>
            Get instant answers to your farming questions with our AI assistant.
            Ask anything from crop management to pest control.
          </p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <div className="bot-profile">
            <img
              src="/assets/img/rakshak-ai/rakshak-ai-profile.jpg"
              alt="Agro Assistant"
            />
          </div>
          <h3>Rakshak AI</h3>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              {msg.sender === "ai" && (
                <div className="bot-avatar">
                  <img
                    src="/assets/img/rakshak-ai/rakshak-ai-profile.jpg"
                    alt="Bot"
                  />
                </div>
              )}
              <div className="message-content">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <div className="user-profile">
            <img
              src="https://th.bing.com/th/id/OIP.9QoXfqFLKt7SVlVT85ao0wHaE7?r=0&w=2048&h=1365&rs=1&pid=ImgDetMain"
              alt="User"
            />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default AskAi;
