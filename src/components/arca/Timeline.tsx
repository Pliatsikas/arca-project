import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", t: "Diagnose", d: "Stakeholder interviews, system mapping, and a friction audit across product, ops, and go-to-market." },
  { n: "02", t: "Frame", d: "We compress findings into a single decision document and align leadership on what to bet against." },
  { n: "03", t: "Prototype", d: "Working software and interaction prototypes — not slides — to pressure-test the chosen direction." },
  { n: "04", t: "Embed", d: "Our team operates inside yours for 6–12 weeks, shipping in your stack with your engineers." },
  { n: "05", t: "Handoff", d: "Documentation, training, and a measurement spine so velocity persists after we leave." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((steps.length - 1) / steps.length) * 100}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative z-10 h-[500vh] md:h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="px-6 md:px-12 pt-24 pb-8 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-4">◆ 005 / Process</div>
            <h2 className="font-display text-5xl md:text-7xl">Five moves. <span className="font-serif italic text-[var(--accent)]">No filler.</span></h2>
          </div>
          <div className="hidden md:block w-64">
            <div className="h-px bg-[var(--border)] overflow-hidden">
              <motion.div className="h-full bg-[var(--accent)]" style={{ width: progress }} />
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Progress</div>
          </div>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div className="flex" style={{ x, width: `${steps.length * 100}vw` }}>
            {steps.map((s, i) => (
              <div key={i} className="w-screen h-full flex items-center px-6 md:px-24">
                <div className="grid grid-cols-12 gap-6 w-full items-center">
                  <div className="col-span-12 md:col-span-7 relative">
                    <div className="font-display text-[28vw] md:text-[15vw] leading-none text-[var(--foreground)]/[0.04] absolute -top-12 -left-4 pointer-events-none">{s.n}</div>
                    <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6 relative">Step {s.n}</div>
                    <h3 className="font-display text-7xl md:text-9xl relative">{s.t}</h3>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:col-start-9">
                    <p className="font-serif italic text-2xl md:text-3xl leading-snug text-[var(--foreground)]/85">{s.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
