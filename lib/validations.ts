import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must not exceed 100 characters."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Email must not exceed 254 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must not exceed 2000 characters."),
  // Honeypot — should always be empty
  website: z.string().max(0, "Bot detected.").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
