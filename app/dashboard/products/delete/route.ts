// /app/dashboard/products/delete/route.ts

import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = formData.get("id");

  await db`DELETE FROM products WHERE id=${id}`;

  return NextResponse.redirect("/dashboard/products");
}
