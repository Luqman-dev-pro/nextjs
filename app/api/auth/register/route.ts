import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { hashPassword, createSession } from "@/app/lib/auth";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  const existing = await db`SELECT * FROM customers WHERE email = ${email}`;
  if (existing.length > 0) {
    return NextResponse.json({ message: "Customer already exists" }, { status: 409 });
  }

  const hashed = await hashPassword(password);

  const [customer] = await db`
    INSERT INTO customers (email, name, password, image_url)
    VALUES (
      ${email},
      ${name},
      ${hashed},
      ''
    )
    RETURNING id, email
  `;

  //image_url: 'https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}'
  await createSession({ id: customer.id, email: customer.email, type: "customer" });

  return NextResponse.json({ success: true });
}
