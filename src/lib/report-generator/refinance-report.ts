import { RefinanceInput, RefinanceOutput } from "@/modules/refinance/types";
import { CalculatorReportData } from "@/components/report/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export function generateRefinanceReportData(
  inputs: RefinanceInput,
  results: RefinanceOutput
): CalculatorReportData {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const generatedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Top Key Summary Metric Cards
  const keyMetrics = [
    {
      label: "Current Monthly Payment",
      value: formatCurrency(results.currentMonthlyPayment),
    },
    {
      label: "New Monthly Payment",
      value: formatCurrency(results.newMonthlyPayment),
      subtitle: `${results.monthlySavings >= 0 ? "Saves" : "Increases"} ${formatCurrency(Math.abs(results.monthlySavings))}/mo`,
    },
    {
      label: "Lifetime Interest Saved",
      value: formatCurrency(results.interestSaved),
      subtitle: `${results.interestReductionPercent}% reduction`,
    },
    {
      label: "Break-Even Period",
      value: results.breakEvenMonths < 900 ? `${results.breakEvenMonths} Months` : "N/A",
      subtitle: results.breakEvenMonths < 900 ? `${results.breakEvenYears} Years` : "No break-even",
    },
  ];

  // User Inputs & Calculations Sections
  const sections = [
    {
      title: "CURRENT LOAN SETUP",
      items: [
        { label: "Remaining Balance", value: formatCurrency(results.currentRemainingBalance) },
        { label: "Current Interest Rate", value: `${inputs.currentInterestRate ?? 7.0}%` },
        { label: "Current Monthly Payment", value: formatCurrency(results.currentMonthlyPayment) },
        { label: "Remaining Term", value: `${Math.round(results.currentRemainingMonths / 12)} Years (${results.currentRemainingMonths} mos)` },
      ],
    },
    {
      title: "NEW REFINANCED LOAN SETUP",
      items: [
        { label: "New Interest Rate", value: `${inputs.newInterestRate ?? 6.0}%` },
        { label: "New Loan Term", value: `${inputs.newLoanTermYears ?? 20} Years (${(inputs.newLoanTermYears ?? 20) * 12} mos)` },
        { label: "Upfront Closing Costs", value: formatCurrency(results.closingCosts) },
        { label: "Discount Points", value: `${inputs.discountPoints ?? 0}% (${formatCurrency(results.pointsCost)})` },
      ],
    },
    {
      title: "FINANCIAL RESULTS SUMMARY",
      items: [
        { label: "Monthly Savings", value: formatCurrency(results.monthlySavings), highlight: true },
        { label: "Lifetime Interest Savings", value: formatCurrency(results.interestSaved), highlight: true },
        { label: "Break-Even Timeline", value: results.breakEvenMonths < 900 ? `${results.breakEvenMonths} Mos (${results.breakEvenYears} Yrs)` : "No Break-Even" },
        { label: "Net Financial Savings", value: formatCurrency(results.netSavings), highlight: true },
      ],
    },
  ];

  // Cash-Out Refinance Section if applicable
  if (inputs.refinanceGoal === "access-equity" || results.cashOutAmount > 0) {
    sections.push({
      title: "CASH-OUT EQUITY ANALYSIS",
      items: [
        { label: "Home Market Value", value: formatCurrency(inputs.homeMarketValue ?? 400000) },
        { label: "Desired Cash Out", value: formatCurrency(results.cashOutAmount) },
        { label: "Available Equity", value: formatCurrency(results.availableEquity) },
        { label: "New Loan-To-Value (LTV)", value: `${results.newLtvRatio}%` },
      ],
    });
  }

  // Debt Consolidation Section if applicable
  if (inputs.refinanceGoal === "consolidate-debt" || results.totalConsolidatedDebt > 0) {
    sections.push({
      title: "DEBT CONSOLIDATION ANALYSIS",
      items: [
        { label: "Total Consolidating Debt", value: formatCurrency(results.totalConsolidatedDebt) },
        { label: "Previous Debt Payments", value: formatCurrency(results.consolidatedMonthlyPayment) },
        { label: "Blended Interest Rate", value: `${results.blendedInterestRate}%` },
        { label: "Monthly Debt Savings", value: formatCurrency(results.debtConsolidationMonthlySavings), highlight: true },
      ],
    });
  }

  // Recommendation Box
  const recommendation = {
    title: "EXECUTIVE FINANCIAL RECOMMENDATION",
    text: results.aiInsights.summary,
    reasons: results.recommendationReasons,
    score: results.refinanceScore,
    rating: results.refinanceRating,
  };

  // Schedule Table Preview (First 12 months)
  const scheduleRows = results.amortizationComparisonSchedule.slice(0, 12).map((r) => ({
    month: `Month ${r.month}`,
    currentPayment: formatCurrency(r.currentPayment),
    currentBalance: formatCurrency(r.currentBalance),
    newPayment: formatCurrency(r.newPayment),
    newBalance: formatCurrency(r.newBalance),
  }));

  const table = {
    title: "SIDE-BY-SIDE AMORTIZATION SCHEDULE PREVIEW (YEAR 1)",
    headers: [
      { key: "month", label: "Month" },
      { key: "currentPayment", label: "Current Payment", align: "right" as const },
      { key: "currentBalance", label: "Current Balance", align: "right" as const },
      { key: "newPayment", label: "New Payment", align: "right" as const },
      { key: "newBalance", label: "New Balance", align: "right" as const },
    ],
    rows: scheduleRows,
    footerSummary: "Showing months 1–12 of full comparison schedule.",
  };

  return {
    meta: {
      calculatorName: "Refinance Calculator",
      reportTitle: "REFINANCE ANALYSIS EXECUTIVE REPORT",
      generatedDate,
      generatedTime,
    },
    keyMetrics,
    sections,
    recommendation,
    table,
    notes: [
      "Calculations assume fixed interest rates over the selected loan duration.",
      "Closing costs and discount points are factored into upfront break-even analysis.",
      "Tax implications may vary depending on local jurisdiction and itemized deductions.",
    ],
  };
}
