import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHelocCalculator } from "./calculator";
import { helocFaqs } from "./faq";
import { HELOCCalculator } from "@/components/calculator/heloc/HELOCCalculator";
import { HELOCContent } from "@/components/calculator/heloc/HELOCContent";

export const helocConfig: CalculatorModuleDefinition = {
  id: "heloc-calculator",
  title: "HELOC Calculator — Payment, CLTV, Draw Period, Repayment & Interest",
  slug: "heloc-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Estimate HELOC borrowing power, CLTV, draw and repayment payments, payment shock, variable-rate scenarios, extra-payment savings, tax estimates and HELOC vs other financing options.",
  iconName: "CreditCard",
  featured: true,
  keywords: [
    "HELOC calculator",
    "HELOC payment calculator",
    "HELOC interest calculator",
    "HELOC draw calculator",
    "HELOC repayment calculator",
    "HELOC CLTV calculator",
    "HELOC payment shock calculator",
    "HELOC variable rate calculator",
    "HELOC vs home equity loan calculator",
    "HELOC vs cash-out refinance calculator",
    "HELOC tax deduction calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "home-equity-loan-calculator",
    "mortgage-calculator",
    "refinance-calculator",
    "dti-calculator",
    "house-affordability-calculator",
    "debt-payoff-calculator",
    "amortization-calculator",
  ],
  formulaDescription:
    "Max Credit Line = Home Value × CLTV Limit - 1st Mortgage. Draw Phase Payment = Balance × (Rate / 12). Repayment Phase Payment = Fixed Amortizing P&I.",
  faqs: helocFaqs,
  inputs: [
    {
      name: "homeValue",
      label: "Estimated Home Market Value",
      type: "number",
      defaultValue: 500000,
    },
    {
      name: "currentMortgageBalance",
      label: "Existing 1st Mortgage Balance",
      type: "number",
      defaultValue: 260000,
    },
    {
      name: "creditLineAmount",
      label: "Credit Line Amount / Drawn Balance",
      type: "number",
      defaultValue: 50000,
    },
    {
      name: "interestRate",
      label: "Initial Variable Interest Rate (%)",
      type: "number",
      defaultValue: 8.0,
    },
  ],
  outputs: [
    {
      name: "drawPeriodMonthlyPayment",
      label: "Draw Period Payment (Interest-Only)",
      format: "currency",
      highlight: true,
    },
    {
      name: "repaymentPeriodMonthlyPayment",
      label: "Repayment Period Payment (Amortizing P&I)",
      format: "currency",
    },
    {
      name: "maxBorrowableCreditLine",
      label: "Maximum Borrowable Line",
      format: "currency",
    },
    {
      name: "paymentShockDollarIncrease",
      label: "Payment Shock Increase",
      format: "text",
    },
    {
      name: "totalInterestPaid",
      label: "Total Interest Paid",
      format: "currency",
    },
  ],
  calculate: calculateHelocCalculator,
  CustomComponent: HELOCCalculator,
  ContentComponent: HELOCContent,
};

export default helocConfig;
