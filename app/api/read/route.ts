import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readRepo } from "@/lib/repo/prismaRepo";
import { markRead } from "@/lib/services/read";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json().catch(() => null);

    const result = await markRead(readRepo, user, body);
    return NextResponse.json(result.body, { status: result.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "既読の更新に失敗しました" }, { status: 500 });
  }
}
