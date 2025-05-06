import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { sendEmail } from "@/app/lib/send-email"; // you implement this with Resend, Mailgun, etc.
import dayjs from "dayjs";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const [user] = await db`
    SELECT id FROM customers WHERE email = ${email}
  `;

  if (!user) {
    return NextResponse.json({ message: "No account with that email" }, { status: 404 });
  }

  const token = randomBytes(32).toString("hex");
  const expires = dayjs().add(1, "hour").toDate(); // 1 hour expiry

  await db`
    UPDATE customers
    SET reset_token = ${token}, reset_token_expires = ${expires}
    WHERE email = ${email}
  `;

  const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click below to reset your password:</p>
           <a href="${resetLink}" target="_blank">${resetLink}</a>`,
  });

  return NextResponse.json({ success: true });
}
