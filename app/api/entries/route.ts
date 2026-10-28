import { NextResponse } from "next/server";
import webpush from "web-push";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { entryRepo } from "@/lib/repo/prismaRepo";
import { createEntry, listEntries } from "@/lib/services/entries";

export const dynamic = "force-dynamic";

function configureWebPush() {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) return false;
  webpush.setVapidDetails(subject, publicKey, privateKey);
  return true;
}

const entryTypeLabels: Record<string, string> = {
  CHORE: "家事報告",
  ERRAND: "おつかいメモ",
  TASK: "タスク",
  DIARY: "交換日記",
  HEALTH: "体調報告",
  WORKLOAD: "忙しさ報告",
};

async function notifyPartner(userId: string, coupleId: string, type: string, content: string) {
  if (!configureWebPush()) return;
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { user: { coupleId, id: { not: userId } } },
    select: { id: true, endpoint: true, p256dh: true, auth: true },
  });
  const title = `${"ふたりの連絡帳"} · ${entryTypeLabels[type] || "新しい投稿"}`;
  const body = content.length > 100 ? content.slice(0, 100) + "…" : content;
  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webpush.sendNotification({
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      }, JSON.stringify({ title, body, url: "/dashboard", tag: `entry-${Date.now()}` }));
    } catch (error) {
      const statusCode = (error as { statusCode?: number })?.statusCode;
      if (statusCode === 404 || statusCode === 410) {
        await prisma.pushSubscription.deleteMany({ where: { id: subscription.id } }).catch(() => undefined);
      } else {
        console.error("push delivery error:", statusCode || error);
      }
    }
  }));
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json().catch(() => null);
    const result = await createEntry(entryRepo, user, body);
    if (result.status >= 200 && result.status < 300 && user?.coupleId && body && typeof body.type === "string" && typeof body.content === "string") {
      // 通知の失敗で投稿自体を失敗扱いにしない
      await notifyPartner(user.id, user.coupleId, body.type, body.content).catch((error) => console.error("push notification error:", error));
    }
    return NextResponse.json(result.body, { status: result.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const result = await listEntries(entryRepo, user, {
      type: searchParams.get("type"),
      date: searchParams.get("date"),
      done: searchParams.get("done"),
      limit: searchParams.get("limit"),
    });
    return NextResponse.json(result.body, { status: result.status });
  } catch (e) {
    console.error("APIエラー:", e);
    return NextResponse.json({ error: "読み込みに失敗しました" }, { status: 500 });
  }
}
