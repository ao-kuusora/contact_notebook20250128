"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";
import styles from "./profile.module.css";

type Member = { id: string; displayName: string; iconUrl: string | null };
type Me = { id: string; displayName: string; email: string; iconUrl: string | null; couple?: { users: Member[] } | null };

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" }).then(async (response) => {
      const data = await response.json();
      if (!response.ok || !data.user) throw new Error("ログインしてください。");
      const current = data.user as Me;
      const members: Member[] = current.couple?.users ?? [];
      const target = members.find((item) => item.id === params.id);
      if (!target) throw new Error("このプロフィールは閲覧できません。連絡帳のお相手のみ閲覧できます。");
      if (active) { setMe(current); setMember(target); }
    }).catch((e) => {
      if (active) setError(e instanceof Error ? e.message : "プロフィールを読み込めませんでした。");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [params.id]);

  if (loading) return <main className={styles.page}>プロフィールを読み込み中…</main>;
  if (error || !member || !me) return <main className={styles.page}><p className={styles.error}>{error || "プロフィールが見つかりません。"}</p><button onClick={() => router.back()} className={styles.button}>戻る</button></main>;

  return <main className={styles.page}>
    <button onClick={() => router.back()} className={styles.back}>‹ 戻る</button>
    <section className={styles.card}>
      <UserAvatar name={member.displayName} iconUrl={member.iconUrl} size={112} />
      <p className={styles.eyebrow}>PROFILE</p>
      <h1>{member.displayName}</h1>
      <p className={styles.note}>{member.id === me.id ? "あなたのプロフィール" : "ふたりの連絡帳のお相手"}</p>
      {member.id === me.id && <div className={styles.email}><span>登録メールアドレス</span><strong>{me.email}</strong></div>}
      <p className={styles.privacy}>プロフィール情報は、同じ連絡帳に参加しているメンバーだけが閲覧できます。</p>
    </section>
  </main>;
}
