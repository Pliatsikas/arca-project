import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/arca/Hero";
import { Marquee } from "@/components/arca/Marquee";
import { Bento } from "@/components/arca/Bento";
import { Timeline } from "@/components/arca/Timeline";
import { Stats } from "@/components/arca/Stats";
import { Testimonials } from "@/components/arca/Testimonials";
import { Contact } from "@/components/arca/Contact";
import { Cursor } from "@/components/arca/Cursor";
import { LightSource } from "@/components/arca/LightSource";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ARCA — AI Problem-Solving Studio" },
      {
        name: "description",
        content:
          "ARCA is an AI problem-solving studio engineering clarity for product teams who refuse to coast.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="grain relative bg-[var(--background)] text-[var(--foreground)]">
      <LightSource />
      <Cursor />
      <Hero />
      <Marquee />
      <Bento />
      <Timeline />
      <Stats />
      <Testimonials />
      <Contact />
    </main>
  );
}
