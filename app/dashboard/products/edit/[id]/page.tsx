// "use client";

import db from "@/app/lib/db";
import { Product } from "@/models/Product";
import { updateProduct } from "./actions";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product] = await db<Product[]>`
    SELECT id, name, slug, description, price, stock, image_url, category_id
    FROM products
    WHERE id = ${params.id}
  `;

  if (!product) return <div>Product not found</div>;

  return (
    <form action={updateProduct} className="p-8 flex flex-col gap-4">
      <input type="hidden" name="id" value={product.id} />

      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <input
        type="text"
        name="name"
        defaultValue={product.name}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="slug"
        defaultValue={product.slug}
        className="border p-2 rounded"
        required
      />
      <textarea
        name="description"
        defaultValue={product.description || ""}
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="price"
        defaultValue={product.price}
        className="border p-2 rounded"
        step="0.01"
        required
      />
      <input
        type="number"
        name="stock"
        defaultValue={product.stock}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="image_url"
        defaultValue={product.image_url || ""}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="category_id"
        defaultValue={product.category_id || ""}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
