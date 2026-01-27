"use client";

import { useEffect, useState } from "react";
import styles from "./CoupleCreate.module.css";

export default function CoupleCreatePage() {
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  //すでに発行済みのカップルIDを取得
  useEffect(() => {
    async function fetchCoupleId() {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();

      if (data.user?.coupleId) {
        setInviteCode(data.user.coupleId);
      }
    }

    fetchCoupleId();
  }, []);

  //新しく発行する
  async function handleCreate() {
    setError("");

    const res = await fetch("/api/couple/create", {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setInviteCode(data.inviteCode);
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <h1 className={styles.title}>連絡帳を作る</h1>

        {/* すでに発行済みならボタンを隠す or 無効化 */}
        {!inviteCode && (
          <button onClick={handleCreate} className={styles.button}>
            連絡帳IDを発行する
          </button>
        )}

        {inviteCode && (
          <div className={styles.inviteBox}>
            <p className={styles.inviteLabel}>あなたの連絡帳ID</p>
            <p className={styles.inviteCode}>{inviteCode}</p>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}