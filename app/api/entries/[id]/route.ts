import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { entryRepo } from "@/lib/repo/prismaRepo";
import { getEntry } from "@/lib/services/entries";
import { isNonEmptyString, MAX_CONTENT_LENGTH } from "@/lib/validate";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const result = await getEntry(entryRepo, user, params.id);
    return NextResponse.json(result.body, { status: result.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    if (!user.coupleId) return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "更新内容が正しくありません" }, { status: 400 });
    }

    const existing = await prisma.entry.findFirst({
      where: { id: params.id, coupleId: user.coupleId },
      select: { id: true, userId: true, type: true },
    });
    if (!existing) return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });

    const data: { content?: string; dueDate?: Date | null; done?: boolean } = {};

    // done の変更は、これまでどおりふたりのタスク・おつかいメモで使える
    if ("done" in body) {
      if (typeof body.done !== "boolean") {
        return NextResponse.json({ error: "done は true / false で指定してください" }, { status: 400 });
      }
      data.done = body.done;
    }

    // 内容や期限の編集は投稿者本人のみ可能
    if ("content" in body || "dueDate" in body) {
      if (existing.userId !== user.id) {
        return NextResponse.json({ error: "投稿した本人だけが編集できます" }, { status: 403 });
      }
      if ("content" in body) {
        if (!isNonEmptyString(body.content, MAX_CONTENT_LENGTH)) {
          return NextResponse.json({ error: `内容は1〜${MAX_CONTENT_LENGTH}文字で入力してください` }, { status: 400 });
        }
        data.content = body.content.trim();
      }
      if ("dueDate" in body) {
        if (body.dueDate === null || body.dueDate === "") {
          data.dueDate = null;
        } else if (typeof body.dueDate === "string") {
          const dueDate = new Date(body.dueDate);
          if (Number.isNaN(dueDate.getTime())) {
            return NextResponse.json({ error: "期限の日付が正しくありません" }, { status: 400 });
          }
          data.dueDate = dueDate;
        } else {
          return NextResponse.json({ error: "期限の日付が正しくありません" }, { status: 400 });
        }
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "変更する内容がありません" }, { status: 400 });
    }

    const entry = await prisma.entry.update({ where: { id: params.id }, data });
    return NextResponse.json({ entry });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    if (!user.coupleId) return NextResponse.json({ error: "連絡帳に参加していません" }, { status: 403 });

    const existing = await prisma.entry.findFirst({
      where: { id: params.id, coupleId: user.coupleId },
      select: { id: true, userId: true },
    });
    if (!existing) return NextResponse.json({ error: "投稿が見つかりません" }, { status: 404 });
    if (existing.userId !== user.id) {
      return NextResponse.json({ error: "投稿した本人だけが削除できます" }, { status: 403 });
    }

    await prisma.entry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
