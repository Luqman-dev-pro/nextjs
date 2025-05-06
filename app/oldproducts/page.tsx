// /app/products/page.tsx

// import { products } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { products } from "../lib/e-com-db";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
