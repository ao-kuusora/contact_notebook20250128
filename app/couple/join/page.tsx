"use client";

import { useState } from "react";
import styles from "./CoupleJoin.module.css";

export default function CoupleJoinPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleJoin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/couple/join", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: inviteCode }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setSuccess(true);
    window.location.href = "/dashboard";
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <h1 className={styles.title}>連絡帳に参加する</h1>

        <form onSubmit={handleJoin} className={styles.form}>
          <input
            type="text"
            placeholder="連絡帳IDを入力"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className={styles.input}
          />

          <button className={styles.button}>
            参加する
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>参加しました！</p>}
      </div>
    </div>
  );
}