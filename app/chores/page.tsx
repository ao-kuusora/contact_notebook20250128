"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Chores.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { MAX_CONTENT_LENGTH } from "@/lib/validate";

const CHORE_OPTIONS = ["お洗濯", "ごみ捨て", "洗い物", "お掃除", "その他"];

export default function ChoresPage() {
  const [selected, setSelected] = useState("お洗濯");
  const [otherText, setOtherText] = useState("");
  const [entries, setEntries] = useState<EntryDTO[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");

  const fetchEntries = useCallback(async () => {
    setLoadError("");
    const result = await apiFetch<{ entries: EntryDTO[] }>(
      "/api/entries?type=CHORE"
    );
    setLoading(false);

    if (!result.ok) {
      setLoadError(result.error);
      return;
    }
    setEntries(result.data.entries ?? []);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (posting) return;

    const content = selected == "その他" ? otherText.trim() : selected;
    if (!content) {
      setPostError("内容を入力してください");
      return;
    }

    setPosting(true);
    setPostError("");

    const result = await sendJson("/api/entries", { type: "CHORE", content });
    setPosting(false);

    if (!result.ok) {
      // 失敗時は入力内容を残す
      setPostError(result.error);
      return;
    }

    setOtherText("");
    fetchEntries();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>家事報告</h1>

      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 選択肢（残す） */}
        <div className={styles.radioGroup}>
          {CHORE_OPTIONS.map((item) => (
            <label key={item} className={styles.radioItem}>
              <input
                type="radio"
                name="chore"
                value={item}
                checked={selected == item}
                onChange={() => setSelected(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* その他の入力欄 */}
        {selected == "その他" && (
          <textarea
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            maxLength={MAX_CONTENT_LENGTH}
            className={styles.textarea}
            placeholder="内容を入力してください"
          />
        )}

        {postError && (
          <p className={styles.errorText} role="alert">
            {postError}
          </p>
        )}

        <button className={styles.button} disabled={posting}>
          {posting ? "送信中…" : "投稿する"}
        </button>
      </form>

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
          <p className={styles.stateText}>まだ報告がありません</p>
        ) : (
          entries.map((e) => (
            <Link key={e.id} href={`/chores/${e.id}`} className={styles.item}>
              <p className={styles.itemMeta}>
                {e.authorName}・{new Date(e.createdAt).toLocaleString()}
              </p>
              <p className={styles.itemContent}>{e.content}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
