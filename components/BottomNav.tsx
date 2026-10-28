"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./BottomNav.module.css";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const items = [
    { href: "/dashboard", label: "ホーム" },
    { href: "/chores", label: "家事" },
    { href: "/errands", label: "おつかい" },
    { href: "/tasks", label: "タスク" },
    { href: "/health", label: "体調" },
    { href: "/workload", label: "忙しさ" },
    { href: "/diary", label: "日記" },
    { href: "/settings", label: "設定" },
  ];

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error("ログアウトできませんでした。もう一度お試しください。");
      setExpanded(false);
      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("ログアウトできませんでした。通信状態を確認して再度お試しください。");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <nav className={`${styles.nav} ${expanded ? styles.expanded : styles.collapsed}`} aria-label="メインナビゲーション">
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setExpanded((current) => !current)}
        aria-label={expanded ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={expanded}
        aria-controls="bottom-navigation-links"
      >
        <span className={styles.hamburger} aria-hidden="true"><span /><span /><span /></span>
        <span className={styles.toggleLabel}>{expanded ? "閉じる" : "メニュー"}</span>
      </button>
      <div id="bottom-navigation-links" className={styles.links} hidden={!expanded}>
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={`${styles.item} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined} onClick={() => setExpanded(false)}>
              {item.label}
            </Link>
          );
        })}
        <button type="button" className={`${styles.item} ${styles.logout}`} onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? "ログアウト中…" : "ログアウト"}
        </button>
        {logoutError && <p className={styles.logoutError} role="alert">{logoutError}</p>}
      </div>
    </nav>
  );
}
