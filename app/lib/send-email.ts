// app/lib/send-email.ts
import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    host: "localhost", // local SMTP
    port: 1025,         // default port for MailHog or Papercut
    secure: false,
  });

  await transporter.sendMail({
    from: '"JML" <noreply@jml.com>',
    to,
    subject,
    html,
  });
}
