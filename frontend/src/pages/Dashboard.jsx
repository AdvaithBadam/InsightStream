import { useState } from 'react';
import {
  Clock,
  BarChart3,
  Sparkles,
  Brain,
  TrendingUp,
  ChevronRight,
  Globe,
  FileText,
  BookOpen,
  Activity,
  Layers,
} from 'lucide-react';

// Components owned by Teammate L
import SearchBar from '../components/SearchBar';
import ResultsPanel from '../components/ResultsPanel';

// ─── Mock Data (will be replaced by API calls to Teammate S's backend) ───

const mockHistory = [
  { id: 1, query: 'Transformer architecture advances 2026', time: '2 min ago', results: 12 },
  { id: 2, query: 'RLHF vs DPO training methods', time: '1 hour ago', results: 8 },
  { id: 3, query: 'ChromaDB vector optimization', time: '3 hours ago', results: 15 },
  { id: 4, query: 'Multi-agent orchestration patterns', time: 'Yesterday', results: 6 },
];

const mockPreferences = [
  { label: 'Academic Papers', value: 87, color: '#8b5cf6' },
  { label: 'Tech Blogs', value: 62, color: '#6366f1' },
  { label: 'Stack Overflow', value: 45, color: '#a78bfa' },
  { label: 'GitHub Repos', value: 73, color: '#7c3aed' },
  { label: 'Documentation', value: 91, color: '#c084fc' },
];

const mockResults = [
  {
    id: 1,
    title: 'Attention Is All You Need — Revisited for 2026',
    source: 'arxiv.org',
    sourceType: 'Academic',
    summary:
      'A comprehensive re-evaluation of the original Transformer paper in light of recent architectural innovations including sparse attention, mixture-of-experts, and state-space models.',
    credibility: 94,
    votes: 12,
  },
  {
    id: 2,
    title: 'Building Production-Ready Multi-Agent Systems',
    source: 'engineering.google',
    sourceType: 'Tech Blog',
    summary:
      'Practical patterns for orchestrating multiple AI agents in production environments, covering fault tolerance, context sharing, and preference-based routing.',
    credibility: 88,
    votes: 8,
  },
  {
    id: 3,
    title: 'Vector Database Benchmarks: ChromaDB vs Pinecone vs Weaviate',
    source: 'github.com/benchmarks',
    sourceType: 'GitHub',
    summary:
      'Comprehensive benchmarking suite comparing vector databases on insertion speed, query latency, recall accuracy, and memory usage across different dataset sizes.',
    credibility: 79,
    votes: 5,
  },
];

// ─── Dashboard Page — Owned by Teammate A (You) ───

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('history');
  const [resultVotes, setResultVotes] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setResults([]);

    // Simulate multi-agent search pipeline
    // TODO: Replace with real API call → POST /api/search (Teammate S)
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const handleVote = (resultId, direction) => {
    setResultVotes((prev) => ({
      ...prev,
      [resultId]: prev[resultId] === direction ? null : direction,
    }));
    // TODO: Send feedback to backend → POST /api/feedback (Teammate S)
  };

  return (
    <div className="flex h-screen bg-[#0a0b10] text-slate-300 overflow-hidden">
      {/* ───────── Sidebar — Owned by Teammate A ───────── */}
      <aside className="w-72 shrink-0 border-r border-white/[0.06] bg-[#0d0e14] flex flex-col">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white tracking-tight leading-none">
                InsightStream
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">Self-Evolving Research AI</p>
            </div>
          </div>
        </div>

        {/* Sidebar Tabs */}
        <div className="flex border-b border-white/[0.06]">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Search History
          </button>
          <button
            onClick={() => setActiveTab('evolution')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'evolution'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Evolution Stats
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === 'history' ? (
            <>
              {mockHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSearchQuery(item.query)}
                  className="w-full text-left p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-violet-500/20 transition-all group cursor-pointer"
                >
                  <p className="text-sm text-slate-300 group-hover:text-white truncate transition-colors">
                    {item.query}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-slate-600">{item.time}</span>
                    <span className="text-[11px] text-slate-600">
                      {item.results} results
                    </span>
                  </div>
                </button>
              ))}
              <div className="pt-2">
                <p className="text-[11px] text-slate-600 text-center">End of recent history</p>
              </div>
            </>
          ) : (
            <>
              {/* Evolution Stats Panel */}
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xs font-medium text-slate-400">Preference Vector</span>
                  </div>
                  {mockPreferences.map((pref) => (
                    <div key={pref.label} className="mb-3 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-[11px] text-slate-400">{pref.label}</span>
                        <span className="text-[11px] text-violet-400 font-mono">
                          {pref.value}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${pref.value}%`,
                            background: `linear-gradient(90deg, ${pref.color}, ${pref.color}88)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Evolution Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-lg font-semibold text-white font-mono">142</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Total Queries</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-lg font-semibold text-white font-mono">23</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Evolutions</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-lg font-semibold text-emerald-400 font-mono">+18%</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Accuracy Δ</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <p className="text-lg font-semibold text-white font-mono">5</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Active Agents</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-xs font-semibold text-white">
              A
            </div>
            <div>
              <p className="text-sm text-slate-300 font-medium">Teammate A</p>
              <p className="text-[11px] text-slate-600">System Lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ───────── Main Content — Orchestrated by Teammate A ───────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 px-8 py-4 border-b border-white/[0.06] bg-[#0d0e14]/80 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-400">
                System <span className="text-emerald-400 font-medium">Online</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span className="text-xs text-slate-400">
                <span className="text-white font-medium">5</span> Agents Ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-400">
                <span className="text-white font-medium">2.4k</span> Sources Indexed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] text-violet-300 font-medium">v0.1.0 — Hackathon Build</span>
          </div>
        </header>

        {/* Search & Results Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-12">
            {/* Hero / Search Section */}
            {!hasSearched && (
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs text-violet-300">Powered by Multi-Agent AI</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
                  What would you like to research?
                </h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  InsightStream deploys autonomous agents to search, synthesize, and rank results
                  — evolving with every interaction.
                </p>
              </div>
            )}

            {/* Search Bar — Component owned by Teammate L */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
              isSearching={isSearching}
            />

            {/* Agent Pipeline Status (visible during search) */}
            {isSearching && (
              <div className="mb-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-xs text-slate-500 mb-3 font-medium">Agent Pipeline Active</p>
                <div className="flex items-center gap-3">
                  {[
                    { name: 'Searcher', icon: Globe, delay: 0 },
                    { name: 'Synthesizer', icon: BookOpen, delay: 600 },
                    { name: 'Ranker', icon: BarChart3, delay: 1200 },
                  ].map((agent, i) => (
                    <div key={agent.name} className="flex items-center gap-2">
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20"
                        style={{
                          animation: `pulse 1.5s ease-in-out ${agent.delay}ms infinite`,
                        }}
                      >
                        <agent.icon className="w-3.5 h-3.5 text-violet-400" />
                        <span className="text-xs text-violet-300">{agent.name}</span>
                      </div>
                      {i < 2 && <ChevronRight className="w-4 h-4 text-slate-600" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Panel — Component owned by Teammate L */}
            <ResultsPanel
              results={results}
              resultVotes={resultVotes}
              onVote={handleVote}
            />

            {/* Empty state feature cards */}
            {!hasSearched && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { icon: FileText, label: 'Research Papers', desc: 'Indexed from arXiv, IEEE, ACM' },
                  { icon: Globe, label: 'Web Sources', desc: 'Blogs, docs, forums' },
                  { icon: Brain, label: 'AI Synthesis', desc: 'Multi-agent summarization' },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center"
                  >
                    <feature.icon className="w-6 h-6 text-violet-400/60 mx-auto mb-2" />
                    <p className="text-xs font-medium text-slate-300">{feature.label}</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
