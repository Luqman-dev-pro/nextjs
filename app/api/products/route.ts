// /app/api/products/route.ts

import { NextResponse } from "next/server";
import { products } from "@/app/lib/db";

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProduct = await request.json();
  products.push(newProduct);
  return NextResponse.json(newProduct);
}
