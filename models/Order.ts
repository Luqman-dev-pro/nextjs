// /models/Order.ts
export interface Order {
    id: string; // UUID
    user_id: string; // FK to Customer UUID
    total: number;
    status: "PENDING" | "PAID" | "FAILED" | "CANCELLED"; // or simply string if you want dynamic
    created_at: string;
  }
  