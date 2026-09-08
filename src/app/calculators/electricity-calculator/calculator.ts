import { ElectricityCalculatorOutputs } from "./types";
import { calculateSingleAppliance } from "@/lib/calculator-engine/formulas/electricity";

export function calculateElectricityCalculator(inputs: Record<string, any>): ElectricityCalculatorOutputs {
  const w = inputs.wattage !== undefined ? Number(inputs.wattage) : 1500;
  const hrs = inputs.hoursPerDay !== undefined ? Number(inputs.hoursPerDay) : 4;
  const rate = inputs.costPerKwh !== undefined ? Number(inputs.costPerKwh) : 0.16;

  const res = calculateSingleAppliance({
    powerValue: w,
    powerUnit: "watts",
    dutyCyclePct: 100,
    hoursPerDay: hrs,
    daysPerWeek: 7,
    monthsPerYear: 12,
    currency: "USD",
    ratePerKwh: rate,
  });

  return {
    monthlyCost: res.monthlyCost,
    monthlyKwh: res.monthlyKwh,
    annualCost: res.annualCost,
  };
}

