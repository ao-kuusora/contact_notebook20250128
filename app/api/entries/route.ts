import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import { isEntryType, isNonEmptyString, MAX_CONTENT_LENGTH } from "@/lib/validate";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

const DEFAULT_LIST_LIMIT = 100;
const MAX_LIST_LIMIT = 200;

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    if (!user.coupleId) {
      return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    const { type, content, dueDate } = body ?? {};

    if (!isEntryType(type)) {
      return NextResponse.json({ error: "type が不正です" }, { status: 400 });
    }
    if (!isNonEmptyString(content, MAX_CONTENT_LENGTH)) {
      return NextResponse.json(
        { error: `内容は1〜${MAX_CONTENT_LENGTH}文字で入力してください` },
        { status: 400 }
      );
    }

    let due: Date | null = null;
    if (dueDate) {
      due = new Date(dueDate);
      if (Number.isNaN(due.getTime())) {
        return NextResponse.json({ error: "期限の日付が不正です" }, { status: 400 });
      }
    }

    const entry = await prisma.entry.create({
      data: {
        type,
        content,
        dueDate: due,
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
    const user = await getCurrentUser();
    if (!user || !user.coupleId) {
      return NextResponse.json({ entries: [] });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const date = searchParams.get("date");

    // 取得件数の上限 (指定なしは 100 件、最大 200 件)。
    // 全件取得だと投稿が増えるほど通信量・描画が重くなるため。
    const limitParam = Number(searchParams.get("limit"));
    const take =
      Number.isInteger(limitParam) && limitParam > 0
        ? Math.min(limitParam, MAX_LIST_LIMIT)
        : DEFAULT_LIST_LIMIT;

    let dateFilter = {};

    // date は "YYYY-MM-DD"。サーバーのタイムゾーンに依存しないよう JST の1日で絞る
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const start = new Date(`${date}T00:00:00.000+09:00`);
      const end = new Date(`${date}T23:59:59.999+09:00`);

      if (!Number.isNaN(start.getTime())) {
        dateFilter = {
          createdAt: {
            gte: start,
            lte: end,
          },
        };
      }
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
      take,
      include: {
        user: {
          select: { displayName: true }, // displayName のみ取得
        },
      },
    });

    // authorName を追加して返す
    const result = entries.map((e) => ({
      ...e,
      isMine: e.userId === user.id,
      authorName: e.user.displayName, // DiaryPage で使う
    }));

    return NextResponse.json({ entries: result });
  } catch (e) {
    console.error("APIエラー:", e);
    return NextResponse.json({ entries: [] });
  }
}
