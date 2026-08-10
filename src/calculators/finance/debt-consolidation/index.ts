import { CalculatorModuleDefinition } from "../../types";
import { calculateDebtConsolidation } from "@/lib/calculator-engine/formulas/debt-consolidation";

export const DEBT_CONSOLIDATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "debt-consolidation",
  title: "Debt Consolidation Calculator – Real APR & Refinance Suite",
  slug: "debt-consolidation-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description:
    "Calculate whether consolidating your credit cards and loans into a single lower-rate loan saves money. Solves Real Effective APR accounting for upfront origination fees, fee sensitivity thresholds, and 0% balance transfer card options.",
  iconName: "Landmark",
  featured: true,
  tags: [
    "debt consolidation calculator",
    "real apr calculator",
    "effective apr calculator",
    "credit card consolidation calculator",
    "personal loan refinance",
    "0 balance transfer calculator",
    "origination fee impact",
  ],
  formulaDescription:
    "Solves Real Effective APR including upfront origination fees using Newton-Raphson method; compares current multi-debt schedule vs consolidation loan amortization schedule.",
  faqs: [
    {
      question: "What is Real APR (Effective APR) vs. Nominal APR?",
      answer:
        "Nominal APR is the advertised interest rate on the loan. Real APR (Effective APR) includes upfront origination fees or points amortized over the loan term, giving you the true total borrowing cost.",
    },
    {
      question: "Will consolidating my debt hurt my credit score?",
      answer:
        "Applying for a consolidation loan causes a temporary 3 to 5 point drop from a hard inquiry. However, paying off revolving credit cards lowers your credit utilization ratio (30% of FICO score), often raising your score by 30 to 80+ points within 60 days.",
    },
  ],
  inputs: [
    { name: "balance1", label: "Credit Card #1 Balance ($)", type: "currency", defaultValue: 10000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "balance2", label: "Credit Card #2 Balance ($)", type: "currency", defaultValue: 7500, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "consolidationApr", label: "Consolidation Loan APR (%)", type: "percentage", defaultValue: 10.99, unit: "%", min: 0, max: 100, step: 0.25 },
    { name: "termYears", label: "Loan Term (Years)", type: "number", defaultValue: 5, unit: "yrs", min: 1, max: 30, step: 1 },
    { name: "feePercent", label: "Origination Fee (%)", type: "percentage", defaultValue: 5, unit: "%", min: 0, max: 20, step: 0.5 },
  ],
  outputs: [
    { name: "netTotalSavings", label: "Net Total Savings", format: "currency", highlight: true },
    { name: "monthlySavings", label: "Monthly Payment Savings", format: "currency" },
    { name: "consolidationMonthlyPayment", label: "New Monthly Payment", format: "currency" },
    { name: "realApr", label: "Real Effective APR", format: "percentage", highlight: true },
    { name: "maxFeeThresholdPercent", label: "Max Fee Threshold %", format: "percentage" },
  ],
  calculate: (inputs) => {
    const defaultDebts = [
      { id: "1", name: "Credit Card 1", balance: Number(inputs.balance1 || 10000), minPayment: 260, apr: 17.99 },
      { id: "2", name: "Credit Card 2", balance: Number(inputs.balance2 || 7500), minPayment: 190, apr: 19.99 },
    ];

    const res = calculateDebtConsolidation({
      debts: defaultDebts,
      consolidationApr: Number(inputs.consolidationApr || 10.99),
      termMonths: Number(inputs.termYears || 5) * 12,
      feeType: "percent",
      feeValue: Number(inputs.feePercent || 5),
    });

    return {
      netTotalSavings: res.netTotalSavings,
      monthlySavings: res.monthlySavings,
      consolidationMonthlyPayment: res.consolidationMonthlyPayment,
      realApr: res.realApr,
      maxFeeThresholdPercent: res.maxFeeThresholdPercent,
    };
  },
};

export default DEBT_CONSOLIDATION_CALCULATOR;
