import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "認証に失敗しました" }, { status: 401 });
    }

    // JWT を発行
    const token = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "7d" }
    );

    // Cookie にセット
    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    });

    res.cookies.set("session", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      // 7日
      maxAge: 60 * 60 * 24 * 7, 
    });

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}