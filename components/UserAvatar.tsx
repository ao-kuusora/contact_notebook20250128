"use client";

import styles from "./UserAvatar.module.css";

type UserAvatarProps = {
  name: string;
  iconUrl?: string | null;
  size?: number;
  href?: string;
};

export default function UserAvatar({ name, iconUrl, size = 34, href }: UserAvatarProps) {
  const content = iconUrl
    ? <img src={iconUrl} alt="" />
    : <span aria-hidden="true">{name.trim().charAt(0) || "?"}</span>;
  const style = { width: size, height: size, minWidth: size };
  return href
    ? <a className={styles.avatar} style={style} href={href} aria-label={`${name}さんのプロフィール`}>{content}</a>
    : <span className={styles.avatar} style={style} aria-label={name}>{content}</span>;
}
