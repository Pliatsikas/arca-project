import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

const subtitle =
  "An AI problem-solving studio engineering clarity into the chaos of modern product teams.";

export function Hero() {
  const btnRef = useMagneticEffect<HTMLAnchorElement>(100, 0.35);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-28 pb-12 px-6 md:px-12">
      {/* Conic orb */}
      <div
        className="pointer-events-none absolute -right-40 top-1/4 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, #c8ff00, #080a0f, #1e2330, #c8ff00)",
          animation: "orb-rotate 30s linear infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,255,0,0.25), transparent 70%)",
          animation: "orb-pulse 6s ease-in-out infinite",
        }}
      />

      <nav className="relative z-10 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span>ARCA / Studio</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="text-[var(--muted-foreground)]">Est. 2024 — Berlin</div>
      </nav>

      <div className="relative z-10 mt-16 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted-foreground)] mb-6"
        >
          ◆ problem-solving, productized
        </motion.div>

        <h1 className="font-display text-[18vw] md:text-[14vw] leading-[0.85] -ml-2">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="block"
          >
            We untangle
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.15 }}
            className="block text-[var(--accent)] italic font-serif font-normal"
          >
            the unsolvable.
          </motion.div>
        </h1>

        <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <p className="max-w-md text-base md:text-lg text-[var(--foreground)]/80 font-mono leading-relaxed">
            {subtitle.split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.012 }}
              >
                {c}
              </motion.span>
            ))}
          </p>

          <a
            ref={btnRef}
            href="#contact"
            className="group inline-flex items-center gap-3 bg-[var(--accent)] text-[var(--background)] px-7 py-5 rounded-full font-mono text-sm uppercase tracking-widest font-medium transition-transform"
            style={{ transition: "transform 0.4s cubic-bezier(0.2,0.8,0.2,1)" }}
          >
            Start a brief
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] mt-12">
        <div className="flex items-center gap-3">
          <div className="relative w-px h-16 bg-[var(--border)] overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-px bg-[var(--accent)]"
              animate={{ height: ["0%", "100%", "0%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span>Scroll</span>
        </div>
        <div className="hidden md:block">
          <span className="text-[var(--accent)]">●</span> Available Q1 2026
        </div>
      </div>
    </section>
  );
}
