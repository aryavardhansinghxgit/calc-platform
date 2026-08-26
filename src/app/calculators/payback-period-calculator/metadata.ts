import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const payback_period_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Payback Period Calculator — Simple & Discounted Payback Analysis",
    description:
      "Calculate simple and discounted payback periods for annual or monthly cash flows. Compare projects with NPV, IRR, profitability index, target payback and sensitivity analysis.",
    slug: "payback-period-calculator",
  }),
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
    "wacc hurdle rate payback",
  ],
  openGraph: {
    title: "Payback Period Calculator — Simple & Discounted Payback Analysis",
    description:
      "Calculate simple and discounted payback periods for annual or monthly cash flows. Compare projects with NPV, IRR, profitability index, target payback and sensitivity analysis.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payback Period Calculator — Simple & Discounted Payback Analysis",
    description:
      "Calculate simple and discounted payback periods for annual or monthly cash flows. Compare projects with NPV, IRR, profitability index, target payback and sensitivity analysis.",
  },
};
