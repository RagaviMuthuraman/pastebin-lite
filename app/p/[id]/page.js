export default async function PastePage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <h2>Paste not found or expired</h2>;
  }

  const data = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>Paste</h1>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 15,
          whiteSpace: "pre-wrap",
        }}
      >
        {data.content}
      </pre>
    </main>
  );
}
