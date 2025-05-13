// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { getCustomerFromToken } from '@/app/lib/auth/getCustomerFromToken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const customer = await getCustomerFromToken(token)
    if (!customer) throw new Error('Invalid token')

    const [profile] = await db`
      SELECT id, name, email, image_url FROM customers WHERE id = ${customer.id}
    `
    return NextResponse.json(profile)
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
