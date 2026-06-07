"use client";

import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { contact, navigation } from "@/lib/data";
import { scrollToAnchor } from "@/lib/lenis-instance";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      scrollToAnchor(href);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--line)] bg-[rgba(247,247,244,0.92)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="page-shell flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-3"
          aria-label="George Province, home"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("#hero");
          }}
        >
          <span className="grid size-7 place-items-center rounded-sm bg-[var(--graphite)] font-mono text-[10px] font-semibold text-white">
            GP
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)] sm:block">
            Engineer / AI systems
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
            <span className="status-dot" aria-hidden="true" />
            Available for select work
          </span>
          <a href={`mailto:${contact.email}`} className={buttonVariants({ size: "sm" })}>
            Start a project
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="grid size-9 place-items-center rounded-md border border-[var(--line)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
        >
          {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id={menuId}
          className="border-t border-[var(--line)] bg-[var(--paper)] px-5 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleNavClick(item.href);
              }}
              className="flex border-b border-[var(--line)] py-3 font-mono text-xs uppercase tracking-[0.12em]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
