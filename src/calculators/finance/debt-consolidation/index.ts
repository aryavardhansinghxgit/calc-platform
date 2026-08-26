import { CalculatorModuleDefinition } from "../../types";
import { calculateDebtConsolidation } from "@/lib/calculator-engine/formulas/debt-consolidation";

export const DEBT_CONSOLIDATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "debt-consolidation",
  title: "Debt Consolidation Calculator — Compare Loans, APR, Fees & Savings",
  slug: "debt-consolidation-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Compare your current debts with a consolidation loan, calculate weighted APR, real effective APR, monthly savings, total interest, fees, balance-transfer costs, and payoff schedules.",
  iconName: "Landmark",
  featured: true,
  tags: [
    "debt consolidation calculator",
    "debt consolidation loan calculator",
    "debt consolidation savings calculator",
    "credit card consolidation calculator",
    "debt refinance calculator",
    "debt consolidation comparison",
    "debt payoff consolidation calculator",
    "consolidation loan apr calculator",
    "balance transfer vs consolidation loan",
  ],
  formulaDescription:
    "Solves Real Effective APR including upfront origination fees using Newton-Raphson method; compares current multi-debt schedule vs consolidation loan amortization schedule.",
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
