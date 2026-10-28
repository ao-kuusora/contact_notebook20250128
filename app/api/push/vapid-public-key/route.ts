import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!key) {
    return NextResponse.json({ error: "通知機能の設定がまだ完了していません" }, { status: 503 });
  }
  return NextResponse.json({ publicKey: key });
}
