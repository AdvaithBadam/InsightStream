import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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
    setResults(dummyResults);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>InsightStream 🚀</h1>

      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {results.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <ul>
            {item.summary.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}