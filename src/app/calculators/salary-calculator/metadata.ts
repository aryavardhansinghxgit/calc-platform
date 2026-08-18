import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const salary_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Salary Calculator — Hourly, Monthly & Annual Paycheck Converter",
    description:
      "Advanced Salary and Paycheck Calculator. Convert between Hourly, Daily, Weekly, Bi-Weekly, Semi-Monthly, and Annual earnings with overtime, PTO, and take-home tax estimations.",
    slug: "salary-calculator",
  }),
  keywords: [
    "salary calculator",
    "hourly to salary calculator",
    "salary to hourly calculator",
    "paycheck calculator",
    "biweekly to annual salary calculator",
    "net take home pay calculator",
    "how much do i make an hour",
    "annual to monthly salary calculator",
    "gross to net salary calculator",
    "overtime pay calculator",
    "cost of living salary converter",
  ],
  openGraph: {
    title: "Salary Calculator — Hourly, Monthly & Annual Paycheck Converter",
    description:
      "Advanced Salary & Paycheck Converter Suite. Calculate Gross-to-Net Pay, FICA Taxes, Overtime Multipliers, and 50/30/20 Budgeting.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator — Hourly, Monthly & Annual Paycheck Converter",
    description:
      "Advanced Salary & Paycheck Converter Suite. Calculate Gross-to-Net Pay, FICA Taxes, Overtime Multipliers, and 50/30/20 Budgeting.",
  },
};
