import { getCartItems } from "@/app/lib/cart";
import PlaceOrderForm from "@/components/PlaceOrderForm";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const cartItems = await getCartItems();

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <PlaceOrderForm total={total} cartItems={cartItems} />
      </div>
    </div>
  );
}
