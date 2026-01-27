import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password, displayName } = await req.json();

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

    // ユーザー作成
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        displayName,
      },
    });

    // JWT 発行
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Cookie にセット
    const res = NextResponse.json({ ok: true });

    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "登録処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}