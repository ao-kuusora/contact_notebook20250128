"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { DashboardDTO } from "@/lib/types";
import UserAvatar from "@/components/UserAvatar";

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

  const { user, unread, latestChore, urgentErrand, todayWorkload, latestDiary, latestTask, latestHealth } =
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
        <p className={styles.subtitle}><UserAvatar name={user.displayName} iconUrl={user.iconUrl} href={`/profile/${user.id}`} /> {user.displayName} さん</p>
        {user.couple?.users?.filter((member) => member.id !== user.id).map((member) => <p className={styles.subtitle} key={member.id}><UserAvatar name={member.displayName} iconUrl={member.iconUrl} href={`/profile/${member.id}`} /> <Link href={`/profile/${member.id}`}>{member.displayName} さんのプロフィールを見る</Link></p>)}
      </div>

      {data.latestByPerson && data.latestByPerson.length > 0 && (
        <section className={styles.card} aria-label="ふたりの最新入力">
          <h2 className={styles.cardTitle}>ふたりの最新入力</h2>
          <div className={styles.latestPeopleList}>
            {data.latestByPerson.map((entry) => (
              <div className={styles.latestPersonRow} key={entry.id}>
                <UserAvatar name={entry.authorName} iconUrl={entry.authorIconUrl} href={`/profile/${entry.userId}`} />
                <div className={styles.latestPersonContent}>
                  <p><strong>{entry.authorName}</strong> · {{ CHORE: "家事報告", ERRAND: "おつかいメモ", TASK: "タスク", DIARY: "交換日記", HEALTH: "体調", WORKLOAD: "仕事の忙しさ" }[entry.type] || entry.type}</p>
                  <p>{entry.content.length > 100 ? `${entry.content.slice(0, 100)}…` : entry.content}</p>
                  <time>{new Date(entry.createdAt).toLocaleString("ja-JP")}</time>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className={styles.panelList}>
        {/* 家事 */}
        <Link href="/chores" className={styles.card}>
          <h2 className={styles.cardTitle}>
            家事報告
            {choresUnread && <span className={styles.badge}></span>}
          </h2>
          {latestChore ? (
            <>
              <p className={styles.cardText}><UserAvatar name={latestChore.authorName} iconUrl={latestChore.authorIconUrl} href={`/profile/${latestChore.userId}`} /> <strong>{latestChore.authorName}</strong> さんが入力</p>
              <p className={styles.cardText}>{latestChore.content}</p>
              <p className={styles.cardEmpty}>{new Date(latestChore.createdAt).toLocaleString("ja-JP")}</p>
            </>
          ) : (
            <p className={styles.cardEmpty}>本日の入力はまだです</p>
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

        {/* タスク */}
        <Link href="/tasks" className={styles.card}>
          <h2 className={styles.cardTitle}>ふたりのタスク</h2>
          {latestTask ? (
            <>
              <p className={styles.cardText}>{latestTask.content}</p>
              <p className={styles.cardEmpty}>
                <UserAvatar name={latestTask.authorName} iconUrl={latestTask.authorIconUrl} href={`/profile/${latestTask.userId}`} /> 入力者：{latestTask.authorName} さん · {new Date(latestTask.createdAt).toLocaleString("ja-JP")}
                {latestTask.done ? " · 完了" : " · 未完了"}
              </p>
            </>
          ) : (
            <p className={styles.cardEmpty}>まだタスクはありません</p>
          )}
        </Link>

        {/* 今日の体調 */}
        <Link href="/health" className={styles.card}>
          <h2 className={styles.cardTitle}>今日の体調</h2>
          {latestHealth ? (
            <>
              <p className={styles.cardText}><UserAvatar name={latestHealth.authorName} iconUrl={latestHealth.authorIconUrl} href={`/profile/${latestHealth.userId}`} /> 入力者：{latestHealth.authorName} さん</p>
              <p className={styles.cardText}>{latestHealth.content.split("｜").slice(0, 2).join(" · ")}</p>
              <p className={styles.cardEmpty}>{new Date(latestHealth.createdAt).toLocaleString("ja-JP")}</p>
            </>
          ) : (
            <p className={styles.cardEmpty}>本日の入力はまだです</p>
          )}
        </Link>

        {/* 忙しさ */}
        <Link href="/workload" className={styles.card}>
          <h2 className={styles.cardTitle}>
            仕事の忙しさ
            {workloadUnread && <span className={styles.badge}></span>}
          </h2>
          {todayWorkload ? (
            <><p className={styles.cardText}><UserAvatar name={todayWorkload.authorName} iconUrl={todayWorkload.authorIconUrl} href={`/profile/${todayWorkload.userId}`} /> {todayWorkload.authorName} さんの入力</p><p className={styles.cardText}>今日: {todayWorkload.content}</p><p className={styles.cardEmpty}>{new Date(todayWorkload.createdAt).toLocaleString("ja-JP")}</p></>
          ) : (
            <p className={styles.cardEmpty}>本日の入力はまだです</p>
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
              <UserAvatar name={latestDiary.authorName} iconUrl={latestDiary.authorIconUrl} href={`/profile/${latestDiary.userId}`} /> {latestDiary.authorName} さんが更新
              （{new Date(latestDiary.createdAt).toLocaleString()}）<br />{latestDiary.content.length > 70 ? `${latestDiary.content.slice(0, 70)}…` : latestDiary.content}
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