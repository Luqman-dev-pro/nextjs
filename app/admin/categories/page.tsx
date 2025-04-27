"use client";

import Link from "next/link";
import db from "@/app/lib/db";

export default async function AdminCategoriesPage() {
  const categories = await db`
    SELECT id, name, slug
    FROM categories
    ORDER BY name ASC
  `;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <Link href="/dashboard/categories/new" className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block">
        Add Category
      </Link>
      <div className="grid gap-4 mt-6">
        {categories.map((category) => (
          <div key={category.id} className="p-4 border flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{category.name}</h2>
              <p className="text-gray-600">{category.slug}</p>
            </div>
            <div className="space-x-4">
              <Link href={`/dashboard/categories/edit/${category.id}`} className="text-yellow-500">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
