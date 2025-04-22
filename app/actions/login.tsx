'use server'

import db from '@/app/lib/db'

export async function login(email: string, password: string) {
  const user = await db`SELECT * FROM users WHERE email = ${email}`
  return user[0] || null
}