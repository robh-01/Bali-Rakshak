import React, { useState } from 'react';
import './AskAi.css';

function AskAi() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const res = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const aiMessage = { sender: 'ai', text: data.reply };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="chat-container">
      <h2>Agro AI Assistant</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.sender}`}>{msg.text}</div>
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
