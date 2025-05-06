import { addToCart } from "@/app/lib/cart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const productId = body.get("productId")?.toString();
  if (!productId) return NextResponse.redirect("/cart");

  addToCart(productId);
  return NextResponse.redirect("/cart");
}
