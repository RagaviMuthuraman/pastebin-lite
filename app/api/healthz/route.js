import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

export async function GET() {
  console.log("REDIS URL:", process.env.UPSTASH_REDIS_REST_URL);
  console.log("REDIS TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN ? "SET" : "MISSING");

  try {
    await redis.ping();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("REDIS ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "Redis not reachable yet" },
      { status: 500 }
    );
  }
}
