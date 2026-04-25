import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, AlertTriangle, Eraser, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FairMind AI 2.0" },
      { name: "description", content: "4 steps: Input → Detect Bias → Remove → Decision." },
      { property: "og:title", content: "How FairMind AI Works" },
      {
        property: "og:description",
        content: "From applicant input to a fair, explainable decision in 4 steps.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    icon: ClipboardList,
    title: "1. Input",
    text: "Applicant provides objective info (income, credit, experience) and optionally sensitive details.",
  },
  {
    icon: AlertTriangle,
    title: "2. Detect Bias",
    text: "Sensitive attributes — gender, age, marital, disability — are flagged in red as bias risks.",
  },
  {
    icon: Eraser,
    title: "3. Remove",
    text: "Sensitive attributes are stripped out before the fair model evaluates the applicant.",
  },
  {
    icon: CheckCircle2,
    title: "4. Decision",
    text: "Two outcomes are shown side-by-side — with bias and without — so you can see the difference.",
  },
];

function HowItWorks() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">How It Works</h1>
        <p className="mt-4 text-muted-foreground">
          A transparent, rule-based pipeline you can audit end-to-end.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <h2 className="text-2xl font-bold">The Scoring Rules</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each factor contributes 0 or 1 point. A score of 3/5 or higher = Approved.
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Annual Income ≥ $40,000 → +1",
            "Credit Score ≥ 650 → +1",
            "Experience ≥ 3 years → +1",
            "Education = Bachelor's or higher → +1",
            "Employment = Full-time / Self-employed → +1",
          ].map((r) => (
            <li
              key={r}
              className="rounded-xl border border-border bg-muted/40 px-4 py-2 text-sm"
            >
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <strong className="text-destructive">Biased model</strong> additionally subtracts
          points for being female, outside age 25–50, single/divorced, or disabled — to
          demonstrate how unchecked AI can perpetuate unfair patterns from real-world data.
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/try"
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        >
          Try it Yourself <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
