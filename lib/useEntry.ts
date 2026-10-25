"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch, sendJson } from "@/lib/api";
import type { EntryDTO } from "@/lib/types";

/**
 * 一覧画面用: 画面に表示した「相手の未読の投稿」をまとめて既読にする。
 * 表示していない投稿 (別の日付・100件より古いもの) は既読にしない。
 */
export function useMarkRead(entries: EntryDTO[]) {
  const sent = useRef(new Set<string>());

  useEffect(() => {
    const ids = entries
      .filter((e) => !e.isMine && !e.isRead && !sent.current.has(e.id))
      .map((e) => e.id)
      .slice(0, 200);
    if (ids.length === 0) return;

    ids.forEach((id) => sent.current.add(id));
    sendJson("/api/read", { entryIds: ids }).then((r) => {
      // 失敗したら次の表示でもう一度送れるようにする
      if (!r.ok) ids.forEach((id) => sent.current.delete(id));
    });
  }, [entries]);
}

/**
 * 詳細画面用: 投稿 1 件を取得し、相手の投稿なら開いた時点で既読にする。
 */
export function useEntry(id: string) {
  const [entry, setEntry] = useState<EntryDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    const result = await apiFetch<{ entry: EntryDTO }>(`/api/entries/${id}`);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setEntry(result.data.entry);
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  useMarkRead(entry ? [entry] : []);

  return { entry, setEntry, loading, error, reload };
}
