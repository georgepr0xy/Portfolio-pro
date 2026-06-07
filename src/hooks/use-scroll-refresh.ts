"use client";

import { useEffect } from "react";

import { useMotion } from "@/components/motion/motion-provider";
import { refreshScrollTrigger } from "@/lib/motion";

export function useScrollRefresh() {
  const { ready } = useMotion();

  useEffect(() => {
    if (!ready) return;
    refreshScrollTrigger(160);
  }, [ready]);
}
