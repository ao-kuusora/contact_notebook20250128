import { prisma } from "@/lib/prisma";

/** 日本時間の日付境界で日次記録を整理する。既読レコードも先に消して外部キー制約を守る。 */
export async function cleanupDailyEntries(coupleId: string) {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const midnight = new Date(Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate()) - 9 * 60 * 60 * 1000);
  const healthSince = new Date(midnight.getTime() - 9 * 24 * 60 * 60 * 1000);

  const expired = await prisma.entry.findMany({
    where: {
      coupleId,
      OR: [
        { type: { in: ["CHORE", "WORKLOAD"] }, createdAt: { lt: midnight } },
        { type: "HEALTH", createdAt: { lt: healthSince } },
      ],
    },
    select: { id: true },
  });
  if (expired.length) {
    const ids = expired.map((entry) => entry.id);
    await prisma.$transaction([
      prisma.readStatus.deleteMany({ where: { entryId: { in: ids } } }),
      prisma.entry.deleteMany({ where: { id: { in: ids }, coupleId } }),
    ]);
  }
  return { midnight, healthSince };
}
