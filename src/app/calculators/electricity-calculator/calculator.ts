import { ElectricityCalculatorOutputs } from "./types";

export function calculateElectricityCalculator(inputs: Record<string, any>): ElectricityCalculatorOutputs {
  const w = Math.max(0, Number(inputs.wattage) || 1500);
  const hrs = Math.max(0, Number(inputs.hoursPerDay) || 4);
  const rate = Math.max(0, Number(inputs.costPerKwh) || 0.15);
  const dailyKwh = (w * hrs) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * rate;
  return { monthlyCost, monthlyKwh: parseFloat(monthlyKwh.toFixed(1)), annualCost: monthlyCost * 12 };
}
