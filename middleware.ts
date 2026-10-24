import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ログインが必要なページ。
// ここでは Cookie の有無だけを見る簡易チェックで、トークン自体の検証は
// 各 API (getCurrentUser) で行う。
const protectedPaths = [
  "/dashboard",
  "/chores",
  "/errands",
  "/workload",
  "/diary",
  "/couple",
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
    "/chores/:path*",
    "/errands/:path*",
    "/workload/:path*",
    "/diary/:path*",
    "/couple/:path*",
  ],
};
