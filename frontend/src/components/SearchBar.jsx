/**
 * SearchBar Component — Owned by Teammate L
 *
 * Props:
 *   searchQuery    (string)   — current search input value
 *   setSearchQuery (function) — state setter for the input
 *   onSearch       (function) — form submit handler (receives event)
 *   isSearching    (boolean)  — whether a search is in progress
 */

import { Search, Zap, Loader2 } from 'lucide-react';

function SearchBar({ searchQuery, setSearchQuery, onSearch, isSearching }) {
  return (
    <form onSubmit={onSearch} className="relative group mb-8">
      {/* Animated gradient glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/50 via-indigo-600/50 to-purple-600/50 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500" />

      <div className="relative flex items-center bg-[#12131a] border border-white/[0.08] rounded-xl overflow-hidden group-focus-within:border-violet-500/30 transition-colors">
        <div className="pl-4 pr-2">
          <Search className="w-5 h-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
        </div>

        <input
          id="agentic-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ask anything... e.g., 'Latest advances in RLHF training'"
          className="flex-1 bg-transparent py-4 px-2 text-sm text-white placeholder-slate-600 outline-none"
        />

        <button
          id="search-submit-btn"
          type="submit"
          disabled={isSearching || !searchQuery.trim()}
          className="m-2 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/30 disabled:text-slate-500 text-white text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Search
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
