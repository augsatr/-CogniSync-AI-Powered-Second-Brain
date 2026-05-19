<div align="center">
  <br/>
  <img src="screenshots/dashboard.svg" alt="CogniSync Dashboard" width="100%" style="max-width: 800px"/>
  <br/>
  <h1>CogniSync 🧠</h1>
  <h3>AI-Powered Second Brain — Transform Your Ideas Into Actionable Intelligence</h3>
  <br/>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js 14"/>
    <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/>
    <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python" alt="Python 3.11"/>
    <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/spaCy-3.7-09A3D5?style=for-the-badge&logo=spacy" alt="spaCy"/>
    <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL"/>
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker" alt="Docker"/>
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-api-endpoints">API</a> •
    <a href="#-roadmap">Roadmap</a> •
    <a href="#-license">License</a>
  </p>

  <br/>
</div>

---

## 📖 Overview

**CogniSync** is a modern, AI-powered knowledge management platform that acts as your second brain. It combines intelligent note-taking with entity extraction, automatic summarization, and a dynamic **personal knowledge graph** that reveals hidden connections between your ideas. Tasks are **AI-prioritized** based on deadlines, dependencies, and your work patterns. Uploaded documents are **automatically classified** and processed with OCR.

> **Problem:** Knowledge workers lose 30% of their ideas, struggle with scattered notes across tools, and lack contextual task prioritization.
>
> **Solution:** CogniSync uses advanced AI (NLP, Computer Vision, Recommendation Systems) to intelligently connect your notes, prioritize your tasks, and build a personal knowledge graph — so you never lose a great idea again.

---

## ✨ Features

### 📝 Smart Notes

<p align="center">
  <img src="screenshots/smart-notes.svg" alt="Smart Notes Screenshot" width="90%"/>
</p>

- **AI Entity Extraction** — Automatically identifies people, organizations, concepts, and technologies in your notes using spaCy NLP
- **Auto-Summarization** — Extractive summarization that pulls the most important sentences from any text
- **Sentiment Analysis** — Understand the emotional tone of your notes with polarity scoring
- **Smart Tagging** — Auto-generated tags based on content analysis with cross-note linking
- **Rich Text Editing** — Full-featured editor with real-time AI insights as you type

### 🔗 Knowledge Graph

<p align="center">
  <img src="screenshots/knowledge-graph.svg" alt="Knowledge Graph Screenshot" width="90%"/>
</p>

- **Interactive Visualization** — Force-directed graph with smooth pan, zoom, and hover interactions
- **Auto-Discovered Connections** — AI finds relationships between notes, entities, and concepts automatically
- **Cluster Detection** — Groups of related topics are visually identified and color-coded
- **Graph Analytics** — Node counts, connection density, and AI discovery metrics in real-time
- **Export & Share** — Download graph views as images or share interactive links

### ✅ Smart Tasks

- **AI Prioritization Engine** — Tasks scored by urgency, dependencies, historical patterns, and estimated effort
- **Quick Win Detection** — Small tasks (<15 min) get boosted priority so you can clear them fast
- **Deadline Awareness** — Tasks due within 24h or 72h automatically escalate in priority
- **Smart Filtering** — View by status, priority, or AI score with one-click toggles
- **Reasoning Log** — Every prioritization includes a human-readable explanation

### 📄 Document Intelligence

<p align="center">
  <img src="screenshots/documents.svg" alt="Document Intelligence Screenshot" width="90%"/>
</p>

- **OCR Text Extraction** — Powered by Tesseract + OpenCV for images and scanned PDFs
- **Auto-Classification** — Documents sorted into categories: reports, financial, legal, meeting notes, HR, and more
- **Batch Processing** — Upload multiple documents and process them in parallel
- **Status Tracking** — Real-time pipeline status with error handling and retry logic
- **Supported Formats** — PDF, DOCX, PNG, JPG, TIFF, XLSX

### 🤖 AI Assistant

- **Natural Language Chat** — Conversational interface that understands context
- **Context-Aware Recommendations** — Suggests related notes, tasks, and documents based on what you're viewing
- **Pattern Recognition** — Identifies recurring themes, frequent collaborators, and common topics
- **On-Demand Analysis** — Analyze any note, task, or document with a single click

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │ Dashboard│ │  Notes   │ │  Graph   │ │  Documents   │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          UI Library (Tailwind + Framer Motion)       │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                  API Gateway (FastAPI)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │  Auth    │ │  Notes   │ │  Tasks   │ │    Graph     │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                    AI Services Layer                         │
│  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐  │
│  │  NLP (spaCy)   │ │  Vision (OCR)  │ │Recommender   │  │
│  │  TextBlob      │ │  OpenCV        │ │Transformers  │  │
│  └────────────────┘ └────────────────┘ └──────────────┘  │
├─────────────────────────────────────────────────────────────┤
│            Data Layer                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │
│  │PostgreSQL│ │  Redis   │ │  Neo4j   │ │  File Store  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Next.js App Router** | Server components for SEO, client components for interactivity, API routes for serverless deployment |
| **FastAPI async** | Native async support for I/O-bound AI inference, automatic OpenAPI docs, pydantic validation |
| **SQLAlchemy 2.0 async** | Non-blocking database operations, migration support via Alembic |
| **spaCy + TextBlob** | Lightweight, production-proven NLP that runs locally (no API costs) |
| **Force-directed graph (SVG)** | No WebGL dependency, smooth 60fps interaction, scalable to thousands of nodes |
| **JWT + NextAuth.js** | Stateless auth with OAuth providers, session management out of the box |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 14 (App Router) | Server-side rendering, file-based routing, React Server Components |
| **UI Runtime** | React 18.3 | Component model, concurrent features, suspense |
| **Language** | TypeScript 5.4 | Type safety, better DX, self-documenting code |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS, dark theme, responsive design |
| **Animations** | Framer Motion 11 | Declarative animations, gesture handling, layout animations |
| **Charts** | Recharts 2.12 | Composable charting, responsive SVG, tooltips |
| **Icons** | Lucide React 0.350 | Consistent icon set, tree-shakeable, accessible |
| **Auth** | NextAuth.js 4.24 | OAuth, JWT, session management, credential providers |
| **Backend Framework** | FastAPI 0.115 | Async Python, automatic OpenAPI, pydantic validation |
| **ORM** | SQLAlchemy 2.0 | Async ORM, migration support, complex queries |
| **NLP** | spaCy 3.7, TextBlob | Entity extraction, summarization, sentiment analysis |
| **Transformers** | sentence-transformers | Text embeddings for similarity and recommendations |
| **Computer Vision** | OpenCV, Tesseract OCR | Image pre-processing, text extraction from documents |
| **Database** | PostgreSQL 16 | Relational data, JSON support, full-text search |
| **Cache** | Redis 7 | Session store, rate limiting, task queue |
| **Graph DB** | Neo4j 5 | Knowledge graph storage, graph traversal queries |
| **Infrastructure** | Docker, Docker Compose | Reproducible environments, multi-service orchestration |

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 18+ | Required for Next.js frontend |
| Python | 3.11+ | Required for FastAPI backend |
| PostgreSQL | 16 | Database (or use Docker) |
| Redis | 7 | Cache (or use Docker) |
| Docker | 24+ | Optional — for containerized setup |

### Option 1: Local Development

```bash
# 1. Clone the repository
git clone https://github.com/augsatr/-CogniSync-AI-Powered-Second-Brain.git
cd cognisync

# 2. Set up environment
cp .env.example .env
# Edit .env with your configuration (database URLs, secrets, etc.)

# 3. Install frontend dependencies
cd frontend
npm install

# 4. Install backend dependencies
cd ../backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# 5. Start backend (Terminal 1)
cd backend
uvicorn app.main:app --reload --port 8000

# 6. Start frontend (Terminal 2)
cd frontend
npm run dev
```

### Option 2: Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Access Points

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:8000 |
| **API Documentation** | http://localhost:8000/docs |
| **PostgreSQL** | localhost:5432 |
| **Redis** | localhost:6379 |
| **Neo4j Browser** | http://localhost:7474 |

---

## 📊 Project Structure

```
cognisync/
├── frontend/                          # Next.js 14 application
│   ├── app/                           # App Router pages
│   │   ├── dashboard/                 # Protected dashboard pages
│   │   │   ├── notes/                 # Smart Notes (AI-enhanced)
│   │   │   ├── graph/                 # Knowledge Graph visualization
│   │   │   ├── tasks/                 # AI-prioritized task list
│   │   │   └── documents/             # Document Intelligence hub
│   │   ├── login/                     # Authentication page
│   │   ├── api/auth/                  # NextAuth.js route handler
│   │   ├── layout.tsx                 # Root layout with providers
│   │   ├── page.tsx                   # Landing page
│   │   └── globals.css                # Tailwind + glassmorphism styles
│   ├── components/
│   │   ├── ui/                        # Reusable primitives
│   │   │   ├── button.tsx             # Variant-based button component
│   │   │   ├── card.tsx               # Glassmorphic card container
│   │   │   ├── glass-card.tsx         # Backdrop-blur enhanced card
│   │   │   └── input.tsx             # Themed input field
│   │   ├── dashboard/                 # Dashboard-specific components
│   │   │   ├── sidebar.tsx            # Navigation sidebar
│   │   │   ├── header.tsx             # Top bar with search & profile
│   │   │   ├── stats-card.tsx         # Metrics display with trends
│   │   │   ├── activity-feed.tsx      # Real-time activity stream
│   │   │   └── knowledge-graph.tsx    # SVG force-directed graph
│   │   └── landing/                   # Landing page sections
│   ├── lib/                           # Utilities
│   │   ├── auth.ts                    # NextAuth configuration
│   │   ├── api.ts                     # API client with typed methods
│   │   └── utils.ts                   # cn(), formatDate, debounce, etc.
│   ├── types/                         # TypeScript definitions
│   │   └── index.ts                   # All domain types
│   ├── providers/                     # Context providers
│   │   └── index.tsx                  # Session + toast providers
│   └── Dockerfile                     # Production container
├── backend/                           # FastAPI application
│   ├── app/
│   │   ├── main.py                    # App factory, CORS, routers, startup
│   │   ├── config.py                  # Pydantic settings with env loading
│   │   ├── database.py                # Async SQLAlchemy engine & session
│   │   ├── models/                    # SQLAlchemy ORM models
│   │   │   ├── user.py                # User with password hashing
│   │   │   ├── note.py                # Note with entity relationships
│   │   │   ├── task.py                # Task with priority enums
│   │   │   └── document.py            # Document with processing status
│   │   ├── schemas/                   # Pydantic V2 schemas
│   │   │   ├── user.py                # Auth request/response schemas
│   │   │   ├── note.py                # Note CRUD + analysis schemas
│   │   │   ├── task.py                # Task + prioritization schemas
│   │   │   └── document.py            # Document upload/status schemas
│   │   ├── routes/                    # API endpoint handlers
│   │   │   ├── auth.py                # Register, login, profile
│   │   │   ├── notes.py               # Note CRUD + AI analysis
│   │   │   ├── tasks.py               # Task CRUD + AI prioritization
│   │   │   ├── documents.py           # Upload, list, analyze
│   │   │   ├── graph.py               # Knowledge graph builder
│   │   │   └── ai.py                  # Chat + text analysis endpoints
│   │   ├── services/                  # Business logic layer
│   │   │   ├── auth_service.py        # JWT creation, password hashing
│   │   │   ├── note_service.py        # Note operations + AI integration
│   │   │   ├── task_service.py        # Task management + scoring
│   │   │   ├── document_service.py    # Document pipeline + OCR
│   │   │   └── graph_service.py       # Entity-to-node graph builder
│   │   └── ai/                        # AI service implementations
│   │       ├── nlp.py                 # Entity extraction, summarization, sentiment
│   │       ├── vision.py              # OCR, document classification, face detection
│   │       └── recommender.py         # Text similarity, tag suggestion, note recommendation
│   ├── tests/                         # Pytest test suite
│   ├── uploads/                       # Uploaded document storage
│   └── Dockerfile                     # Python container with Tesseract
├── docker-compose.yml                 # Multi-service orchestration
├── .env.example                       # Environment variable template
├── .gitignore
├── LICENSE                            # MIT License
└── README.md                          # This file
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Sign in with credentials |
| `GET` | `/api/auth/me` | Get current user profile |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notes` | List all notes (sorted by last updated) |
| `POST` | `/api/notes` | Create a new note |
| `GET` | `/api/notes/:id` | Get a specific note with entities |
| `POST` | `/api/notes/:id/analyze` | Run AI analysis (entity extraction, summary, sentiment) |
| `DELETE` | `/api/notes/:id` | Delete a note |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | List all tasks |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks/:id` | Get task details |
| `POST` | `/api/tasks/:id/prioritize` | Get AI priority score with reasoning |
| `PATCH` | `/api/tasks/:id/status` | Update task status (todo/in_progress/done) |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/documents` | List uploaded documents |
| `POST` | `/api/documents/upload` | Upload a document (PDF, image, etc.) |
| `GET` | `/api/documents/:id` | Get document details |
| `POST` | `/api/documents/:id/analyze` | Process document with OCR & classification |

### Knowledge Graph
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/graph` | Get complete graph data (nodes + edges) |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/analyze` | Analyze arbitrary text (entities, summary, sentiment) |
| `POST` | `/api/ai/chat` | Chat with the AI assistant |

---

## 🧪 Testing

```bash
# Run backend tests
cd cognisync/backend
pytest -v --cov=app --cov-report=term-missing

# Run frontend linting
cd cognisync/frontend
npm run lint

# TypeScript type checking
npx tsc --noEmit
```

---

## 🗺️ Roadmap

### v1.0 (Current)
- [x] Smart Notes with AI entity extraction & summarization
- [x] Interactive Knowledge Graph visualization
- [x] AI Task Prioritization engine
- [x] Document OCR & classification pipeline
- [x] AI Chat assistant
- [x] JWT + OAuth authentication
- [x] Docker Compose deployment

### v1.1 (Upcoming)
- [ ] Real-time collaborative editing
- [ ] Browser extension for web clipping
- [ ] Mobile-responsive PWA support
- [ ] Integrations (Slack, Notion, Google Drive)
- [ ] Dark/light theme toggle

### v1.2 (Planned)
- [ ] LLM fine-tuning on user's knowledge base
- [ ] Voice note recording & transcription
- [ ] Advanced graph analytics with Neo4j
- [ ] Team workspaces & shared graphs
- [ ] Public API with rate limiting

### v2.0 (Future)
- [ ] On-premise deployment option
- [ ] Custom AI model training
- [ ] Enterprise SSO (SAML, LDAP)
- [ ] Audit logging & compliance
- [ ] AI agent automation workflows

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** for your feature: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style (ESLint + Prettier for frontend, Black + isort for backend)
- Write tests for new features
- Update documentation as needed
- Keep PRs focused on a single change

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

```
MIT License

Copyright (c) 2024 CogniSync

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙌 Acknowledgments

- Built with [Next.js](https://nextjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [spaCy](https://spacy.io/)
- Graph visualization inspired by [D3.js](https://d3js.org/) force-directed layouts
- Design system powered by [Tailwind CSS](https://tailwindcss.com/)
- OCR pipeline built on [Tesseract](https://github.com/tesseract-ocr/tesseract) and [OpenCV](https://opencv.org/)
- Sentence embeddings via [sentence-transformers](https://www.sbert.net/)

---

<div align="center">
  <sub>Built with ❤️ using AI · © 2024 CogniSync</sub>
</div>
