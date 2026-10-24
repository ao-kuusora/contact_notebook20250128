import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sessionCookieOptions, signSession } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = body?.password;

    if (!email || typeof password !== "string" || password.length === 0) {
      return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
    }

    // ブルートフォース対策 (15分あたり10回まで)
    if (!rateLimit(`login:${clientIp(req)}:${email}`, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "試行回数が多すぎます。しばらくしてからお試しください" },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
    }

    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    });

    res.cookies.set("session", signSession(user.id), sessionCookieOptions());

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
