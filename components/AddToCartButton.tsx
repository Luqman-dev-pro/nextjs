"use client";

import { Product } from "@/models/Product";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId: product.id }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    // Dispatch event to open cart drawer
    window.dispatchEvent(new CustomEvent("open-cart"));

    setLoading(false);
  };

  return (
    <button
      disabled={product.stock === 0 || loading}
      onClick={handleAdd}
      className={`px-4 py-2 rounded text-white ${
        product.stock === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
