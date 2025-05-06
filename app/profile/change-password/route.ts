// app/api/profile/change-password/route.ts
import { getCustomerFromSession } from "@/app/lib/customer-session";
import db from "@/app/lib/db";
import { hash, compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCustomerFromSession();
  if (!user) return NextResponse.json({}, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  const [customer] = await db`
    SELECT password FROM customers WHERE id = ${user.id}
  `;

  const valid = await compare(currentPassword, customer.password);
  if (!valid) {
    return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
  }

  const hashed = await hash(newPassword, 10);

  await db`
    UPDATE customers SET password = ${hashed} WHERE id = ${user.id}
  `;

  return NextResponse.json({ success: true });
}
