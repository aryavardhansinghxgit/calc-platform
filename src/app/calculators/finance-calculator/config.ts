import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFinanceCalculator } from "./calculator";
import { financeFaqs } from "./faq";
import { FinanceCalculator } from "@/components/calculator/finance/FinanceCalculator";
import { FinanceContent } from "@/components/calculator/finance/FinanceContent";

export const financeConfig: CalculatorModuleDefinition = {
  id: "finance-calculator",
  title: "Finance Calculator — Time Value of Money (TVM) Solvers",
  slug: "finance-calculator",
  category: "Finance",
  subcategory: "General",
  description:
    "Free Finance Calculator. Solve for Future Value (FV), Present Value (PV), Periodic Payment (PMT), Interest Rate (I/Y), and Term (N). Features compound interest visualizers, inflation drag, and post-tax net returns.",
  iconName: "DollarSign",
  featured: true,
  keywords: [
    "finance calculator",
    "TVM calculator",
    "time value of money formula",
    "compound interest calculator",
    "future value formula",
    "present value calculations",
    "ordinary annuity vs annuity due",
    "nominal vs real return rate",
    "continuous compounding calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "compound-interest-calculator",
    "investment-calculator",
    "savings-calculator",
    "cagr-calculator"
  ],
  formulaDescription:
    "TVM Equation: PV + PMT * [(1 - (1+i)^-N)/i] * (1 + i*type) + FV * (1+i)^-N = 0.",
  faqs: financeFaqs,
  inputs: [
    {
      name: "mode",
      label: "Calculation Goal",
      type: "select",
      defaultValue: "FV",
      options: [
        { label: "Solve for Future Value (FV)", value: "FV" },
        { label: "Solve for Payment (PMT)", value: "PMT" },
        { label: "Solve for Rate (I/Y)", value: "IY" },
        { label: "Solve for Term (N)", value: "N" },
        { label: "Solve for Present Value (PV)", value: "PV" },
      ],
    },
    {
      name: "n",
      label: "Number of Periods (N)",
      type: "number",
      defaultValue: 10,
    },
    {
      name: "iy",
      label: "Annual Interest Rate (I/Y %)",
      type: "number",
      defaultValue: 6.0,
    },
    {
      name: "pv",
      label: "Present Value (PV $)",
      type: "number",
      defaultValue: 20000,
    },
    {
      name: "pmt",
      label: "Periodic Payment (PMT $)",
      type: "number",
      defaultValue: -2000,
    },
  ],
  outputs: [
    {
      name: "solvedVariable",
      label: "Solved Parameter",
      format: "text",
      highlight: true,
    },
    {
      name: "solvedValue",
      label: "Solved Value",
      format: "number",
      highlight: true,
    },
    {
      name: "fv",
      label: "Future Value (FV)",
      format: "currency",
    },
    {
      name: "totalInterest",
      label: "Total Interest Earned / Paid",
      format: "currency",
    },
  ],
  calculate: calculateFinanceCalculator,
  CustomComponent: FinanceCalculator,
  ContentComponent: FinanceContent,
};

export default financeConfig;
