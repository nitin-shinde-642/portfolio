import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot check — if bot filled the hidden field, return success silently
    if (website && String(website).trim().length > 0) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    // Validate fields
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // In production, send via Resend, Nodemailer, Webhook, or log
    console.log("[Contact Submission]", {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact Route Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message. Please try again later." },
      { status: 500 }
    );
  }
}
