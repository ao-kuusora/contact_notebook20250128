import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";

const userRes = await fetch("http://localhost:3000/api/auth/me", {
  headers: { cookie },
});

  const userData = await userRes.json();
  const user = userData.user;

  if (!user) {
    return NextResponse.json({ chores: false, errands: false, workload: false, diary: false });
  }

  const unreadChores = await prisma.entry.count({
    where: {
      type: "CHORE",
      readStatus: {
        none: { userId: user.id, isRead: true },
      },
    },
  });

  const unreadErrands = await prisma.entry.count({
    where: {
      type: "ERRAND",
      readStatus: {
        none: { userId: user.id, isRead: true },
      },
    },
  });

  const unreadWorkload = await prisma.entry.count({
    where: {
      type: "WORKLOAD",
      readStatus: {
        none: { userId: user.id, isRead: true },
      },
    },
  });

  const unreadDiary = await prisma.entry.count({
    where: {
      type: "DIARY",
      userId: { not: user.id }, // 自分の投稿は未読にしない
      readStatus: {
        none: {
          userId: user.id,
          isRead: true,
        },
      },
    },
  });

  return NextResponse.json({
    chores: unreadChores > 0,
    errands: unreadErrands > 0,
    workload: unreadWorkload > 0,
    diary: unreadDiary > 0,
  });
}