type SetupRequiredProps = {
  title: string;
  items: string[];
};

export function SetupRequired({ title, items }: SetupRequiredProps) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center">
      <h2 className="font-bricolage text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Add these to <code className="text-cyan-300">.env.local</code> and restart{" "}
        <code className="text-cyan-300">npm run dev</code>. See{" "}
        <code className="text-cyan-300">docs/ARC_KEYS.md</code>.
      </p>
      <ul className="mt-4 space-y-1 text-left text-sm text-zinc-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
