"use client";

import { useRouter } from "next/navigation";
import styles from "./SimpleEntryDetail.module.css";
import { useEntry } from "@/lib/useEntry";
import EntryActions from "@/components/EntryActions";

export default function SimpleEntryDetail({
  id,
  heading,
}: {
  id: string;
  heading: string;
}) {
  const { entry, loading, error, reload } = useEntry(id);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{heading}</h1>

      {loading && !entry && <p className={styles.stateText}>読み込み中…</p>}

      {error && (
        <div>
          <p className={styles.errorText}>{error}</p>
          <button onClick={reload} className={styles.retryButton}>再読み込み</button>
        </div>
      )}

      {entry && (
        <div className={styles.card}>
          <p className={styles.meta}>
            {entry.authorName}・{new Date(entry.createdAt).toLocaleString()}
          </p>
          <p className={styles.content}>{entry.content}</p>
          {entry.dueDate && (
            <p className={styles.due}>
              期限: {new Date(entry.dueDate).toLocaleDateString()}
            </p>
          )}
          <EntryActions entry={entry} onChanged={reload} onDeleted={() => router.back()} />
        </div>
      )}
    </div>
  );
}
