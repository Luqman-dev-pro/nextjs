// "use client";

import Link from "next/link";
import db from "@/app/lib/db";
import { Product } from "@/models/Product";

export default async function AdminProductsPage() {
  const products = await db<Product[]>`
    SELECT id, name, slug, description, price, stock, image_url, category_id, created_at
    FROM products
    ORDER BY created_at DESC
  `;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <Link
        href="/dashboard/products/new"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Product
      </Link>

      <div className="grid gap-4 mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>Stock: {product.stock}</p>
            </div>
            <div className="space-x-4">
              <Link
                href={`/dashboard/products/edit/${product.id}`}
                className="text-yellow-500"
              >
                Edit
              </Link>
              <form action={`/dashboard/products/delete`} method="POST" className="inline">
                <input type="hidden" name="id" value={product.id} />
                <button type="submit" className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
