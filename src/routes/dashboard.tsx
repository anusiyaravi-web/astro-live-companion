import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/StarField";
import { getReading, loadBirthDetails, type Reading } from "@/lib/astro";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "AI Astro Dashboard — AstroLive AI Companion" },
      {
        name: "description",
        content: "Today's astrology overview: career, relationships, finance, well-being, daily focus and lucky signs.",
      },
      { property: "og:title", content: "AI Astro Dashboard — AstroLive" },
      { property: "og:description", content: "Your personalized daily astrology overview." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [reading, setReading] = useState<Reading>(() => getReading(null));

  useEffect(() => {
    setReading(getReading(loadBirthDetails()));
  }, []);

  const sections = [
    { title: "Career", icon: "☄", body: reading.career },
    { title: "Relationships", icon: "♥", body: reading.relationships },
    { title: "Finance", icon: "◈", body: reading.finance },
    { title: "Well-being", icon: "☾", body: reading.wellbeing },
  ];

  return (
    <main className="relative min-h-screen">
      <StarField />
      <div className="relative mx-auto w-full max-w-4xl px-6 py-14">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Home
        </Link>

        <header className="mt-6">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">AI Astro Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Hello, {reading.name}</h1>
        </header>

        <section className="glass-card mt-8 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Today's Overview</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reading.overview}</p>
        </section>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {sections.map((s) => (
            <section key={s.title} className="glass-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-cosmic)] text-sm text-primary-foreground">
                  {s.icon}
                </span>
                <h2 className="text-base font-semibold">{s.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>

        <section className="glass-card mt-5 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Daily Focus</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reading.focus}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-secondary/40 p-5">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">Lucky Number</p>
              <p className="text-cosmic mt-1 text-4xl font-semibold">{reading.luckyNumber}</p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/40 p-5">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">Lucky Color</p>
              <p className="mt-2 text-xl font-semibold">{reading.luckyColor}</p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="cosmic" size="xl" className="sm:flex-1">
            <Link to="/chat">Ask AstroAI</Link>
          </Button>
          <Button asChild variant="starline" size="xl" className="sm:flex-1">
            <Link to="/astro-card">Share My Astro Card</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
