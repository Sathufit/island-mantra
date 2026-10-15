"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { storeInfo } from "@/src/lib/data/store-info";
import TideLine from "@/src/components/motion/TideLine";

interface FormState {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", orderNumber: "", message: "" };

function mailtoFor(f: FormState) {
  const lines = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone && `Phone: ${f.phone}`,
    f.orderNumber && `Order number: ${f.orderNumber}`,
    "",
    f.message,
  ].filter((l) => l !== "");
  const subject = `Website message from ${f.name}`;
  return `mailto:${storeInfo.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "handoff" | "error">("idle");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 503) {
        // Email service not configured yet — hand off to the visitor's email app.
        window.location.href = mailtoFor(form);
        setStatus("handoff");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "handoff" ? (
        <motion.div
          key="handoff"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[360px] flex-col items-start justify-center"
          role="status"
        >
          <TideLine className="mb-6" />
          <p className="tagline text-3xl leading-snug">Almost there – your email app has your message ready.</p>
          <p className="mt-3 text-[15px] text-ink-soft">
            Just press send. If nothing opened, email us at{" "}
            <a href={mailtoFor(form)} className="link-draw text-ink">
              {storeInfo.contact.email}
            </a>{" "}
            or WhatsApp{" "}
            <a href={storeInfo.contact.whatsappUrl} className="link-draw text-ink">
              {storeInfo.contact.whatsappDisplay}
            </a>
            .
          </p>
          <button onClick={() => setStatus("idle")} className="link-draw caps mt-8 text-[10px] text-muted">
            Back to the form
          </button>
        </motion.div>
      ) : status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-h-[360px] flex-col items-start justify-center"
          role="status"
        >
          <TideLine className="mb-6" />
          <p className="tagline text-3xl leading-snug">Thank you – your message is on its way.</p>
          <p className="mt-3 text-[15px] text-ink-soft">We’ll be in touch soon.</p>
          <button onClick={() => setStatus("idle")} className="link-draw caps mt-8 text-[10px] text-muted">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          {(
            [
              { key: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
              { key: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              { key: "phone", label: "Phone", type: "tel", required: false, autoComplete: "tel" },
              { key: "orderNumber", label: "Order number (if any)", type: "text", required: false, autoComplete: "off" },
            ] as const
          ).map((f) => (
            <div key={f.key}>
              <label htmlFor={`contact-${f.key}`} className="caps block text-[10px] text-muted">
                {f.label}
                {f.required && <span aria-hidden> *</span>}
              </label>
              <input
                id={`contact-${f.key}`}
                type={f.type}
                required={f.required}
                autoComplete={f.autoComplete}
                value={form[f.key]}
                onChange={update(f.key)}
                className="field"
              />
            </div>
          ))}
          <div>
            <label htmlFor="contact-message" className="caps block text-[10px] text-muted">
              How can we help? <span aria-hidden>*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={update("message")}
              className="field resize-none"
            />
          </div>

          {status === "error" && (
            <p role="alert" className="text-[13px] text-terracotta">
              We couldn’t send that just now. Please try again, or email us at {storeInfo.contact.email}.
            </p>
          )}

          <button type="submit" disabled={status === "sending"} className="btn btn-solid">
            <span>{status === "sending" ? "Sending…" : "Send Message"}</span>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
