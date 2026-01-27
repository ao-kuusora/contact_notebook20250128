"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

export default function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/chores", label: "家事" },
    { href: "/errands", label: "おつかい" },
    { href: "/dashboard", label: "ホーム" }, 
    { href: "/workload", label: "忙しさ" },
    { href: "/diary", label: "日記" },
  ];

  return (
    <nav className={styles.nav}>
      {items.map((item) => {
        const active = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.item} ${active ? styles.active : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}