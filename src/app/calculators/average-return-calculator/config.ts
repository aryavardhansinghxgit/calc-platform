import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCashFlowReturn } from "./calculator";
import { AverageReturnCalculator } from "@/components/calculator/average-return/AverageReturnCalculator";
import { AverageReturnContent } from "@/components/calculator/average-return/AverageReturnContent";

export const average_return_calculatorConfig: CalculatorModuleDefinition = {
  id: "average-return-calculator",
  title: "Average Return Calculator — Calculate Annualized & Cumulative Investment Returns",
  slug: "average-return-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate exact Time-Weighted Rate of Return (TWRR), Money-Weighted Rate of Return (MWRR / XIRR), Accounting Rate of Return (ARR), and Cumulative Portfolio Performance.",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "average return calculator",
    "portfolio average return calculator",
    "calculate annualized investment return",
    "time weighted return calculator",
    "money weighted rate of return",
    "xirr calculator",
    "cumulative return calculator",
    "investment performance calculator",
    "calculate average annual return with cash flows",
    "accounting rate of return calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "cagr-calculator",
    "roi-calculator",
    "investment-calculator",
    "compound-interest-calculator",
    "mutual-fund-calculator",
    "bond-calculator",
  ],
  formulaDescription:
    "Money-Weighted Rate of Return: 0 = -Start - sum[ CF_k / (1 + r)^(d_k/365) ] + [ End / (1 + r)^(T/365) ] | Geometric Mean: R_geom = [ prod(1 + R_i) ]^(1/T) - 1.",
  inputs: [
    {
      name: "startingBalance",
      label: "Starting Balance ($)",
      type: "currency",
      defaultValue: 5600,
      min: 0,
      max: 100000000,
    },
    {
      name: "endingBalance",
      label: "Ending Balance ($)",
      type: "currency",
      defaultValue: 18000,
      min: 0,
      max: 1000000000,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "text",
      defaultValue: "2023-01-01",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "text",
      defaultValue: "2026-08-17",
    },
  ],
  outputs: [
    {
      name: "mwrrPercent",
      label: "Money-Weighted Return (XIRR %/yr)",
      type: "percentage",
    },
    {
      name: "arrPercent",
      label: "Accounting Rate of Return (ARR %/yr)",
      type: "percentage",
    },
    {
      name: "netInvested",
      label: "Net Capital Invested",
      type: "currency",
    },
    {
      name: "totalGainLoss",
      label: "Total Net Gain",
      type: "currency",
    },
    {
      name: "totalYears",
      label: "Holding Horizon (Years)",
      type: "number",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateCashFlowReturn({
      startingBalance: Number(inputs.startingBalance) || 0,
      startDate: String(inputs.startDate || "2023-01-01"),
      endingBalance: Number(inputs.endingBalance) || 0,
      endDate: String(inputs.endDate || "2026-08-17"),
      cashFlows: [
        { id: "1", type: "deposit", amount: 5000, date: "2024-01-15" },
        { id: "2", type: "withdraw", amount: 1500, date: "2024-06-01" },
        { id: "3", type: "deposit", amount: 3800, date: "2025-01-18" },
      ],
    });

    return {
      ...res,
      mwrrPercent: `${res.mwrrPercent}%`,
      arrPercent: `${res.arrPercent}%`,
      netInvested: `$${res.netInvested.toLocaleString()}`,
      totalGainLoss: `$${res.totalGainLoss.toLocaleString()}`,
      totalYears: `${res.totalYears} yrs`,
    };
  },
  CustomComponent: AverageReturnCalculator,
  ContentComponent: AverageReturnContent,
};

export default average_return_calculatorConfig;
