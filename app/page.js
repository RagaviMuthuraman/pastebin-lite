"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function createPaste() {
    setError(null);
    setResult(null);

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to create paste");
    } else {
      setResult(data);
      setContent("");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Create Paste</h1>

      <textarea
        rows={8}
        style={{ width: "100%" }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br /><br />

      <button onClick={createPaste}>Create Paste</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <pre style={{ marginTop: 20 }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
