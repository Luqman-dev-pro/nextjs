// /components/ProductCard.tsx

"use client";

import { Product } from "@/models/Product";
import { addToCart } from "@/app/lib/cart";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);
    router.refresh();
  };

  return (
    <div className="border p-4">
      <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-600">${product.price}</p>
      <button onClick={handleAddToCart} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
