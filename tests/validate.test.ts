import { test } from "node:test";
import assert from "node:assert/strict";
import { isEmail, isEntryType, isNonEmptyString } from "../lib/validate";

test("isEntryType: 4種類だけ許可", () => {
  for (const t of ["CHORE", "ERRAND", "WORKLOAD", "DIARY"]) assert.equal(isEntryType(t), true);
  for (const t of ["chore", "", "OTHER", null, undefined, 1]) assert.equal(isEntryType(t), false);
});

test("isNonEmptyString: 空白のみ・長すぎる・文字列以外は不可", () => {
  assert.equal(isNonEmptyString("a", 5), true);
  assert.equal(isNonEmptyString("   ", 5), false);
  assert.equal(isNonEmptyString("", 5), false);
  assert.equal(isNonEmptyString("abcdef", 5), false);
  assert.equal(isNonEmptyString(123, 5), false);
});

test("isEmail", () => {
  assert.equal(isEmail("a@example.com"), true);
  assert.equal(isEmail("a@example"), false);
  assert.equal(isEmail("a b@example.com"), false);
  assert.equal(isEmail(`${"a".repeat(250)}@example.com`), false);
  assert.equal(isEmail(undefined), false);
});
