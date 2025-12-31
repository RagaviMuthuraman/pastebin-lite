# Pastebin-Lite

Pastebin-Lite is a simple Pastebin-style web application where users can create text pastes and share a link to view them.
It supports optional time-based expiry (TTL) and view-count limits.

This project was built as part of a take-home assignment.

---

## Live Demo

Deployed URL:  
https://pastebin-lite-blush.vercel.app

## API Endpoints

### Health Check
**GET** `/api/healthz`

Response:
```json
{ "ok": true }
```

Create Paste

POST /api/pastes

Request body:

{
  "content": "Hello world",
  "ttl_seconds": 60,
  "max_views": 5
}


Response:

{

Fetch Paste (API)

GET /api/pastes/:id

Response:

{
  "content": "Hello world",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}


Unavailable pastes return HTTP 404.

View Paste (HTML)

GET /p/:id

Returns an HTML page displaying the paste content.
Returns HTTP 404 if the paste is expired, missing, or view limit exceeded.

View Paste (HTML)

GET /p/:id

Returns an HTML page displaying the paste content.
Returns HTTP 404 if the paste is expired, missing, or view limit exceeded.

Persistence Layer

Uses Upstash Redis for persistence.

Stores paste content, expiry timestamp, and view count.

Ensures data survives across serverless requests.

Suitable for serverless deployments.

Running the Project Locally
Prerequisites

Node.js 18+

npm

Upstash Redis account

Steps
Clone the repository:

git clone https://github.com/RagaviMuthuraman/pastebin-lite
cd pastebin-lite


Install dependencies:

npm install


Create a .env.local file in the project root:

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token


Start the development server:

npm run dev


Open in browser:

http://localhost:3000
Deployment
The application is deployed on Vercel.
Environment variables are configured in the Vercel dashboard.

Notes
No in-memory storage is used in production.

Supports deterministic expiry testing using TEST_MODE=1 and x-test-now-ms header.

Designed to pass automated evaluation tests.

yaml
Copy code

---

### ✅ FINAL STEP (DO THIS ONCE)

```bash
git add README.md
git commit -m "Finalize README with all API endpoints"
git push
  "id": "abc123",
  "url": "https://your-app.vercel.app/p/abc123"
}
