// /models/Customer.ts
export interface Customer {
    id: string; // UUID
    email: string;
    name?: string;
    password: string;
    role: string; // FK to Role.name
    created_at: string;
  }
  