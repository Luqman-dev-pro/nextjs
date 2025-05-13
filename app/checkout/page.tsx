import { getCartItems } from "@/app/lib/cart";
import CartItemsGrid from "@/components/CartItems";
import PlaceOrderForm from "@/components/PlaceOrderForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCustomerFromToken } from "../lib/auth/getCustomerFromToken";

type Props = {
  total: number;
  cartItems: {
    product: {
      id: string;
      name: string;
      price: number;
      // image_url: string;
    };
    quantity: number;
  }[];
};

export default async function CheckoutPage() {
  const token = headers().get("authorization")?.split(" ")[1] || null;
  const customer = await getCustomerFromToken(token);

  if (!customer) redirect("/login");

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
      <CartItemsGrid total={total} cartItems={cartItems} />
      <div className="bg-white p-6 rounded shadow space-y-4 custom-bg-style">
        <PlaceOrderForm total={total} cartItems={cartItems} />
      </div>
    </div>
  );
}
