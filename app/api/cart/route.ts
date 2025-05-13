// /app/api/cart/route.ts
import { NextResponse } from "next/server";
import { getCartItems } from "@/app/lib/cart";
import { getCustomerFromToken } from "@/app/lib/auth/getCustomerFromToken";

export async function GET() {
  const items = await getCartItems();
  return NextResponse.json(items);
}

// POST handler for Add to Cart (already used by AddToCartButton)
export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1] || null;
  const customer = await getCustomerFromToken(token);
  if (!customer) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  // Add to cart (cookie-based)
  const { addToCart } = await import("@/app/lib/cart");
  addToCart(productId);
  return NextResponse.json({ success: true });
}
