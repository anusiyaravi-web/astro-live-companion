import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/StarField";
import { getReading, loadBirthDetails, type Reading } from "@/lib/astro";

export const Route = createFileRoute("/astro-card")({
  head: () => ({
    meta: [
      { title: "My Astro Card — AstroLive AI Companion" },
      {
        name: "description",
        content: "A shareable astro card with today's focus, energy, lucky number and lucky color.",
      },
      { property: "og:title", content: "My Astro Card — AstroLive" },
      { property: "og:description", content: "Share your cosmic snapshot of the day." },
    ],
  }),
  component: AstroCard;
});

function AstroCard() {
  const [reading, setReading] = useState<Reading>(() => getReading(null));
  const [status, setStatus] = useState("");

  useEffect(() => {
    setReading(getReading(loadBirthDetails()));
  }, []);

  const share = async () => {
    const text = `${reading.name}'s Astro Card ✦ Focus: ${reading.focus} Energy: ${reading.energy}. Lucky number ${reading.luckyNumber}, lucky colour ${reading.luckyColor}.`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "My AstroLive Card", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setStatus("Card copied to your clipboard ✦");
    } catch {
      setStatus("Sharing was cancelled.");
    }
  };

  return (
    <main className="relative min-h-screen">
      <StarField />
      <div className="relative mx-auto w-full max-w-md px-6 py-14">
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
          ← Dashboard
        </Link>

        <article className="glass-card mt-6 overflow-hidden">
          <div className="bg-[image:var(--gradient-cosmic)] px-7 py-8 text-primary-foreground">
            <p className="text-xs tracking-[0.3em] uppercase opacity-80">AstroLive Card</p>
            <h1 className="mt-2 text-3xl font-semibold">{reading.name}</h1>
            <p className="mt-1 text-sm opacity-90">
              {new Date().toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="space-y-5 px-7 py-7">
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground">Today's Focus</p>
              <p className="mt-1.5 text-base leading-relaxed">{reading.focus}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-muted-foreground">Energy</p>
              <p className="mt-1.5 text-base">{reading.energy}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">Lucky Number</p>
                <p className="text-cosmic mt-1 text-3xl font-semibold">{reading.luckyNumber}</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <p className="text-xs tracking-widest uppercase text-muted-foreground">Lucky Color</p>
                <p className="mt-2 text-base font-semibold">{reading.luckyColor}</p>
              </div>
            </div>
          </div>
        </article>

        <Button variant="cosmic" size="xl" className="mt-6 w-full" onClick={share}>
          Share My Card
        </Button>
        {status && <p className="mt-3 text-center text-sm text-muted-foreground">{status}</p>}

        <div className="mt-4 flex justify-center gap-4 text-sm text-muted-foreground">
          <Link to="/chat" className="hover:text-foreground">
            Ask AstroAI
          </Link>
          <Link to="/birth-details" className="hover:text-foreground">
            Edit birth details
          </Link>
        </div>
      </div>
    </main>
  );
}
