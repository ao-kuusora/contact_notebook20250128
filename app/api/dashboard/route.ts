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
    // 日付の境界は日本時間。家事・忙しさは当日分だけ残し、古い行はDBからも削除。
    const now = new Date();
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const jstMidnight = new Date(Date.UTC(jstNow.getUTCFullYear(), jstNow.getUTCMonth(), jstNow.getUTCDate()) - 9 * 60 * 60 * 1000);
    const yesterday = new Date(jstMidnight.getTime() - 24 * 60 * 60 * 1000);
    const healthSince = new Date(jstMidnight.getTime() - 9 * 24 * 60 * 60 * 1000);
    await prisma.entry.deleteMany({ where: { coupleId, type: { in: ["CHORE", "WORKLOAD"] }, createdAt: { lt: jstMidnight } } });
    await prisma.entry.deleteMany({ where: { coupleId, type: "HEALTH", createdAt: { lt: healthSince } } });
    const latestOf = (type: string, extraWhere: Record<string, unknown> = {}) =>
      prisma.entry.findFirst({
        where: { coupleId, type, ...extraWhere },
        orderBy: { createdAt: "desc" },
        include: { user: { select: { displayName: true, iconUrl: true } } },
      });

    const [unread, latestChore, urgentErrand, todayWorkload, latestDiary, latestTask, latestHealth] =
      await Promise.all([
        // 未読バッジの判定は /api/unread と同じ関数を使う
        readRepo.unreadByType(user.id, coupleId),
        latestOf("CHORE", { createdAt: { gte: jstMidnight } }),
        // 期限があって未完了のおつかいのうち、期限が一番近いもの
        prisma.entry.findFirst({
          where: { coupleId, type: "ERRAND", done: false, dueDate: { not: null } },
          orderBy: { dueDate: "asc" },
          include: { user: { select: { displayName: true } } },
        }),
        latestOf("WORKLOAD", { createdAt: { gte: jstMidnight } }),
        latestOf("DIARY"),
        latestOf("TASK"),
        latestOf("HEALTH", { createdAt: { gte: healthSince } }),
      ]);

    const shape = (e: (typeof latestChore)) =>
      e ? { ...e, isMine: e.userId === user.id, authorName: e.user.displayName, authorIconUrl: e.user.iconUrl } : null;

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
