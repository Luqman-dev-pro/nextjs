"use client";

import { createProduct } from "./actions";

export default function NewProductPage() {
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
      <input
        type="text"
        name="category_id"
        placeholder="Category ID"
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
