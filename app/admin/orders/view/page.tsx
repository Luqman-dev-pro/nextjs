"use client";

import db from "@/app/lib/db";

export default async function ViewOrderPage({ params }: { params: { id: string } }) {
  const [order] = await db`
    SELECT id, user_id, total, status, created_at
    FROM orders
    WHERE id = ${params.id}
  `;

  const items = await db`
    SELECT product_id, quantity, price
    FROM order_items
    WHERE order_id = ${params.id}
  `;

  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Order #{order.id.slice(0, 8)}</h1>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <h2 className="text-xl font-bold mt-6">Items:</h2>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item.product_id}>
            Product: {item.product_id} | Quantity: {item.quantity} | Price: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
