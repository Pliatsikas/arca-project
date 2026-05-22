import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";

function RepelLetter({ char, index, mouseX, mouseY }: { char: string; index: number; mouseX: any; mouseY: any }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 });
  const sy = useSpring(y, { stiffness: 120, damping: 14 });

  useEffect(() => {
    const unsub = mouseX.on("change", () => update());
    const unsub2 = mouseY.on("change", () => update());
    function update() {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - mouseX.get();
      const dy = cy - mouseY.get();
      const dist = Math.hypot(dx, dy);
      const radius = 180;
      if (dist < radius) {
        const force = (1 - dist / radius) * 80;
        x.set((dx / dist) * force);
        y.set((dy / dist) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    }
    return () => {
      unsub();
      unsub2();
    };
  }, [mouseX, mouseY, x, y]);

  return (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function Contact() {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const [submitted, setSubmitted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; dx: number; dy: number }[]>([]);

  useEffect(() => {
    const m = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [mouseX, mouseY]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const newParticles = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      dx: Math.cos((i / 24) * Math.PI * 2) * (60 + Math.random() * 80),
      dy: Math.sin((i / 24) * Math.PI * 2) * (60 + Math.random() * 80),
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  };

  const headline = "LET'S FIX IT";

  return (
    <section id="contact" className="relative z-10 px-6 md:px-12 py-32 border-t border-[var(--border)]">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-8">◆ 008 / Finale</div>

      <h2 className="font-display text-[18vw] md:text-[15vw] leading-[0.9] select-none">
        {headline.split("").map((c, i) => (
          <RepelLetter key={i} char={c} index={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </h2>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-serif italic text-2xl md:text-3xl max-w-lg leading-snug">
            Send a sentence about what's breaking. We reply within one working day with a sharper version of your problem.
          </p>
        </div>

        <form onSubmit={onSubmit} className="relative">
          <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Your email
          </label>
          <div className="relative mt-3">
            <input
              type="email"
              required
              placeholder="you@company.com"
              disabled={submitted}
              className="w-full bg-transparent border-0 border-b border-[var(--border)] py-4 text-2xl md:text-3xl font-display focus:outline-none placeholder:text-[var(--muted-foreground)]/40"
            />
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-[var(--accent)]"
              initial={{ width: 0 }}
              whileInView={{ width: "30%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <button
            type="submit"
            className="relative mt-8 inline-flex items-center gap-3 bg-[var(--accent)] text-[var(--background)] px-7 py-4 rounded-full font-mono text-sm uppercase tracking-widest"
          >
            {submitted ? "Sent ✓" : "Send it"}
            <span className="absolute inset-0 pointer-events-none">
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: p.dx, y: p.dy, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                />
              ))}
            </span>
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-32 pt-12 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs uppercase tracking-widest">ARCA / Studio</span>
          </div>
          <p className="font-serif italic text-2xl max-w-sm leading-snug">
            Quiet rigor for loud problems. Berlin, remote, occasionally on a plane.
          </p>
          <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
            © 2026 ARCA — All rights, gently reserved.
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end">
          {["Services", "Process", "Field notes", "Brief us", "Careers"].map((l, i) => (
            <a
              key={l}
              href="#"
              className="font-display text-3xl md:text-4xl hover:text-[var(--accent)] transition-colors"
              style={{ marginRight: `${i * 1.5}rem` }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
