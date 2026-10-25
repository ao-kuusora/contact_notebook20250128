import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

const NONE = { chores: false, errands: false, workload: false, diary: false };

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || !user.coupleId) {
      return NextResponse.json(NONE);
    }

    // 自分のカップルの、パートナーが書いた未読の投稿を種別ごとに集計 (1クエリ)
    const grouped = await prisma.entry.groupBy({
      by: ["type"],
      where: {
        coupleId: user.coupleId,
        userId: { not: user.id }, // 自分の投稿は未読にしない
        readStatus: {
          none: { userId: user.id, isRead: true },
        },
      },
      _count: { _all: true },
    });

    const has = (type: string) =>
      grouped.some((g) => g.type === type && g._count._all > 0);

    return NextResponse.json({
      chores: has("CHORE"),
      errands: has("ERRAND"),
      workload: has("WORKLOAD"),
      diary: has("DIARY"),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(NONE);
  }
}
