"use client";

import styles from "../DiaryDetail.module.css";
import { useEntry } from "@/lib/useEntry";

export default function DiaryDetailPage({ params }: { params: { id: string } }) {
  // 取得と、相手の日記を開いたときの既読化は useEntry がまとめて行う
  const { entry, loading, error, reload } = useEntry(params.id);

  return (
    <div className={styles.container}>
      {loading && !entry && (
        <div className={styles.loadingOverlay}>
          <p className={styles.loadingText}>読み込み中…</p>
        </div>
      )}

      {error && (
        <div className={styles.empty}>
          <p className={styles.errorText}>{error}</p>
          <button onClick={reload} className={styles.retryButton}>
            再読み込み
          </button>
        </div>
      )}

      {entry && (
        <div
          className={`${styles.diaryEntry} ${
            entry.isMine ? styles.mine : styles.theirs
          }`}
        >
          <div className={styles.content}>{entry.content}</div>

          <div className={styles.meta}>
            <span className={styles.author}>{entry.authorName}</span>
            <span className={styles.date}>
              {new Date(entry.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
