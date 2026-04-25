import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import type { DecisionResult } from "@/lib/fairmind";

type Props = {
  variant: "biased" | "fair";
  result: DecisionResult;
};

export function DecisionCard({ variant, result }: Props) {
  const isFair = variant === "fair";
  const approved = result.approved;

  const headerBg = isFair ? "var(--gradient-fair)" : "var(--gradient-bias)";
  const shadow = isFair ? "var(--shadow-fair)" : "var(--shadow-bias)";
  const Icon = isFair ? ShieldCheck : AlertTriangle;
  const title = isFair ? "Without Bias ✅" : "With Bias ❌";
  const subtitle = isFair
    ? "Sensitive attributes removed"
    : "Includes gender, age, marital, disability";

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card"
      style={{ boxShadow: shadow }}
    >
      <div className="p-5 text-white" style={{ background: headerBg }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold">{title}</div>
            <div className="text-xs opacity-90">{subtitle}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            {approved ? (
              <CheckCircle2 className="h-6 w-6 text-success" />
            ) : (
              <XCircle className="h-6 w-6 text-destructive" />
            )}
            <span className="text-lg font-bold">
              {approved ? "Approved" : "Declined"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold tabular-nums">
              {result.score}
              <span className="text-sm text-muted-foreground">/{result.maxScore}</span>
            </div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Score</div>
          </div>
        </div>

        {!isFair && result.penalty && result.penalty > 0 && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm">
            <div className="mb-1 font-semibold text-destructive">
              Bias penalty: −{result.penalty} point{result.penalty === 1 ? "" : "s"}
            </div>
            <ul className="ml-4 list-disc space-y-0.5 text-xs text-destructive/80">
              {result.penaltyReasons?.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Score breakdown
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {result.factors.map((f, i) => (
                  <tr
                    key={f.label}
                    className={i % 2 === 0 ? "bg-muted/30" : "bg-card"}
                  >
                    <td className="px-3 py-2">{f.label}</td>
                    <td className="px-3 py-2 text-right font-mono font-semibold">
                      {f.points > 0 ? (
                        <span className="text-success">+{f.points}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-accent/50 p-3 text-sm">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Why this decision?
          </div>
          <p className="text-foreground/80">{result.explanation}</p>
        </div>
      </div>
    </div>
  );
}
