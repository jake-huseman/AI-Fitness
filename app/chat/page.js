"use client"; // Mark this file as a client component

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

export default function ChatPage() {
  const { user, isLoading, error } = useUser();
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) {
    return <p>Please <a href="/api/auth/login">login</a> to use the chat.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { role: "user", content: message };
    setChatLog((prev) => [...prev, newMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botReply = { role: "bot", content: data.reply };

      setChatLog((prev) => [...prev, botReply]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Chat with AI</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chatLog.map((msg, index) => (
          <p
            key={index}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              color: msg.role === "user" ? "blue" : "green",
            }}
          >
            {msg.role === "user" ? "You" : "Bot"}: {msg.content}
          </p>
        ))}
        {loading && <p style={{ textAlign: "center" }}>Thinking...</p>}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          type="submit"
          style={{ marginLeft: "10px", padding: "8px", cursor: "pointer" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
