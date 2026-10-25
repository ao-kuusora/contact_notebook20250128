// サービス層 (lib/services) が使う DB 操作の Prisma 実装。
import { prisma } from "@/lib/prisma";
import type { EntryRepo, EntryRow, ListQuery } from "@/lib/services/entries";
import type { ReadRepo } from "@/lib/services/read";

/** 閲覧者の既読状態だけを取る include (全員分を JOIN しない) */
const entryInclude = (viewerId: string) =>
  ({
    user: { select: { displayName: true } },
    readStatus: {
      where: { userId: viewerId },
      select: { isRead: true },
    },
  }) as const;

function toRow(r: any): EntryRow {
  return {
    id: r.id,
    type: r.type,
    content: r.content,
    dueDate: r.dueDate,
    done: r.done,
    userId: r.userId,
    coupleId: r.coupleId,
    createdAt: r.createdAt,
    authorName: r.user.displayName,
    isRead: r.readStatus.some((s: { isRead: boolean }) => s.isRead),
  };
}

export const entryRepo: EntryRepo = {
  async list(q: ListQuery) {
    const rows = await prisma.entry.findMany({
      where: {
        coupleId: q.coupleId,
        ...(q.type ? { type: q.type } : {}),
        ...(q.done !== undefined ? { done: q.done } : {}),
        ...(q.range ? { createdAt: { gte: q.range.start, lt: q.range.end } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: q.take,
      include: entryInclude(q.viewerId),
    });
    return rows.map(toRow);
  },

  async findById(id: string, viewerId: string) {
    const row = await prisma.entry.findUnique({
      where: { id },
      include: entryInclude(viewerId),
    });
    return row ? toRow(row) : null;
  },
};

export const readRepo: ReadRepo & {
  unreadByType(userId: string, coupleId: string): Promise<Record<string, boolean>>;
} = {
  async markEntriesRead(userId, coupleId, ids) {
    // 自分のカップルの、相手が書いた投稿だけが対象
    const targets = await prisma.entry.findMany({
      where: { id: { in: ids }, coupleId, userId: { not: userId } },
      select: { id: true },
    });
    if (targets.length === 0) return 0;

    const targetIds = targets.map((t) => t.id);
    await prisma.$transaction([
      prisma.readStatus.createMany({
        data: targetIds.map((entryId) => ({ entryId, userId, isRead: true })),
        skipDuplicates: true,
      }),
      prisma.readStatus.updateMany({
        where: { userId, entryId: { in: targetIds }, isRead: false },
        data: { isRead: true, readAt: new Date() },
      }),
    ]);

    return targetIds.length;
  },

  /**
   * 種別ごとの「未読あり」。バッジの判定はここ 1 か所に統一する。
   * 未読 = 相手が書いた投稿で、自分が既読にしていないもの。
   */
  async unreadByType(userId, coupleId) {
    const grouped = await prisma.entry.groupBy({
      by: ["type"],
      where: {
        coupleId,
        userId: { not: userId },
        readStatus: { none: { userId, isRead: true } },
      },
      _count: { _all: true },
    });

    const result: Record<string, boolean> = {};
    for (const g of grouped) result[g.type] = g._count._all > 0;
    return result;
  },
};
