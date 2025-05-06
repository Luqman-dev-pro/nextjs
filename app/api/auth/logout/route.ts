// app/api/logout/route.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("session");
  redirect('/login')
}
