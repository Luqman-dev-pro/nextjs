// "use client";

import Link from "next/link";
import db from "@/app/lib/db";

export default async function AdminOrdersPage() {
  const orders = await db`
    SELECT id, user_id, total, status, created_at
    FROM orders
    ORDER BY created_at DESC
  `;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="grid gap-4 mt-6">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Order #{order.id.slice(0, 8)}</h2>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>
            <div>
              <Link href={`/dashboard/orders/view/${order.id}`} className="text-blue-500">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
