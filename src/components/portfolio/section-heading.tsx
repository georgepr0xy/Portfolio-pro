import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  index,
  label,
  title,
  copy,
}: {
  index: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="grid gap-8 border-t border-[var(--line)] py-14 lg:grid-cols-[0.55fr_2.25fr] lg:py-20">
      <div className="eyebrow">{index} / {label}</div>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <h2 className="section-title">{title}</h2>
        {copy && <p className="max-w-md text-sm leading-7 text-[var(--muted)]">{copy}</p>}
      </div>
    </Reveal>
  );
}
