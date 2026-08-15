const STARS = Array.from({ length: 70 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  const r2 = ((i * 4177 + 12345) % 233280) / 233280;
  return {
    top: `${(r * 100).toFixed(2)}%`,
    left: `${(r2 * 100).toFixed(2)}%`,
    size: r > 0.85 ? 3 : r > 0.6 ? 2 : 1,
    delay: `${(r2 * 4).toFixed(2)}s`,
  };
});

export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-52 -right-24 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[130px]" />
      {STARS.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute rounded-full bg-star"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
        />
      ))}
    </div>
  );
}
