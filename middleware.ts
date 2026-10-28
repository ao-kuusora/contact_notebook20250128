import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ログインが必要なページの一覧。
// ここではセッションCookieの有無だけを確認する。
// セッションの有効性は、各APIで現在のユーザーを取得する際に検証する。
const protectedPaths = [
  "/dashboard",
  "/tasks",
  "/chores",
  "/errands",
  "/workload",
  "/diary",
  "/couple",
  "/settings",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/chores/:path*",
    "/errands/:path*",
    "/workload/:path*",
    "/diary/:path*",
    "/couple/:path*",
    "/settings/:path*",
  ],
};
