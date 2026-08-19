import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHistoricalInflation } from "./calculator";
import { InflationCalculator } from "@/components/calculator/inflation/InflationCalculator";
import { InflationContent } from "@/components/calculator/inflation/InflationContent";

export const inflation_calculatorConfig: CalculatorModuleDefinition = {
  id: "inflation-calculator",
  title: "Inflation Calculator — CPI Purchasing Power & Future Value Suite",
  slug: "inflation-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate historical purchasing power using US BLS CPI-U data from 1913 to present, project future inflation decay, adjust real wages, and model real investment returns.",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "inflation calculator",
    "cpi inflation calculator",
    "purchasing power calculator",
    "us inflation calculator 1913 to present",
    "future value inflation calculator",
    "historical inflation calculator",
    "calculate inflation rate",
    "real value of dollar calculator",
    "cost of living inflation calculator",
    "cumulative inflation rate calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "future-value-calculator",
    "present-value-calculator",
    "salary-calculator",
    "budget-calculator",
    "take-home-pay-calculator",
    "payment-calculator",
    "currency-calculator",
  ],
  formulaDescription:
    "Target Value = Starting Amount × (Target CPI / Start CPI), where CPI is the official Bureau of Labor Statistics Consumer Price Index for All Urban Consumers (CPI-U).",
  inputs: [
    {
      name: "amount",
      label: "Amount ($)",
      type: "number",
      defaultValue: 100,
      min: 0,
      max: 1000000000,
    },
    {
      name: "startYear",
      label: "Start Year",
      type: "number",
      defaultValue: 2016,
      min: 1913,
      max: 2026,
    },
    {
      name: "targetYear",
      label: "Target Year",
      type: "number",
      defaultValue: 2026,
      min: 1913,
      max: 2026,
    },
  ],
  outputs: [
    {
      name: "equivalentAmount",
      label: "Equivalent Purchasing Power",
      type: "currency",
    },
    {
      name: "cumulativeInflation",
      label: "Cumulative Inflation Rate",
      type: "percentage",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const amt = Number(inputs.amount) || 100;
    const startYear = Number(inputs.startYear) || 2016;
    const targetYear = Number(inputs.targetYear) || 2026;

    const res = calculateHistoricalInflation({
      amount: amt,
      startYear,
      startMonth: 0,
      targetYear,
      targetMonth: 0,
    });

    return {
      equivalentAmount: `$${res.equivalentAmount.toLocaleString()}`,
      cumulativeInflation: `+${res.cumulativeInflationPercent}%`,
    };
  },
  CustomComponent: InflationCalculator,
  ContentComponent: InflationContent,
};

export default inflation_calculatorConfig;
