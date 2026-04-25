export type FormState = {
  income: string;
  creditScore: string;
  experience: string;
  education: string;
  employment: string;
  dependents: string;
  // sensitive
  gender: string;
  age: string;
  marital: string;
  disability: string;
};

export const initialForm: FormState = {
  income: "",
  creditScore: "",
  experience: "",
  education: "",
  employment: "",
  dependents: "",
  gender: "",
  age: "",
  marital: "",
  disability: "",
};

export type Factor = { label: string; points: number; reason: string };

export type DecisionResult = {
  approved: boolean;
  score: number;
  maxScore: number;
  factors: Factor[];
  explanation: string;
  penalty?: number;
  penaltyReasons?: string[];
};

const educationPoints: Record<string, number> = {
  highschool: 0,
  bachelor: 1,
  master: 1,
  phd: 1,
};

export function scoreFair(f: FormState): DecisionResult {
  const factors: Factor[] = [];
  const income = Number(f.income) || 0;
  const credit = Number(f.creditScore) || 0;
  const exp = Number(f.experience) || 0;

  factors.push({
    label: "Annual Income",
    points: income >= 40000 ? 1 : 0,
    reason: income >= 40000 ? `Income $${income.toLocaleString()} meets threshold` : `Income below $40,000`,
  });
  factors.push({
    label: "Credit Score",
    points: credit >= 650 ? 1 : 0,
    reason: credit >= 650 ? `Credit ${credit} is strong` : `Credit ${credit} below 650`,
  });
  factors.push({
    label: "Years of Experience",
    points: exp >= 3 ? 1 : 0,
    reason: exp >= 3 ? `${exp} years of experience` : `Less than 3 years experience`,
  });
  factors.push({
    label: "Education Level",
    points: educationPoints[f.education] ?? 0,
    reason: f.education ? `Education: ${f.education}` : "No education level provided",
  });
  factors.push({
    label: "Employment Stability",
    points: f.employment === "fulltime" || f.employment === "selfemployed" ? 1 : 0,
    reason: f.employment ? `Employment: ${f.employment}` : "No employment info",
  });

  const score = factors.reduce((s, x) => s + x.points, 0);
  const maxScore = factors.length;
  const approved = score >= 3;

  return {
    approved,
    score,
    maxScore,
    factors,
    explanation: approved
      ? `Approved based on ${factors.filter((x) => x.points > 0).map((x) => x.label.toLowerCase()).join(", ")}. Sensitive attributes like gender, age, marital and disability status were removed before evaluation.`
      : `Declined — score ${score}/${maxScore} below threshold. Decision used only objective factors; no sensitive attributes considered.`,
  };
}

export function scoreBiased(f: FormState): DecisionResult {
  const base = scoreFair(f);
  const penaltyReasons: string[] = [];
  let penalty = 0;

  // Demonstrative biased penalties (illustrating real-world unfairness)
  if (f.gender === "female") {
    penalty += 1;
    penaltyReasons.push("Penalized for gender = female");
  }
  const ageNum = Number(f.age);
  if (ageNum && (ageNum < 25 || ageNum > 50)) {
    penalty += 1;
    penaltyReasons.push(`Penalized for age = ${ageNum}`);
  }
  if (f.marital === "single" || f.marital === "divorced") {
    penalty += 1;
    penaltyReasons.push(`Penalized for marital status = ${f.marital}`);
  }
  if (f.disability === "yes") {
    penalty += 1;
    penaltyReasons.push("Penalized for disability status");
  }

  const adjustedScore = Math.max(0, base.score - penalty);
  const approved = adjustedScore >= 3;

  return {
    ...base,
    score: adjustedScore,
    approved,
    penalty,
    penaltyReasons,
    explanation: approved
      ? `Approved, but decision was influenced by sensitive attributes (penalty -${penalty}). This shows hidden bias.`
      : `Declined — score ${adjustedScore}/${base.maxScore}. Sensitive attributes reduced the score by ${penalty} point${penalty === 1 ? "" : "s"}, demonstrating bias.`,
  };
}

export function fairnessScore(f: FormState): number {
  // 100% when no sensitive data is used in fair decision (always)
  // We display how many sensitive attributes were *excluded*
  const sensitive = [f.gender, f.age, f.marital, f.disability].filter(Boolean).length;
  return sensitive === 0 ? 100 : 95 + Math.min(5, 0); // always high since fair model ignores them
}
