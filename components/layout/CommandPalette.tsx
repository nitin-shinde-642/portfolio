"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/lib/data";
import { EASE } from "@/lib/motion";

interface CommandItem {
  id: string;
  label: string;
  group: string;
  icon: (props: { className?: string }) => React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  const navigateTo = useCallback((id: string) => {
    close();
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = id;
    }
  }, [close]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      close();
    }, 1000);
  }, [close]);

  const openLink = useCallback((url: string) => {
    close();
    window.open(url, "_blank", "noopener,noreferrer");
  }, [close]);

  const actions: CommandItem[] = [
    {
      id: "projects",
      label: "Go to Projects",
      group: "Navigation",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      action: () => navigateTo("#projects"),
    },
    {
      id: "resume",
      label: "Download Resume",
      group: "Actions",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      action: () => openLink(profile.resumeUrl),
    },
    {
      id: "copy-email",
      label: copied ? "Email Copied!" : "Copy Email",
      group: "Actions",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      action: copyEmail,
    },
    {
      id: "github",
      label: "Open GitHub Profile",
      group: "Social",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      action: () => openLink(profile.github),
    },
    {
      id: "linkedin",
      label: "Open LinkedIn Profile",
      group: "Social",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      action: () => openLink(profile.linkedin),
    },
    {
      id: "home",
      label: "Go to Home",
      group: "Navigation",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      action: () => navigateTo("#home"),
    },
    {
      id: "about",
      label: "Go to About",
      group: "Navigation",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      action: () => navigateTo("#about"),
    },
    {
      id: "skills",
      label: "Go to Skills",
      group: "Navigation",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m18 16 4-4-4-4" />
          <path d="m6 8-4 4 4 4" />
          <path d="m14.5 4-5 16" />
        </svg>
      ),
      action: () => navigateTo("#skills"),
    },
    {
      id: "experience",
      label: "Go to Experience",
      group: "Navigation",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      action: () => navigateTo("#experience"),
    },
    {
      id: "contact",
      label: "Go to Contact",
      group: "Navigation",
      icon: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      action: () => navigateTo("#contact"),
    },
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.group.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Arrow navigation & Enter
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111114] shadow-2xl shadow-black/80"
          >
            {/* Search Input bar */}
            <div className="flex items-center border-b border-white/[0.08] px-4 py-3.5">
              <svg className="w-5 h-5 text-[#A1A1AA] mr-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-[#FAFAFA] placeholder-[#71717A] outline-none font-sans"
              />
              <button
                onClick={close}
                className="rounded px-1.5 py-0.5 text-[11px] font-jetbrains-mono text-[#A1A1AA] border border-white/10 hover:border-white/20 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results list */}
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#71717A]">
                  No matching results found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-[#8B5CF6]/20 to-[#22D3EE]/20 text-[#FAFAFA] border border-[#8B5CF6]/30"
                          : "text-[#A1A1AA] hover:text-[#FAFAFA] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isSelected ? "text-[#22D3EE]" : "text-[#71717A]"}>
                          {item.icon({ className: "w-4 h-4" })}
                        </span>
                        <span className="font-medium font-sans">{item.label}</span>
                      </div>
                      <span className="text-[11px] font-jetbrains-mono uppercase tracking-wider text-[#71717A]">
                        {item.group}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer guide */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#09090B]/60 px-4 py-2.5 text-[11px] font-jetbrains-mono text-[#71717A]">
              <div className="flex items-center gap-2">
                <span>Navigate</span>
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↑</kbd>
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↓</kbd>
              </div>
              <div className="flex items-center gap-2">
                <span>Select</span>
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↵</kbd>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
