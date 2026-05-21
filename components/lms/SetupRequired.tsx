type SetupRequiredProps = {
  title: string;
  items: string[];
  hint?: string;
};

export function SetupRequired({ title, items, hint }: SetupRequiredProps) {
  return (
    <div className="arc-card mx-auto max-w-lg border-[var(--arc-accent)]/30 bg-[var(--arc-accent)]/5 p-8 text-center">
      <h2 className="arc-heading text-xl">{title}</h2>
      <p className="mt-2 text-sm text-[var(--arc-muted)]">
        Add these to <code className="text-[var(--arc-accent)]">.env.local</code>{" "}
        (and Vercel env for production), then restart{" "}
        <code className="text-[var(--arc-accent)]">npm run dev</code> or redeploy.
      </p>
      <ul className="arc-instructor-list mt-4 text-left">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {hint && (
        <p className="mt-4 text-xs text-[var(--arc-muted)]">{hint}</p>
      )}
    </div>
  );
}
