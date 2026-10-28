"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import PushNotifications from "@/components/PushNotifications";
import styles from "./settings.module.css";

type AccountUser = { email: string; displayName: string; iconUrl: string | null };
type Notice = { type: "success" | "error"; text: string } | null;

export default function SettingsPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [imageBusy, setImageBusy] = useState(false);
  const [imageNotice, setImageNotice] = useState<Notice>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);
  const [emailBusy, setEmailBusy] = useState(false);
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [profileNotice, setProfileNotice] = useState<Notice>(null);
  const [emailNotice, setEmailNotice] = useState<Notice>(null);
  const [passwordNotice, setPasswordNotice] = useState<Notice>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.user) throw new Error("アカウント情報を読み込めませんでした。ログインし直してください。");
        if (!active) return;
        const nextUser = data.user as AccountUser;
        setUser(nextUser);
        setProfileName(nextUser.displayName || "");
        setIconUrl(nextUser.iconUrl || "");
        setEmail(nextUser.email || "");
      })
      .catch((error) => {
        if (active) setProfileNotice({ type: "error", text: error instanceof Error ? error.message : "読み込みに失敗しました。" });
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function saveSettings(
    event: FormEvent<HTMLFormElement>,
    action: "profile" | "email" | "password",
    values: Record<string, string>,
    setNotice: (notice: Notice) => void,
    setBusy: (busy: boolean) => void,
  ) {
    event.preventDefault();
    setNotice(null);
    setBusy(true);
    try {
      const response = await fetch("/api/account/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...values }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "保存できませんでした。");
      if (action === "profile" && data.user) {
        setUser((previous) => previous ? { ...previous, ...data.user } : previous);
      }
      if (action === "email" && data.user) {
        setEmail(data.user.email);
        setUser((previous) => previous ? { ...previous, email: data.user.email } : previous);
        setEmailPassword("");
      }
      if (action === "password") {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
      setNotice({ type: "success", text: data.message || "保存しました。" });
    } catch (error) {
      setNotice({ type: "error", text: error instanceof Error ? error.message : "保存できませんでした。" });
    } finally {
      setBusy(false);
    }
  }

  async function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageNotice(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImageNotice({ type: "error", text: "JPEG、PNG、WebP形式の写真を選択してください。" });
      event.target.value = "";
      return;
    }
    setImageBusy(true);
    try {
      const compressed = await new Promise<Blob>((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
          URL.revokeObjectURL(objectUrl);
          const scale = Math.min(1, 512 / Math.max(image.naturalWidth, image.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
          const context = canvas.getContext("2d");
          if (!context) { reject(new Error("写真を処理できませんでした。")); return; }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("写真を圧縮できませんでした。")), "image/jpeg", 0.78);
        };
        image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("写真を読み込めませんでした。")); };
        image.src = objectUrl;
      });
      const formData = new FormData();
      formData.append("image", compressed, "profile.jpg");
      const response = await fetch("/api/account/profile-image", { method: "POST", body: formData });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "写真を保存できませんでした。");
      setIconUrl(data.iconUrl);
      setUser((previous) => previous ? { ...previous, iconUrl: data.iconUrl } : previous);
      setImageNotice({ type: "success", text: "プロフィール写真を保存しました。" });
    } catch (error) {
      setImageNotice({ type: "error", text: error instanceof Error ? error.message : "写真を保存できませんでした。" });
    } finally {
      setImageBusy(false);
      event.target.value = "";
    }
  }

  function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordNotice(null);
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ type: "error", text: "新しいパスワードが一致しません。" });
      return;
    }
    void saveSettings(event, "password", { currentPassword, newPassword }, setPasswordNotice, setPasswordBusy);
  }

  return (
    <div className={styles.page}>
      <header className={styles.heading}>
        <span className={styles.eyebrow}>ACCOUNT & PREFERENCES</span>
        <h1>設定</h1>
        <p>プロフィールやアカウント情報、通知を管理できます。</p>
      </header>

      {loading ? (
        <div className={styles.loading} role="status">アカウント情報を読み込み中…</div>
      ) : (
        <>
          <section className={styles.section} aria-labelledby="profile-heading">
            <div className={styles.sectionHeading}>
              <span className={styles.sectionIcon} aria-hidden="true">✿</span>
              <div><h2 id="profile-heading">プロフィール編集</h2><p>相手に表示されるあなたの情報です。</p></div>
            </div>
            <form className={styles.form} onSubmit={(event) => void saveSettings(event, "profile", { displayName: profileName, iconUrl }, setProfileNotice, setProfileBusy)}>
              <div className={styles.avatarUpload}>
                <div className={styles.avatarPreview}>
                  {iconUrl ? <img src={iconUrl} alt="プロフィール画像プレビュー" /> : <span aria-hidden="true">{profileName.trim().charAt(0) || "♡"}</span>}
                </div>
                <div className={styles.uploadActions}>
                  <input ref={imageInputRef} className={styles.fileInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} aria-label="プロフィール写真を選択" />
                  <button className={styles.secondaryButton} type="button" onClick={() => imageInputRef.current?.click()} disabled={imageBusy}>
                    {imageBusy ? "写真を保存中…" : "スマホの写真から選ぶ"}
                  </button>
                  <small>JPEG・PNG・WebPに対応</small>
                </div>
              </div>
              <NoticeView notice={imageNotice} />
              <label className={styles.field}>
                <span>表示名</span>
                <input value={profileName} onChange={(event) => setProfileName(event.target.value)} maxLength={50} required placeholder="表示名を入力" />
                <small>1〜50文字</small>
              </label>
              <label className={styles.field}>
                <span>アイコン画像URL <em>任意</em></span>
                <input type="url" value={iconUrl.startsWith("data:") ? "" : iconUrl} onChange={(event) => setIconUrl(event.target.value)} placeholder="https://example.com/icon.png" />
                <small>画像URLを空欄にすると、表示名の頭文字を表示します。</small>
              </label>
              <NoticeView notice={profileNotice} />
              <button className={styles.primaryButton} type="submit" disabled={profileBusy}>{profileBusy ? "保存中…" : "プロフィールを保存"}</button>
            </form>
          </section>

          <section className={styles.section} aria-labelledby="email-heading">
            <div className={styles.sectionHeading}>
              <span className={styles.sectionIcon} aria-hidden="true">✉</span>
              <div><h2 id="email-heading">メールアドレス</h2><p>ログインに使用するメールアドレスを変更します。</p></div>
            </div>
            <form className={styles.form} onSubmit={(event) => void saveSettings(event, "email", { email, currentPassword: emailPassword }, setEmailNotice, setEmailBusy)}>
              <label className={styles.field}>
                <span>新しいメールアドレス</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
              </label>
              <label className={styles.field}>
                <span>現在のパスワード</span>
                <input type="password" value={emailPassword} onChange={(event) => setEmailPassword(event.target.value)} autoComplete="current-password" required />
                <small>本人確認のために入力してください。</small>
              </label>
              <NoticeView notice={emailNotice} />
              <button className={styles.primaryButton} type="submit" disabled={emailBusy}>{emailBusy ? "変更中…" : "メールアドレスを変更"}</button>
            </form>
          </section>

          <section className={styles.section} aria-labelledby="password-heading">
            <div className={styles.sectionHeading}>
              <span className={styles.sectionIcon} aria-hidden="true">⌑</span>
              <div><h2 id="password-heading">パスワード変更</h2><p>安全のため、他のサービスと異なるパスワードがおすすめです。</p></div>
            </div>
            <form className={styles.form} onSubmit={savePassword}>
              <label className={styles.field}>
                <span>現在のパスワード</span>
                <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required />
              </label>
              <label className={styles.field}>
                <span>新しいパスワード</span>
                <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={8} maxLength={72} autoComplete="new-password" required />
                <small>8〜72文字</small>
              </label>
              <label className={styles.field}>
                <span>新しいパスワード（確認）</span>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} maxLength={72} autoComplete="new-password" required />
              </label>
              <NoticeView notice={passwordNotice} />
              <button className={styles.primaryButton} type="submit" disabled={passwordBusy}>{passwordBusy ? "変更中…" : "パスワードを変更"}</button>
            </form>
          </section>

          <section className={styles.notificationSection} aria-labelledby="notification-heading">
            <div className={styles.sectionHeading}>
              <span className={styles.sectionIcon} aria-hidden="true">♧</span>
              <div><h2 id="notification-heading">通知設定</h2><p>相手の新しい投稿をこの端末で受け取ります。</p></div>
            </div>
            <PushNotifications />
          </section>

          <section className={styles.accountSummary}>
            <span className={styles.summaryLabel}>ログイン中のアカウント</span>
            <strong>{user?.displayName || profileName}</strong>
            <span>{user?.email || email}</span>
          </section>
        </>
      )}
    </div>
  );
}

function NoticeView({ notice }: { notice: Notice }) {
  if (!notice) return null;
  return <p className={notice.type === "success" ? styles.successNotice : styles.errorNotice} role="status">{notice.text}</p>;
}
