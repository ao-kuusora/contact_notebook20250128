import { test } from "node:test";
import assert from "node:assert/strict";
import { parseJstDay, parseJstMonth } from "../lib/services/entries";

test("parseJstDay: JST の 0:00〜翌 0:00 (UTC では前日 15:00 始まり)", () => {
  const r = parseJstDay("2026-10-25");
  assert.ok(r);
  assert.equal(r.start.toISOString(), "2026-10-24T15:00:00.000Z");
  assert.equal(r.end.toISOString(), "2026-10-25T15:00:00.000Z");
});

test("parseJstDay: 形式不正・存在しない日付は null", () => {
  for (const v of ["", null, undefined, "2026/10/25", "2026-1-5", "2026-02-31", "2026-13-01", "abcd-ef-gh"]) {
    assert.equal(parseJstDay(v as string), null, String(v));
  }
});

test("parseJstDay: うるう日", () => {
  assert.ok(parseJstDay("2028-02-29"));
  assert.equal(parseJstDay("2027-02-29"), null);
});

test("parseJstMonth: 通常月と年またぎ", () => {
  const oct = parseJstMonth("2026-10");
  assert.ok(oct);
  assert.equal(oct.start.toISOString(), "2026-09-30T15:00:00.000Z");
  assert.equal(oct.end.toISOString(), "2026-10-31T15:00:00.000Z");

  const dec = parseJstMonth("2026-12");
  assert.ok(dec);
  assert.equal(dec.end.toISOString(), "2026-12-31T15:00:00.000Z");
});

test("parseJstMonth: 不正な月は null", () => {
  for (const v of ["2026-00", "2026-13", "2026-1", "202610", "", null]) {
    assert.equal(parseJstMonth(v as string), null, String(v));
  }
});
