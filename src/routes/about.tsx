import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Landmark, GraduationCap, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FairMind AI 2.0" },
      {
        name: "description",
        content:
          "Real-world impact of unbiased AI on hiring, lending, admissions and healthcare.",
      },
      { property: "og:title", content: "About FairMind AI 2.0" },
      {
        property: "og:description",
        content: "Why fairness in AI matters across hiring, loans, admissions and care.",
      },
    ],
  }),
  component: AboutPage,
});

const impacts = [
  {
    icon: Briefcase,
    title: "Hiring",
    text: "Removing gender, age and marital status from screening models has been shown to widen candidate diversity without hurting performance.",
  },
  {
    icon: Landmark,
    title: "Loans",
    text: "Credit decisions free of demographic proxies expand access to capital for historically underserved applicants.",
  },
  {
    icon: GraduationCap,
    title: "Admissions",
    text: "Universities using fairness-aware models reduce bias in evaluating applicants from different backgrounds.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    text: "Risk-prediction tools that exclude sensitive attributes deliver more equitable care recommendations.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Why Fair AI Matters</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          AI shapes decisions in hiring, lending, admissions and healthcare. When models
          inherit historical bias, real people are denied opportunities. FairMind AI 2.0
          is a teaching tool that makes the difference visible.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {impacts.map((i) => (
          <div
            key={i.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <div
              className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white"
              style={{ background: "var(--gradient-hero)" }}
            >
              <i.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">{i.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-12 rounded-2xl p-8 text-white shadow-lg"
        style={{ background: "var(--gradient-hero)" }}
      >
        <h2 className="text-2xl font-bold">Our Principle</h2>
        <p className="mt-2 max-w-2xl opacity-90">
          A decision should never depend on attributes a person cannot control. Fairness,
          transparency and explainability are not features — they are the baseline for
          trustworthy AI.
        </p>
      </div>
    </div>
  );
}
