"use server";

import db from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const image_url = formData.get("image_url") as string;
  const category_id = formData.get("category_id") as string;

  await db`
    INSERT INTO products (name, slug, description, price, stock, image_url, category_id)
    VALUES (${name}, ${slug}, ${description}, ${price}, ${stock}, ${image_url}, ${category_id})
  `;

  redirect("/dashboard/products");
}
