# Recipa AI

A Retrieval-Augmented Generation (RAG) cooking assistant built with **LangChain**, **ChromaDB**, **FastAPI**, and **Next.js**.  
Ask grounded questions about recipes using a real cookbook PDF — with short-term chat memory for more natural interactions.

## 📌 Overview

**Recipa AI** is a full-stack RAG project that answers cooking questions strictly using content from a cookbook PDF.  
It is built as a **portfolio-quality**, clean, modern example of:

- Retrieval-Augmented Generation (LangChain + Chroma)
- FastAPI backend with a `/ask` endpoint
- Next.js 14 frontend with Tailwind CSS
- Markdown-formatted AI responses
- Short-term chat memory (last 3 Q&A pairs)
- PDF ingestion → vectorstore → retrieval → LLM answer

## 🧠 Architecture

```
PDF → Text Splitter → Embeddings → ChromaDB (persisted)
                           ↓
                FastAPI `/ask` endpoint
                           ↓
       LangChain Prompt (with last 3 history items)
                           ↓
                     ChatOpenAI
                           ↓
                Markdown Answer → Frontend UI
```

## ✨ Features

### 🔎 Retrieval-Augmented Generation

- Uses **LangChain** and **ChromaDB** to return grounded answers
- Never hallucinates beyond the cookbook context

### ⚡ FastAPI Backend

- `/ask` endpoint with:
  - question
  - k (retrieval count)
  - history (last 3 Q&A pairs)

### 💬 Short-Term Memory

The AI can resolve references like _“the first one”_ using the last **3** conversation turns.  
(Frontend memory = last 5, backend memory = last 3.)

### 🖥️ Modern Next.js Frontend

- One-page UI (hero → how-it-works → chat → team)
- Tailwind CSS
- Markdown rendering
- Clean and minimal cooking-themed styling

### 🧩 Deployment

- Frontend: **Vercel**
- Backend: **Render**

## 📥 Project Structure

```
recipa-rag-assistant/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   └── rag/
│   │       ├── ingest.py
│   │       ├── retrieval.py
│   │       └── llm.py
│   ├── data/
│   │   ├── source/
│   │   └── processed/
│   ├── vectorstore/
│   ├── scripts/run_ingest.py
│   └── requirements.txt
│
└── frontend/
    ├── app/page.tsx
    ├── public/
    ├── components/
    └── package.json
```

## 🚀 Getting Started

### 1️⃣ Clone the Project

```bash
git clone https://github.com/WalidAlsafadi/recipa-rag-assistant
cd recipa-rag-assistant
```

## 🐍 Backend Setup (FastAPI)

### 2️⃣ Create virtual environment

```bash
cd backend
python -m venv .venv
. .venv/bin/activate   # Windows: .venv\Scripts\activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Add environment variables

Create `backend/.env`:

```
OPENAI_API_KEY=your-key-here
```

### 5️⃣ Ingest the cookbook PDF

```bash
python -m scripts.run_ingest
```

This creates `vectorstore/` with persisted embeddings.

### 6️⃣ Start backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:  
**http://localhost:8000**

## 🌐 Frontend Setup (Next.js 14)

### 1️⃣ Install Node dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Add frontend environment variable

Create `frontend/.env`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3️⃣ Run frontend

```bash
npm run dev
```

Frontend runs at:  
**http://localhost:3000**

## 🧑‍💻 API (Minimal)

### **POST /ask**

Request:

```json
{
  "question": "How do I make the chocolate mug cake?",
  "k": 5,
  "history": [
    { "question": "Give me two dessert options", "answer": "1) ... 2) ..." }
  ]
}
```

Response:

```json
{
  "answer": "## Chocolate Mug Cake\n\n1. ..."
}
```

## 👥 Team

- **Walid Alsafadi**
- **Fares Alnamla**
- **Ahmed Alyazuri**

## 📄 License

This project is licensed under the **Apache License 2.0**, which requires attribution when used or modified.

See the full license below.

## 📦 Future Improvements

- Add full chat memory
- Support multiple PDFs
- Add user authentication
- Add caching for repeated queries

Give us a ⭐ on GitHub if you like this project!
