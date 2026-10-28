"use client";
import styles from "./UIWrapper.module.css";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const hideUIRoutes = ["/login", "/register", "/couple/join", "/couple/select"];

export default function UIWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideUI = hideUIRoutes.includes(pathname);

  return (
    <div className={hideUI ? "" : styles.wrapper}>
      {!hideUI && <TopBar title="2人の連絡帳" />}
      <main className={styles.main}>{children}</main>
      {!hideUI && <BottomNav />}
    </div>
  );
}
