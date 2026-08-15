import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/StarField";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroLive AI Companion — Daily Personalized Astrology" },
      {
        name: "description",
        content:
          "AstroLive AI Companion gives you a daily personalized astrology reading, lucky numbers and an AI astrologer to chat with.",
      },
      { property: "og:title", content: "AstroLive AI Companion" },
      {
        property: "og:description",
        content: "Your daily personalized astrology companion, powered by AI.",
      },
    ],
  }),
  component: Landing,
});

const HIGHLIGHTS = [
  { title: "Daily Reading", body: "Career, love, money and well-being decoded every morning." },
  { title: "AstroAI Chat", body: "Ask anything and get an answer written in your chart's language." },
  { title: "Astro Card", body: "A shareable card with today's focus, energy and lucky signs." },
];

function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarField />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32">
        <span className="rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest uppercase text-muted-foreground backdrop-blur-md">
          Guided by the sky
        </span>
        <div className="floaty mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-[image:var(--gradient-cosmic)] text-4xl shadow-[var(--shadow-glow)]">
          ✦
        </div>
        <h1 className="mt-8 text-4xl leading-[1.05] font-semibold sm:text-6xl">
          AstroLive <span className="text-cosmic">AI Companion</span>
        </h1>
        <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
          Your daily personalized astrology companion.
        </p>
        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild variant="cosmic" size="xl">
            <Link to="/birth-details">Get My Astro Card</Link>
          </Button>
          <Button asChild variant="starline" size="xl">
            <Link to="/chat">Explore AstroAI</Link>
          </Button>
        </div>

        <div className="mt-20 grid w-full gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="glass-card p-6 text-left">
              <h2 className="text-base font-semibold">{h.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
