import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user.coupleId) {
      return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    const entryId = body?.entryId;
    if (typeof entryId !== "string" || entryId.length === 0) {
      return NextResponse.json({ error: "entryId が不正です" }, { status: 400 });
    }

    // 自分のカップルの投稿だけ既読にできる
    const entry = await prisma.entry.findFirst({
      where: { id: entryId, coupleId: user.coupleId },
      select: { id: true },
    });
    if (!entry) {
      return NextResponse.json({ error: "見つかりません" }, { status: 404 });
    }

    const result = await prisma.readStatus.upsert({
      where: {
        entryId_userId: {
          entryId: entry.id,
          userId: user.id,
        },
      },
      update: {
        isRead: true,
        readAt: new Date(),
      },
      create: {
        entryId: entry.id,
        userId: user.id,
        isRead: true,
      },
    });

    return NextResponse.json({ ok: true, readStatus: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "既読の更新に失敗しました" }, { status: 500 });
  }
}
