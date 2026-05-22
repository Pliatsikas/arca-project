import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { n: 47, suffix: "", label: "Engagements shipped" },
  { n: 12, suffix: "wk", label: "Median time-to-launch" },
  { n: 3.4, suffix: "×", label: "Throughput uplift" },
  { n: 98, suffix: "%", label: "Client retention" },
];

function Stat({ n, suffix, label }: { n: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const value = useCountUp(Math.floor(n * 10), 1800, inView);
  const display = n < 10 ? (value / 10).toFixed(1) : Math.floor(value / 10).toString();
  return (
    <div ref={ref} className="flex-1 px-6 md:px-10 py-12">
      <div className="font-display text-6xl md:text-8xl">
        {display}
        <span className="text-[var(--accent)]">{suffix}</span>
      </div>
      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative z-10 bg-[var(--muted)] border-y border-[var(--border)]">
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
        {stats.map((s, i) => (
          <Stat key={i} {...s} />
        ))}
      </div>
    </section>
  );
}
