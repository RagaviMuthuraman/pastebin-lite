import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

export async function GET(request, context) {
  const { id } = await context.params;

  const key = `paste:${id}`;
  const raw = await redis.get(key);

  if (!raw) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

 const paste = typeof raw === "string" ? JSON.parse(raw) : raw;

  const now = Date.now();

  // TTL check
  if (paste.expires_at && now >= paste.expires_at) {
    await redis.del(key);
    return NextResponse.json(
      { error: "Paste expired" },
      { status: 404 }
    );
  }

  // View limit check
  if (paste.max_views !== null && paste.views >= paste.max_views) {
    return NextResponse.json(
      { error: "View limit exceeded" },
      { status: 404 }
    );
  }

  // Increment views
  paste.views += 1;
  await redis.set(key, JSON.stringify(paste));

  const remainingViews =
    paste.max_views !== null
      ? paste.max_views - paste.views
      : null;

  return NextResponse.json({
    content: paste.content,
    remaining_views: remainingViews,
    expires_at: paste.expires_at
      ? new Date(paste.expires_at).toISOString()
      : null,
  });
}
