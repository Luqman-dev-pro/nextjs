import { NextResponse } from 'next/server'
import { getProductFromDB } from '@/app/lib/products'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const product = await getProductFromDB(params.slug)

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}
