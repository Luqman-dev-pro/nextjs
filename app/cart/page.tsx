// /app/cart/page.tsx

import { getCart, removeFromCart } from "@/lib/cart";

export default function CartPage() {
  const cart = getCart();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <div>
                <h2 className="font-semibold">{item.product.name}</h2>
                <p>Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
