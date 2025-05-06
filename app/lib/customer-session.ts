import { cookies } from "next/headers";
import db from "@/app/lib/db";

export async function getCustomerFromSession() {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  const [session] = await db`
    SELECT user_id FROM sessions WHERE token = ${token} AND user_type = 'customer'
  `;
  return session ? { id: session.user_id } : null;
}
