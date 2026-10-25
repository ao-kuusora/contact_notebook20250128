import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { readRepo } from "@/lib/repo/prismaRepo";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

const NO_UNREAD = { chores: false, errands: false, workload: false, diary: false };

// ダッシュボードに必要なデータを 1 リクエストにまとめて返す。
// 以前はブラウザから 6 本の API を (一部は直列で) 呼んでおり、そのたびに
// 認証 + DB 往復が発生していたため、ここで認証 1 回 + クエリ並列にする。
export async function GET() {
  try {
    const userId = getSessionUserId();
    if (!userId) return NextResponse.json({ user: null });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        displayName: true,
        iconUrl: true,
        coupleId: true,
        createdAt: true,
        couple: {
          select: {
            id: true,
            inviteCode: true,
            users: { select: { id: true, displayName: true, iconUrl: true } },
          },
        },
      },
    });
    if (!user) return NextResponse.json({ user: null });

    if (!user.coupleId) {
      return NextResponse.json({
        user,
        unread: NO_UNREAD,
        latestChore: null,
        urgentErrand: null,
        todayWorkload: null,
        latestDiary: null,
        latestTask: null,
        latestHealth: null,
      });
    }

    const coupleId = user.coupleId;
    const latestOf = (type: string) =>
      prisma.entry.findFirst({
        where: { coupleId, type },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { displayName: true } } },
      });

    const [unread, latestChore, urgentErrand, todayWorkload, latestDiary, latestTask, latestHealth] =
      await Promise.all([
        // 未読バッジの判定は /api/unread と同じ関数を使う
        readRepo.unreadByType(user.id, coupleId),
        latestOf("CHORE"),
        // 期限があって未完了のおつかいのうち、期限が一番近いもの
        prisma.entry.findFirst({
          where: { coupleId, type: "ERRAND", done: false, dueDate: { not: null } },
          orderBy: { dueDate: "asc" },
          include: { user: { select: { displayName: true } } },
        }),
        latestOf("WORKLOAD"),
        latestOf("DIARY"),
        latestOf("TASK"),
        latestOf("HEALTH"),
      ]);

    const shape = (e: (typeof latestChore)) =>
      e ? { ...e, isMine: e.userId === user.id, authorName: e.user.displayName } : null;

    return NextResponse.json({
      user,
      unread: {
        chores: !!unread.CHORE,
        errands: !!unread.ERRAND,
        workload: !!unread.WORKLOAD,
        diary: !!unread.DIARY,
      },
      latestChore: shape(latestChore),
      urgentErrand: shape(urgentErrand),
      todayWorkload: shape(todayWorkload),
      latestDiary: shape(latestDiary),
      latestTask: shape(latestTask),
      latestHealth: shape(latestHealth),
    });
  } catch (e) {
    console.error("dashboard error:", e);
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }
}
