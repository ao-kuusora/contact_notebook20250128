"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Health.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { useMarkRead } from "@/lib/useEntry";

const CONDITION_LEVELS = ["元気", "まあまあ", "少し不調", "しんどい"] as const;

function parseReport(content: string) {
  const match = content.match(/^体調：([^｜]+)｜気分：([^｜]+)(?:｜メモ：([\\s\\S]*))?$/);
  if (!match) return { condition: content, mood: "", note: "" };
  return { condition: match[1], mood: match[2], note: match[3] ?? "" };
}

export default function HealthPage() {
  const [condition, setCondition] = useState("");
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<EntryDTO[]>([]);
  useMarkRead(entries);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchReports = useCallback(async () => {
    setLoading(true);
    const result = await apiFetch<{ entries: EntryDTO[] }>("/api/entries?type=HEALTH&limit=30");
    setLoading(false);
    if (!result.ok) { setError(result.error); return; }
    setError("");
    setEntries(result.data.entries ?? []);
  }, []);

  useEffect(() => { void fetchReports(); }, [fetchReports]);

  async function submit() {
    if (posting) return;
    if (!condition || !mood.trim()) {
      setError("体調と気分を選んでください");
      return;
    }
    setPosting(true);
    setError("");
    setNotice("");
    try {
      const parts = [`体調：${condition}｜気分：${mood.trim()}`];
      if (note.trim()) parts.push(`メモ：${note.trim()}`);
      const result = await sendJson("/api/entries", {
        type: "HEALTH",
        content: parts.join("｜"),
        dueDate: null,
      });
      if (!result.ok) { setError(result.error); return; }
      setCondition("");
      setMood("");
      setNote("");
      setNotice("今日の体調を報告しました");
      await fetchReports();
    } catch {
      setError("報告できませんでした。通信状態を確認して再試行してください。");
    } finally {
      setPosting(false);
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>DAILY CHECK-IN</p>
        <h1 className={styles.title}>今日の体調</h1>
        <p className={styles.description}>無理せず、今の自分の状態をふたりで共有しよう。</p>
      </header>

      <section className={styles.card} aria-labelledby="report-title">
        <h2 id="report-title" className={styles.sectionTitle}>今日の状態を教えてね</h2>
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>体調</legend>
          <div className={styles.options}>
            {CONDITION_LEVELS.map((value) => (
              <button key={value} type="button" aria-pressed={condition === value}
                className={condition === value ? styles.optionActive : styles.option}
                onClick={() => setCondition(value)}>{value}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>気分を顔文字で教えて</legend>
          <input
            id="health-mood"
            className={styles.moodInput}
            type="text"
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            maxLength={40}
            placeholder="今の気分を顔文字で自由に入力してね"
            aria-label="今の気分や顔文字"
          />
          <p className={styles.hint}>好きな顔文字を自由に入力してね。</p>
        </fieldset>
        <label className={styles.label} htmlFor="health-note">ひとこと（任意）</label>
        <textarea id="health-note" className={styles.textarea} value={note}
          onChange={(event) => setNote(event.target.value)} maxLength={500} rows={3}
          placeholder="例：ちょっと頭が痛いから、今日は早めに休むね" />
        {error && <p className={styles.error} role="alert">{error}</p>}
        {notice && <p className={styles.notice} role="status">{notice}</p>}
        <button className={styles.submit} onClick={submit} disabled={posting}>
          {posting ? "報告中…" : "今日の体調を報告する"}
        </button>
      </section>

      <section className={styles.history}>
        <h2 className={styles.sectionTitle}>最近の報告</h2>
        {loading ? <p className={styles.empty}>読み込み中…</p> :
          entries.length === 0 ? <p className={styles.empty}>まだ報告はありません。最初の報告をしてみよう。</p> :
          entries.map((entry) => {
            const report = parseReport(entry.content);
            return (
              <article key={entry.id} className={styles.report}>
                <div className={styles.reportHeader}>
                  <strong>{entry.isMine ? "あなた" : entry.authorName}</strong>
                  <time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString("ja-JP")}</time>
                </div>
                <p className={styles.reportLine}>体調：{report.condition}</p>
                {report.mood && <p className={styles.reportLine}>気分：{report.mood}</p>}
                {report.note && <p className={styles.reportNote}>{report.note.replace(/^メモ：/, "")}</p>}
              </article>
            );
          })}
      </section>
    </main>
  );
}
