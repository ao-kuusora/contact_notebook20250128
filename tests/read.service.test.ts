import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_READ_IDS, markRead, ReadRepo } from "../lib/services/read";
import { ME } from "./helpers";

function fakeReadRepo() {
  const calls: { userId: string; coupleId: string; ids: string[] }[] = [];
  const repo: ReadRepo = {
    async markEntriesRead(userId, coupleId, ids) {
      calls.push({ userId, coupleId, ids });
      return ids.length;
    },
  };
  return { repo, calls };
}

test("markRead: 未ログイン 401 / 未参加 403", async () => {
  const { repo, calls } = fakeReadRepo();
  assert.equal((await markRead(repo, null, { entryIds: ["a"] })).status, 401);
  assert.equal((await markRead(repo, { id: "u1", coupleId: null }, { entryIds: ["a"] })).status, 403);
  assert.equal(calls.length, 0);
});

test("markRead: id がない・不正・多すぎる場合は 400", async () => {
  const { repo, calls } = fakeReadRepo();
  const tooMany = Array.from({ length: MAX_READ_IDS + 1 }, (_, i) => `id${i}`);
  for (const body of [null, {}, { entryIds: [] }, { entryIds: [1, 2] }, { entryId: "" }, { entryIds: tooMany }]) {
    const r = await markRead(repo, ME, body);
    assert.equal(r.status, 400, JSON.stringify(body)?.slice(0, 40));
  }
  assert.equal(calls.length, 0);
});

test("markRead: 複数 id をまとめて既読にする (重複は除く)", async () => {
  const { repo, calls } = fakeReadRepo();
  const r = await markRead(repo, ME, { entryIds: ["a", "b", "a"] });
  assert.equal(r.status, 200);
  assert.deepEqual(calls[0], { userId: "u1", coupleId: "c1", ids: ["a", "b"] });
});

test("markRead: 旧形式 { entryId } も受け付ける", async () => {
  const { repo, calls } = fakeReadRepo();
  const r = await markRead(repo, ME, { entryId: "x" });
  assert.equal(r.status, 200);
  assert.deepEqual(calls[0].ids, ["x"]);
});

test("markRead: 文字列以外の id は取り除く", async () => {
  const { repo, calls } = fakeReadRepo();
  const r = await markRead(repo, ME, { entryIds: ["a", 5, null, "b"] });
  assert.equal(r.status, 200);
  assert.deepEqual(calls[0].ids, ["a", "b"]);
});
