import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sessionCookieOptions, signSession } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { isEmail, isNonEmptyString } from "@/lib/validate";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72; // bcrypt は72バイトまで

export async function POST(req: Request) {
  try {
    if (!rateLimit(`register:${clientIp(req)}`, 10, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "試行回数が多すぎます。しばらくしてからお試しください" },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = body?.password;
    const displayName = typeof body?.displayName === "string" ? body.displayName.trim() : "";

    if (!isEmail(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
    }
    if (
      typeof password !== "string" ||
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      return NextResponse.json(
        { error: `パスワードは${MIN_PASSWORD_LENGTH}文字以上で入力してください` },
        { status: 400 }
      );
    }
    if (!isNonEmptyString(displayName, 50)) {
      return NextResponse.json({ error: "表示名は1〜50文字で入力してください" }, { status: 400 });
    }

    // すでに登録済みかチェック
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 400 }
      );
    }

    // パスワードをハッシュ化
    const passwordHash = await bcrypt.hash(password, 10);

    // ユーザー作成 (同時登録で unique 制約に当たった場合は下の catch で処理)
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
      },
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set("session", signSession(user.id), sessionCookieOptions());

    return res;
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json(
        { error: "このメールアドレスは既に登録されています" },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json(
      { error: "登録処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
