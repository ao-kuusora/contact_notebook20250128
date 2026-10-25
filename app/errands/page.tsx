"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Errands.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { MAX_CONTENT_LENGTH } from "@/lib/validate";

// 期限が近い順 (期限なしは最後)
function sortByDue(list: EntryDTO[]) {
  const time = (e: EntryDTO) =>
    e.dueDate ? new Date(e.dueDate).getTime() : Infinity;
  return [...list].sort((a, b) => time(a) - time(b));
}

export default function ErrandsPage() {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [entries, setEntries] = useState<EntryDTO[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [listError, setListError] = useState("");

  const fetchEntries = useCallback(async () => {
    setLoadError("");
    // チェック済みは一覧に出さないので、最初から未完了だけ取得する
    const result = await apiFetch<{ entries: EntryDTO[] }>(
      "/api/entries?type=ERRAND&done=false"
    );
    setLoading(false);

    if (!result.ok) {
      setLoadError(result.error);
      return;
    }
    setEntries(sortByDue(result.data.entries ?? []));
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (posting) return;

    if (!content.trim()) {
      setPostError("内容を入力してください");
      return;
    }

    setPosting(true);
    setPostError("");

    const result = await sendJson("/api/entries", {
      type: "ERRAND",
      content,
      dueDate: dueDate || null,
    });
    setPosting(false);

    if (!result.ok) {
      // 失敗時は入力内容を残す
      setPostError(result.error);
      return;
    }

    setContent("");
    setDueDate("");
    fetchEntries();
  }

  async function toggleDone(id: string, done: boolean) {
    setListError("");
    const result = await sendJson(`/api/entries/${id}`, { done }, "PATCH");

    if (!result.ok) {
      setListError(result.error);
    }
    // 成功・失敗どちらでもサーバーの状態に合わせ直す
    fetchEntries();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>おつかいメモ</h1>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} className={styles.card}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={MAX_CONTENT_LENGTH}
          className={styles.textarea}
          placeholder="買うものを書こう"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.input}
        />

        {postError && (
          <p className={styles.errorText} role="alert">
            {postError}
          </p>
        )}

        <button className={styles.button} disabled={posting}>
          {posting ? "送信中…" : "追加する"}
        </button>
      </form>

      {listError && (
        <p className={styles.errorText} role="alert">
          {listError}
        </p>
      )}

      {/* 一覧 */}
      <div className={styles.list}>
        {loadError ? (
          <div>
            <p className={styles.errorText}>{loadError}</p>
            <button onClick={fetchEntries} className={styles.retryButton}>
              再読み込み
            </button>
          </div>
        ) : loading ? (
          <p className={styles.stateText}>読み込み中…</p>
        ) : entries.length === 0 ? (
          <p className={styles.stateText}>おつかいメモはありません</p>
        ) : (
          entries.map((e) => {
            const now = new Date();
            const due = e.dueDate ? new Date(e.dueDate) : null;
            const isExpired = due && due < now;
            const isToday = due && due.toDateString() == now.toDateString();

            return (
              <div key={e.id} className={styles.item}>
                <div className={styles.row}>
                  <input
                    type="checkbox"
                    checked={e.done}
                    onChange={(ev) => toggleDone(e.id, ev.target.checked)}
                    aria-label="完了にする"
                  />
                  <Link href={`/errands/${e.id}`} className={styles.itemTitle}>
                    {e.content}
                  </Link>
                </div>

                {due && (
                  <p
                    className={`${styles.due} ${
                      isExpired
                        ? styles.expired
                        : isToday
                        ? styles.today
                        : styles.normal
                    }`}
                  >
                    期限: {due.toLocaleDateString()}
                    {isExpired && !isToday && "（期限切れ）"}
                    {isToday && "（今日中）"}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
