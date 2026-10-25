"use client";

import { useEffect, useState } from "react";
import styles from "./Diary.module.css";

type DiaryEntry = {
  id: string;
  content: string;
  isMine: boolean;
  authorName: string;
  createdAt: string;
  iconUrl?: string | null;
};

type ApiError = {
  error?: string;
  message?: string;
};

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");

  async function fetchDiary(date?: string) {
    const params = new URLSearchParams({ type: "DIARY" });
    if (date) params.set("date", date);

    const res = await fetch(`/api/entries?${params.toString()}`, {
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({}))) as {
      entries?: DiaryEntry[];
      error?: string;
      message?: string;
    };

    if (!res.ok) {
      throw new Error(data.error || data.message || "日記の読み込みに失敗しました。");
    }

    setEntries(data.entries ?? []);
  }

  useEffect(() => {
    fetchDiary().catch((error: unknown) => {
      setErrorMessage(
        error instanceof Error ? error.message : "日記の読み込みに失敗しました。"
      );
    });
  }, []);

  async function searchByDate() {
    if (!selectedDate) {
      setErrorMessage("検索する日付を選んでください。");
      return;
    }

    setErrorMessage("");
    setNoticeMessage("");
    try {
      await fetchDiary(selectedDate);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "日記の読み込みに失敗しました。"
      );
    }
  }

  async function submit() {
    if (isSubmitting) return;

    if (!content.trim()) {
      setErrorMessage("日記の内容を入力してください。");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setNoticeMessage("");

    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DIARY",
          content: content.trim(),
          dueDate: null,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as ApiError;

      if (!res.ok) {
        throw new Error(data.error || data.message || "日記を投稿できませんでした。");
      }

      // 投稿に成功したときだけ入力欄を空にする。
      setContent("");
      setSelectedDate("");
      await fetchDiary();
      setNoticeMessage("日記を投稿しました。");
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : "日記を投稿できませんでした。"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (entries.length === 0) return;

    const latest = entries[0];
    if (latest.isMine) return;

    fetch("/api/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entryId: latest.id }),
    }).catch(() => {
      // 既読更新に失敗しても、日記一覧の表示は維持する。
    });
  }, [entries]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>交換日記</h1>

      <div className={styles.searchArea}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.dateInput}
          aria-label="検索する日付"
        />
        <button onClick={searchByDate} className={styles.searchButton}>
          日付で検索
        </button>
      </div>

      {errorMessage && (
        <p role="alert" className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
      {noticeMessage && (
        <p role="status" className={styles.noticeMessage}>
          {noticeMessage}
        </p>
      )}

      <div className={styles.page}>
        {entries.length === 0 ? (
          <p className={styles.empty}>この日の日記はありません</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className={`${styles.diaryEntry} ${
                entry.isMine ? styles.mine : styles.theirs
              }`}
            >
              <a href={`/diary/${entry.id}`} className={styles.link}>
                {entry.content.slice(0, 40)}
                {entry.content.length > 40 ? "…" : ""}
              </a>

              <div className={styles.meta}>
                {entry.iconUrl && (
                  <img src={entry.iconUrl} alt="" className={styles.icon} />
                )}
                <span className={styles.author}>{entry.authorName}</span>
                <span className={styles.date}>
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.writeArea}>
        <textarea
          className={styles.textarea}
          rows={4}
          placeholder="今日の気持ちを書こう"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          aria-label="日記の内容"
          maxLength={10000}
        />

        <button
          onClick={submit}
          className={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? "投稿中…" : "今日の日記を書く"}
        </button>
      </div>
    </div>
  );
}
