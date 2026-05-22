import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

const items = [
  { q: "ARCA dragged six months of strategic theater into one decision week. We shipped the rewrite.", a: "Lena Osei", r: "VP Product, Northwind" },
  { q: "They embed like founders, ship like a startup, and document like a Big Four firm.", a: "Marcus Reidel", r: "CTO, Lattice Labs" },
  { q: "The most honest engagement we've had. They told us our roadmap was the problem.", a: "Priya Shankar", r: "CEO, Helio AI", big: true },
  { q: "Three weeks in, our churn graph bent. Six weeks in, it inverted.", a: "Tomás Esquivel", r: "Head of Growth, Vellum" },
  { q: "They wrote the playbook our internal team is still running today.", a: "Hannah Brandt", r: "COO, Foundry XII" },
  { q: "Rare combination — taste, rigor, and an actual shipping cadence.", a: "Daniel Park", r: "Founder, Quiet Field" },
];

function Card({ item, idx }: { item: (typeof items)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [idx % 2 === 0 ? 40 : -40, idx % 2 === 0 ? -40 : 40]);
  const rotation = useMemo(() => (Math.random() * 4 - 2).toFixed(2), []);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate: `${rotation}deg` }}
      className={`mb-6 break-inside-avoid bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 ${
        item.big ? "border-[var(--accent)]/40" : ""
      }`}
    >
      <p
        className={
          item.big
            ? "font-serif italic text-3xl md:text-4xl leading-snug"
            : "font-mono text-sm md:text-base leading-relaxed text-[var(--foreground)]/85"
        }
      >
        "{item.q}"
      </p>
      <div className="mt-6 pt-6 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span>{item.a}</span>
        <span className="text-[var(--muted-foreground)]">{item.r}</span>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section id="work" className="relative z-10 px-6 md:px-12 py-32">
      <div className="mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-4">◆ 007 / Field notes</div>
        <h2 className="font-display text-6xl md:text-8xl max-w-4xl">
          What operators <span className="font-serif italic text-[var(--accent)]">actually say.</span>
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {items.map((item, i) => (
          <Card key={i} item={item} idx={i} />
        ))}
      </div>
    </section>
  );
}
