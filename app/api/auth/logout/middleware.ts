import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  const protectedPaths = ["/dashboard", "/couple", "/diary"];

  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}