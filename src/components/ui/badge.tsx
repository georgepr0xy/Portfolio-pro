import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]",
        className,
      )}
      {...props}
    />
  );
}
