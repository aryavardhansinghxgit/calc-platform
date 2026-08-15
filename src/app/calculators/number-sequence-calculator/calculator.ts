import { NumberSequenceCalculatorOutputs } from "./types";
import { detectSequencePattern } from "./sequence-logic";

export function calculateNumberSequenceCalculator(inputs: Record<string, any>): NumberSequenceCalculatorOutputs {
  const isArith = inputs.seqType !== "geometric";
  const a1 = Number(inputs.firstTerm) || 2;
  const d = Number(inputs.diffRatio) || 3;
  const n = Math.min(100, Math.max(1, Number(inputs.termCount) || 10));

  const initialTerms: number[] = [];
  for (let i = 0; i < 5; i++) {
    if (isArith) {
      initialTerms.push(a1 + i * d);
    } else {
      initialTerms.push(a1 * Math.pow(d, i));
    }
  }

  const analysis = detectSequencePattern(initialTerms, n);

  return {
    nthTerm: parseFloat(analysis.targetTerm.toFixed(4)),
    sumN: parseFloat(analysis.partialSum.toFixed(4)),
    sequencePreview: initialTerms.join(", ") + ", ..."
  };
}
