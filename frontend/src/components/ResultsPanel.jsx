/**
 * ResultsPanel Component — Owned by Teammate L
 *
 * Props:
 *   results     (array)    — array of result objects from the search API
 *   resultVotes (object)   — { [resultId]: 'up' | 'down' | null }
 *   onVote      (function) — callback: onVote(resultId, direction)
 *
 * Renders the list of ResultCard components after a search completes.
 */

import ResultCard from './ResultCard';

function ResultsPanel({ results, resultVotes, onVote }) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-slate-400">
          <span className="text-white">{results.length}</span> results synthesized
        </h3>
        <span className="text-[11px] text-slate-600">
          Ranked by credibility + preference alignment
        </span>
      </div>

      {results.map((result) => (
        <ResultCard
          key={result.id}
          result={result}
          vote={resultVotes[result.id] || null}
          onVote={onVote}
        />
      ))}
    </div>
  );
}

export default ResultsPanel;
