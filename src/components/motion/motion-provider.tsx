"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MotionContextValue = {
  ready: boolean;
  reducedMotion: boolean;
  setReady: (ready: boolean) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({
  children,
  reducedMotion,
}: {
  children: ReactNode;
  reducedMotion: boolean;
}) {
  const [ready, setReady] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) setReady(true);
  }, [reducedMotion]);

  const value = useMemo(
    () => ({
      ready,
      reducedMotion,
      setReady,
    }),
    [ready, reducedMotion],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error("useMotion must be used within MotionProvider");
  }
  return context;
}
