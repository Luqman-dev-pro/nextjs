import { NextRequest, NextResponse } from "next/server";
import { removeFromCart } from "@/app/lib/cart";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const productId = body.get("productId")?.toString();
  const url = new URL("/cart", req.nextUrl.origin);
  if (!productId) return NextResponse.redirect(url);

  removeFromCart(productId);
  return NextResponse.redirect(url);
}
