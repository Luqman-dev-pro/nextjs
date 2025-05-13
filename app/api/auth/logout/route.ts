// app/api/logout/route.ts
import { clearCart } from "@/app/lib/cart";
import { NextResponse } from 'next/server'

export async function POST() {
  await clearCart();
  return NextResponse.json({ message: 'Logged out' }, { status: 200 })
}
