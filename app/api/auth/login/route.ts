import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { comparePassword, createSession } from "@/app/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password required" }, { status: 400 });
  }

  const [customer] = await db`
    SELECT id, email, password FROM customers WHERE email = ${email}
  `;

  if (!customer || !(await comparePassword(password, customer.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  await createSession({ id: customer.id, email: customer.email, type: "customer" });

  return NextResponse.json({ success: true });
}
