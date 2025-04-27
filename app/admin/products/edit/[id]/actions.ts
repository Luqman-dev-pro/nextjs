"use server";

import db from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const image_url = formData.get("image_url") as string;
  const category_id = formData.get("category_id") as string;

  await db`
    UPDATE products
    SET name=${name}, slug=${slug}, description=${description}, price=${price}, stock=${stock}, image_url=${image_url}, category_id=${category_id}
    WHERE id=${id}
  `;

  redirect("/dashboard/products");
}
