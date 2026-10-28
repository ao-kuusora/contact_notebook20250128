"use client";

import { useEffect, useState } from "react";
import styles from "./PushNotifications.module.css";

function urlBase64ToUint8Array(value: string) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}

export default function PushNotifications() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    setSupported(ok);
    if (!ok) return;
    navigator.serviceWorker.register("/sw.js")
      .then((registration) => registration.pushManager.getSubscription())
      .then((subscription) => setEnabled(Boolean(subscription)))
      .catch(() => setMessage("通知の準備に失敗しました。ページを再読み込みしてください。"));
  }, []);

  async function enableNotifications() {
    setBusy(true);
    setMessage("");
    try {
      if (!supported) throw new Error("このブラウザはプッシュ通知に対応していません。");
      if (Notification.permission === "denied") {
        throw new Error("ブラウザの設定で通知がブロックされています。サイト設定から許可してください。");
      }
      const permission = await Notification.requestPermission();
      if (permission !== "granted") throw new Error("通知が許可されませんでした。");
      const keyResponse = await fetch("/api/push/vapid-public-key", { cache: "no-store" });
      const keyData = await keyResponse.json();
      if (!keyResponse.ok || !keyData.publicKey) {
        throw new Error(keyData.error || "通知サーバーの設定がまだ完了していません。");
      }
      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyData.publicKey),
      });
      const response = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "通知を登録できませんでした。");
      setEnabled(true);
      setMessage("通知を有効にしました！相手の新しい投稿をお知らせします。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "通知を有効にできませんでした。");
    } finally {
      setBusy(false);
    }
  }

  async function disableNotifications() {
    setBusy(true);
    setMessage("");
    try {
      const registration = await navigator.serviceWorker.getRegistration("/");
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }
      setEnabled(false);
      setMessage("この端末の通知を解除しました。");
    } catch {
      setMessage("通知を解除できませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  }

  if (!supported) {
    return <section className={styles.card}><strong>スマホ通知</strong><p>このブラウザはプッシュ通知に対応していません。iPhoneではiOS 16.4以降のSafariでホーム画面に追加して開いてください。</p></section>;
  }

  return (
    <section className={styles.card} aria-label="プッシュ通知設定">
      <div className={styles.copy}>
        <strong>📣 スマホ通知</strong>
        <p>相手が新しく投稿したとき、この端末にお知らせします。</p>
        {typeof window !== "undefined" && /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.matchMedia("(display-mode: standalone)").matches && <p className={styles.hint}>iPhoneはSafariの共有メニューから「ホーム画面に追加」し、追加したアイコンから開いてください。</p>}
      </div>
      <button type="button" onClick={enabled ? disableNotifications : enableNotifications} disabled={busy} className={styles.button}>
        {busy ? "処理中…" : enabled ? "通知を解除" : "この端末で通知を有効にする"}
      </button>
      {message && <p role="status" className={styles.message}>{message}</p>}
    </section>
  );
}
