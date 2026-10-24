import { NextResponse } from "next/server";
import { sessionCookieOptions } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set("session", "", sessionCookieOptions(0));

  return res;
}
