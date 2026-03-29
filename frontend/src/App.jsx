import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';

function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! Upload an Excel file to get started.", isAi: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileStatus, setFileStatus] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileStatus("Uploading...");
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload`, formData);
      setFileStatus(`Active: ${file.name}`);
      setMessages(prev => [...prev, { text: response.data.message, isAi: true }]);
    } catch (error) {
      console.error(error);
      setFileStatus("Upload failed");
      setMessages(prev => [...prev, { text: `Error: ${error.response?.data?.detail || "Upload failed"}`, isAi: true }]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { text: userMessage, isAi: false }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/query`, { query: userMessage });
      setMessages(prev => [...prev, { text: response.data.answer, isAi: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: `Error: ${error.response?.data?.detail || "Something went wrong"}`, isAi: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo">Antigravity RAG</div>
        
        <div className="upload-section">
          <h3>Data Source</h3>
          <label className="file-input-label">
            <input type="file" onChange={handleFileUpload} className="file-input" accept=".xlsx,.xls" />
            <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</span>
            <span>Upload Excel</span>
            <small style={{ color: 'var(--text-dim)', marginTop: '0.5rem' }}>.xlsx, .xls</small>
          </label>
          
          {fileStatus && (
            <div className="status-badge" style={{ marginTop: '1rem' }}>
              {fileStatus}
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Powered by Groq Llama 3 & FAISS</p>
        </div>
      </aside>

      <main className="chat-main">
        <div className="chat-history">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.isAi ? 'ai' : 'user'}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message ai" style={{ opacity: 0.7 }}>
              Thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <input 
            type="text" 
            placeholder="Ask about your data..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-btn" onClick={handleSendMessage} disabled={isLoading}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
