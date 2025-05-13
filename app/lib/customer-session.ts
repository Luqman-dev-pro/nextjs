import jwt from 'jsonwebtoken'
import db from '@/app/lib/db'

export async function getCustomerFromToken(token: string | null) {
  if (!token) return null
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const [customer] = await db`SELECT id, name, email FROM customers WHERE id = ${decoded.id}`
    return customer || null
  } catch {
    return null
  }
}
