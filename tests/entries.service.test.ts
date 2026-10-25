import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createEntry,
  DEFAULT_LIST_LIMIT,
  getEntry,
  listEntries,
  MAX_LIST_LIMIT,
} from "../lib/services/entries";
import { fakeEntryRepo, ME, PARTNER_ID, row } from "./helpers";

// ---------- 一覧 ----------

test("listEntries: 未ログインは 401", async () => {
  const { repo } = fakeEntryRepo();
  const r = await listEntries(repo, null, {});
  assert.equal(r.status, 401);
});

test("listEntries: 連絡帳に未参加なら空配列 (DB は呼ばない)", async () => {
  const { repo, calls } = fakeEntryRepo([row()]);
  const r = await listEntries(repo, { id: "u1", coupleId: null }, {});
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { entries: [] });
  assert.equal(calls.list.length, 0);
});

test("listEntries: 不正な type は 400", async () => {
  const { repo } = fakeEntryRepo();
  const r = await listEntries(repo, ME, { type: "HACK" });
  assert.equal(r.status, 400);
});

test("listEntries: 不正な日付は 400", async () => {
  const { repo } = fakeEntryRepo();
  for (const date of ["2026-02-31", "yesterday", "2026/10/25"]) {
    const r = await listEntries(repo, ME, { date });
    assert.equal(r.status, 400, date);
  }
});

test("listEntries: 自分のカップル・種別・JSTの日付範囲で検索する", async () => {
  const { repo, calls } = fakeEntryRepo([row()]);
  await listEntries(repo, ME, { type: "DIARY", date: "2026-10-25", done: "false" });

  const q = calls.list[0];
  assert.equal(q.coupleId, "c1");
  assert.equal(q.viewerId, "u1");
  assert.equal(q.type, "DIARY");
  assert.equal(q.done, false);
  assert.equal(q.range?.start.toISOString(), "2026-10-24T15:00:00.000Z");
});

test("listEntries: 件数の上限 (既定100・最大200・不正値は既定)", async () => {
  const { repo, calls } = fakeEntryRepo();
  await listEntries(repo, ME, {});
  await listEntries(repo, ME, { limit: "5" });
  await listEntries(repo, ME, { limit: "99999" });
  await listEntries(repo, ME, { limit: "-3" });
  await listEntries(repo, ME, { limit: "abc" });
  assert.deepEqual(
    calls.list.map((q) => q.take),
    [DEFAULT_LIST_LIMIT, 5, MAX_LIST_LIMIT, DEFAULT_LIST_LIMIT, DEFAULT_LIST_LIMIT]
  );
});

test("listEntries: isMine / isRead / authorName を付ける", async () => {
  const mine = row({ id: "a", userId: "u1", isRead: false, authorName: "私" });
  const unread = row({ id: "b", userId: PARTNER_ID, isRead: false });
  const read = row({ id: "c", userId: PARTNER_ID, isRead: true });
  const { repo } = fakeEntryRepo([mine, unread, read]);

  const r = await listEntries(repo, ME, {});
  const entries = (r.body as { entries: any[] }).entries;

  assert.equal(entries[0].isMine, true);
  assert.equal(entries[0].isRead, true); // 自分の投稿は常に既読扱い
  assert.equal(entries[1].isMine, false);
  assert.equal(entries[1].isRead, false);
  assert.equal(entries[2].isRead, true);
  assert.equal(entries[1].authorName, "相手");
});

// ---------- 詳細 ----------

test("getEntry: 未ログイン 401 / 未参加 403", async () => {
  const { repo } = fakeEntryRepo([row()]);
  assert.equal((await getEntry(repo, null, "e1")).status, 401);
  assert.equal((await getEntry(repo, { id: "u1", coupleId: null }, "e1")).status, 403);
});

test("getEntry: 存在しない・他カップルの投稿は同じ 404", async () => {
  const { repo } = fakeEntryRepo([row({ id: "other", coupleId: "c999" })]);
  assert.equal((await getEntry(repo, ME, "missing")).status, 404);
  assert.equal((await getEntry(repo, ME, "other")).status, 404);
});

test("getEntry: 自分のカップルの投稿は返る", async () => {
  const { repo } = fakeEntryRepo([row()]);
  const r = await getEntry(repo, ME, "e1");
  assert.equal(r.status, 200);
  assert.equal((r.body as { entry: { id: string } }).entry.id, "e1");
});

// ---------- 投稿 ----------

test("createEntry: 未ログイン 401 / 未参加 403", async () => {
  const { repo, calls } = fakeEntryRepo();
  assert.equal((await createEntry(repo, null, { type: "DIARY", content: "a" })).status, 401);
  assert.equal(
    (await createEntry(repo, { id: "u1", coupleId: null }, { type: "DIARY", content: "a" })).status,
    403
  );
  assert.equal(calls.create.length, 0);
});

test("createEntry: 不正な入力は 400 で保存しない", async () => {
  const { repo, calls } = fakeEntryRepo();
  const bad = [
    null,
    {},
    { type: "NOPE", content: "a" },
    { type: "DIARY", content: "" },
    { type: "DIARY", content: "   " },
    { type: "DIARY", content: "あ".repeat(2001) },
    { type: "DIARY", content: 123 },
    { type: "ERRAND", content: "牛乳", dueDate: "not-a-date" },
  ];
  for (const body of bad) {
    const r = await createEntry(repo, ME, body);
    assert.equal(r.status, 400, JSON.stringify(body));
  }
  assert.equal(calls.create.length, 0);
});

test("createEntry: 正常系は自分と自分のカップルで保存する", async () => {
  const { repo, calls } = fakeEntryRepo();
  const r = await createEntry(repo, ME, {
    type: "ERRAND",
    content: "牛乳を買う",
    dueDate: "2026-10-30",
    userId: "attacker", // 本文で渡された userId / coupleId は無視される
    coupleId: "c999",
  });

  assert.equal(r.status, 200);
  assert.equal(calls.create.length, 1);
  assert.equal(calls.create[0].userId, "u1");
  assert.equal(calls.create[0].coupleId, "c1");
  assert.equal(calls.create[0].type, "ERRAND");
  assert.ok(calls.create[0].dueDate instanceof Date);
});

test("createEntry: 期限なしは null", async () => {
  const { repo, calls } = fakeEntryRepo();
  await createEntry(repo, ME, { type: "DIARY", content: "a", dueDate: null });
  assert.equal(calls.create[0].dueDate, null);
});
