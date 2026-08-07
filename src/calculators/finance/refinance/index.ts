import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const REFINANCE_CALCULATOR: CalculatorModuleDefinition = {
  id: "refinance",
  title: "Refinance Calculator",
  slug: "refinance-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Calculate mortgage refinancing savings, monthly payment reduction, and break-even timeline.",
  iconName: "RefreshCw",
  featured: false,
  tags: ["refinance", "mortgage refinance", "break even", "interest savings"],
  formulaDescription: "Compares current mortgage monthly payment vs new mortgage payment, accounting for closing costs to determine break-even months.",
  faqs: [
    {
      question: "What is a mortgage break-even period?",
      answer: "The break-even period is the number of months required for your cumulative monthly payment savings to offset upfront closing costs.",
    },
  ],
  inputs: [
    { name: "currentLoanBalance", label: "Current Loan Balance", type: "currency", defaultValue: 280000, unit: "$", min: 10000, max: 5000000, step: 5000 },
    { name: "currentRate", label: "Current Interest Rate", type: "percentage", defaultValue: 7.0, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "currentTermYears", label: "Remaining Term", type: "slider", defaultValue: 25, unit: "years", min: 1, max: 30, step: 1 },
    { name: "newRate", label: "New Interest Rate", type: "percentage", defaultValue: 5.5, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "newTermYears", label: "New Loan Term", type: "slider", defaultValue: 30, unit: "years", min: 5, max: 30, step: 5 },
    { name: "closingCosts", label: "Refinancing Closing Costs", type: "currency", defaultValue: 4000, unit: "$", min: 0, max: 50000, step: 250 },
  ],
  outputs: [
    { name: "monthlySavings", label: "Monthly Savings", format: "currency", highlight: true },
    { name: "breakEvenMonths", label: "Break-Even Time", format: "text", highlight: true },
    { name: "lifetimeSavings", label: "Total Lifetime Savings", format: "currency" },
  ],
  calculate: (inputs) => {
    const bal = Math.max(0, Number(inputs.currentLoanBalance || 280000));
    const r1 = Math.min(100, Math.max(0, Number(inputs.currentRate || 7.0))) / 100 / 12;
    const n1 = Math.max(1, Number(inputs.currentTermYears || 25)) * 12;
    const r2 = Math.min(100, Math.max(0, Number(inputs.newRate || 5.5))) / 100 / 12;
    const n2 = Math.max(1, Number(inputs.newTermYears || 30)) * 12;
    const costs = Math.max(0, Number(inputs.closingCosts || 4000));

    const pmt1 = safePmt(bal, r1, n1);
    const pmt2 = safePmt(bal, r2, n2);

    const monthlySavings = pmt1 - pmt2;
    const breakEven = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : 0;
    const totalCurrentRemaining = pmt1 * n1;
    const totalNew = (pmt2 * n2) + costs;
    const lifetimeSavings = totalCurrentRemaining - totalNew;

    return {
      monthlySavings: Number((isNaN(monthlySavings) ? 0 : monthlySavings).toFixed(2)),
      breakEvenMonths: monthlySavings > 0 ? `${breakEven} months (${(breakEven / 12).toFixed(1)} yrs)` : "No savings",
      lifetimeSavings: Number((isNaN(lifetimeSavings) ? 0 : lifetimeSavings).toFixed(2)),
    };
  },
};

export default REFINANCE_CALCULATOR;
