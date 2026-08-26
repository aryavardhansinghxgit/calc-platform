import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const take_home_pay_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Take-Home Paycheck Calculator — Estimate Your Net Pay After Taxes",
    description:
      "Calculate your estimated take-home pay from salary or hourly wages after federal tax, Social Security, Medicare, state and local taxes, benefits, retirement contributions, overtime, bonuses, and other deductions.",
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
    title: "Take-Home Paycheck Calculator — Estimate Your Net Pay After Taxes",
    description:
      "Calculate your estimated take-home pay from salary or hourly wages after federal tax, Social Security, Medicare, state and local taxes, benefits, retirement contributions, overtime, bonuses, and other deductions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Take-Home Paycheck Calculator — Estimate Your Net Pay After Taxes",
    description:
      "Calculate your estimated take-home pay from salary or hourly wages after federal tax, Social Security, Medicare, state and local taxes, benefits, retirement contributions, overtime, bonuses, and other deductions.",
  },
};
