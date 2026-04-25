import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, ShieldCheck, Eye, Sparkles, ArrowRight, Brain } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FairMind AI 2.0 — Unbiased Decision System" },
      {
        name: "description",
        content: "See how AI decisions become fair when sensitive attributes are removed.",
      },
      { property: "og:title", content: "FairMind AI 2.0 — Unbiased Decision System" },
      {
        property: "og:description",
        content: "Compare biased vs unbiased AI decisions side-by-side.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Transparent · Explainable · Fair
            </div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
              AI decisions{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                without bias
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              FairMind AI 2.0 shows side-by-side how the same applicant gets a different
              outcome when sensitive attributes (gender, age, marital, disability) are
              included vs. removed.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/try"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90"
                style={{ background: "var(--gradient-hero)" }}
              >
                Try the Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                How it Works
              </Link>
            </div>
          </div>

          {/* Preview cards */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <PreviewCard
              tone="bias"
              title="With Bias ❌"
              status="Declined"
              note="Score reduced because applicant is female, single, and 23 years old."
            />
            <PreviewCard
              tone="fair"
              title="Without Bias ✅"
              status="Approved"
              note="Same applicant approved when gender, age and marital status are ignored."
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Feature
            icon={Scale}
            title="Dual Decision Comparison"
            text="See biased vs unbiased outcomes side-by-side, with clear visual contrast."
          />
          <Feature
            icon={Eye}
            title="Explainable AI"
            text="Every decision shows exactly which factors contributed and why."
          />
          <Feature
            icon={ShieldCheck}
            title="Fairness Score"
            text="Track fairness in real time as sensitive attributes are removed."
          />
        </div>
      </section>
    </div>
  );
}

function PreviewCard({
  tone,
  title,
  status,
  note,
}: {
  tone: "bias" | "fair";
  title: string;
  status: string;
  note: string;
}) {
  const isFair = tone === "fair";
  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card"
      style={{ boxShadow: isFair ? "var(--shadow-fair)" : "var(--shadow-bias)" }}
    >
      <div
        className="p-4 text-white"
        style={{ background: isFair ? "var(--gradient-fair)" : "var(--gradient-bias)" }}
      >
        <div className="text-sm font-bold">{title}</div>
      </div>
      <div className="p-5">
        <div className="text-2xl font-extrabold">{status}</div>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Brain;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div
        className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
