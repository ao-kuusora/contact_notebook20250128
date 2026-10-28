import PushNotifications from "@/components/PushNotifications";

export default function PushSettingsPage() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 100px" }}>
      <h1>通知設定</h1>
      <p>端末ごとに通知を有効にしてください。ふたりが使うスマホそれぞれで設定できます。</p>
      <PushNotifications />
    </div>
  );
}
