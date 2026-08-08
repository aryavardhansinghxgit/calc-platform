import { CalculatorReportData } from "@/components/report/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export function generateEmiReportData(inputs: any, results: any): CalculatorReportData {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const generatedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const monthlyEmi = results.monthlyEmi ?? 0;
  const totalInterest = results.totalInterest ?? results.totalInterestPaid ?? 0;
  const totalPayment = results.totalPayment ?? results.totalPaymentAmount ?? 0;

  return {
    meta: {
      calculatorName: "EMI Calculator",
      reportTitle: "EQUATED MONTHLY INSTALLMENT (EMI) REPORT",
      generatedDate,
      generatedTime,
    },
    keyMetrics: [
      { label: "Monthly EMI", value: formatCurrency(monthlyEmi) },
      { label: "Principal Amount", value: formatCurrency(inputs.loanAmount || 0) },
      { label: "Total Interest", value: formatCurrency(totalInterest) },
      { label: "Total Payment", value: formatCurrency(totalPayment) },
    ],
    sections: [
      {
        title: "EMI LOAN DETAILS",
        items: [
          { label: "Loan Amount", value: formatCurrency(inputs.loanAmount || 0) },
          { label: "Interest Rate (p.a.)", value: `${inputs.interestRate || 0}%` },
          { label: "Tenure", value: `${inputs.tenureMonths || 0} Months` },
        ],
      },
      {
        title: "PAYMENT OUTFLOW SUMMARY",
        items: [
          { label: "Monthly EMI", value: formatCurrency(monthlyEmi), highlight: true },
          { label: "Total Interest Payable", value: formatCurrency(totalInterest), highlight: true },
          { label: "Total Repayment", value: formatCurrency(totalPayment), highlight: true },
        ],
      },
    ],
  };
}
