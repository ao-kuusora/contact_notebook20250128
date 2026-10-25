import { isEntryType } from "../validate";
import { fail, ok, Result, SessionUser } from "./result";

export const DEFAULT_LIST_LIMIT = 100;
export const MAX_LIST_LIMIT = 200;

/** DB から取り出した投稿 1 件 (閲覧者から見た情報つき) */
export type EntryRow = {
  id: string;
  type: string;
  content: string;
  dueDate: Date | null;
  done: boolean;
  userId: string;
  coupleId: string;
  createdAt: Date;
  authorName: string;
  /** 閲覧者が既読にしているか */
  isRead: boolean;
};

export type ListQuery = {
  coupleId: string;
  viewerId: string;
  type?: string;
  done?: boolean;
  /** createdAt の範囲 [start, end) */
  range?: { start: Date; end: Date };
  take: number;
};

export interface EntryRepo {
  list(query: ListQuery): Promise<EntryRow[]>;
  findById(id: string, viewerId: string): Promise<EntryRow | null>;
}

/** 画面に返す形 (isMine / authorName / 既読つき) */
export function toEntryDto(row: EntryRow, viewerId: string) {
  const isMine = row.userId === viewerId;
  return {
    id: row.id,
    type: row.type,
    content: row.content,
    dueDate: row.dueDate,
    done: row.done,
    userId: row.userId,
    createdAt: row.createdAt,
    isMine,
    // 自分の投稿は読む必要がないので常に既読扱い
    isRead: isMine || row.isRead,
    authorName: row.authorName,
    user: { displayName: row.authorName },
  };
}

const JST = "+09:00";

/**
 * "YYYY-MM-DD" を JST の 1 日分の範囲 [start, end) にする。
 * 形式が不正・存在しない日付なら null。
 */
export function parseJstDay(date: string | null | undefined) {
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const start = new Date(`${date}T00:00:00.000${JST}`);
  if (Number.isNaN(start.getTime())) return null;

  // 2026-02-31 のような日付は繰り上がるので、往復で一致するか確認する
  const back = new Date(start.getTime() + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  if (back !== date) return null;

  return { start, end: new Date(start.getTime() + 24 * 60 * 60 * 1000) };
}

/** "YYYY-MM" を JST の 1 か月分の範囲 [start, end) にする。 */
export function parseJstMonth(month: string | null | undefined) {
  if (!month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return null;

  const [y, m] = month.split("-").map(Number);
  const start = new Date(`${month}-01T00:00:00.000${JST}`);
  const nextY = m === 12 ? y + 1 : y;
  const nextM = m === 12 ? 1 : m + 1;
  const end = new Date(
    `${nextY}-${String(nextM).padStart(2, "0")}-01T00:00:00.000${JST}`
  );
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  return { start, end };
}

export type ListParams = {
  type?: string | null;
  date?: string | null;
  done?: string | null;
  limit?: string | null;
};

export async function listEntries(
  repo: EntryRepo,
  user: SessionUser | null,
  params: ListParams
): Promise<Result> {
  if (!user) return fail(401, "ログインしてください");
  if (!user.coupleId) return ok({ entries: [] });

  if (params.type && !isEntryType(params.type)) {
    return fail(400, "type が不正です");
  }

  let range: { start: Date; end: Date } | undefined;
  if (params.date) {
    const parsed = parseJstDay(params.date);
    if (!parsed) return fail(400, "日付の形式が正しくありません");
    range = parsed;
  }

  const limit = Number(params.limit);
  const take =
    Number.isInteger(limit) && limit > 0
      ? Math.min(limit, MAX_LIST_LIMIT)
      : DEFAULT_LIST_LIMIT;

  const rows = await repo.list({
    coupleId: user.coupleId,
    viewerId: user.id,
    type: params.type || undefined,
    done: params.done === "true" ? true : params.done === "false" ? false : undefined,
    range,
    take,
  });

  return ok({ entries: rows.map((r) => toEntryDto(r, user.id)) });
}

export async function getEntry(
  repo: EntryRepo,
  user: SessionUser | null,
  id: string
): Promise<Result> {
  if (!user) return fail(401, "ログインしてください");
  if (!user.coupleId) return fail(403, "連絡帳に参加していません");

  const row = await repo.findById(id, user.id);

  // 存在しない投稿と他カップルの投稿は区別せず同じ応答にする
  if (!row || row.coupleId !== user.coupleId) {
    return fail(404, "投稿が見つかりません");
  }

  return ok({ entry: toEntryDto(row, user.id) });
}
