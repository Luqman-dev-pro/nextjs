"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartItemsGrid from "./CartItems";

type Props = {
  total: number;
  cartItems: {
    product: {
      id: string;
      name: string;
      price: number;
    //   image_url: string;
    };
    quantity: number;
  }[];
};

export default function PlaceOrderForm({ total, cartItems }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const payload = {
      customer: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        mobile: formData.get("mobile"),
        address: formData.get("address"),
        city: formData.get("city"),
        zip: formData.get("zip"),
      },
      cartItems,
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/order-success");
    } else {
      router.push("/order-failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" required className="input" />
        <input name="lastName" placeholder="Last Name" required className="input" />
        <input name="email" placeholder="Email" type="email" required className="input" />
        <input name="mobile" placeholder="Mobile" required className="input" />
        <input name="address" placeholder="Address Line" required className="input col-span-2" />
        <input name="city" placeholder="City" required className="input" />
        <input name="zip" placeholder="ZIP Code" required className="input" />
      </div>

      {/* <CartItemsGrid total={total} cartItems={cartItems} /> */}

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-semibold mb-2">Payment Method</p>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="payment" value="cod" defaultChecked />
          Cash on Delivery (COD)
        </label>
      </div>

      <div className="text-right mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Placing Order..." : `Place Order ($${total.toFixed(2)})`}
        </button>
      </div>
    </form>
  );
}
