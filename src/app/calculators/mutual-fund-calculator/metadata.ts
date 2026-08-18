import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mutual_fund_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Mutual Fund Calculator — Calculate Returns, Expense Ratios & Net IRR",
    description:
      "Advanced Mutual Fund Calculator. Calculate Ending Balance, Expense Ratio Fee Drag, Front-End & CDSC Back-End Sales Loads, SIP Growth, and Net Internal Rate of Return (Net IRR).",
    slug: "mutual-fund-calculator",
  }),
  keywords: [
    "mutual fund calculator",
    "mutual fund return calculator",
    "mutual fund fee calculator",
    "expense ratio calculator",
    "mutual fund net irr calculator",
    "sip mutual fund calculator",
    "front end load vs back end load calculator",
    "mutual fund cost calculator",
    "mutual fund vs index fund fee calculator",
    "mutual fund growth calculator with monthly contributions",
    "cdsc fee calculator",
    "12b-1 fee calculator",
    "mutual fund fee drag calculator",
  ],
  openGraph: {
    title: "Mutual Fund Calculator — Calculate Returns, Expense Ratios & Net IRR",
    description:
      "Advanced Mutual Fund Fee & Growth Analyzer. Calculate Expense Ratio Impact, Sales Loads, Net IRR, and Compare Active vs Index Fund Long-Term Performance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutual Fund Calculator — Calculate Returns, Expense Ratios & Net IRR",
    description:
      "Advanced Mutual Fund Fee & Growth Analyzer. Calculate Expense Ratio Impact, Sales Loads, Net IRR, and Compare Active vs Index Fund Long-Term Performance.",
  },
};
