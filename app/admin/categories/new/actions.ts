"use server";

import db from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  await db`
    INSERT INTO categories (name, slug)
    VALUES (${name}, ${slug})
  `;

  redirect("/dashboard/categories");
}
