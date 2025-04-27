// /app/checkout/page.tsx

import { getCart, clearCart } from "@/lib/cart";

export default function CheckoutPage() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    clearCart();
    alert("Order placed successfully!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleCheckout} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Confirm Order
      </button>
    </div>
  );
}
