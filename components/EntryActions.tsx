"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { MAX_CONTENT_LENGTH } from "@/lib/validate";

export default function EntryActions({
  entry,
  onChanged,
  onDeleted,
}: {
  entry: EntryDTO;
  onChanged?: () => void;
  onDeleted?: () => void;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(entry.content);
  const [dueDate, setDueDate] = useState(entry.dueDate ? entry.dueDate.slice(0, 10) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!content.trim()) { setError("内容を入力してください"); return; }
    if (content.trim().length > MAX_CONTENT_LENGTH) {
      setError(`内容は${MAX_CONTENT_LENGTH}文字以内で入力してください`);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await sendJson(`/api/entries/${entry.id}`, {
        content: content.trim(),
        ...(entry.type === "ERRAND" || entry.type === "TASK"
          ? { dueDate: dueDate ? new Date(`${dueDate}T12:00:00`).toISOString() : null }
          : {}),
      }, "PATCH");
      if (!result.ok) { setError(result.error); return; }
      setEditing(false);
      onChanged?.();
      router.refresh();
    } catch {
      setError("編集内容を保存できませんでした。通信状態を確認してください。");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("この投稿を削除しますか？この操作は取り消せません。")) return;
    setBusy(true);
    setError("");
    try {
      const result = await sendJson(`/api/entries/${entry.id}`, {}, "DELETE");
      if (!result.ok) { setError(result.error); return; }
      onDeleted?.();
      onChanged?.();
      router.refresh();
    } catch {
      setError("削除できませんでした。通信状態を確認してください。");
    } finally {
      setBusy(false);
    }
  }

  if (!entry.isMine) return null;

  const buttonStyle = {
    border: "1px solid var(--c-line, #ddd)",
    borderRadius: 8,
    background: "var(--c-surface, #fff)",
    padding: "7px 11px",
    fontSize: 13,
    cursor: busy ? "wait" : "pointer",
    opacity: busy ? 0.65 : 1,
  } as const;

  return (
    <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
      {editing ? (
        <div style={{ display: "grid", gap: 8 }}>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={MAX_CONTENT_LENGTH}
            rows={4}
            aria-label="投稿内容を編集"
            style={{ width: "100%", boxSizing: "border-box", padding: 10, border: "1px solid var(--c-line, #ddd)", borderRadius: 8, font: "inherit" }}
          />
          {(entry.type === "ERRAND" || entry.type === "TASK") && (
            <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
              期限（任意）
              <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} style={{ padding: 8, borderRadius: 8, border: "1px solid var(--c-line, #ddd)" }} />
            </label>
          )}
          {error && <p role="alert" style={{ color: "#b42318", fontSize: 13, margin: 0 }}>{error}</p>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button type="button" style={buttonStyle} disabled={busy} onClick={() => void save()}>{busy ? "保存中…" : "変更を保存"}</button>
            <button type="button" style={buttonStyle} disabled={busy} onClick={() => { setEditing(false); setContent(entry.content); setError(""); }}>キャンセル</button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button type="button" style={buttonStyle} disabled={busy} onClick={() => { setContent(entry.content); setEditing(true); setError(""); }}>編集</button>
          <button type="button" style={{ ...buttonStyle, color: "#b42318" }} disabled={busy} onClick={() => void remove()}>{busy ? "処理中…" : "削除"}</button>
        </div>
      )}
      {!editing && error && <p role="alert" style={{ color: "#b42318", fontSize: 13, margin: 0 }}>{error}</p>}
    </div>
  );
}
