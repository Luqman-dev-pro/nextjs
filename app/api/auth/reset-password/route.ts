import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const [user] = await db`
    SELECT id, reset_token_expires
    FROM customers
    WHERE reset_token = ${token}
  `;

  if (!user) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  if (new Date(user.reset_token_expires) < new Date()) {
    return NextResponse.json({ message: "Token expired" }, { status: 400 });
  }

  const hashed = await hash(password, 10);

  await db`
    UPDATE customers
    SET password = ${hashed}, reset_token = NULL, reset_token_expires = NULL
    WHERE id = ${user.id}
  `;

  return NextResponse.json({ success: true });
}
