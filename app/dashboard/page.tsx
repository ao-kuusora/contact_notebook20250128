"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [latestChore, setLatestChore] = useState<any>(null);
  const [urgentErrand, setUrgentErrand] = useState<any>(null);
  const [todayWorkload, setTodayWorkload] = useState<any>(null);
  const [latestDiary, setLatestDiary] = useState<any>(null);

  const [unread, setUnread] = useState({
    chores: false,
    errands: false,
    workload: false,
    diary: false,
  });

  //今日の日付
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //unread を取得
  async function refreshUnread() {
    const res = await fetch("/api/unread", { cache: "no-store" });
    const data = await res.json();
    setUnread(data);
  }

  //初回 + タブ復帰時に unread 更新
  useEffect(() => {
    refreshUnread();

    const handler = () => {
      if (document.visibilityState == "visible") {
        refreshUnread();
      }
    };

    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  //最新データ取得
  useEffect(() => {
    async function fetchData() {
      const choresRes = await fetch("/api/entries?type=CHORE", { cache: "no-store" });
      const choresData = await choresRes.json();
      setLatestChore(choresData.entries?.[0] ?? null);

      const errandsRes = await fetch("/api/entries?type=ERRAND", { cache: "no-store" });
      const errandsData = await errandsRes.json();

      const urgent = (errandsData.entries ?? [])
        .filter((e: any) => e.dueDate && !e.done)
        .sort((a: any, b: any) => {
          const aDue = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
          const bDue = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
          return aDue - bDue;
        })[0];

      setUrgentErrand(urgent ?? null);

      const workloadRes = await fetch("/api/entries?type=WORKLOAD", { cache: "no-store" });
      const workloadData = await workloadRes.json();
      setTodayWorkload(workloadData.entries?.[0] ?? null);

      const diaryRes = await fetch("/api/entries?type=DIARY", { cache: "no-store" });
      const diaryData = await diaryRes.json();

      const list = diaryData.entries ?? [];
      setLatestDiary(list[0] ?? null);
    }

    fetchData();
  }, []);

  //ユーザー情報
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data.user);
    }
    fetchUser();
  }, []);

  //各カテゴリの未読バッジ判定（自分の投稿なら消す）
  const choresUnread =
    unread.chores && latestChore && !latestChore.isMine;

  const errandsUnread =
    unread.errands && urgentErrand && !urgentErrand.isMine;

  const workloadUnread =
    unread.workload && todayWorkload && !todayWorkload.isMine;

  const diaryUnread =
    unread.diary && latestDiary && !latestDiary.isMine;

  if (!user) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>読み込み中…</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* ★ タイトルを今日の日付に変更 */}
        <h1 className={styles.title}>{today}</h1>
        <p className={styles.subtitle}>{user.displayName} さん</p>
      </div>

      <div className={styles.panelList}>
        {/* 家事 */}
        <Link href="/chores" className={styles.card}>
          <h2 className={styles.cardTitle}>
            家事報告
            {choresUnread && <span className={styles.badge}></span>}
          </h2>
          {latestChore ? (
            <p className={styles.cardText}>
              最新: {latestChore.content}（
              {new Date(latestChore.createdAt).toLocaleDateString()}）
            </p>
          ) : (
            <p className={styles.cardEmpty}>まだ報告がありません</p>
          )}
        </Link>

        {/* おつかい */}
        <Link href="/errands" className={styles.card}>
          <h2 className={styles.cardTitle}>
            おつかいメモ
            {errandsUnread && <span className={styles.badge}></span>}
          </h2>
          {urgentErrand ? (
            <div>
              <p className={styles.cardText}>期限が近い: {urgentErrand.content}</p>
              <p className={styles.cardAlert}>
                期限: {new Date(urgentErrand.dueDate).toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p className={styles.cardEmpty}>期限が近いメモはありません</p>
          )}
        </Link>

        {/* 忙しさ */}
        <Link href="/workload" className={styles.card}>
          <h2 className={styles.cardTitle}>
            仕事の忙しさ
            {workloadUnread && <span className={styles.badge}></span>}
          </h2>
          {todayWorkload ? (
            <p className={styles.cardText}>今日: {todayWorkload.content}</p>
          ) : (
            <p className={styles.cardEmpty}>まだ送信されていません</p>
          )}
        </Link>

        {/* 交換日記 */}
        <Link href="/diary" className={styles.card}>
          <h2 className={styles.cardTitle}>
            交換日記
            {diaryUnread && <span className={styles.badge}></span>}
          </h2>

          {latestDiary ? (
            <p className={styles.cardText}>
              {latestDiary.authorName} さんが更新
              （{new Date(latestDiary.createdAt).toLocaleString()}）
            </p>
          ) : (
            <p className={styles.cardEmpty}>まだ日記がありません</p>
          )}
        </Link>

        {/* 連絡帳ID */}
        {user.coupleId && user.couple?.users?.length < 2 && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>連絡帳IDを作成しました</h2>
            <p className={styles.cardText}>このIDをお相手に共有してください</p>


            <div className={styles.coupleBox}>
              <p className={styles.cardText}>あなたの連絡帳ID</p>
              <p className={styles.coupleId}>{user.couple?.inviteCode}</p>

              <button
                className={styles.copyButton}
                onClick={() => {
                  navigator.clipboard.writeText(user.couple?.inviteCode || "");
                  alert("コピーしました");
                }}
              >
                コピー
              </button>
            </div>
          </div>
        )}

        {/* 連絡帳がまだ無い場合だけ「連絡帳を作る」を表示 */}
        {!user.coupleId && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>2人の連絡帳へようこそ</h2>

            <p className={styles.cardEmpty}>まだ2人の連絡帳が作られていません</p>

            <button
              className={styles.createButton}
              onClick={async () => {
                const res = await fetch("/api/couple/create", { method: "POST" });
                const data = await res.json();

                if (res.ok) {
                  window.location.reload();
                } else {
                  alert(data.error);
                }
              }}
            >
              連絡帳を作る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}