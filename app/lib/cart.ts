import { cookies } from "next/headers";
import db from "@/app/lib/db";
import { Product } from "@/models/Product";

export type CartItem = {
  productId: string;
  quantity: number;
};

export async function getRawCart(): Promise<CartItem[]> {
  const cartRaw = (await cookies()).get("cart")?.value;
  if (!cartRaw) return [];
  try {
    return JSON.parse(cartRaw) as CartItem[];
  } catch {
    return [];
  }
}

export async function saveCart(cart: CartItem[]) {
  (await cookies()).set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: false,
  });
}

export async function addToCart(productId: string) {
  const cart = await getRawCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ productId, quantity: 1 });
  await saveCart(cart);
}

export async function decFromCart(productId: string) {
  const cart = await getRawCart();
  const updated = cart.map((item) =>
    item.productId === productId
      ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
      : item
  );
  await saveCart(updated);
}

export async function removeFromCart(productId: string) {
  const cart = await getRawCart();
  const updated = cart.filter((item) => item.productId !== productId);
  await saveCart(updated);
}

export async function getCartItems(): Promise<
  { product: Product; quantity: number }[]
> {
  const cart = await getRawCart();
  if (cart.length === 0) return [];

  const ids = cart.map((item) => item.productId);
  const products = await db<Product[]>`
    SELECT * FROM products
    WHERE id = ANY(${ids})
  `;

  return cart.map((item) => ({
    product: products.find((p) => p.id === item.productId)!,
    quantity: item.quantity,
  }));
}

export async function clearCart() {
  (await cookies()).set("cart", "", {
    path: "/",
    maxAge: 0,
  });
}