"""
InsightStream Backend — FastAPI Application
=============================================
Self-Evolving Research AI API

Endpoints:
  POST /search    — Takes a query, returns research results (mock data for now)
  POST /feedback  — Takes a result ID and vote (+1 or -1), updates preference vector
  GET  /stats     — Returns the current Evolution Level of the system

Owner: Teammate S (Backend Data & API Module)
Integration: Teammate A (Frontend) connects via axios from React dashboard
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uuid

# ─── App Setup ───

app = FastAPI(
    title="InsightStream API",
    description="Self-Evolving Research AI — Backend API",
    version="0.1.0",
)

# ─── CORS — Allow React frontend (Vite dev server) to connect ───

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── In-Memory State (will be replaced by ChromaDB) ───

evolution_state = {
    "total_queries": 0,
    "total_votes": 0,
    "evolution_level": 1,
    "preference_vector": {
        "academic_papers": 50,
        "tech_blogs": 50,
        "stack_overflow": 50,
        "github_repos": 50,
        "documentation": 50,
    },
}

# ─── Mock Research Results ───

MOCK_RESULTS = [
    {
        "id": "res_001",
        "title": "Attention Is All You Need — Revisited for 2026",
        "source": "arxiv.org",
        "source_type": "Academic",
        "summary": "A comprehensive re-evaluation of the original Transformer paper in light of recent architectural innovations including sparse attention, mixture-of-experts, and state-space models.",
        "credibility": 94,
        "votes": 12,
    },
    {
        "id": "res_002",
        "title": "Building Production-Ready Multi-Agent Systems",
        "source": "engineering.google",
        "source_type": "Tech Blog",
        "summary": "Practical patterns for orchestrating multiple AI agents in production environments, covering fault tolerance, context sharing, and preference-based routing.",
        "credibility": 88,
        "votes": 8,
    },
    {
        "id": "res_003",
        "title": "Vector Database Benchmarks: ChromaDB vs Pinecone vs Weaviate",
        "source": "github.com/benchmarks",
        "source_type": "GitHub",
        "summary": "Comprehensive benchmarking suite comparing vector databases on insertion speed, query latency, recall accuracy, and memory usage across different dataset sizes.",
        "credibility": 79,
        "votes": 5,
    },
    {
        "id": "res_004",
        "title": "RLHF Training: From Theory to Production Deployment",
        "source": "huggingface.co/blog",
        "source_type": "Tech Blog",
        "summary": "Step-by-step guide to implementing Reinforcement Learning from Human Feedback, covering reward model training, PPO optimization, and evaluation metrics.",
        "credibility": 91,
        "votes": 15,
    },
    {
        "id": "res_005",
        "title": "LangChain Agents: A Deep Dive into Tool-Using LLMs",
        "source": "docs.langchain.com",
        "source_type": "Documentation",
        "summary": "Official documentation covering agent architectures, tool integration patterns, memory management, and multi-step reasoning chains in LangChain.",
        "credibility": 85,
        "votes": 10,
    },
]

# ─── Request / Response Models ───


class SearchRequest(BaseModel):
    query: str


class SearchResponse(BaseModel):
    query: str
    results: list[dict]
    agents_used: list[str]
    evolution_level: int


class FeedbackRequest(BaseModel):
    result_id: str
    vote: int  # +1 for upvote, -1 for downvote


class FeedbackResponse(BaseModel):
    status: str
    result_id: str
    new_vote_count: int
    evolution_level: int
    preference_vector: dict


class StatsResponse(BaseModel):
    total_queries: int
    total_votes: int
    evolution_level: int
    preference_vector: dict
    agents: list[dict]


# ─── Endpoints ───


@app.post("/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    """
    POST /search
    Takes a user query and returns research results.
    Currently returns mock data — Teammate S will wire this to:
      1. DuckDuckGo/Tavily web search
      2. BeautifulSoup/trafilatura content scraper
      3. Gemini AI summarizer
    """
    evolution_state["total_queries"] += 1

    return SearchResponse(
        query=request.query,
        results=MOCK_RESULTS,
        agents_used=["Searcher", "Synthesizer", "Ranker"],
        evolution_level=evolution_state["evolution_level"],
    )


@app.post("/feedback", response_model=FeedbackResponse)
async def feedback(request: FeedbackRequest):
    """
    POST /feedback
    Takes a result ID and a vote (+1 upvote, -1 downvote).
    Updates the in-memory preference vector based on the result's source type.
    This is the core RLHF evolution mechanism.

    TODO (Teammate S): Persist to ChromaDB and update the real preference vector.
    """
    evolution_state["total_votes"] += 1

    # Find the result to determine its source type
    result = next((r for r in MOCK_RESULTS if r["id"] == request.result_id), None)

    new_vote_count = 0
    if result:
        result["votes"] += request.vote
        new_vote_count = result["votes"]

        # Update preference vector based on source type
        source_map = {
            "Academic": "academic_papers",
            "Tech Blog": "tech_blogs",
            "Stack Overflow": "stack_overflow",
            "GitHub": "github_repos",
            "Documentation": "documentation",
        }
        pref_key = source_map.get(result["source_type"])
        if pref_key:
            # Nudge the preference: +5 for upvote, -5 for downvote, clamped 0-100
            current = evolution_state["preference_vector"][pref_key]
            evolution_state["preference_vector"][pref_key] = max(
                0, min(100, current + (request.vote * 5))
            )

    # Evolve: every 5 votes bumps the evolution level
    evolution_state["evolution_level"] = 1 + (evolution_state["total_votes"] // 5)

    return FeedbackResponse(
        status="ok",
        result_id=request.result_id,
        new_vote_count=new_vote_count,
        evolution_level=evolution_state["evolution_level"],
        preference_vector=evolution_state["preference_vector"],
    )


@app.get("/stats", response_model=StatsResponse)
async def stats():
    """
    GET /stats
    Returns the current Evolution Level and system statistics.
    Used by the Dashboard sidebar's "Evolution Stats" panel.
    """
    return StatsResponse(
        total_queries=evolution_state["total_queries"],
        total_votes=evolution_state["total_votes"],
        evolution_level=evolution_state["evolution_level"],
        preference_vector=evolution_state["preference_vector"],
        agents=[
            {"name": "Searcher", "status": "ready", "type": "Web Search"},
            {"name": "Scraper", "status": "ready", "type": "Content Extraction"},
            {"name": "Synthesizer", "status": "ready", "type": "AI Summarization"},
            {"name": "Ranker", "status": "ready", "type": "Credibility Scoring"},
            {"name": "Evolver", "status": "ready", "type": "Preference Update"},
        ],
    )


# ─── Health Check ───


@app.get("/")
async def root():
    return {
        "name": "InsightStream API",
        "version": "0.1.0",
        "status": "online",
        "evolution_level": evolution_state["evolution_level"],
    }
