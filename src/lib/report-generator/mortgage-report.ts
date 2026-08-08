import { MortgageModuleInput, MortgageModuleOutput } from "@/modules/mortgage/types";
import { CalculatorReportData } from "@/components/report/types";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export function generateMortgageReportData(
  inputs: MortgageModuleInput,
  results: MortgageModuleOutput
): CalculatorReportData {
  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const generatedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const keyMetrics = [
    { label: "Total Monthly Payment", value: formatCurrency(results.totalInitialMonthlyPayment) },
    { label: "Principal & Interest", value: formatCurrency(results.monthlyPrincipalAndInterest) },
    { label: "Loan Amount", value: formatCurrency(results.loanAmount) },
    { label: "Total Interest Paid", value: formatCurrency(results.totalInterestPaid) },
  ];

  const sections = [
    {
      title: "MORTGAGE INPUTS",
      items: [
        { label: "Home Price", value: formatCurrency(inputs.homePrice) },
        { label: "Down Payment", value: `${formatCurrency(results.downPaymentAmount)} (${results.downPaymentPercent}%)` },
        { label: "Interest Rate", value: `${inputs.interestRate}%` },
        { label: "Loan Term", value: `${inputs.loanTermYears} Years` },
      ],
    },
    {
      title: "MONTHLY BREAKDOWN & TAXES",
      items: [
        { label: "Property Tax", value: formatCurrency(results.monthlyPropertyTax) },
        { label: "Home Insurance", value: formatCurrency(results.monthlyInsurance) },
        { label: "HOA Fee", value: formatCurrency(results.monthlyHoa) },
        { label: "PMI (Private Mortgage Ins.)", value: formatCurrency(results.monthlyPmi) },
      ],
    },
    {
      title: "TOTAL LIFETIME COST SUMMARY",
      items: [
        { label: "Total Payments", value: formatCurrency(results.totalCost), highlight: true },
        { label: "Total Interest", value: formatCurrency(results.totalInterestPaid), highlight: true },
        { label: "Payoff Date", value: results.payoffDate, highlight: true },
      ],
    },
  ];

  return {
    meta: {
      calculatorName: "Mortgage Calculator",
      reportTitle: "MORTGAGE ANALYSIS EXECUTIVE REPORT",
      generatedDate,
      generatedTime,
    },
    keyMetrics,
    sections,
    recommendation: {
      title: "MORTGAGE AFFORDABILITY ADVISORY",
      text: `Your estimated total monthly mortgage obligation is ${formatCurrency(results.totalInitialMonthlyPayment)}. Standard financial guidelines suggest keeping housing expenses below 28% of gross monthly income.`,
      score: 85,
      rating: "Strong Setup",
    },
    notes: [
      "Property tax and insurance estimates are based on national averages.",
      "PMI applies if down payment is less than 20%.",
    ],
  };
}
