// /app/api/cart/route.ts
import { NextResponse } from "next/server";
import { getCartItems } from "@/app/lib/cart";

export async function GET() {
  const items = await getCartItems();
  return NextResponse.json(items);
}

// POST handler for Add to Cart (already used by AddToCartButton)
export async function POST(req: Request) {
  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  // Add to cart (cookie-based)
  const { addToCart } = await import("@/app/lib/cart");
  addToCart(productId);
  return NextResponse.json({ success: true });
}
