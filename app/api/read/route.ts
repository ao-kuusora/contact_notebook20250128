import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";

  //cookieをそのまま渡して/api/auth/me を呼ぶ
  const userRes = await fetch("http://localhost:3000/api/auth/me", {
    headers: {
      cookie,
    },
  });

  const userData = await userRes.json();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { entryId } = await req.json();

  const result = await prisma.readStatus.upsert({
    where: {
      entryId_userId: {
        entryId,
        userId: user.id,
      },
    },
    update: {
      isRead: true,
      readAt: new Date(),
    },
    create: {
      entryId,
      userId: user.id,
      isRead: true,
    },
  });

  return NextResponse.json({ ok: true, readStatus: result });
}