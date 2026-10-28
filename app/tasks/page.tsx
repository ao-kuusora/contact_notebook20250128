"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import UserAvatar from "@/components/UserAvatar";
import styles from "./Tasks.module.css";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";
import { MAX_CONTENT_LENGTH } from "@/lib/validate";
import EntryActions from "@/components/EntryActions";

type Filter = "open" | "done" | "all";

function dueLabel(date: string | null) {
  if (!date) return "期限なし";
  const due = new Date(date);
  const today = new Date();
  const isToday = due.getFullYear() === today.getFullYear() &&
    due.getMonth() === today.getMonth() && due.getDate() === today.getDate();
  const isOverdue = due < new Date(today.getFullYear(), today.getMonth(), today.getDate()) && !isToday;
  return `${due.toLocaleDateString("ja-JP")}${isOverdue ? "（期限切れ）" : isToday ? "（今日）" : ""}`;
}

export default function TasksPage() {
  const [entries, setEntries] = useState<EntryDTO[]>([]);
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState<Filter>("open");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    const result = await apiFetch<{ entries: EntryDTO[] }>("/api/entries?type=TASK&limit=200");
    setLoading(false);
    if (!result.ok) {
      setLoadError(result.error);
      return;
    }
    setEntries((result.data.entries ?? []).sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return b.createdAt.localeCompare(a.createdAt);
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }));
  }, []);

  useEffect(() => { void fetchTasks(); }, [fetchTasks]);

  const visibleEntries = useMemo(() => {
    if (filter === "open") return entries.filter((entry) => !entry.done);
    if (filter === "done") return entries.filter((entry) => entry.done);
    return entries;
  }, [entries, filter]);

  const openCount = entries.filter((entry) => !entry.done).length;
  const doneCount = entries.filter((entry) => entry.done).length;

  async function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (posting) return;
    const trimmed = content.trim();
    if (!trimmed) { setFormError("タスク名を入力してください"); return; }
    if (trimmed.length > MAX_CONTENT_LENGTH) {
      setFormError(`タスク名は${MAX_CONTENT_LENGTH}文字以内で入力してください`);
      return;
    }

    setPosting(true);
    setFormError("");
    setNotice("");
    try {
      const result = await sendJson("/api/entries", {
        type: "TASK",
        content: trimmed,
        dueDate: dueDate ? new Date(`${dueDate}T12:00:00`).toISOString() : null,
      });
      if (!result.ok) { setFormError(result.error); return; }
      setContent("");
      setDueDate("");
      setNotice("タスクを追加しました");
      await fetchTasks();
    } catch {
      setFormError("タスクを追加できませんでした。通信状態を確認して再試行してください。");
    } finally {
      setPosting(false);
    }
  }

  async function toggleTask(entry: EntryDTO, done: boolean) {
    if (updatingId) return;
    setUpdatingId(entry.id);
    setNotice("");
    try {
      const result = await sendJson(`/api/entries/${entry.id}`, { done }, "PATCH");
      if (!result.ok) setLoadError(result.error);
      else setNotice(done ? "タスクを完了にしました" : "タスクを未完了に戻しました");
      await fetchTasks();
    } catch {
      setLoadError("状態を更新できませんでした。再読み込みしてください。");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>SHARED CHECKLIST</p>
        <h1 className={styles.title}>ふたりのタスク</h1>
        <p className={styles.description}>家のこと、忘れたくない用事を一緒に管理しよう。</p>
      </header>

      <div className={styles.stats} aria-label="タスク集計">
        <div className={styles.stat}><span>未完了</span><strong>{openCount}</strong></div>
        <div className={styles.stat}><span>完了</span><strong>{doneCount}</strong></div>
        <div className={styles.stat}><span>合計</span><strong>{entries.length}</strong></div>
      </div>

      <form className={styles.form} onSubmit={createTask}>
        <h2>タスクを追加</h2>
        <label className={styles.label} htmlFor="task-content">やること</label>
        <textarea id="task-content" className={styles.textarea} value={content}
          onChange={(event) => { setContent(event.target.value); setFormError(""); }}
          maxLength={MAX_CONTENT_LENGTH} rows={3}
          placeholder="例：洗剤を買う、段ボールをまとめる" required />
        <div className={styles.formFooter}>
          <label className={styles.dateLabel} htmlFor="task-due-date">期限（任意）
            <input id="task-due-date" className={styles.dateInput} type="date"
              value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
          </label>
          <button className={styles.primaryButton} type="submit" disabled={posting}>
            {posting ? "追加中…" : "＋ 追加する"}
          </button>
        </div>
        {formError && <p className={styles.error} role="alert">{formError}</p>}
      </form>

      {notice && <p className={styles.notice} role="status">{notice}</p>}
      {loadError && <div className={styles.errorPanel}>
        <p role="alert">{loadError}</p>
        <button className={styles.secondaryButton} onClick={() => void fetchTasks()}>再読み込み</button>
      </div>}

      <div className={styles.listHeader}>
        <h2>タスク一覧</h2>
        <div className={styles.filters} aria-label="表示するタスク">
          {([
            ["open", `未完了 ${openCount}`], ["done", `完了 ${doneCount}`], ["all", "すべて"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button"
              className={filter === value ? styles.filterActive : styles.filter}
              onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</button>
          ))}
        </div>
      </div>

      {loading ? <p className={styles.empty}>読み込み中…</p> :
       visibleEntries.length === 0 ? <div className={styles.empty}>
         <span className={styles.emptyIcon}>✓</span>
         <p>{filter === "done" ? "完了したタスクはまだありません" : filter === "open" ? "未完了のタスクはありません。いい感じ！" : "タスクはまだありません"}</p>
       </div> : (
        <ul className={styles.list}>
          {visibleEntries.map((entry) => (
            <li key={entry.id} className={`${styles.task} ${entry.done ? styles.taskDone : ""}`}>
              <label className={styles.taskMain}>
                <input type="checkbox" checked={entry.done} disabled={updatingId !== null}
                  onChange={(event) => void toggleTask(entry, event.target.checked)}
                  aria-label={`${entry.content}を${entry.done ? "未完了" : "完了"}にする`} />
                <span className={styles.taskContent}>
                  <span className={styles.taskTitle}>{entry.content}</span>
                  <span className={styles.taskMeta}><><UserAvatar name={entry.authorName} iconUrl={entry.authorIconUrl} href={`/profile/${entry.userId}`} /> {entry.authorName}</>が追加 · {dueLabel(entry.dueDate)}</span>
                </span>
              </label>
              <EntryActions entry={entry} onChanged={() => void fetchTasks()} onDeleted={() => void fetchTasks()} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
