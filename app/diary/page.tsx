"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Diary.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { useMarkRead } from "@/lib/useEntry";
import { MAX_CONTENT_LENGTH } from "@/lib/validate";

export default function DiaryPage() {
  const [entries, setEntries] = useState<EntryDTO[]>([]);
  useMarkRead(entries);
  const [content, setContent] = useState("");

  // 入力中の日付 / 実際に絞り込みに使っている日付 (空なら全件)
  const [selectedDate, setSelectedDate] = useState("");
  const [activeDate, setActiveDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [notice, setNotice] = useState("");

  // 連打・通信順の入れ替わりで古い結果が後から表示されないようにする
  const requestId = useRef(0);

  const fetchDiary = useCallback(async (date: string) => {
    const id = ++requestId.current;
    setLoading(true);
    setLoadError("");

    const url = date
      ? `/api/entries?type=DIARY&date=${encodeURIComponent(date)}`
      : `/api/entries?type=DIARY`;
    const result = await apiFetch<{ entries: EntryDTO[] }>(url);

    if (id !== requestId.current) return;
    setLoading(false);

    if (!result.ok) {
      setLoadError(result.error);
      return;
    }
    setEntries(result.data.entries ?? []);
    setActiveDate(date);
  }, []);

  useEffect(() => {
    fetchDiary("");
  }, [fetchDiary]);

  async function submit() {
    if (posting) return;
    setNotice("");

    if (!content.trim()) {
      setPostError("日記の本文を入力してください");
      return;
    }

    setPosting(true);
    setPostError("");

    const result = await sendJson("/api/entries", {
      type: "DIARY",
      content,
      dueDate: null,
    });

    setPosting(false);

    if (!result.ok) {
      // 失敗したときは本文を消さない (書き直しにならないように)
      setPostError(result.error);
      return;
    }

    setContent("");

    // 過去の日付で絞り込み中に投稿すると、新しい日記が一覧に出ず
    // 「投稿できていない」ように見えるので、絞り込みを解除して全件を表示する
    if (activeDate || selectedDate) {
      setSelectedDate("");
      setNotice("日記を投稿しました(日付の絞り込みは解除しました)");
    } else {
      setNotice("日記を投稿しました");
    }
    fetchDiary("");
  }

  function searchByDate() {
    if (!selectedDate) return;
    fetchDiary(selectedDate);
  }

  function clearSearch() {
    setSelectedDate("");
    fetchDiary("");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>交換日記</h1>

      <div className={styles.searchArea}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.dateInput}
        />
        <button onClick={searchByDate} className={styles.searchButton}>
          日付で検索
        </button>
        {activeDate && (
          <button onClick={clearSearch} className={styles.clearButton}>
            全部
          </button>
        )}
      </div>

      <div className={styles.page}>
        {loadError ? (
          <div className={styles.empty}>
            <p className={styles.errorText}>{loadError}</p>
            <button
              onClick={() => fetchDiary(activeDate)}
              className={styles.retryButton}
            >
              再読み込み
            </button>
          </div>
        ) : loading && entries.length === 0 ? (
          <p className={styles.empty}>読み込み中…</p>
        ) : entries.length == 0 ? (
          <p className={styles.empty}>
            {activeDate ? "この日の日記はありません" : "まだ日記がありません"}
          </p>
        ) : (
          entries.map((e) => (
            <div
              key={e.id}
              className={`${styles.diaryEntry} ${
                e.isMine ? styles.mine : styles.theirs
              }`}
            >
              <Link href={`/diary/${e.id}`} className={styles.link}>
                {e.content.length > 40 ? `${e.content.slice(0, 40)}…` : e.content}
              </Link>

              <div className={styles.meta}>
                <span className={styles.author}>{e.authorName}</span>
                <span className={styles.date}>
                  {new Date(e.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.writeArea}>
        {postError && (
          <p className={styles.errorText} role="alert">
            {postError}
          </p>
        )}
        {notice && !postError && (
          <p className={styles.noticeText} role="status">
            {notice}
          </p>
        )}
        <textarea
          className={styles.textarea}
          rows={4}
          maxLength={MAX_CONTENT_LENGTH}
          placeholder="今日の気持ちを書こう"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={submit} disabled={posting} className={styles.button}>
          {posting ? "送信中…" : "今日の日記を書く"}
        </button>
      </div>
    </div>
  );
}
