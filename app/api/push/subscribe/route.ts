import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "ログインしてください" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const endpoint = body?.endpoint;
    const p256dh = body?.keys?.p256dh;
    const auth = body?.keys?.auth;
    if (
      typeof endpoint !== "string" || !endpoint.startsWith("https://") ||
      typeof p256dh !== "string" || typeof auth !== "string"
    ) {
      return NextResponse.json({ error: "通知の登録情報が正しくありません" }, { status: 400 });
    }

    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: { userId: user.id, endpoint, p256dh, auth },
      update: { userId: user.id, p256dh, auth },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("push subscribe error:", error);
    return NextResponse.json({ error: "通知を登録できませんでした" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "ログインしてください" }, { status: 401 });
    const body = await req.json().catch(() => null);
    if (typeof body?.endpoint !== "string") {
      return NextResponse.json({ error: "登録情報が正しくありません" }, { status: 400 });
    }
    await prisma.pushSubscription.deleteMany({
      where: { endpoint: body.endpoint, userId: user.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("push unsubscribe error:", error);
    return NextResponse.json({ error: "通知を解除できませんでした" }, { status: 500 });
  }
}
