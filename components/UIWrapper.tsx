"use client";
import styles from "./UIWrapper.module.css";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PushNotifications from "@/components/PushNotifications";

const hideUIRoutes = ["/login", "/register", "/couple/join", "/couple/select"];

export default function UIWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideUI = hideUIRoutes.includes(pathname);
  const showPushSettings = !hideUI && pathname !== "/push";

  return (
    <div className={hideUI ? "" : styles.wrapper}>
      {!hideUI && <TopBar title="2人の連絡帳" />}
      <main className={styles.main}>
        {showPushSettings && <PushNotifications />}
        {children}
      </main>
      {!hideUI && <BottomNav />}
    </div>
  );
}
