import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const irr_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "IRR Calculator — Internal Rate of Return, MIRR, NPV & Project Analysis",
    description:
      "Calculate IRR, MIRR, NPV, profitability index, discounted payback and project returns. Analyze monthly cash flows, multiple IRRs, Fisher crossover and capital budgeting scenarios.",
    slug: "irr-calculator",
  }),
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
    "wacc hurdle rate calculator",
  ],
  openGraph: {
    title: "IRR Calculator — Internal Rate of Return, MIRR, NPV & Project Analysis",
    description:
      "Calculate IRR, MIRR, NPV, profitability index, discounted payback and project returns. Analyze monthly cash flows, multiple IRRs, Fisher crossover and capital budgeting scenarios.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRR Calculator — Internal Rate of Return, MIRR, NPV & Project Analysis",
    description:
      "Calculate IRR, MIRR, NPV, profitability index, discounted payback and project returns. Analyze monthly cash flows, multiple IRRs, Fisher crossover and capital budgeting scenarios.",
  },
};
