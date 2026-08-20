import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const salary_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Salary Calculator: Hourly to Salary & Paycheck Conversion",
    description:
      "Calculate annual salary, hourly wage, bi-weekly pay, and take-home pay. Features paid PTO adjustment, FLSA overtime, and cost-of-living comparison.",
    slug: "salary-calculator",
  }),
  keywords: [
    "salary calculator",
    "hourly to salary calculator",
    "salary to hourly calculator",
    "hourly wage calculator",
    "biweekly pay calculator",
    "semi monthly salary calculator",
    "salary calculator with PTO",
    "overtime salary calculator",
    "take home pay calculator",
    "cost of living salary calculator",
    "target salary calculator",
    "reverse salary calculator",
  ],
  openGraph: {
    title: "Salary Calculator: Hourly to Salary & Paycheck Conversion",
    description:
      "Calculate annual salary, hourly wage, bi-weekly pay, and take-home pay. Features paid PTO adjustment, FLSA overtime, and cost-of-living comparison.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Calculator: Hourly to Salary & Paycheck Conversion",
    description:
      "Calculate annual salary, hourly wage, bi-weekly pay, and take-home pay. Features paid PTO adjustment, FLSA overtime, and cost-of-living comparison.",
  },
};
