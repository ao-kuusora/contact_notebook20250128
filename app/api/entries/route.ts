import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("session=")[1];
    if (!token) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.coupleId) {
      return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });
    }

    const { type, content, dueDate } = await req.json();

    const entry = await prisma.entry.create({
      data: {
        type,
        content,
        dueDate: dueDate ? new Date(dueDate) : null,
        done: false,
        userId: user.id,
        coupleId: user.coupleId,
      },
    });

    return NextResponse.json({ entry });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("session=")[1];
    if (!token) return NextResponse.json({ entries: [] });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.coupleId) {
      return NextResponse.json({ entries: [] });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const date = searchParams.get("date");

    let dateFilter = {};

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      dateFilter = {
        createdAt: {
          gte: start,
          lte: end,
        },
      };
    }

    // 全部新しい順に統一
    const order = { createdAt: Prisma.SortOrder.desc };

    const entries = await prisma.entry.findMany({
      where: {
        coupleId: user.coupleId,
        ...(type ? { type } : {}),
        ...dateFilter,
      },
      orderBy: order,
      include: {
        user: {
          select: { displayName: true }, //displayName のみ取得
        },
        readStatus: true,
      },
    });

    //authorName を追加して返す
    const result = entries.map((e) => ({
      ...e,
      isMine: e.userId == user.id,
      authorName: e.user.displayName, //DiaryPage で使う
    }));

    return NextResponse.json({ entries: result });
  } catch (e) {
    console.error("APIエラー:", e);
    return NextResponse.json({ entries: [] });
  }
}