import db from './db'

export type Category = {
  id: number
  name: string
  slug: string
}

export async function getAllCategoriesFromDB(): Promise<Category[]> {
  return await db<Category[]>`
    SELECT id, name, slug
    FROM categories
    ORDER BY name ASC
  `
}

export async function getCategoryBySlugFromDB(slug: string): Promise<Category | null> {
    const [category] = await db<Category[]>`
      SELECT id, name FROM categories WHERE slug = ${slug}
    `
    return category || null
  }
