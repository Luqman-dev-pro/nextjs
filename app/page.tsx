// app/page.tsx
import Link from "next/link";
import { getAllProductFromDB, getFeaturedProductFromDB } from "./lib/products";
import { getAllCategoriesFromDB } from "./lib/categories";

export default async function HomePage() {
  const categories = await getAllCategoriesFromDB();
  const featuredProducts = await getFeaturedProductFromDB();
  const allProducts = await getAllProductFromDB();

  return (
    <div className="p-4 md:p-8 space-y-12">
      {/* BANNER */}
      <section className="bg-gray-900 text-white py-16 text-center rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to NextCommerce 🛍️</h1>
        <p className="mt-4 text-lg">Explore categories and shop amazing deals</p>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center font-semibold"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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

      {/* ALL PRODUCTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allProducts.map((product) => (
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
