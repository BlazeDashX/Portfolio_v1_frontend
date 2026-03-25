const hits = new Map<string, { count: number; ts: number }>();

export function rateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfterMs: windowMs - (now - entry.ts) };
  }

  entry.count += 1;
  hits.set(ip, entry);
  return { allowed: true };
}