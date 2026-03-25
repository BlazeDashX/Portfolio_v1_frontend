import { NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, sanitize } from "@/lib/validators";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const limited = rateLimit(ip, 5, 60_000);
    if (!limited.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Try again in a minute." },
        { status: 429 }
      );
    }

    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
    }

    // Honeypot
    if (body.company && String(body.company).trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(String(body.name || ""));
    const email = sanitize(String(body.email || ""));
    const message = sanitize(String(body.message || ""));

    // ✅ clearer validation errors
    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Name must be 2+ chars." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!resendKey || !toEmail || !fromEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Server email is not configured (missing env vars).",
          missing: {
            RESEND_API_KEY: !resendKey,
            CONTACT_TO_EMAIL: !toEmail,
            CONTACT_FROM_EMAIL: !fromEmail,
          },
        },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const subject = `Portfolio Contact: ${name}`;
    const text = `New message from your portfolio contact form:

Name: ${name}
Email: ${email}

Message:
${message}
`;

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      text,
      replyTo: email,
    });

    // ✅ return exact provider error
    if ((result as any).error) {
      return NextResponse.json(
        { ok: false, error: "Resend error", details: (result as any).error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Server error", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}