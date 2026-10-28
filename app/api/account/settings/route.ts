import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { isEmail, isNonEmptyString } from "@/lib/validate";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 72;

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && (error as { code?: unknown }).code === "P2002";
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "ログインしてください。" }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body || typeof body.action !== "string") {
      return NextResponse.json({ error: "送信内容を確認してください。" }, { status: 400 });
    }

    if (body.action === "profile") {
      const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
      const iconUrl = typeof body.iconUrl === "string" ? body.iconUrl.trim() : "";
      if (!isNonEmptyString(displayName, 50)) {
        return NextResponse.json({ error: "表示名は1〜50文字で入力してください。" }, { status: 400 });
      }
      if (iconUrl) {
        try {
          const parsed = new URL(iconUrl);
          if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error();
        } catch {
          return NextResponse.json({ error: "アイコン画像URLは http または https で始まるURLを入力してください。" }, { status: 400 });
        }
      }
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { displayName, iconUrl: iconUrl || null },
        select: { displayName: true, iconUrl: true },
      });
      return NextResponse.json({ ok: true, user: updated, message: "プロフィールを保存しました。" });
    }

    if (body.action === "email") {
      const email = typeof body.email === "string" ? body.email.trim() : "";
      const currentPassword = body.currentPassword;
      if (!isEmail(email)) return NextResponse.json({ error: "メールアドレスの形式が正しくありません。" }, { status: 400 });
      if (typeof currentPassword !== "string" || !currentPassword) {
        return NextResponse.json({ error: "本人確認のため、現在のパスワードを入力してください。" }, { status: 400 });
      }
      const fullUser = await prisma.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } });
      if (!fullUser || !(await bcrypt.compare(currentPassword, fullUser.passwordHash))) {
        return NextResponse.json({ error: "現在のパスワードが正しくありません。" }, { status: 400 });
      }
      const updated = await prisma.user.update({
        where: { id: user.id }, data: { email }, select: { email: true },
      });
      return NextResponse.json({ ok: true, user: updated, message: "メールアドレスを変更しました。" });
    }

    if (body.action === "password") {
      const currentPassword = body.currentPassword;
      const newPassword = body.newPassword;
      if (typeof currentPassword !== "string" || !currentPassword || typeof newPassword !== "string") {
        return NextResponse.json({ error: "現在のパスワードと新しいパスワードを入力してください。" }, { status: 400 });
      }
      if (newPassword.length < MIN_PASSWORD_LENGTH || newPassword.length > MAX_PASSWORD_LENGTH) {
        return NextResponse.json({ error: `新しいパスワードは${MIN_PASSWORD_LENGTH}〜${MAX_PASSWORD_LENGTH}文字で入力してください。` }, { status: 400 });
      }
      const fullUser = await prisma.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } });
      if (!fullUser || !(await bcrypt.compare(currentPassword, fullUser.passwordHash))) {
        return NextResponse.json({ error: "現在のパスワードが正しくありません。" }, { status: 400 });
      }
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
      return NextResponse.json({ ok: true, message: "パスワードを変更しました。" });
    }

    return NextResponse.json({ error: "未対応の設定項目です。" }, { status: 400 });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json({ error: "このメールアドレスは既に使用されています。" }, { status: 409 });
    }
    console.error("account settings error:", error);
    return NextResponse.json({ error: "設定を保存できませんでした。時間をおいて再度お試しください。" }, { status: 500 });
  }
}
