import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InputForm } from "@/components/InputForm";
import { DecisionCard } from "@/components/DecisionCard";
import { ShieldCheck } from "lucide-react";
import { initialForm, scoreBiased, scoreFair, fairnessScore, type FormState } from "@/lib/fairmind";

export const Route = createFileRoute("/try")({
  head: () => ({
    meta: [
      { title: "Try It — FairMind AI 2.0" },
      {
        name: "description",
        content: "Run the FairMind AI demo: compare biased vs unbiased decisions in real time.",
      },
      { property: "og:title", content: "Try FairMind AI 2.0" },
      {
        property: "og:description",
        content: "Compare biased vs unbiased AI decisions side-by-side.",
      },
    ],
  }),
  component: TryPage,
});

function TryPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const fair = useMemo(() => scoreFair(form), [form]);
  const biased = useMemo(() => scoreBiased(form), [form]);
  const fairness = fairnessScore(form);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Try the Decision System</h1>
        <p className="mt-2 text-muted-foreground">
          Fill out the form, then click Compare to see both decisions side-by-side.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <InputForm
            value={form}
            onChange={setForm}
            onCompare={() => setSubmitted(true)}
            onReset={() => {
              setForm(initialForm);
              setSubmitted(false);
            }}
          />
        </div>

        <div className="space-y-6 lg:col-span-3">
          {/* Fairness meter */}
          <div className="rounded-2xl border border-success/30 bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: "var(--gradient-fair)" }}
                >
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">Fairness Score</div>
                  <div className="text-xs text-muted-foreground">
                    All sensitive attributes removed before evaluation
                  </div>
                </div>
              </div>
              <div className="text-2xl font-extrabold text-success">{fairness}%</div>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${fairness}%`, background: "var(--gradient-fair)" }}
              />
            </div>
          </div>

          {!submitted ? (
            <div className="flex h-[420px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 text-center">
              <div className="max-w-sm p-8">
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold">Ready when you are</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the applicant details and hit <strong>Compare Results</strong> to
                  see the side-by-side decision.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DecisionCard variant="biased" result={biased} />
              <DecisionCard variant="fair" result={fair} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
