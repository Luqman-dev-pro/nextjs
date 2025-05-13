import db from "@/app/lib/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, cartItems } = body;

    // Insert customer if needed (here simplified - assume guest)
    const customerName = `${customer.firstName} ${customer.lastName}`;
    const total = cartItems.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );

    const [order] = await db`
      INSERT INTO orders (user_id, total)
      VALUES (gen_random_uuid(), ${total})
      RETURNING id
    `;

    for (const item of cartItems) {
      await db`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (
          ${order.id},
          ${item.product.id},
          ${item.quantity},
          ${item.product.price}
        )
      `;
    }

    // Clear cart
    // cookies().set("cart", "", { path: "/", maxAge: 0 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
