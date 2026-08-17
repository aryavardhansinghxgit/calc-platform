/**
 * High-Performance Percentage Mathematical Engine & Step Generator
 */

export interface StepByStepSolution {
  title: string;
  steps: { stepNumber: number; title: string; latex: string; explanation: string }[];
}

export interface PercentageCalculationResult {
  primaryResult: string;
  primaryLabel: string;
  formattedOutput: string;
  fractionForm: string;
  decimalForm: string;
  ratioForm: string;
  percentChange?: string;
  percentDifference?: string;
  steps: StepByStepSolution;
  details: Record<string, string>;
}

// -------------------------------------------------------------
// CORE PERCENTAGE MATHEMATICAL FUNCTIONS
// -------------------------------------------------------------

/** 1. What is P% of V1? -> V2 = (P / 100) * V1 */
export function solvePercentageOf(p: number, v1: number): PercentageCalculationResult {
  const result = (p / 100) * v1;
  const dec = p / 100;

  return {
    primaryResult: result.toLocaleString(undefined, { maximumFractionDigits: 6 }),
    primaryLabel: `${p}% of ${v1}`,
    formattedOutput: `${p}% × ${v1} = ${result.toFixed(4)}`,
    fractionForm: `${p}/100 × ${v1}`,
    decimalForm: dec.toString(),
    ratioForm: `${p} : 100`,
    steps: {
      title: `Calculating ${p}% of ${v1}`,
      steps: [
        {
          stepNumber: 1,
          title: "Convert Percentage to Decimal",
          latex: `P = \\frac{${p}}{100} = ${dec}`,
          explanation: `Divide the percentage (${p}) by 100 to express it as a decimal proportion.`,
        },
        {
          stepNumber: 2,
          title: "Multiply by Base Value",
          latex: `V_2 = ${dec} \\times ${v1} = ${result}`,
          explanation: `Multiply the decimal proportion (${dec}) by the base number (${v1}).`,
        },
      ],
    },
    details: {
      "Percentage Rate": `${p}%`,
      "Base Value": v1.toString(),
      "Result Value": result.toString(),
      "Decimal Proportion": dec.toString(),
    },
  };
}

/** 2. V2 is what % of V1? -> P = (V2 / V1) * 100 */
export function solveWhatPercentageIs(v2: number, v1: number): PercentageCalculationResult {
  if (v1 === 0) {
    throw new Error("Base value (V1) cannot be zero.");
  }
  const p = (v2 / v1) * 100;
  const ratio = v2 / v1;

  return {
    primaryResult: `${p.toFixed(4)}%`,
    primaryLabel: `${v2} is % of ${v1}`,
    formattedOutput: `(${v2} ÷ ${v1}) × 100 = ${p.toFixed(4)}%`,
    fractionForm: `${v2}/${v1}`,
    decimalForm: ratio.toString(),
    ratioForm: `${v2} : ${v1}`,
    steps: {
      title: `Finding what percentage ${v2} is of ${v1}`,
      steps: [
        {
          stepNumber: 1,
          title: "Divide Part by Whole",
          latex: `\\text{Ratio} = \\frac{${v2}}{${v1}} = ${ratio.toFixed(6)}`,
          explanation: `Divide the target part (${v2}) by the whole base value (${v1}).`,
        },
        {
          stepNumber: 2,
          title: "Convert to Percentage",
          latex: `P = ${ratio.toFixed(6)} \\times 100\\% = ${p.toFixed(4)}\\%`,
          explanation: `Multiply the proportion ratio by 100 to express as a percentage rate.`,
        },
      ],
    },
    details: {
      "Part (V2)": v2.toString(),
      "Whole (V1)": v1.toString(),
      "Calculated Percentage": `${p.toFixed(4)}%`,
    },
  };
}

/** 3. V2 is P% of what? -> V1 = V2 / (P / 100) */
export function solvePercentageOfWhat(v2: number, p: number): PercentageCalculationResult {
  if (p === 0) throw new Error("Percentage cannot be zero.");
  const dec = p / 100;
  const v1 = v2 / dec;

  return {
    primaryResult: v1.toLocaleString(undefined, { maximumFractionDigits: 6 }),
    primaryLabel: `Base Value (100%)`,
    formattedOutput: `${v2} ÷ (${p} ÷ 100) = ${v1.toFixed(4)}`,
    fractionForm: `${v2} ÷ (${p}/100)`,
    decimalForm: dec.toString(),
    ratioForm: `100 : ${p}`,
    steps: {
      title: `Solving ${v2} is ${p}% of what total`,
      steps: [
        {
          stepNumber: 1,
          title: "Convert Percentage to Decimal",
          latex: `\\text{Decimal} = \\frac{${p}}{100} = ${dec}`,
          explanation: `Convert ${p}% to its decimal equivalent (${dec}).`,
        },
        {
          stepNumber: 2,
          title: "Divide Result by Decimal",
          latex: `V_1 = \\frac{${v2}}{${dec}} = ${v1.toFixed(4)}`,
          explanation: `Divide the known part (${v2}) by ${dec} to find the 100% total value.`,
        },
      ],
    },
    details: {
      "Given Part (V2)": v2.toString(),
      "Given Percent (P)": `${p}%`,
      "Original Total (V1)": v1.toString(),
    },
  };
}

/** 4. Percentage Difference: |V1 - V2| / ((V1 + V2)/2) * 100 */
export function solvePercentageDifference(v1: number, v2: number): PercentageCalculationResult {
  const diff = Math.abs(v1 - v2);
  const avg = (v1 + v2) / 2;
  if (avg === 0) throw new Error("Average of values cannot be zero.");
  const pDiff = (diff / avg) * 100;

  return {
    primaryResult: `${pDiff.toFixed(4)}%`,
    primaryLabel: `Percentage Difference`,
    formattedOutput: `|${v1} - ${v2}| ÷ ((${v1} + ${v2})/2) × 100 = ${pDiff.toFixed(4)}%`,
    fractionForm: `${diff} / ${avg}`,
    decimalForm: (diff / avg).toString(),
    ratioForm: `${v1} : ${v2}`,
    percentDifference: `${pDiff.toFixed(2)}%`,
    steps: {
      title: `Percentage Difference between ${v1} and ${v2}`,
      steps: [
        {
          stepNumber: 1,
          title: "Calculate Absolute Difference",
          latex: `|V_1 - V_2| = |${v1} - ${v2}| = ${diff}`,
          explanation: `Find the absolute distance between the two numerical values.`,
        },
        {
          stepNumber: 2,
          title: "Calculate Average Baseline",
          latex: `\\text{Average} = \\frac{${v1} + ${v2}}{2} = ${avg}`,
          explanation: `Find the midpoint average baseline of ${v1} and ${v2}.`,
        },
        {
          stepNumber: 3,
          title: "Divide Difference by Average and Multiply by 100",
          latex: `\\text{Diff}\\% = \\frac{${diff}}{${avg}} \\times 100\\% = ${pDiff.toFixed(4)}\\%`,
          explanation: `Divide absolute difference (${diff}) by average baseline (${avg}) and multiply by 100.`,
        },
      ],
    },
    details: {
      "Value 1": v1.toString(),
      "Value 2": v2.toString(),
      "Absolute Difference": diff.toString(),
      "Average Baseline": avg.toString(),
      "Percentage Difference": `${pDiff.toFixed(4)}%`,
    },
  };
}

/** 5. Percentage Change (Increase / Decrease): (V2 - V1) / V1 * 100 */
export function solvePercentageChange(v1: number, v2: number): PercentageCalculationResult {
  if (v1 === 0) throw new Error("Initial value (V1) cannot be zero.");
  const diff = v2 - v1;
  const pChange = (diff / v1) * 100;
  const isIncrease = pChange >= 0;

  return {
    primaryResult: `${pChange >= 0 ? "+" : ""}${pChange.toFixed(4)}%`,
    primaryLabel: isIncrease ? "Percentage Increase" : "Percentage Decrease",
    formattedOutput: `((${v2} - ${v1}) ÷ ${v1}) × 100 = ${pChange.toFixed(4)}%`,
    fractionForm: `${diff} / ${v1}`,
    decimalForm: (diff / v1).toString(),
    ratioForm: `${v2} : ${v1}`,
    percentChange: `${pChange.toFixed(2)}%`,
    steps: {
      title: `Percentage Change from ${v1} to ${v2}`,
      steps: [
        {
          stepNumber: 1,
          title: "Calculate Net Change",
          latex: `\\Delta V = V_2 - V_1 = ${v2} - ${v1} = ${diff}`,
          explanation: `Subtract initial value (${v1}) from final value (${v2}).`,
        },
        {
          stepNumber: 2,
          title: "Divide by Initial Value & Multiply by 100",
          latex: `\\%\\text{Change} = \\frac{${diff}}{${v1}} \\times 100\\% = ${pChange.toFixed(4)}\\%`,
          explanation: `Divide net change (${diff}) by original starting value (${v1}) and convert to percentage.`,
        },
      ],
    },
    details: {
      "Initial Value (V1)": v1.toString(),
      "Final Value (V2)": v2.toString(),
      "Net Change": diff.toString(),
      "Direction": isIncrease ? "Increase (+)" : "Decrease (-)",
      "Percentage Change": `${pChange.toFixed(4)}%`,
    },
  };
}

export function calculatePercentageFormula({ value1, value2 }: { value1: number; value2: number }) {
  const result = (value1 / 100) * value2;
  return { result };
}

