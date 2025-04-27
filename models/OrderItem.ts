// /models/OrderItem.ts
export interface OrderItem {
    id: string; // UUID
    order_id: string; // FK to Order UUID
    product_id: string; // FK to Product UUID
    quantity: number;
    price: number;
  }
  