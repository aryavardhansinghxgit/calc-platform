import { NumberSequenceCalculatorOutputs } from "./types";

export function calculateNumberSequenceCalculator(inputs: Record<string, any>): NumberSequenceCalculatorOutputs {
  const isArith = inputs.seqType !== "geometric";
  const a1 = Number(inputs.firstTerm) || 2;
  const d = Number(inputs.diffRatio) || 3;
  const n = Math.min(100, Math.max(1, Number(inputs.termCount) || 10));
  let an = 0, sn = 0;
  const list: number[] = [];
  if (isArith) {
    an = a1 + (n - 1) * d;
    sn = (n / 2) * (a1 + an);
    for (let i = 0; i < Math.min(n, 6); i++) list.push(a1 + i * d);
  } else {
    an = a1 * Math.pow(d, n - 1);
    sn = d !== 1 ? (a1 * (1 - Math.pow(d, n))) / (1 - d) : a1 * n;
    for (let i = 0; i < Math.min(n, 6); i++) list.push(a1 * Math.pow(d, i));
  }
  return {
    nthTerm: parseFloat(an.toFixed(4)),
    sumN: parseFloat(sn.toFixed(4)),
    sequencePreview: list.join(", ") + (n > 6 ? ", ..." : "")
  };
}
