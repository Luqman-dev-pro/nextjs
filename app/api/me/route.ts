import { NextResponse } from "next/server";
import { getCustomerFromSession } from "@/app/lib/customer-session";
import db from "@/app/lib/db";

export async function GET() {
  const customer = await getCustomerFromSession();
  if (!customer) return NextResponse.json({}, { status: 401 });

  const [data] = await db`
    SELECT name, email, image_url FROM customers WHERE id = ${customer.id}
  `;
  return NextResponse.json(data);
}
