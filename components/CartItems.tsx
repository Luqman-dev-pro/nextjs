// import { getCartItems } from "@/app/lib/cart";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
    total: number;
    cartItems: {
      product: {
        id: string;
        name: string;
        price: number;
        image_url: string;
      };
      quantity: number;
    }[];
  };

  
export default async function CartItemsGrid({total, cartItems} : Props) {
    // const cartItems = await getCartItems();
    // const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

return (
<div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold">Order Items</h1>
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-4 border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image_url || "/placeholder.jpg"}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{item.product.name}</h2>
                    <p className="text-green-600">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <form action="/api/cart/dec" method="POST">
                    <input type="hidden" name="productId" value={item.product.id} />
                    <button type="submit" className="px-2 py-1 text-xl">−</button>
                  </form>
                  <span>{item.quantity}</span>
                  <form action="/api/cart/inc" method="POST">
                    <input type="hidden" name="productId" value={item.product.id} />
                    <button type="submit" className="px-2 py-1 text-xl">+</button>
                  </form>
                  <form action="/api/cart/remove" method="POST">
                    <input type="hidden" name="productId" value={item.product.id} />
                    <button className="text-sm ml-3"><TrashIcon className="h-5 w-5 text-red-500" /></button>
                  </form>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-10 text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
    </div>
);
}