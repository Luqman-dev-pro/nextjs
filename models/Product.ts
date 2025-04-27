// /models/Product.ts
export interface Product {
    id: string; // UUID
    name: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    image_url?: string;
    category_id?: string; // FK to Category UUID
    created_at: string; // ISO Date string
  }
  