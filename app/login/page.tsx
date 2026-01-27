"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "ログインに失敗しました");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>

        <h1 className={styles.title}>2人の連絡帳</h1>
        <p className={styles.subtitle}>生活をつなぐアプリ</p>

        <form onSubmit={handleLogin} className={styles.form}>
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
            ログイン
          </button>
        </form>

        <p className={styles.register}>
          アカウントがない方は{" "}
          <a href="/register" className={styles.registerLink}>
            新規登録
          </a>
        </p>
      </div>
    </div>
  );
}