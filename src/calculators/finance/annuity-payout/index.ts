import { CalculatorModuleDefinition } from "../../types";
import { calculateFixedLengthPayout } from "@/lib/calculator-engine/formulas/annuity-payout";

export const ANNUITY_PAYOUT_CALCULATOR: CalculatorModuleDefinition = {
  id: "annuity-payout",
  title: "Annuity Payout Calculator – Guaranteed Retirement Income Suite",
  slug: "annuity-payout-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Free Annuity Payout Calculator. Calculate guaranteed monthly income payouts for fixed length terms, fixed payments, single/joint life expectancy, inflation adjustments, and immediate vs deferred comparisons.",
  iconName: "Shield",
  featured: true,
  tags: [
    "annuity payout",
    "annuity payout calculator",
    "guaranteed income",
    "annuitization",
    "fixed length payout",
    "joint life annuity",
  ],
  formulaDescription:
    "Fixed Length Payout: PMT = [P × r × (1+r)^n] / [(1+r)^n - 1]. Fixed Payment Depletion: n = ln(PMT / (PMT - P×r)) / ln(1+r).",
  faqs: [
    {
      question: "What is the difference between a Fixed Length Payout and a Fixed Payment Payout?",
      answer:
        "A Fixed Length Payout guarantees monthly payments for a specific period of time (e.g. 10 or 20 years), automatically calculating the monthly amount. A Fixed Payment Payout lets you choose your desired monthly check (e.g. $5,000/mo) and calculates how long your funds will last.",
    },
    {
      question: "What is the 1035 Exchange rule for annuities?",
      answer:
        "A 1035 Exchange allows policyholders to transfer funds tax-free from an existing annuity to a new annuity contract without incurring immediate income taxes on accumulated gains.",
    },
  ],
  inputs: [
    { name: "startingPrincipal", label: "Starting Principal ($)", type: "currency", defaultValue: 500000, unit: "$", min: 10000, max: 10000000, step: 25000 },
    { name: "interestRatePercent", label: "Annual Interest/Return Rate (%)", type: "number", defaultValue: 6.0, min: 0.1, max: 20, step: 0.25 },
    { name: "yearsToPayout", label: "Years to Payout", type: "number", defaultValue: 10, min: 1, max: 50, step: 1 },
    {
      name: "payoutFrequency",
      label: "Payout Frequency",
      type: "select",
      defaultValue: "monthly",
      options: [
        { label: "Monthly", value: "monthly" },
        { label: "Quarterly", value: "quarterly" },
        { label: "Semi-Annual", value: "semiannual" },
        { label: "Annual", value: "annual" },
      ],
    },
  ],
  outputs: [
    { name: "monthlyWithdrawal", label: "Guaranteed Monthly Payout", format: "currency", highlight: true },
    { name: "annualWithdrawal", label: "Guaranteed Annual Payout", format: "currency", highlight: true },
    { name: "totalAmountWithdrawn", label: "Total Amount Withdrawn", format: "currency" },
    { name: "totalInterestEarned", label: "Total Interest Earned", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const res = calculateFixedLengthPayout({
      startingPrincipal: Number(inputs.startingPrincipal || 500000),
      interestRatePercent: Number(inputs.interestRatePercent || 6.0),
      yearsToPayout: Number(inputs.yearsToPayout || 10),
      payoutFrequency: (inputs.payoutFrequency as any) || "monthly",
    });

    return {
      monthlyWithdrawal: res.monthlyWithdrawal,
      annualWithdrawal: res.annualWithdrawal,
      totalAmountWithdrawn: res.totalAmountWithdrawn,
      totalInterestEarned: res.totalInterestEarned,
    };
  },
};

export default ANNUITY_PAYOUT_CALCULATOR;
