"use client";

import { createCategory } from "./actions";

export default function NewCategoryPage() {
  return (
    <form action={createCategory} className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>

      <input name="name" placeholder="Category Name" className="border p-2 rounded" required />
      <input name="slug" placeholder="Slug" className="border p-2 rounded" required />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
