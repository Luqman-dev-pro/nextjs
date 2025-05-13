import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { getCustomerFromToken } from "@/app/lib/auth/getCustomerFromToken";
import { headers } from "next/headers";

export async function GET() {
  const headerList = headers();
  const token = (await headerList).get("authorization")?.split(" ")[1] || null;
  const customer = await getCustomerFromToken(token);
  // console.log(customer);
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // const customer = await getCustomerFromSession();
  // if (!customer) return NextResponse.json({}, { status: 401 });

  const [data] = await db`
    SELECT name, email, image_url FROM customers WHERE id = ${customer.id}
  `;
  return NextResponse.json(data);
}
