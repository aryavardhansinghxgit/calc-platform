import { SavingsCalculatorResults, SavingsCalculatorInputs } from "@/lib/calculator-engine/formulas/savings";
import { CalculatorReportData } from "@/components/report/types";
import { formatCurrency, formatPercent } from "@/lib/calculator-engine/formatters";

export function generateSavingsReportData(
  inputs: SavingsCalculatorInputs,
  results: SavingsCalculatorResults
): CalculatorReportData {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const generatedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const keyMetrics = [
    { label: "End Balance", value: formatCurrency(results.endBalance) },
    { label: "Total Contributions", value: formatCurrency(results.totalContributions) },
    { label: "Total Interest Earned", value: formatCurrency(results.totalInterestEarned) },
    { label: "Inflation-Adjusted Value", value: formatCurrency(results.inflationAdjustedBalance) },
  ];

  const sections = [
    {
      title: "SAVINGS PARAMETERS & INPUTS",
      items: [
        { label: "Initial Deposit", value: formatCurrency(results.initialDeposit) },
        { label: "Annual Contribution", value: `${formatCurrency(inputs.annualContribution || 0)} (+${inputs.annualContributionIncrease || 0}%/yr)` },
        { label: "Monthly Contribution", value: `${formatCurrency(inputs.monthlyContribution || 0)} (+${inputs.monthlyContributionIncrease || 0}%/yr)` },
        { label: "Interest Rate (APY/APR)", value: `${inputs.interestRate}%` },
        { label: "Compound Frequency", value: (inputs.compoundFrequency || "annually").toUpperCase() },
        { label: "Investment Duration", value: `${inputs.yearsToSave} Years` },
        { label: "Tax Rate on Interest", value: `${inputs.taxRate}%` },
        { label: "Expected Inflation Rate", value: `${inputs.inflationRate ?? 2.5}%` },
      ],
    },
    {
      title: "FINANCIAL GROWTH & YIELD ANALYSIS",
      items: [
        { label: "Annual Percentage Yield (APY)", value: formatPercent(results.apy) },
        { label: "Effective Real Return", value: formatPercent(results.effectiveRate) },
        { label: "Total Tax Paid", value: formatCurrency(results.totalTaxPaid) },
        { label: "Interest Share of Total Wealth", value: `${results.interestPercentOfTotal}%` },
        { label: "Average Annual Growth Rate", value: `${results.averageAnnualGrowth}%` },
        { label: "Savings Health Rating", value: `${results.healthRating} (${results.savingsEfficiencyScore}/100)` },
      ],
    },
    {
      title: "GOAL SEEKING & RETIREMENT SUMMARY",
      items: [
        { label: "Target Savings Goal", value: formatCurrency(inputs.targetGoalAmount || 100000) },
        { label: "Req. Monthly Savings for Goal", value: formatCurrency(results.requiredMonthlyContribution) },
        { label: "Estimated Retirement Corpus", value: formatCurrency(results.retirementCorpus) },
        { label: "Est. Monthly Drawdown (4% Rule)", value: formatCurrency(results.monthlyRetirementIncome) },
        { label: "FIRE Target (25x Expenses)", value: formatCurrency(results.fireNumber) },
        { label: "Years to FIRE", value: results.yearsToFire ? `${results.yearsToFire} Years` : "Beyond Horizon" },
      ],
    },
  ];

  return {
    meta: {
      calculatorName: "Savings Calculator",
      reportTitle: "SAVINGS & COMPOUND GROWTH EXECUTIVE REPORT",
      generatedDate,
      generatedTime,
    },
    keyMetrics,
    sections,
    recommendation: {
      title: "SAVINGS OPTIMIZATION ADVISORY",
      text: results.healthRecommendations[0] || "Your savings strategy is well-structured for compound growth.",
      score: results.savingsEfficiencyScore,
      rating: results.healthRating,
    },
    notes: [
      "Interest compounding assumes constant return rate throughout the projection period.",
      "Taxes apply directly to interest earnings based on specified tax drag rate.",
      "Inflation adjustment reflects purchasing power loss based on compound consumer price index.",
    ],
  };
}
