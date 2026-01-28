import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// GET
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("cookie")?.split("session=")[1];
    if (!token) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.coupleId) {
      return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });
    }

    const entry = await prisma.entry.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { displayName: true }, //displayNameを取得
        },
        readStatus: true,
      },
    });



    // 存在しない or 他カップルの日記
    if (!entry || entry.coupleId != user.coupleId) {
      return NextResponse.json({ error: "アクセス権がありません" }, { status: 403 });
    }

    return NextResponse.json({
      entry: {
        ...entry,
        isMine: entry.userId == user.id,
        authorName: entry.user.displayName,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("cookie")?.split("session=")[1];
    if (!token) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    jwt.verify(token, process.env.JWT_SECRET!);

    const { done } = await req.json();

    const entry = await prisma.entry.update({
      where: { id: params.id },
      data: { done },
    });

    return NextResponse.json({ entry });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}