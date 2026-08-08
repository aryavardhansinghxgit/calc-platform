import { CalculatorReportData } from "@/components/report/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export function generateLoanReportData(inputs: any, results: any): CalculatorReportData {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const generatedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const monthlyPayment = results.monthlyPayment ?? results.periodicPayment ?? 0;
  const totalInterest = results.totalInterest ?? results.totalInterestPaid ?? 0;
  const totalPayment = results.totalPayment ?? results.totalAmountPaid ?? 0;

  return {
    meta: {
      calculatorName: "Loan Calculator",
      reportTitle: "LOAN ANALYSIS EXECUTIVE REPORT",
      generatedDate,
      generatedTime,
    },
    keyMetrics: [
      { label: "Monthly Payment", value: formatCurrency(monthlyPayment) },
      { label: "Total Loan Amount", value: formatCurrency(inputs.loanAmount || 0) },
      { label: "Total Interest Paid", value: formatCurrency(totalInterest) },
      { label: "Total Payoff Amount", value: formatCurrency(totalPayment) },
    ],
    sections: [
      {
        title: "LOAN TERMS & CONDITIONS",
        items: [
          { label: "Principal Borrowed", value: formatCurrency(inputs.loanAmount || 0) },
          { label: "Annual Interest Rate", value: `${inputs.interestRate || 0}%` },
          { label: "Loan Term", value: `${inputs.loanTermYears || 0} Years` },
        ],
      },
      {
        title: "FINANCIAL SUMMARY",
        items: [
          { label: "Monthly Payment", value: formatCurrency(monthlyPayment), highlight: true },
          { label: "Total Interest", value: formatCurrency(totalInterest), highlight: true },
          { label: "Total Amount Paid", value: formatCurrency(totalPayment), highlight: true },
        ],
      },
    ],
    recommendation: {
      title: "LOAN COST ADVISORY",
      text: "Compare multiple lending offers to secure the lowest annual percentage rate (APR) and minimize total interest expenses over the loan term.",
      score: 80,
      rating: "Good Setup",
    },
  };
}
