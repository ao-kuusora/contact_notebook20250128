import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") ?? "";
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("session="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const payload = jwt.verify(token, SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        couple: {
          include: {
            users: true,
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