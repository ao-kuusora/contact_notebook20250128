"use client";

import { useRouter } from "next/navigation";
import styles from "./Select.module.css";

export default function CoupleSelectPage() {
  const router = useRouter();

  return (
    <div className={styles.screen}>
      <h1 className={styles.title}>2人の連絡帳を始めましょう</h1>
      <p className={styles.subtitle}>
        連絡帳IDを発行する場合は<strong>連絡帳を作る</strong>を選択して、お相手に<strong>連絡帳ID</strong>を共有してください。
      </p>
       <p className={styles.subtitle}>
         すでに連絡帳IDを持っている方は<strong>相手の連絡帳に参加する</strong>を選択して連絡帳IDを入力してください。
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.create}
          onClick={() => router.push("/dashboard")}
        >
          連絡帳を作る
        </button>

        <button
          className={styles.join}
          onClick={() => router.push("/couple/join")}
        >
          相手の連絡帳に参加する
        </button>
      </div>
    </div>
  );
}