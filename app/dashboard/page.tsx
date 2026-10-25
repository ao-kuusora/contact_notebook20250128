"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { DashboardDTO } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardDTO | null>(null);
  const [loadError, setLoadError] = useState("");
  const [createError, setCreateError] = useState("");

  //今日の日付
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //ダッシュボードのデータを 1 リクエストでまとめて取得
  const refresh = useCallback(async () => {
    const result = await apiFetch<DashboardDTO>("/api/dashboard");

    if (!result.ok) {
      // 画面に表示済みのデータは残し、初回のときだけエラーを出す
      setLoadError(result.error);
      return;
    }

    if (!result.data.user) {
      // セッション切れ。ずっと「読み込み中」にならないようログインへ戻す
      router.replace("/login");
      return;
    }

    setLoadError("");
    setData(result.data);
  }, [router]);

  //初回 + タブ復帰時に更新
  useEffect(() => {
    refresh();

    const handler = () => {
      if (document.visibilityState == "visible") {
        refresh();
      }
    };

    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [refresh]);

  if (!data) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>
          {loadError || "読み込み中…"}
        </p>
        {loadError && (
          <button className={styles.retryButton} onClick={refresh}>
            再読み込み
          </button>
        )}
      </div>
    );
  }

  const { user, unread, latestChore, urgentErrand, todayWorkload, latestDiary } =
    data;

  //未読バッジはサーバー (/api/unread と同じ判定) の結果をそのまま使う
  const choresUnread = unread.chores;
  const errandsUnread = unread.errands;
  const workloadUnread = unread.workload;
  const diaryUnread = unread.diary;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
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
                setCreateError("");
                const result = await sendJson("/api/couple/create", {});
                if (result.ok) {
                  refresh();
                } else {
                  setCreateError(result.error);
                }
              }}
            >
              連絡帳を作る
            </button>
            {createError && <p className={styles.cardAlert}>{createError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}