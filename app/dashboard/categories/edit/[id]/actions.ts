"use server";

import db from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  await db`
    UPDATE categories
    SET name=${name}, slug=${slug}
    WHERE id=${id}
  `;

  redirect("/dashboard/categories");
}
