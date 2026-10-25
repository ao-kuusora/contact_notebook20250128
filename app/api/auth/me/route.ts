import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// cookies を使うため、ビルド時に静的生成せず毎回リクエスト時に実行する
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const me = await getCurrentUser();
    if (!me) {
      return NextResponse.json({ user: null });
    }

    // passwordHash などをブラウザへ返さないよう、必要な項目だけ select する
    const user = await prisma.user.findUnique({
      where: { id: me.id },
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
            users: {
              select: { id: true, displayName: true, iconUrl: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error("auth/me error:", err);
    return NextResponse.json({ user: null });
  }
}
