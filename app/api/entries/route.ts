import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { entryRepo } from "@/lib/repo/prismaRepo";
import { createEntry, listEntries } from "@/lib/services/entries";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json().catch(() => null);

    const result = await createEntry(entryRepo, user, body);
    return NextResponse.json(result.body, { status: result.status });
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
