"use client";

import { useActionState, useRef } from "react";
import { sendContactEmail, type ContactActionResult } from "@/app/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState: ContactActionResult = {
  success: false,
  message: "",
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState(
    async (prev: ContactActionResult, formData: FormData) => {
      const result = await sendContactEmail(formData);
      if (result.success) {
        formRef.current?.reset();
      }
      return result;
    },
    initialState
  );

  if (state.success) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center justify-center gap-4 p-10 rounded-xl border border-[color:var(--availability)]/30 bg-[color:var(--availability)]/5 text-center"
      >
        <CheckCircle
          className="h-10 w-10 text-[color:var(--availability)]"
          aria-hidden="true"
        />
        <p className="font-semibold text-[color:var(--text)]">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-[color:var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] rounded"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} noValidate className="space-y-5">
      {/* Global error */}
      {!state.success && state.message && (
        <p role="alert" className="text-sm text-red-500 font-medium">
          {state.message}
        </p>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-describedby={state.errors?.name ? "contact-name-error" : undefined}
          aria-invalid={!!state.errors?.name}
          required
        />
        {state.errors?.name && (
          <p id="contact-name-error" role="alert" className="text-xs text-red-500 mt-1">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-describedby={state.errors?.email ? "contact-email-error" : undefined}
          aria-invalid={!!state.errors?.email}
          required
        />
        {state.errors?.email && (
          <p id="contact-email-error" role="alert" className="text-xs text-red-500 mt-1">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Describe your project or opportunity..."
          aria-describedby={state.errors?.message ? "contact-message-error" : undefined}
          aria-invalid={!!state.errors?.message}
          required
          className="min-h-[140px]"
        />
        {state.errors?.message && (
          <p id="contact-message-error" role="alert" className="text-xs text-red-500 mt-1">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website (leave blank)</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full flex items-center justify-center gap-2 h-11 px-5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer",
          "bg-[color:var(--accent)] text-white hover:bg-[color:var(--accent-hover)] shadow-sm hover:shadow-md hover:shadow-[color:var(--accent)]/25 hover:-translate-y-0.5 active:translate-y-0",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        )}
      >
        {isPending ? (
          <>
            <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
