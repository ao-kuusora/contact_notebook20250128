"use client";

import { useState } from "react";
import styles from "./Workload.module.css";

export default function WorkloadPage() {
  const [level, setLevel] = useState("");

  async function submit() {
    if (!level) {
      alert("忙しさを選択してください");
      return;
    }

    await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "WORKLOAD",
        content: level,
        dueDate: null,
      }),
    });

    setLevel("");
    alert("忙しさを送信しました");
  }

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
          <option value="とても忙しい">とても忙しい</option>
          <option value="普通">普通</option>
          <option value="余裕あり">余裕あり</option>
          <option value="飲みあり">飲みあり</option>
        </select>

        <button onClick={submit} className={styles.button}>
          送信
        </button>
      </div>
    </div>
  );
}