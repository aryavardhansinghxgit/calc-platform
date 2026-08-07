import { PregnancyWeightGainCalculatorOutputs } from "./types";

export function calculatePregnancyWeightGainCalculator(inputs: Record<string, any>): PregnancyWeightGainCalculatorOutputs {
  const w = Math.max(1, Number(inputs.preWeightKg) || 62);
  const h = Math.max(1, Number(inputs.heightCm) || 165);
  const wk = Math.min(40, Math.max(1, Number(inputs.week) || 20));
  const bmi = parseFloat((w / Math.pow(h / 100, 2)).toFixed(1));
  let minG = 11.5, maxG = 16.0;
  if (bmi < 18.5) { minG = 12.5; maxG = 18.0; }
  else if (bmi >= 30) { minG = 5.0; maxG = 9.0; }
  else if (bmi >= 25) { minG = 7.0; maxG = 11.5; }
  const ratio = wk / 40;
  const targetMin = (minG * ratio).toFixed(1);
  const targetMax = (maxG * ratio).toFixed(1);
  return {
    preBmi: bmi,
    recommendedGainTotal: `${minG} kg – ${maxG} kg`,
    targetGainWeek: `${targetMin} kg – ${targetMax} kg`
  };
}
