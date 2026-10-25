import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { readRepo } from "@/lib/repo/prismaRepo";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

const NONE = { chores: false, errands: false, workload: false, diary: false };

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.coupleId) {
      return NextResponse.json(NONE);
    }

    const unread = await readRepo.unreadByType(user.id, user.coupleId);

    return NextResponse.json({
      chores: !!unread.CHORE,
      errands: !!unread.ERRAND,
      workload: !!unread.WORKLOAD,
      diary: !!unread.DIARY,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(NONE);
  }
}
