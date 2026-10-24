import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const MAX_MEMBERS = 2;

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "未ログイン" }, { status: 401 });

    // 招待コードの総当たり対策 (10分あたり10回まで)
    if (!rateLimit(`join:${clientIp(req)}:${user.id}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "試行回数が多すぎます。しばらくしてからお試しください" },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const raw = body?.code;
    if (typeof raw !== "string" || raw.trim().length === 0 || raw.length > 32) {
      return NextResponse.json({ error: "無効なコードです" }, { status: 400 });
    }
    const code = raw.trim().toUpperCase();

    // inviteCode で検索
    const couple = await prisma.couple.findUnique({
      where: { inviteCode: code },
      include: { users: { select: { id: true } } },
    });

    if (!couple) {
      return NextResponse.json({ error: "無効なコードです" }, { status: 400 });
    }

    // すでにこの連絡帳に参加している
    if (user.coupleId === couple.id) {
      return NextResponse.json({ ok: true });
    }

    // 別の連絡帳に参加済みの場合は付け替えない
    if (user.coupleId) {
      return NextResponse.json(
        { error: "すでに別の連絡帳に参加しています" },
        { status: 400 }
      );
    }

    // 2人用なので満員なら参加できない
    if (couple.users.length >= MAX_MEMBERS) {
      return NextResponse.json({ error: "この連絡帳は満員です" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { coupleId: couple.id },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "参加に失敗しました" }, { status: 500 });
  }
}
