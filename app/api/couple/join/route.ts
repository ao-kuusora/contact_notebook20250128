import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("session=")[1];
    if (!token) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { code } = await req.json();

    // inviteCodeで検索
    const couple = await prisma.couple.findUnique({
      where: { inviteCode: code },
    });

    if (!couple) {
      return NextResponse.json({ error: "無効なコードです" }, { status: 400 });
    }

    // userにcoupleIdを紐づける
    await prisma.user.update({
      where: { id: payload.userId },
      data: { coupleId: couple.id },
    });

    return NextResponse.json({ ok: true });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "参加に失敗しました" }, { status: 500 });
  }
}