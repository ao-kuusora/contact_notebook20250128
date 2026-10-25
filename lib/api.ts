// ブラウザ側から API を呼ぶための共通ヘルパー。
// ネットワーク断・JSON でない応答・HTTP エラーをすべて { ok: false, error } にそろえ、
// 画面側で「失敗したらエラーを出す / 入力を残す」を書きやすくする。

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

const NETWORK_ERROR = "通信できませんでした。電波の良い場所でもう一度お試しください";
const GENERIC_ERROR = "うまくいきませんでした。もう一度お試しください";

export async function apiFetch<T = any>(
  url: string,
  init: RequestInit = {}
): Promise<ApiResult<T>> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      credentials: "include",
      ...init,
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {
      // 本文が JSON でない (Vercel のエラーページ等)
    }

    if (!res.ok) {
      const message =
        data && typeof data.error === "string" ? data.error : GENERIC_ERROR;
      return { ok: false, error: message, status: res.status };
    }

    return { ok: true, data: data as T };
  } catch {
    return { ok: false, error: NETWORK_ERROR, status: 0 };
  }
}

export function sendJson<T = any>(
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
