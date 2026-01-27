"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, displayName: name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "登録に失敗しました");
      return;
    }

    router.push("/couple/select");
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <h1 className={styles.title}>新規登録</h1>
        <p className={styles.subtitle}>生活をつなぐアプリ</p>
        <form onSubmit={handleRegister} className={styles.form}>
          <div>
            <label className={styles.label}>名前</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.label}>メールアドレス</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.label}>パスワード</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button}>
            登録する
          </button>
        </form>

        <p className={styles.register}>
          すでにアカウントがありますか？{" "}
          <a href="/login" className={styles.registerLink}>
            ログイン
          </a>
        </p>
      </div>
    </div>
  );
}