"use client";
import styles from "./UIWrapper.module.css";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function UIWrapper({ children }) {
  const pathname = usePathname();

  //UIを隠したいページをまとめて管理（フルパスで書く）
  const hideUIRoutes = [
    "/login",
    "/register",
    "/couple/join",
    "/couple/select",
  ];

  const hideUI = hideUIRoutes.includes(pathname);

  return (
    <div className={hideUI ? "" : styles.wrapper}>
      {!hideUI && <TopBar title="2人の連絡帳" />}
      <main className="w-full max-w-md mx-auto px-4">
        {children}
      </main>
      {!hideUI && <BottomNav />}
    </div>
  );
}