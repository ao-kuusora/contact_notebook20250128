"use client";

import { useEffect, useState } from "react";

export default function ErrandDetail({ params }) {
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    fetch(`/api/entries/${params.id}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => setEntry(data.entry));
  }, []);

  if (!entry) return <p>読み込み中…</p>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">おつかいメモ</h1>

      <p className="text-gray-500">
        {entry.user.displayName}・{new Date(entry.createdAt).toLocaleString()}
      </p>

      <p className="mt-4 whitespace-pre-wrap">{entry.content}</p>
    </div>
  );
}