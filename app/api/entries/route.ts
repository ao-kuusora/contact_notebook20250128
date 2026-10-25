import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { entryRepo } from "@/lib/repo/prismaRepo";
import { listEntries } from "@/lib/services/entries";
import { isEntryType, isNonEmptyString, MAX_CONTENT_LENGTH } from "@/lib/validate";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

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
    const { searchParams } = new URL(req.url);

    const result = await listEntries(entryRepo, user, {
      type: searchParams.get("type"),
      date: searchParams.get("date"),
      done: searchParams.get("done"),
      limit: searchParams.get("limit"),
    });
    return NextResponse.json(result.body, { status: result.status });
  } catch (e) {
    console.error("APIエラー:", e);
    return NextResponse.json({ error: "読み込みに失敗しました" }, { status: 500 });
  }
}
