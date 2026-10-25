// サービス層 (lib/services) の戻り値。HTTP のステータスと本文だけを持つので、
// Next.js や DB がなくてもテストできる。ルート側で NextResponse.json に変換する。
export type Result<T = unknown> = { status: number; body: T };

export const ok = <T>(body: T, status = 200): Result<T> => ({ status, body });

export const fail = (status: number, error: string): Result<{ error: string }> => ({
  status,
  body: { error },
});

/** ログイン中のユーザー (サービス層が必要とする最小限の項目) */
export type SessionUser = { id: string; coupleId: string | null };
