import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarField } from "@/components/StarField";
import { saveBirthDetails } from "@/lib/astro";

export const Route = createFileRoute("/birth-details")({
  head: () => ({
    meta: [
      { title: "Birth Details — AstroLive AI Companion" },
      {
        name: "description",
        content: "Enter your name, date, time and place of birth to generate your personalized astro card.",
      },
      { property: "og:title", content: "Birth Details — AstroLive" },
      { property: "og:description", content: "Generate your personalized astro card in seconds." },
    ],
  }),
  component: BirthDetailsPage,
});

const FIELDS = [
  { id: "name", label: "Name", type: "text", placeholder: "Ananya Rao" },
  { id: "dob", label: "Date of Birth", type: "date", placeholder: "" },
  { id: "tob", label: "Time of Birth", type: "time", placeholder: "" },
  { id: "place", label: "Place of Birth", type: "text", placeholder: "Bengaluru, India" },
] as const;

function BirthDetailsPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", dob: "", tob: "", place: "" });

  return (
    <main className="relative min-h-screen">
      <StarField />
      <div className="relative mx-auto w-full max-w-lg px-6 py-16">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back
        </Link>
        <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">Your birth details</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The sky at your first breath shapes today's reading.
        </p>

        <form
          className="glass-card mt-8 space-y-5 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            saveBirthDetails(form);
            navigate({ to: "/dashboard" });
          }}
        >
          {FIELDS.map((f) => (
            <div key={f.id} className="space-y-2">
              <label htmlFor={f.id} className="text-sm font-medium">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                required
                placeholder={f.placeholder}
                value={form[f.id]}
                onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
                className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
            </div>
          ))}

          <Button type="submit" variant="cosmic" size="xl" className="w-full">
            Generate My Astro Card
          </Button>
        </form>
      </div>
    </main>
  );
}
