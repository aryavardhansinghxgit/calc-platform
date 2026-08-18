import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const average_return_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Average Return Calculator — Calculate Annualized & Cumulative Investment Returns",
    description:
      "Advanced Average Return & Portfolio Performance Suite. Calculate exact Time-Weighted Rate of Return (TWRR), Money-Weighted Return (MWRR / XIRR), Accounting Rate of Return (ARR), Volatility, and Cumulative Returns.",
    slug: "average-return-calculator",
  }),
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
    "sharpe ratio calculator",
    "twrr vs mwrr calculator",
  ],
  openGraph: {
    title: "Average Return Calculator — Calculate Annualized & Cumulative Investment Returns",
    description:
      "Advanced Average Return & Portfolio Performance Suite. Calculate TWRR, MWRR (XIRR), ARR, and Portfolio Volatility.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Return Calculator — Calculate Annualized & Cumulative Investment Returns",
    description:
      "Advanced Average Return & Portfolio Performance Suite. Calculate TWRR, MWRR (XIRR), ARR, and Portfolio Volatility.",
  },
};
