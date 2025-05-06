// "use client";

import { createProduct } from "./actions";
import db from "@/app/lib/db";
import { Category } from "@/models/Category";

export default async function NewProductPage() {
  const categories: Category[] = await db<Category[]>`SELECT id, name FROM categories`;
  
  return (
    <form action={createProduct} className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        className="border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="border p-2 rounded"
        step="0.01"
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="image_url"
        placeholder="Image URL"
        className="border p-2 rounded"
      />
      <select
        name="category_id"
        className="border p-2 rounded"
      >
        <option value=''>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
       </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
