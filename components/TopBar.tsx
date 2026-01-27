"use client";

import { useRouter } from "next/navigation";
import styles from "./TopBar.module.css";

export default function TopBar({ title }: { title: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <header className={styles.header}>
      <div className={styles.side}>
        <button onClick={() => router.back()} className={styles.back}>
          ←
        </button>
      </div>

      <div className={styles.center}>
        <h1 className={styles.title}>2人の連絡帳</h1>
      </div>

      <div className={styles.side}>
        <button onClick={logout} className={styles.logout}>
          ログアウト
        </button>
      </div>
    </header>
  );
}