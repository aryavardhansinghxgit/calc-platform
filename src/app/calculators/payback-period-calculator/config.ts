import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateIrregularPayback } from "./calculator";
import { PaybackPeriodCalculator } from "@/components/calculator/payback-period/PaybackPeriodCalculator";
import { PaybackPeriodContent } from "@/components/calculator/payback-period/PaybackPeriodContent";

export const payback_period_calculatorConfig: CalculatorModuleDefinition = {
  id: "payback-period-calculator",
  title: "Payback Period Calculator — Simple & Discounted Payback Analysis",
  slug: "payback-period-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate the exact Simple Payback Period (years, months, days), Discounted Payback Period (DPP), Net Present Value (NPV), and Capital Recovery Schedules for capital budgeting investments.",
  iconName: "Clock",
  featured: true,
  keywords: [
    "payback period calculator",
    "discounted payback period calculator",
    "calculate payback period",
    "simple payback vs discounted payback",
    "payback period formula",
    "capital budgeting payback calculator",
    "breakeven period calculator",
    "roi payback time calculator",
    "unequal cash flow payback calculator",
    "discounted cash flow payback period",
  ],
  priority: 1,
  relatedCalculators: [
    "irr-calculator",
    "roi-calculator",
    "cagr-calculator",
    "npv-calculator",
    "present-value-calculator",
    "future-value-calculator",
    "average-return-calculator",
  ],
  formulaDescription:
    "Simple Payback = Initial Outlay / Annual Cash Flow | DPP = -ln[1 - (CF_0 * r) / PMT] / ln(1 + r)",
  inputs: [
    {
      name: "initialInvestment",
      label: "Initial Investment Outlay ($)",
      type: "currency",
      defaultValue: 100000,
      min: 1,
      max: 1000000000,
    },
    {
      name: "discountRate",
      label: "Discount Rate / WACC (%)",
      type: "percentage",
      defaultValue: 10.0,
      min: 0,
      max: 100,
      step: 0.1,
    },
  ],
  outputs: [
    {
      name: "simplePaybackFormatted",
      label: "Simple Payback Period",
      type: "text",
    },
    {
      name: "discountedPaybackFormatted",
      label: "Discounted Payback Period (DPP)",
      type: "text",
    },
    {
      name: "npv",
      label: "Net Present Value (NPV)",
      type: "currency",
    },
    {
      name: "irrPercent",
      label: "Internal Rate of Return (IRR)",
      type: "percentage",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateIrregularPayback({
      initialInvestment: Number(inputs.initialInvestment) || 100000,
      discountRate: Number(inputs.discountRate) || 10,
      cashFlows: [
        { year: 1, amount: 5000 },
        { year: 2, amount: 25000 },
        { year: 3, amount: 35000 },
        { year: 4, amount: 40000 },
        { year: 5, amount: 30000 },
        { year: 6, amount: 10000 },
      ],
    });

    return {
      ...res,
      npv: `$${res.npv.toLocaleString()}`,
      irrPercent: `${res.irrPercent}%`,
    };
  },
  CustomComponent: PaybackPeriodCalculator,
  ContentComponent: PaybackPeriodContent,
};

export default payback_period_calculatorConfig;
