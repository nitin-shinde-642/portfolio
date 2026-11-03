"use server";

import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function sendContactEmail(
  formData: FormData
): Promise<ContactActionResult> {
  // Parse raw form data
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    website: formData.get("website") as string, // honeypot
  };

  // Honeypot check — bots fill this, humans don't
  if (raw.website) {
    // Return success silently to not signal to bots
    return { success: true, message: "Message sent successfully!" };
  }

  // Validate
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, email, message } = parsed.data;

  // Send email via Resend
  try {
    const recipientEmail = process.env.CONTACT_EMAIL ?? "shindenitin642@gmail.com";

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px;">
          <h2 style="color: #7C8CFF;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border-color: #1F2937;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Failed to send message. Please try email directly.",
      };
    }

    return { success: true, message: "Message sent! I'll get back to you soon." };
  } catch (err) {
    console.error("Contact action error:", err);
    return {
      success: false,
      message: "Something went wrong. Please try again or email me directly.",
    };
  }
}
