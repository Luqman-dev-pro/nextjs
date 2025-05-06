// /lib/cart.ts
import { cookies } from "next/headers";
import db from "@/app/lib/db";
import { Product } from "@/models/Product";

export type CartItem = {
  productId: string;
  quantity: number;
};

function getRawCart(): CartItem[] {
  const cookieStore = cookies();
  const cartRaw = cookieStore.get("cart")?.value;
  if (!cartRaw) return [];
  try {
    return JSON.parse(cartRaw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  const cookieStore = cookies();
  cookieStore.set("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: false,
  });
}

export function addToCart(productId: string) {
  const cart = getRawCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ productId, quantity: 1 });
  saveCart(cart);
}

export function decFromCart(productId: string) {
  const cart = getRawCart();
  const updated = cart
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
  saveCart(updated);
}

export function removeFromCart(productId: string) {
  const cart = getRawCart();
  const updated = cart.filter((item) => item.productId !== productId);
  saveCart(updated);
}

export async function getCartItems(): Promise<
  { product: Product; quantity: number }[]
> {
  const cart = getRawCart();
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



// // /lib/cart.ts

// import { Product } from "@/models/Product";

// export type CartItem = {
//   product: Product;
//   quantity: number;
// };

// let cart: CartItem[] = [];

// export const addToCart = (product: Product) => {
//   const item = cart.find((c) => c.product.id === product.id);
//   if (item) {
//     item.quantity += 1;
//   } else {
//     cart.push({ product, quantity: 1 });
//   }
// };

// export const removeFromCart = (productId: string) => {
//   cart = cart.filter((c) => c.product.id !== productId);
// };

// export const getCart = () => cart;

// export const clearCart = () => {
//   cart = [];
// };
