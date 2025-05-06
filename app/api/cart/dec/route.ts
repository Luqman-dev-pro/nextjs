import { NextRequest, NextResponse } from "next/server";
import { decFromCart } from "@/app/lib/cart";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const productId = body.get("productId")?.toString();
  if (!productId) return NextResponse.redirect("/cart");

  decFromCart(productId);
  return NextResponse.redirect("/cart");
}
