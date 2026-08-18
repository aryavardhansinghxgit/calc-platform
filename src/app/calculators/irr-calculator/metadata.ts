import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const irr_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "IRR Calculator — Internal Rate of Return, MIRR & NPV Capital Budgeting",
    description:
      "Advanced Capital Budgeting & IRR Calculator. Calculate exact Internal Rate of Return (IRR), Modified IRR (MIRR), Net Present Value (NPV), Profitability Index, and Discounted Payback Period.",
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
    title: "IRR Calculator — Internal Rate of Return, MIRR & NPV Capital Budgeting",
    description:
      "Advanced Capital Budgeting & IRR Calculator. Solve IRR, MIRR, NPV Profiles, and Compare Multi-Project Capital Investments.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IRR Calculator — Internal Rate of Return, MIRR & NPV Capital Budgeting",
    description:
      "Advanced Capital Budgeting & IRR Calculator. Solve IRR, MIRR, NPV Profiles, and Compare Multi-Project Capital Investments.",
  },
};
