// /lib/cart.ts

import { Product } from "@/models/Product";

export type CartItem = {
  product: Product;
  quantity: number;
};

let cart: CartItem[] = [];

export const addToCart = (product: Product) => {
  const item = cart.find((c) => c.product.id === product.id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
};

export const removeFromCart = (productId: string) => {
  cart = cart.filter((c) => c.product.id !== productId);
};

export const getCart = () => cart;

export const clearCart = () => {
  cart = [];
};
