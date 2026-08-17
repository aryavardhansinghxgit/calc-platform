import { Metadata } from "next";

export const downPaymentMetadata: Metadata = {
  title: "Down Payment Calculator — Mortgage Down Payment & PMI Payoff Suite",
  description:
    "Free Down Payment Calculator. Dual mode calculation (by home price or max cash available), 0% to 30% tier comparisons, PMI cancellation date milestone, opportunity cost index fund simulator, and upfront cash-to-close.",
  keywords: [
    "Down Payment Calculator",
    "House Down Payment Calculator",
    "Mortgage Down Payment Calculator",
    "How much down payment for house",
    "20% down payment calculator",
    "PMI calculator down payment",
    "FHA vs conventional down payment",
    "minimum down payment for first-time home buyer",
    "cash to close calculator",
    "cost of waiting to buy a home"
  ],
  authors: [{ name: "Calculator Platform Mortgage Underwriting Engineering Team" }],
  openGraph: {
    title: "Down Payment Calculator — Mortgage Down Payment & PMI Suite",
    description:
      "Calculate 0% to 30% down payment tiers, monthly PITI payments, 78% LTV PMI removal dates, cash-to-close, and investment opportunity cost.",
    type: "website",
    url: "https://calculator-platform.com/calculators/down-payment-calculator",
  },
  alternates: {
    canonical: "https://calculator-platform.com/calculators/down-payment-calculator",
  },
};
