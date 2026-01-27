"use client";

import { useState, useEffect } from "react";
import styles from "./Diary.module.css";

export default function DiaryPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  async function fetchDiary(date?: string) {
    const url = date
      ? `/api/entries?type=DIARY&date=${date}`
      : `/api/entries?type=DIARY`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    setEntries(data.entries ?? []);
  }

  async function submit() {
    if (!content.trim()) return;

    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "DIARY",
        content,
        dueDate: null,
      }),
    });

    setContent("");
    fetchDiary(selectedDate || undefined);
  }

  useEffect(() => {
    fetchDiary();
  }, []);

  async function searchByDate() {
    if (!selectedDate) return;
    fetchDiary(selectedDate);
  }

  useEffect(() => {
    if (entries.length == 0) return;

    const latest = entries[0];
    if (latest.isMine) return;

    fetch("/api/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entryId: latest.id }),
    });
  }, [entries]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>交換日記</h1>

      <div className={styles.searchArea}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.dateInput}
        />
        <button onClick={searchByDate} className={styles.searchButton}>
          日付で検索
        </button>
      </div>

      <div className={styles.page}>
        {entries.length == 0 ? (
          <p className={styles.empty}>この日の日記はありません</p>
        ) : (
          entries.map((e) => (
            <div
              key={e.id}
              className={`${styles.diaryEntry} ${
                e.isMine ? styles.mine : styles.theirs
              }`}
            >
              <a href={`/diary/${e.id}`} className={styles.link}>
                {e.content.slice(0, 40)}…
              </a>

              <div className={styles.meta}>
                {e.iconUrl && (
                  <img src={e.iconUrl} alt="" className={styles.icon} />
                )}
                <span className={styles.author}>{e.authorName}</span>
                <span className={styles.date}>
                  {new Date(e.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.writeArea}>
        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="今日の気持ちを書こう"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={submit} className={styles.button}>
          今日の日記を書く
        </button>
      </div>
    </div>
  );
}