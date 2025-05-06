import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import db from "./db";

export async function hashPassword(password: string) {
  const bcrypt = await import("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(input: string, hashed: string) {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(input, hashed);
}

export async function createSession(user: { id: string; email: string; type: "customer" | "admin" }) {
  const token = randomBytes(32).toString("hex");
  const cookieStore = cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  await db`
    INSERT INTO sessions (token, user_id, user_type)
    VALUES (${token}, ${user.id}, ${user.type})
    ON CONFLICT DO NOTHING
  `;
}
