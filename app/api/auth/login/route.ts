import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { comparePassword, createSessionDB } from "@/app/lib/auth";
import jwt from 'jsonwebtoken';

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

  const SECRET = process.env.JWT_SECRET!; 
  const token = jwt.sign({ id: customer.id }, SECRET, { expiresIn: '7d' });
  await createSessionDB({ id: customer.id, email: customer.email, type: "customer"}, token);

  return NextResponse.json({ success: true, token });

  // 

  // return NextResponse.json({ success: true });
}
