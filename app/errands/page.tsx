"use client";

import { useState, useEffect } from "react";
import styles from "./Errands.module.css";

export default function ErrandsPage() {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [entries, setEntries] = useState([]);

  async function fetchEntries() {
    const res = await fetch("/api/entries?type=ERRAND", {
      credentials: "include",
    });
    const data = await res.json();

    const sorted = data.entries.sort((a, b) => {
      const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return aDue - bDue;
    });

    setEntries(sorted);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) {
      alert("内容を入力してください");
      return;
    }

    await fetch("/api/entries", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "ERRAND",
        content,
        dueDate,
      }),
    });

    setContent("");
    setDueDate("");
    fetchEntries();
  }

  async function toggleDone(id, done) {
    await fetch(`/api/entries/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done }),
    });

    fetchEntries();
  }

  useEffect(() => {
    fetchEntries();
  }, []);
  useEffect(() => {
    if (!entries.length) return;

    const latest = entries[0]; //最新のおつかい

    fetch("/api/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entryId: latest.id }),
    });
  }, [entries]);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>おつかいメモ</h1>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} className={styles.card}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          placeholder="買うものを書こう"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.input}
        />

        <button className={styles.button}>追加する</button>
      </form>

      {/* 一覧 */}
      <div className={styles.list}>

        {/* チェック済みは非表示 */}
        {entries
          .filter((e) => !e.done)
          .map((e) => {
            const now = new Date();
            const due = e.dueDate ? new Date(e.dueDate) : null;
            const isExpired = due && due < now;
            const isToday = due && due.toDateString() == now.toDateString();

            return (
              <div
                key={e.id}
                className={`${styles.item} ${e.done ? styles.done : ""}`}
              >
                <div className={styles.row}>
                  <input
                    type="checkbox"
                    checked={e.done}
                    onChange={(ev) => toggleDone(e.id, ev.target.checked)}
                  />
                  <span className={styles.itemTitle}>{e.content}</span>
                </div>

                {e.dueDate && (
                  <p
                    className={`${styles.due} ${
                      isExpired
                        ? styles.expired
                        : isToday
                        ? styles.today
                        : styles.normal
                    }`}
                  >
                    期限: {due.toLocaleDateString()}
                    {isExpired && "（期限切れ）"}
                    {isToday && "（今日中）"}
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}