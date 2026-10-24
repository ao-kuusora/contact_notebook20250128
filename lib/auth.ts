import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7日

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET が設定されていません (.env.local を確認してください)");
  }
  return secret;
}

/** セッション Cookie の共通オプション (login / register / logout で共用) */
export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function signSession(userId: string): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: "7d" });
}

/**
 * Cookie の session トークンを検証して、ログイン中のユーザーを返す。
 * 未ログイン・トークン不正・ユーザー不在の場合は null。
 * passwordHash は含めない。
 */
export async function getCurrentUser() {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, getJwtSecret());
    if (typeof payload === "string" || typeof payload.userId !== "string") {
      return null;
    }

    return await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        iconUrl: true,
        coupleId: true,
      },
    });
  } catch {
    return null;
  }
}
