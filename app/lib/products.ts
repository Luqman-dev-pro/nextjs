import db from './db'

export type Product = {
  id: number
  name: string
  slug: string
  description: string
  image_url: string
  price: number,
  stock: number,
  created_at: string,
  category_id: number
}

export async function getProductFromDB(slug: string): Promise<Product | null> {
  const [product] = await db<Product[]>`
    SELECT id, name, slug, description, price, stock, image_url, category_id
    FROM products
    WHERE slug = ${slug}
    LIMIT 1
  `
  return product || null
}

export async function getFeaturedProductFromDB() {
    const product = await db<Product[]>`
        SELECT id, name, slug, image_url, price
        FROM products
        ORDER BY created_at DESC
        LIMIT 4
    `
    return product || null
}

export async function getAllProductFromDB() {
    const product = await db<Product[]>`
        SELECT id, name, slug, image_url, price
        FROM products
        ORDER BY name ASC
    `
    return product || null
}

export async function getProductByCategoryIDFromDB(category_id: number): Promise<Product[]> {
    const product = await db<Product[]>`
       SELECT id, name, slug, description, price, stock, image_url, category_id
        FROM products
        WHERE category_id = ${category_id}
        ORDER BY name ASC
    `
    return product || null
  }
