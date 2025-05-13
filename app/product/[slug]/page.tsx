// /app/product/[slug]/page.tsx

// import db from "@/app/lib/db";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
// import { Product } from "@/models/Product";
import { getProductFromDB  } from "@/app/lib/products";

type Props = {
  params: { slug: string }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductFromDB(params.slug)
  // const [product] = await db<Product[]>`
  //   SELECT id, name, slug, description, price, stock, image_url, category_id
  //   FROM products
  //   WHERE slug = ${params.slug}
  // `;

  if (!product) {
    return <div className="p-10 text-red-500">Product not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* IMAGE */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image_url || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* DETAILS */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-green-700 text-xl font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-gray-700">{product.description || "No description available."}</p>

        <p className={`mt-2 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
        </p>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
