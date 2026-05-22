import { motion } from "framer-motion";
import { Brain, Compass, Workflow, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Card = {
  icon: LucideIcon;
  title: string;
  desc: string;
  span: string;
  gradient: string;
};

const cards: Card[] = [
  {
    icon: Brain,
    title: "AI Strategy Sprints",
    desc: "Two-week intensives that translate business friction into deployable AI surfaces.",
    span: "md:col-span-7 md:row-span-2",
    gradient: "radial-gradient(circle at 30% 20%, rgba(200,255,0,0.18), transparent 60%)",
  },
  {
    icon: Compass,
    title: "Product Compass",
    desc: "Narrative + roadmap + metric tree, in one operating doc.",
    span: "md:col-span-5",
    gradient: "linear-gradient(135deg, rgba(200,255,0,0.12), rgba(30,35,48,0))",
  },
  {
    icon: Workflow,
    title: "Process Engineering",
    desc: "Re-architect rituals so teams ship without slack.",
    span: "md:col-span-5",
    gradient: "radial-gradient(circle at 80% 80%, rgba(200,255,0,0.15), transparent 65%)",
  },
  {
    icon: Sparkles,
    title: "Interface Craft",
    desc: "Design systems and bespoke UI for AI-native products.",
    span: "md:col-span-12",
    gradient: "linear-gradient(90deg, rgba(200,255,0,0.10), rgba(200,255,0,0) 60%)",
  },
];

export function Bento() {
  return (
    <section id="services" className="relative z-10 px-6 md:px-12 py-32">
      <div className="flex items-end justify-between mb-16">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-4">
            ◆ 004 / Services
          </div>
          <h2 className="font-display text-6xl md:text-8xl max-w-3xl">
            Built for teams who <span className="font-serif italic text-[var(--accent)]">refuse to coast.</span>
          </h2>
        </div>
        <div className="hidden md:block font-mono text-xs text-[var(--muted-foreground)] max-w-xs text-right">
          Four interlocking practices. Engaged separately or as a single embedded operating system.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[220px] gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative col-span-1 row-span-1 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 overflow-hidden transition-colors hover:border-[var(--accent)]/60"
              style={{ gridColumn: undefined } as any}
            >
              <div className={`${c.span} hidden`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: c.gradient }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" style={{ boxShadow: "0 0 60px -10px rgba(200,255,0,0.25) inset" }} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <Icon strokeWidth={1} className="w-8 h-8 text-[var(--accent)]" />
                <div>
                  <h3 className="font-display text-3xl md:text-4xl mb-3">{c.title}</h3>
                  <p className="font-mono text-sm text-[var(--foreground)]/70 max-w-md leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Apply spans via a separate style pass to avoid Tailwind purge issues */}
      <style>{`
        #services .grid > div:nth-child(1) { grid-column: span 12 / span 12; grid-row: span 2 / span 2; }
        #services .grid > div:nth-child(2) { grid-column: span 12 / span 12; }
        #services .grid > div:nth-child(3) { grid-column: span 12 / span 12; }
        #services .grid > div:nth-child(4) { grid-column: span 12 / span 12; }
        @media (min-width: 768px) {
          #services .grid > div:nth-child(1) { grid-column: span 7 / span 7; grid-row: span 2 / span 2; }
          #services .grid > div:nth-child(2) { grid-column: span 5 / span 5; }
          #services .grid > div:nth-child(3) { grid-column: span 5 / span 5; }
          #services .grid > div:nth-child(4) { grid-column: span 12 / span 12; }
        }
      `}</style>
    </section>
  );
}
