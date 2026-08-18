import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const take_home_pay_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Take-Home Paycheck Calculator: Calculate Net Pay & Taxes",
    description:
      "Calculate your net take-home paycheck after federal, state, FICA taxes, pre-tax 401(k) deductions, and Form W-4 adjustments with our free paycheck tool.",
    slug: "take-home-pay-calculator",
  }),
  keywords: [
    "take home paycheck calculator",
    "paycheck calculator",
    "net pay calculator",
    "salary take home calculator",
    "hourly paycheck calculator",
    "tax withholding calculator",
    "biweekly paycheck calculator",
    "gross to net paycheck calculator",
    "how to calculate take home pay",
    "w4 paycheck calculator",
    "state paycheck tax calculator",
  ],
  openGraph: {
    title: "Take-Home Paycheck Calculator: Calculate Net Pay & Taxes",
    description:
      "Calculate your net take-home paycheck after federal, state, FICA taxes, pre-tax 401(k) deductions, and Form W-4 adjustments.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take-Home Paycheck Calculator: Calculate Net Pay & Taxes",
    description:
      "Calculate your net take-home paycheck after federal, state, FICA taxes, pre-tax 401(k) deductions, and Form W-4 adjustments.",
  },
};
