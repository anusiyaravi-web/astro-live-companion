import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/StarField";
import { astroAnswer, getReading, loadBirthDetails, type Reading } from "@/lib/astro";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AstroAI Chat — AstroLive AI Companion" },
      {
        name: "description",
        content: "Chat with AstroAI about love, career, money and well-being and get answers read from your chart.",
      },
      { property: "og:title", content: "AstroAI Chat — AstroLive" },
      { property: "og:description", content: "Ask your AI astrologer anything, anytime." },
    ],
  }),
  component: Chat,
});

type Message = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "How is my career looking today?",
  "What about love this week?",
  "Is this a good day for money decisions?",
  "What's my lucky number?",
];

function Chat() {
  const [reading, setReading] = useState<Reading>(() => getReading(null));
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "I'm AstroAI. Ask me about your day, your work, your heart — I'll read the sky for you." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReading(getReading(loadBirthDetails()));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: astroAnswer(q, reading) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      <StarField />
      <div className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            ← Dashboard
          </Link>
          <Link to="/astro-card" className="text-sm text-muted-foreground hover:text-foreground">
            Astro Card →
          </Link>
        </div>

        <h1 className="mt-6 text-3xl font-semibold">AstroAI Chat</h1>

        <div className="glass-card mt-6 flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[image:var(--gradient-cosmic)] px-4 py-3 text-sm text-primary-foreground"
                  : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground"
              }
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="mr-auto rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
              AstroAI is reading the stars…
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-md hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AstroAI a question…"
            aria-label="Your question"
            className="flex-1 rounded-full border border-input bg-secondary/40 px-5 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
          />
          <Button type="submit" variant="cosmic" size="pill">
            Send
          </Button>
        </form>
      </div>
    </main>
  );
}
