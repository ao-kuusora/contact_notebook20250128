// 簡易レート制限 (メモリ上)。
// ローカル運用・単一プロセス向け。サーバーレス環境で複数インスタンスに
// 分散する場合は Redis / Upstash などに置き換えてください。

type Hit = { count: number; resetAt: number };

const hits = new Map<string, Hit>();

/** 許可なら true、上限超過なら false */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.resetAt < now) hits.delete(k);
    }
  }

  const hit = hits.get(key);
  if (!hit || hit.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  hit.count += 1;
  return hit.count <= limit;
}

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
}
