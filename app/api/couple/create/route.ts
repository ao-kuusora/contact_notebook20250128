import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function generateInviteCode() {
  // 暗号論的乱数 (Math.random は推測されうるため使わない)
  return randomBytes(5).toString("hex").toUpperCase(); // 例: "A3F09C1B72"
}

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    // すでに連絡帳に参加している場合は、新しく作らず既存のコードを返す
    if (user.coupleId) {
      const existing = await prisma.couple.findUnique({
        where: { id: user.coupleId },
        select: { inviteCode: true },
      });
      if (existing) {
        return NextResponse.json({ inviteCode: existing.inviteCode });
      }
    }

    for (let i = 0; i < 5; i++) {
      const inviteCode = generateInviteCode();

      const taken = await prisma.couple.findUnique({ where: { inviteCode } });
      if (taken) continue;

      // connect で user.coupleId も同時に設定される
      await prisma.couple.create({
        data: {
          inviteCode,
          users: { connect: { id: user.id } },
        },
      });

      return NextResponse.json({ inviteCode });
    }

    return NextResponse.json({ error: "連絡帳の作成に失敗しました" }, { status: 500 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "連絡帳の作成に失敗しました" }, { status: 500 });
  }
}
