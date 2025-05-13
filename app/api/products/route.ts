// /app/api/products/route.ts

import { products } from "@/app/lib/e-com-db";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProduct = await request.json();
  products.push(newProduct);
  return NextResponse.json(newProduct);
}
