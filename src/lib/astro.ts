export type BirthDetails = {
  name: string;
  dob: string;
  tob: string;
  place: string;
};

const KEY = "astrolive.birth";

export function saveBirthDetails(details: BirthDetails) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(details));
}

export function loadBirthDetails(): BirthDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BirthDetails) : null;
  } catch {
    return null;
  }
}

function hash(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) % 100000;
  return h;
}

const FOCUS = [
  "Speak your truth — clarity opens doors today.",
  "Slow mornings, bold afternoons. Pace your energy.",
  "A conversation you've delayed brings relief.",
  "Protect your focus; one deep task beats five shallow ones.",
  "Say yes to the invitation that scares you slightly.",
];

const COLORS = ["Cosmic Violet", "Midnight Blue", "Moon Silver", "Solar Gold", "Nebula Teal"];
const ENERGY = ["Rising & magnetic", "Calm & grounded", "Bright & expressive", "Deep & intuitive"];

const CAREER = [
  "Momentum builds around a project you nearly abandoned. Follow up today.",
  "Your ideas land well with people above you — share the half-finished one.",
  "Avoid multitasking. One clean deliverable earns more trust than three drafts.",
];
const LOVE = [
  "Warmth returns through small gestures, not grand ones. Send the message.",
  "Listen twice as long as you speak; someone is hinting at what they need.",
  "A familiar face brings unexpectedly fresh energy this evening.",
];
const MONEY = [
  "A steady day for money. Review a recurring expense you've stopped noticing.",
  "Good timing for a small, considered investment — not an impulsive one.",
  "Income opportunities arrive through your network, not job boards.",
];
const HEALTH = [
  "Hydration and a 20-minute walk will do more than caffeine today.",
  "Your body wants rhythm: sleep, sun, movement, in that order.",
  "Breathe before you react — the tension is in your shoulders.",
];

export type Reading = {
  name: string;
  overview: string;
  career: string;
  relationships: string;
  finance: string;
  wellbeing: string;
  focus: string;
  luckyNumber: number;
  luckyColor: string;
  energy: string;
};

export function getReading(details: BirthDetails | null): Reading {
  const name = details?.name?.trim() || "Stargazer";
  const day = new Date().toISOString().slice(0, 10);
  const h = hash(`${name}|${details?.dob ?? ""}|${details?.place ?? ""}|${day}`);
  const pick = <T,>(arr: T[], salt: number): T => arr[(h + salt) % arr.length] as T;

  return {
    name,
    overview: `The sky favours momentum for you, ${name}. Mercury sharpens your words while the Moon softens your instincts — a rare combination for getting understood.`,
    career: pick(CAREER, 1),
    relationships: pick(LOVE, 2),
    finance: pick(MONEY, 3),
    wellbeing: pick(HEALTH, 4),
    focus: pick(FOCUS, 5),
    luckyNumber: (h % 9) + 1,
    luckyColor: pick(COLORS, 6),
    energy: pick(ENERGY, 7),
  };
}

export function astroAnswer(question: string, reading: Reading): string {
  const q = question.toLowerCase();
  if (/love|relationship|partner|marriage|crush/.test(q))
    return `Venus is working in your favour, ${reading.name}. ${reading.relationships} Keep your expectations soft and your honesty firm.`;
  if (/job|career|work|business|promotion|interview/.test(q))
    return `${reading.career} Your chart's tenth house is active — visibility matters more than perfection this week.`;
  if (/money|finance|invest|salary|wealth/.test(q))
    return `${reading.finance} Treat today's numbers as information, not verdicts.`;
  if (/health|sleep|energy|stress|anxiety/.test(q))
    return `${reading.wellbeing} Your energy signature reads "${reading.energy.toLowerCase()}" today.`;
  if (/lucky|number|colour|color/.test(q))
    return `Your lucky number is ${reading.luckyNumber} and your colour is ${reading.luckyColor}. Wear it where you can see it.`;
  if (/today|day|daily/.test(q)) return `${reading.overview} Today's focus: ${reading.focus}`;
  return `The stars answer sideways, ${reading.name}. On "${question.trim()}" — ${reading.focus} Trust the first instinct you had before you asked.`;
}
