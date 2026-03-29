# Excel RAG with Groq & FAISS 🚀

A premium Retrieval-Augmented Generation (RAG) application that allows you to upload Excel spreadsheets and ask questions about your data using the ultra-fast Groq API and FAISS vector database.

## ✨ Features
- **High-Speed Inference**: Powered by **Groq Llama 3.3-70b** for near-instant responses.
- **Local Vector Search**: Uses **FAISS** for efficient similarity search across your data.
- **Excel Ingestion**: Converts complex spreadsheets into searchable context chunks.
- **Glassmorphic UI**: A modern, vibrant React interface designed for premium user experience.
- **Data Privacy**: Local embedding generation ensures minimal data exposure.

## 🛠️ Tech Stack
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/), [LangChain](https://www.langchain.com/), [FAISS](https://github.com/facebookresearch/faiss), [Pandas](https://pandas.pydata.org/)
- **Embeddings**: `all-MiniLM-L6-v2` (Sentence-Transformers)
- **LLM**: [Groq](https://groq.com/) (Llama 3.3-70b-versatile)
- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ 
- **Python**: v3.10+
- **Groq API Key**: Get it from [Groq Console](https://console.groq.com/)

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file and add your Groq key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Start the server:
   ```bash
   python main.py
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

---

## 📖 How to Use
1. **Upload**: Drop your `.xlsx` or `.xls` file into the upload zone in the sidebar.
2. **Indexing**: The app will process your data and create a local vector index (FAISS).
3. **Ask**: Once the status shows "Active", ask questions like:
   - *"What is the total revenue listed in the 'Sales' sheet?"*
   - *"Who are the top 5 performers based on the data?"*
   - *"Summarize the trends for Q1."*

---

## 🏗️ Architecture
1. **Ingestion**: `Pandas` reads the Excel file. Each row is converted into a structured text document.
2. **Indexing**: `SentenceTransformers` generates 384-dimensional embeddings for each row.
3. **Retrieval**: When a query is made, `FAISS` calculates cosine similarity to find the most relevant context.
4. **Generation**: Relevant chunks are formatted into a prompt and sent to **Groq** for the final answer.

## 📄 License
MIT License. Feel free to use and modify for your own projects!
