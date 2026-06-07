import { ArrowUpRight } from "lucide-react";

import { contact } from "@/lib/data";

const links = [
  { label: "Email", href: `mailto:${contact.email}`, value: contact.email },
  { label: "LinkedIn", href: contact.linkedin, value: "LinkedIn" },
  { label: "GitHub", href: contact.github, value: "GitHub" },
];

export function ContactSection() {
  return (
    <div className="contact-minimal">
      <a href={`mailto:${contact.email}`} className="contact-terminal">
        <span className="contact-terminal-line">
          <span className="contact-terminal-prompt" aria-hidden="true">
            &gt;{" "}
          </span>
          <span className="contact-terminal-command">let&apos;s_build_something()</span>
          <span className="contact-terminal-cursor" aria-hidden="true" />
        </span>
        <span className="contact-terminal-hint">opens email client</span>
      </a>

      <ul className="contact-links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target={link.label === "Email" ? undefined : "_blank"} rel={link.label === "Email" ? undefined : "noreferrer"}>
              <span>{link.label}</span>
              <span>{link.value}</span>
              <ArrowUpRight className="contact-link-icon" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
