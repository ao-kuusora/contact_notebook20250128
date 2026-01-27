import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("session=")[1];
    if (!token) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    let inviteCode = generateInviteCode();

    while (await prisma.couple.findUnique({ where: { inviteCode } })) {
      inviteCode = generateInviteCode();
    }

    const couple = await prisma.couple.create({
      data: {
        inviteCode,
        users: { connect: { id: payload.userId } },
      },
    });

    await prisma.user.update({
      where: { id: payload.userId },
      data: { coupleId: couple.id },
    });

    return NextResponse.json({ inviteCode });

  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "連絡帳の作成に失敗しました" }, { status: 500 });
  }
}