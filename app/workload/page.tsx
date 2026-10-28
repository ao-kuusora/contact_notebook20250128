"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Workload.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { useMarkRead } from "@/lib/useEntry";
import EntryActions from "@/components/EntryActions";

const LEVELS = ["とても忙しい", "普通", "余裕あり", "飲みあり"];

export default function WorkloadPage() {
  const [level, setLevel] = useState("");
  const [entries, setEntries] = useState<EntryDTO[]>([]);
  useMarkRead(entries);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchEntries = useCallback(async () => {
    const result = await apiFetch<{ entries: EntryDTO[] }>(
      "/api/entries?type=WORKLOAD&limit=20"
    );
    if (result.ok) setEntries(result.data.entries ?? []);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  async function submit() {
    if (posting) return;
    setNotice("");

    if (!level) {
      setError("忙しさを選択してください");
      return;
    }

    setPosting(true);
    setError("");

    const result = await sendJson("/api/entries", {
      type: "WORKLOAD",
      content: level,
      dueDate: null,
    });
    setPosting(false);

    // 以前は失敗しても「送信しました」と出てしまっていた
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setLevel("");
    setNotice("忙しさを送信しました");
    fetchEntries();
  }

  const latestMine = entries.find((e) => e.isMine);
  const latestTheirs = entries.find((e) => !e.isMine);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>今日の忙しさ</h1>

      <div className={styles.card}>
        <select
          className={styles.select}
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">選択してください</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        {error && (
          <p className={styles.errorText} role="alert">
            {error}
          </p>
        )}
        {notice && !error && (
          <p className={styles.noticeText} role="status">
            {notice}
          </p>
        )}

        <button onClick={submit} disabled={posting} className={styles.button}>
          {posting ? "送信中…" : "送信"}
        </button>
      </div>

      {(latestTheirs || latestMine) && (
        <div className={styles.status}>
          {latestTheirs && (
            <p className={styles.statusRow}>
              <span className={styles.statusLabel}>
                {latestTheirs.authorName} さん
              </span>
              {latestTheirs.content}
              <span className={styles.statusTime}>
                {new Date(latestTheirs.createdAt).toLocaleString()}
              </span>
            </p>
          )}
          {latestMine && (
            <p className={styles.statusRow}>
              <span className={styles.statusLabel}>あなた</span>
              {latestMine.content}
              <span className={styles.statusTime}>
                {new Date(latestMine.createdAt).toLocaleString()}
              </span>
            </p>
          )}
          {latestMine && <EntryActions entry={latestMine} onChanged={() => void fetchEntries()} onDeleted={() => void fetchEntries()} />}
        </div>
      )}
    </div>
  );
}
