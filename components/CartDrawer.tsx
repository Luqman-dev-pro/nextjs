"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/outline";

type CartItem = {
  product: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
  quantity: number;
};

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  // Pages to hide drawer
  const shouldHide = pathname.startsWith("/cart") || pathname.startsWith("/checkout");

  useEffect(() => {
    const listener = () => {
      fetchCart();
      setIsOpen(true);
    };
  
    window.addEventListener("open-cart", listener);
    return () => window.removeEventListener("open-cart", listener);
  }, []);

  const fetchCart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setCart(data);
  };

  const updateQty = async (productId: string, action: "inc" | "dec" | "remove") => {
    const form = new FormData();
    form.append("productId", productId);
    await fetch(`/api/cart/${action}`, { method: "POST", body: form });
    fetchCart();
  };

  if (shouldHide) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="text-2xl">&times;</button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
            <div
                key={item.product.id}
                className="flex items-center justify-between border-b pb-3 relative"
            >
                {/* Image */}
                <img
                src={item.product.image_url || "/placeholder.jpg"}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
                />
            
                {/* Details */}
                <div className="ml-3 flex-1">
                <h3 className="font-medium text-sm">{item.product.name}</h3>
                <p className="text-sm text-green-600">${item.product.price.toFixed(2)}</p>
            
                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                    onClick={() => updateQty(item.product.id, "dec")}
                    className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-100"
                    >
                    −
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button
                    onClick={() => updateQty(item.product.id, "inc")}
                    className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-100"
                    >
                    +
                    </button>
                </div>
                </div>
            
                {/* Remove */}
                <button
                onClick={() => updateQty(item.product.id, "remove")}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-red-500 hover:text-red-700"
                aria-label="Remove from cart"
                >
                <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
            </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t">
            {/* <button
              onClick={() => router.push("/cart")}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              View Full Cart
            </button> */}
            <button
                onClick={() => router.push("/checkout")}
                className="w-full flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
