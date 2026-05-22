import { motion } from "framer-motion";
import { useState } from "react";

const phrases = [
  { p: "Wasted sprints", s: "We rebuild your cadence around outcomes, not output." },
  { p: "Unclear roadmaps", s: "Strategic narrative + a 90-day execution map." },
  { p: "Scope creep", s: "Decision frameworks that protect velocity." },
  { p: "Silent churn", s: "Behavioral signal modeling to predict drop-off." },
  { p: "Tech debt fog", s: "Architecture audits with cost-of-delay scoring." },
  { p: "Stalled launches", s: "GTM choreography across product, marketing, sales." },
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...phrases, ...phrases];
  return (
    <div className="overflow-hidden py-8 border-y border-[var(--border)]">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </motion.div>
    </div>
  );
}

function Item({ p, s }: { p: string; s: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative flex items-center gap-12 shrink-0"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.span
        className="font-display text-5xl md:text-7xl"
        animate={{ scale: hover ? 1.15 : 1, color: hover ? "#c8ff00" : "#f2ede4" }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        {p}
      </motion.span>
      <span className="text-[var(--accent)] text-4xl">✦</span>
      {hover && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-20 left-0 bg-[var(--card)] border border-[var(--accent)]/40 px-4 py-3 rounded-md text-sm font-mono normal-case text-[var(--foreground)]/90 max-w-xs whitespace-normal shadow-2xl z-20"
        >
          → {s}
        </motion.div>
      )}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="relative z-10 py-10 bg-[var(--muted)]/40">
      <Row />
      <Row reverse />
    </section>
  );
}
