// ブラウザ側から API を呼ぶための共通ヘルパー。
// ネットワーク断・JSON でない応答・HTTP エラーをすべて { ok: false, error } にそろえ、
// 画面側で「失敗したらエラーを出す / 入力を残す」を書きやすくする。

// このプロジェクトは tsconfig の strict が false で、ok の true/false による
// 型の絞り込みが効かないため、判別共用体ではなく 1 つの型にしている。
// 失敗時は ok=false・error にメッセージが入り、data は使わない。
export type ApiResult<T> = {
  ok: boolean;
  status: number;
  error: string;
  data: T;
};

const NO_DATA = null as never;

const NETWORK_ERROR = "通信できませんでした。電波の良い場所でもう一度お試しください";
const GENERIC_ERROR = "うまくいきませんでした。もう一度お試しください";

export async function apiFetch<T = unknown>(
  url: string,
  init: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      credentials: "include",
      ...init,
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      // 本文が JSON でない (Vercel のエラーページ等)
    }

    if (!res.ok) {
      const apiError = (data as { error?: unknown } | null)?.error;
      const message = typeof apiError === "string" ? apiError : GENERIC_ERROR;
      return { ok: false, error: message, status: res.status, data: NO_DATA };
    }

    return { ok: true, status: res.status, error: "", data: data as T };
  } catch {
    return { ok: false, error: NETWORK_ERROR, status: 0, data: NO_DATA };
  }
}

export function sendJson<T = unknown>(
  url: string,
  body: unknown,
  method: "POST" | "PATCH" | "DELETE" = "POST"
) {
  return apiFetch<T>(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
