import { useState } from "react";
import { Mic, AlertTriangle, RotateCcw, Scale } from "lucide-react";
import type { FormState } from "@/lib/fairmind";

type Props = {
  value: FormState;
  onChange: (v: FormState) => void;
  onCompare: () => void;
  onReset: () => void;
};

const labelCls = "text-xs font-semibold uppercase tracking-wide text-muted-foreground";
const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20";
const sensitiveInputCls =
  "w-full rounded-lg border border-destructive/50 bg-destructive/5 px-3 py-2 text-sm outline-none transition-all focus:border-destructive focus:ring-2 focus:ring-destructive/20";

export function InputForm({ value, onChange, onCompare, onReset }: Props) {
  const [listening, setListening] = useState<string | null>(null);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    onChange({ ...value, [k]: v });

  const startVoice = (field: keyof FormState) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert("Voice input not supported in this browser.");
      return;
    }
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    setListening(field);
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript.replace(/[^0-9.]/g, "") || e.results[0][0].transcript;
      set(field, text as any);
    };
    rec.onend = () => setListening(null);
    rec.start();
  };

  const VoiceBtn = ({ field }: { field: keyof FormState }) => (
    <button
      type="button"
      onClick={() => startVoice(field)}
      className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition-colors ${
        listening === field ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
      }`}
      title="Voice input"
    >
      <Mic className="h-3.5 w-3.5" />
    </button>
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="mb-5">
        <h2 className="text-xl font-bold">Applicant Information</h2>
        <p className="text-sm text-muted-foreground">Fill in the details to compare decisions.</p>
      </div>

      <div className="space-y-5">
        {/* Objective fields */}
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px]">1</span>
            Objective Factors
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Annual Income ($)</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  className={inputCls}
                  placeholder="50000"
                  value={value.income}
                  onChange={(e) => set("income", e.target.value)}
                />
                <VoiceBtn field="income" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Credit Score</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  className={inputCls}
                  placeholder="700"
                  value={value.creditScore}
                  onChange={(e) => set("creditScore", e.target.value)}
                />
                <VoiceBtn field="creditScore" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Years of Experience</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  className={inputCls}
                  placeholder="5"
                  value={value.experience}
                  onChange={(e) => set("experience", e.target.value)}
                />
                <VoiceBtn field="experience" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Number of Dependents</label>
              <input
                type="number"
                className={inputCls + " mt-1"}
                placeholder="0"
                value={value.dependents}
                onChange={(e) => set("dependents", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Education Level</label>
              <select
                className={inputCls + " mt-1"}
                value={value.education}
                onChange={(e) => set("education", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="highschool">High School</option>
                <option value="bachelor">Bachelor's</option>
                <option value="master">Master's</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Employment Type</label>
              <select
                className={inputCls + " mt-1"}
                value={value.employment}
                onChange={(e) => set("employment", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="selfemployed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
          </div>
        </section>

        {/* Sensitive */}
        <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <h3 className="mb-1 flex items-center gap-2 text-sm font-bold text-destructive">
            <AlertTriangle className="h-4 w-4" />
            Sensitive Attributes
          </h3>
          <p className="mb-3 text-xs text-destructive/80">
            ⚠ These will be <strong>removed</strong> before the fair decision is made.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SensitiveField label="Gender" tip="Removed before fair decision">
              <select
                className={sensitiveInputCls}
                value={value.gender}
                onChange={(e) => set("gender", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </SensitiveField>
            <SensitiveField label="Age" tip="Removed before fair decision">
              <input
                type="number"
                className={sensitiveInputCls}
                placeholder="30"
                value={value.age}
                onChange={(e) => set("age", e.target.value)}
              />
            </SensitiveField>
            <SensitiveField label="Marital Status" tip="Removed before fair decision">
              <select
                className={sensitiveInputCls}
                value={value.marital}
                onChange={(e) => set("marital", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
            </SensitiveField>
            <SensitiveField label="Disability Status" tip="Removed before fair decision">
              <select
                className={sensitiveInputCls}
                value={value.disability}
                onChange={(e) => set("disability", e.target.value)}
              >
                <option value="">Select…</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </SensitiveField>
          </div>
        </section>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={onCompare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:opacity-90"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Scale className="h-4 w-4" /> Compare Results
          </button>
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <RotateCcw className="h-4 w-4" /> Try Another
          </button>
        </div>
      </div>
    </div>
  );
}

function SensitiveField({
  label,
  tip,
  children,
}: {
  label: string;
  tip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <label className="text-xs font-semibold uppercase tracking-wide text-destructive">
        {label}
        <span className="ml-1 text-[9px] font-normal opacity-70">(sensitive)</span>
      </label>
      <div className="mt-1">{children}</div>
      <div className="pointer-events-none absolute -top-8 left-0 z-10 hidden rounded-md bg-foreground px-2 py-1 text-[10px] text-background shadow-lg group-hover:block">
        {tip}
      </div>
    </div>
  );
}
