import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const payment_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Payment Calculator: Calculate Monthly Loan Payments & Amortization",
    description:
      "Calculate monthly loan payments, multi-frequency bi-weekly savings, payoff schedules, and interest with our free payment calculator.",
    slug: "payment-calculator",
  }),
  keywords: [
    "payment calculator",
    "loan payment calculator",
    "monthly payment calculator",
    "calculate loan payments",
    "loan payoff calculator",
    "amortization schedule calculator",
    "biweekly loan payment calculator",
    "car loan payment calculator",
    "personal loan payment calculator",
    "how to calculate monthly loan payments",
  ],
  openGraph: {
    title: "Payment Calculator: Calculate Monthly Loan Payments & Amortization",
    description:
      "Calculate monthly loan payments, multi-frequency bi-weekly savings, payoff schedules, and interest.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Calculator: Calculate Monthly Loan Payments & Amortization",
    description:
      "Calculate monthly loan payments, multi-frequency bi-weekly savings, payoff schedules, and interest.",
  },
};
