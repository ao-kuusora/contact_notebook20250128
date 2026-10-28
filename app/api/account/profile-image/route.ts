import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 900 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "ログインしてください。" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "アップロードする写真を選択してください。" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "JPEG、PNG、WebP形式の画像を選択してください。" }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "画像は900KB以下にしてください。写真を選び直すと自動で圧縮されます。" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const iconUrl = `data:${file.type};base64,${bytes.toString("base64")}`;
    await prisma.user.update({ where: { id: user.id }, data: { iconUrl } });

    return NextResponse.json({ ok: true, iconUrl, message: "プロフィール写真を保存しました。" });
  } catch (error) {
    console.error("profile image upload error:", error);
    return NextResponse.json({ error: "画像を保存できませんでした。時間をおいて再度お試しください。" }, { status: 500 });
  }
}
