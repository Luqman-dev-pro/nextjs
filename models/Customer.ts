// /models/Customer.ts
export interface Customers {
    id: string; // UUID
    email: string;
    name?: string;
    password: string;
    role: string; // FK to Role.name
    created_at: string;
  }
  