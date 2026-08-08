import { CalculatorReportData } from "@/components/report/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export function generateHouseAffordabilityReportData(inputs: any, results: any): CalculatorReportData {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const generatedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return {
    meta: {
      calculatorName: "House Affordability Calculator",
      reportTitle: "HOME PURCHASING POWER & AFFORDABILITY REPORT",
      generatedDate,
      generatedTime,
    },
    keyMetrics: [
      { label: "Maximum Home Price", value: formatCurrency(results.maxHomePrice || 0) },
      { label: "Maximum Loan Amount", value: formatCurrency(results.maxLoanAmount || 0) },
      { label: "Max Monthly Payment", value: formatCurrency(results.maxMonthlyPayment || 0) },
      { label: "Front-End DTI Ratio", value: `${results.frontEndDti || 28}%` },
    ],
    sections: [
      {
        title: "FINANCIAL INPUTS",
        items: [
          { label: "Annual Household Income", value: formatCurrency(inputs.annualIncome || 0) },
          { label: "Monthly Debt Obligations", value: formatCurrency(inputs.monthlyDebt || 0) },
          { label: "Down Payment Saved", value: formatCurrency(inputs.downPayment || 0) },
        ],
      },
      {
        title: "PURCHASING POWER & RATIOS",
        items: [
          { label: "Maximum Purchasing Power", value: formatCurrency(results.maxHomePrice || 0), highlight: true },
          { label: "Estimated Monthly Housing", value: formatCurrency(results.maxMonthlyPayment || 0), highlight: true },
          { label: "Back-End DTI Ratio", value: `${results.backEndDti || 36}%` },
        ],
      },
    ],
    recommendation: {
      title: "AFFORDABILITY ADVISORY",
      text: "Maintaining a back-end Debt-To-Income (DTI) ratio below 36% ensures comfortable debt management and increases mortgage pre-approval likelihood.",
      score: 88,
      rating: "Comfortable Purchasing Power",
    },
  };
}
