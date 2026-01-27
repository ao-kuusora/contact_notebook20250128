"use client";

import { useState, useEffect } from "react";
import styles from "./Chores.module.css";

export default function ChoresPage() {
  const [selected, setSelected] = useState("お洗濯");
  const [otherText, setOtherText] = useState("");
  const [entries, setEntries] = useState([]);

  async function fetchEntries() {
    const res = await fetch("/api/entries?type=CHORE", {
      credentials: "include",
    });
    const data = await res.json();
    setEntries(data.entries);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const content = selected == "その他" ? otherText : selected;

    await fetch("/api/entries", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "CHORE",
        content,
      }),
    });

    setOtherText("");
    fetchEntries();
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>家事報告</h1>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} className={styles.form}>

        {/* 選択肢（残す） */}
        <div className={styles.radioGroup}>
          {["お洗濯", "ごみ捨て", "洗い物", "お掃除", "その他"].map((item) => (
            <label key={item} className={styles.radioItem}>
              <input
                type="radio"
                name="chore"
                value={item}
                checked={selected == item}
                onChange={() => setSelected(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* その他の入力欄 */}
        {selected == "その他" && (
          <textarea
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            className={styles.textarea}
            placeholder="内容を入力してください"
          />
        )}

        <button className={styles.button}>投稿する</button>
      </form>

      {/* 一覧 */}
      <div className={styles.list}>
        {entries.map((e) => (
          <a key={e.id} href={`/chores/${e.id}`} className={styles.item}>
            <p className={styles.itemMeta}>
              {e.user.displayName}・{new Date(e.createdAt).toLocaleString()}
            </p>
            <p className={styles.itemContent}>{e.content}</p>
          </a>
        ))}
      </div>
    </div>
  );
}