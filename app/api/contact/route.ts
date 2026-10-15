import { storeInfo } from "@/src/lib/data/store-info";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  orderNumber?: string;
  message?: string;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Delivers contact-form messages through Resend when RESEND_API_KEY is set.
// Without it the route answers 503 and the form falls back to opening the
// visitor's email app, so no message is ever silently dropped.
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const orderNumber = clean(body.orderNumber, 40);
  const message = clean(body.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Name, a valid email and a message are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    orderNumber ? `Order number: ${orderNumber}` : null,
    "",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Island Mantra <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? storeInfo.contact.email],
      reply_to: email,
      subject: `Website message from ${name}${orderNumber ? ` (order ${orderNumber})` : ""}`,
      text,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "Could not send your message." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
