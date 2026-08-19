const lines = [
  { indent: 0, tokens: [["const", "kw"], [" developer", "id"], [" = {", "p"]] },
  { indent: 1, tokens: [["name", "key"], [": ", "p"], ["\"Saif Ali Raja\"", "str"], [",", "p"]] },
  { indent: 1, tokens: [["role", "key"], [": ", "p"], ["\"MERN Stack Developer\"", "str"], [",", "p"]] },
  {
    indent: 1,
    tokens: [
      ["stack", "key"],
      [": ", "p"],
      ["[\"React\", \"Node\", \"MongoDB\"]", "str"],
      [",", "p"],
    ],
  },
  { indent: 1, tokens: [["focus", "key"], [": ", "p"], ["\"backend & cloud\"", "str"], [",", "p"]] },
  { indent: 0, tokens: [["};", "p"]] },
];

const tokenColor = {
  kw: "text-accent",
  id: "text-ink",
  key: "text-sky-300/80",
  str: "text-amber-200/70",
  p: "text-dim",
};

export default function CodeVisual() {
  return (
    <div
      aria-hidden="true"
      className="w-full max-w-sm rounded-xl border border-border bg-surface/60 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="ml-3 font-mono text-[11px] text-dim">profile.ts</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
              {line.tokens.map(([text, kind], j) => (
                <span key={j} className={tokenColor[kind]}>
                  {text}
                </span>
              ))}
            </div>
          ))}
          <span className="inline-block h-[1em] w-[7px] translate-y-[2px] animate-blink bg-accent/80" />
        </code>
      </pre>
    </div>
  );
}
