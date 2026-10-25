import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

// GET
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    if (!user.coupleId) {
      return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });
    }

    const entry = await prisma.entry.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { displayName: true },
        },
        readStatus: true,
      },
    });

    // 存在しない or 他カップルの投稿
    if (!entry || entry.coupleId !== user.coupleId) {
      return NextResponse.json({ error: "アクセス権がありません" }, { status: 403 });
    }

    return NextResponse.json({
      entry: {
        ...entry,
        isMine: entry.userId === user.id,
        authorName: entry.user.displayName,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

// PATCH (完了フラグの更新)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    if (!user.coupleId) {
      return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body.done !== "boolean") {
      return NextResponse.json({ error: "done は true / false で指定してください" }, { status: 400 });
    }

    // 自分のカップルの投稿だけ更新できるようにする
    const result = await prisma.entry.updateMany({
      where: { id: params.id, coupleId: user.coupleId },
      data: { done: body.done },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: "見つかりません" }, { status: 404 });
    }

    const entry = await prisma.entry.findUnique({ where: { id: params.id } });
    return NextResponse.json({ entry });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
