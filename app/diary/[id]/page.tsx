"use client";

import { useEffect, useState } from "react";
import styles from "../DiaryDetail.module.css";

export default function DiaryDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchEntry() {
    setLoading(true); //読み込み開始

    const res = await fetch(`/api/entries/${id}`, { cache: "no-store" });
    const data = await res.json();
    setEntry(data.entry);

    setLoading(false); //読み込み終了
  }

  useEffect(() => {
    fetchEntry();
  }, []);

  //既読
  useEffect(() => {
    if (!entry) return;
    if (entry.isMine) return;

    fetch("/api/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entryId: entry.id }),
    });
  }, [entry]);

  return (
    <div className={styles.container}>
      {/* ローディング演出 */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <p className={styles.loadingText}>読み込み中…</p>
        </div>
      )}

      {entry && (
        <div
          className={`${styles.diaryEntry} ${
            entry.isMine ? styles.mine : styles.theirs
          }`}
        >
          <div className={styles.content}>{entry.content}</div>

          <div className={styles.meta}>
            <span className={styles.author}>{entry.authorName}</span>
            <span className={styles.date}>
              {new Date(entry.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}