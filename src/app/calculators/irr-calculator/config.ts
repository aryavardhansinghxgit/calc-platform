import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCoreIrr } from "./calculator";
import { IrrCalculator } from "@/components/calculator/irr/IrrCalculator";
import { IrrContent } from "@/components/calculator/irr/IrrContent";

export const irr_calculatorConfig: CalculatorModuleDefinition = {
  id: "irr-calculator",
  title: "IRR Calculator — Internal Rate of Return, MIRR, NPV & Project Analysis",
  slug: "irr-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate IRR, MIRR, NPV, profitability index, discounted payback and project returns. Analyze monthly cash flows, multiple IRRs, Fisher crossover and capital budgeting scenarios.",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "irr calculator",
    "internal rate of return calculator",
    "calculate irr",
    "mirr calculator",
    "npv and irr calculator",
    "internal rate of return formula",
    "cash flow irr calculator",
    "capital budgeting calculator",
    "discounted payback period calculator",
    "profitability index calculator",
    "irr vs roi",
  ],
  priority: 1,
  relatedCalculators: [
    "cagr-calculator",
    "roi-calculator",
    "npv-calculator",
    "present-value-calculator",
    "future-value-calculator",
    "average-return-calculator",
  ],
  formulaDescription:
    "NPV = sum[ CF_t / (1 + IRR)^t ] = 0 | Solved via Newton-Raphson numerical root finding.",
  inputs: [
    {
      name: "initialOutlay",
      label: "Initial Outlay / Investment ($)",
      type: "currency",
      defaultValue: 40000,
      min: 1,
      max: 1000000000,
    },
    {
      name: "hurdleRate",
      label: "Hurdle Rate / WACC (%)",
      type: "percentage",
      defaultValue: 12.0,
      min: 0,
      max: 100,
      step: 0.1,
    },
    {
      name: "reinvestmentRate",
      label: "Reinvestment Rate (%)",
      type: "percentage",
      defaultValue: 10.0,
      min: 0,
      max: 100,
      step: 0.1,
    },
  ],
  outputs: [
    {
      name: "irrPercent",
      label: "Internal Rate of Return (IRR %/yr)",
      type: "percentage",
    },
    {
      name: "mirrPercent",
      label: "Modified IRR (MIRR %/yr)",
      type: "percentage",
    },
    {
      name: "npv",
      label: "Net Present Value (NPV)",
      type: "currency",
    },
    {
      name: "profitabilityIndex",
      label: "Profitability Index (PI)",
      type: "number",
    },
    {
      name: "discountedPaybackYears",
      label: "Discounted Payback Period (Years)",
      type: "number",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateCoreIrr({
      initialOutlay: Number(inputs.initialOutlay) || 40000,
      cashFlows: [
        { year: 1, amount: 10000 },
        { year: 2, amount: 20000 },
        { year: 3, amount: 30000 },
      ],
      hurdleRate: Number(inputs.hurdleRate) || 12,
      reinvestmentRate: Number(inputs.reinvestmentRate) || 10,
      financingRate: 8,
    });

    return {
      ...res,
      irrPercent: `${res.irrPercent}%`,
      mirrPercent: `${res.mirrPercent}%`,
      npv: `$${res.npv.toLocaleString()}`,
      profitabilityIndex: res.profitabilityIndex,
      discountedPaybackYears: `${res.discountedPaybackYears} yrs`,
    };
  },
  CustomComponent: IrrCalculator,
  ContentComponent: IrrContent,
};

export default irr_calculatorConfig;
