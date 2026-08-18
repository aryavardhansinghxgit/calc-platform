import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const payback_period_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Payback Period Calculator — Simple & Discounted Payback Analysis",
    description:
      "Advanced Payback Period and Discounted Payback Period (DPP) Calculator. Calculate exact breakeven duration in years, months, and days, Net Present Value (NPV), and Capital Recovery Schedules.",
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
      "Advanced Capital Recovery & Payback Calculator. Calculate Simple Payback, Discounted Payback (DPP), NPV, IRR, and Side-by-Side Capital Projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payback Period Calculator — Simple & Discounted Payback Analysis",
    description:
      "Advanced Capital Recovery & Payback Calculator. Calculate Simple Payback, Discounted Payback (DPP), NPV, IRR, and Side-by-Side Capital Projects.",
  },
};
