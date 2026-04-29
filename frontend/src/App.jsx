import { useState } from "react";
// Import Dashboard in case we want to wrap L's UI in your page structure later
import Dashboard from './pages/Dashboard';

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // L's Dummy Data - We will replace this with your /backend fetch soon!
  const dummyResults = [
    {
      title: "Deep Learning in Healthcare",
      summary: [
        "Improves disease detection",
        "Used in medical imaging",
        "Reduces diagnostic errors"
      ]
    },
    {
      title: "Transformer Models in NLP",
      summary: [
        "Used in GPT and BERT",
        "Understands language context",
        "Handles long text efficiently"
      ]
    }
  ];

  const handleSearch = () => {
    // This is where you will plug in your: fetch('http://localhost:8000/search')
    setResults(dummyResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ padding: 40 }}>
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">InsightStream 🚀</h1>
        <p className="text-gray-500">Self-Evolving Research System</p>
      </header>

      <section className="flex gap-4 mb-10">
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for engineering papers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </section>

      <main className="grid gap-6">
        {results.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {item.summary.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </div>
  );
}