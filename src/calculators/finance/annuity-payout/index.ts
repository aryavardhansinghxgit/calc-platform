import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const ANNUITY_PAYOUT_CALCULATOR: CalculatorModuleDefinition = {
  id: "annuity-payout",
  title: "Annuity Payout Calculator",
  slug: "annuity-payout-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate guaranteed monthly income payments generated from a lump sum annuity balance.",
  iconName: "Shield",
  featured: false,
  tags: ["annuity payout", "payout phase", "guaranteed income", "annuitization"],
  formulaDescription: "Monthly Payout PMT = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]",
  faqs: [
    {
      question: "What is annuitization?",
      answer: "Annuitization converts your accumulated lump sum balance into a series of guaranteed periodic income payouts for a fixed number of years or life.",
    },
  ],
  inputs: [
    { name: "annuityBalance", label: "Annuity Lump Sum Balance", type: "currency", defaultValue: 300000, unit: "$", min: 10000, max: 10000000, step: 10000 },
    { name: "payoutRate", label: "Annual Payout Interest Rate", type: "percentage", defaultValue: 5.0, unit: "%", min: 0.1, max: 15, step: 0.1 },
    { name: "payoutTermYears", label: "Payout Duration", type: "slider", defaultValue: 20, unit: "years", min: 5, max: 35, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayout", label: "Guaranteed Monthly Payout", format: "currency", highlight: true },
    { name: "annualPayout", label: "Guaranteed Annual Payout", format: "currency", highlight: true },
    { name: "totalPayouts", label: "Total Lifetime Payouts Received", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.annuityBalance || 300000));
    const r = Math.min(100, Math.max(0, Number(inputs.payoutRate || 5.0))) / 100 / 12;
    const n = Math.max(1, Number(inputs.payoutTermYears || 20)) * 12;

    if (P <= 0 || n <= 0) return { monthlyPayout: 0, annualPayout: 0, totalPayouts: 0 };

    const pmt = safePmt(P, r, n);
    const total = pmt * n;

    return {
      monthlyPayout: Number(pmt.toFixed(2)),
      annualPayout: Number((pmt * 12).toFixed(2)),
      totalPayouts: Number(total.toFixed(2)),
    };
  },
};

export default ANNUITY_PAYOUT_CALCULATOR;
