import { fail, ok, Result, SessionUser } from "./result";

export const MAX_READ_IDS = 200;

/** 既読管理に必要な DB 操作 (実装は lib/repo/prismaRepo.ts) */
export interface ReadRepo {
  /**
   * 自分のカップルの「相手が書いた」投稿のうち、ids に含まれるものを既読にする。
   * 自分の投稿や他カップルの投稿は無視する。既読にした件数を返す。
   */
  markEntriesRead(userId: string, coupleId: string, ids: string[]): Promise<number>;
}

/**
 * 既読にする。画面に表示した投稿の id をまとめて受け取る。
 *   { entryIds: string[] }  … 一覧画面 (表示した未読分)
 *   { entryId: string }     … 詳細画面 (旧形式も受け付ける)
 */
export async function markRead(
  repo: ReadRepo,
  user: SessionUser | null,
  body: unknown
): Promise<Result> {
  if (!user) return fail(401, "ログインしてください");
  if (!user.coupleId) return fail(403, "連絡帳に参加していません");

  const raw = (body ?? {}) as { entryIds?: unknown; entryId?: unknown };
  const candidates: unknown[] = Array.isArray(raw.entryIds)
    ? raw.entryIds
    : raw.entryId !== undefined
    ? [raw.entryId]
    : [];

  const ids = Array.from(
    new Set(
      candidates.filter(
        (v): v is string => typeof v === "string" && v.length > 0 && v.length <= 64
      )
    )
  );

  if (ids.length === 0 || ids.length > MAX_READ_IDS || candidates.length > MAX_READ_IDS) {
    return fail(400, "entryIds が不正です");
  }

  const marked = await repo.markEntriesRead(user.id, user.coupleId, ids);
  return ok({ ok: true, marked });
}
