import type { EntryRepo, EntryRow, ListQuery, NewEntry } from "../lib/services/entries";

export const ME = { id: "u1", coupleId: "c1" };
export const PARTNER_ID = "u2";

export function row(overrides: Partial<EntryRow> = {}): EntryRow {
  return {
    id: "e1",
    type: "DIARY",
    content: "こんにちは",
    dueDate: null,
    done: false,
    userId: PARTNER_ID,
    coupleId: "c1",
    createdAt: new Date("2026-10-25T01:00:00.000Z"),
    authorName: "相手",
    isRead: false,
    ...overrides,
  };
}

/** 呼び出しを記録するだけの偽リポジトリ (DB なしでサービス層をテストする) */
export function fakeEntryRepo(rows: EntryRow[] = []) {
  const calls = { list: [] as ListQuery[], create: [] as NewEntry[] };
  const repo: EntryRepo = {
    async list(q) {
      calls.list.push(q);
      return rows;
    },
    async findById(id) {
      return rows.find((r) => r.id === id) ?? null;
    },
    async create(data) {
      calls.create.push(data);
      return { id: "new1", createdAt: new Date("2026-10-25T02:00:00.000Z") };
    },
  };
  return { repo, calls };
}
