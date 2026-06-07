export function SectionPlaceholder({ label }: { label: string }) {
  return (
    <div className="section-placeholder" role="status" aria-label={`Loading ${label}`}>
      <span className="section-placeholder-line" />
      <span>{label} / loading module</span>
    </div>
  );
}
