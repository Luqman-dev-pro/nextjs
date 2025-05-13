// /app/category/[slug]/page.tsx

import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { Category } from "@/models/Category";
import Link from "next/link";
import { getProductByCategoryIDFromDB } from "@/app/lib/products";
import { getCategoryBySlugFromDB } from "@/app/lib/categories";

export default async function CategoryBasedProductDetailPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlugFromDB(params.slug);

  if (!category) return notFound();

  const products = await getProductByCategoryIDFromDB(category.id);

  if (!products) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-1 gap-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="border rounded-lg overflow-hidden hover:shadow-md"
            >
              <img src={product.image_url} alt={product.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-green-600">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </div>
  );
}
