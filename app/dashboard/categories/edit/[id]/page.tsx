// "use client";

import db from "@/app/lib/db";
import { updateCategory } from "./actions";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const [category] = await db`
    SELECT id, name, slug
    FROM categories
    WHERE id = ${params.id}
  `;

  if (!category) return <div>Category not found</div>;

  return (
    <form action={updateCategory} className="p-8 flex flex-col gap-4">
      <input type="hidden" name="id" value={category.id} />

      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>

      <input name="name" defaultValue={category.name} className="border p-2 rounded" required />
      <input name="slug" defaultValue={category.slug} className="border p-2 rounded" required />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
}
