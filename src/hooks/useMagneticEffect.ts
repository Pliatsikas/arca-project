import { useEffect, useRef } from "react";

export function useMagneticEffect<T extends HTMLElement>(radius = 80, strength = 0.4) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = `translate(0,0)`;
      }
    };
    const reset = () => {
      el.style.transform = `translate(0,0)`;
    };
    window.addEventListener("mousemove", handler);
    el.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handler);
      el.removeEventListener("mouseleave", reset);
    };
  }, [radius, strength]);

  return ref;
}
