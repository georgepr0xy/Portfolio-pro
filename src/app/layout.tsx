import type { Metadata, Viewport } from "next";

import { AppShell } from "@/components/motion/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "George Province — Software Engineer",
  description:
    "Software engineer building AI systems, scalable backends, event-driven architectures, and modern web experiences.",
  metadataBase: new URL("https://georgeprovince.dev"),
  openGraph: {
    title: "George Province — Software Engineer",
    description:
      "Portfolio of George Province — AI systems, backend engineering, and distributed infrastructure.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
