import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHelocCalculator } from "./calculator";
import { helocFaqs } from "./faq";
import { HELOCCalculator } from "@/components/calculator/heloc/HELOCCalculator";
import { HELOCContent } from "@/components/calculator/heloc/HELOCContent";

export const helocConfig: CalculatorModuleDefinition = {
  id: "heloc-calculator",
  title: "HELOC Calculator — Home Equity Line of Credit Payments & Draw Limits",
  slug: "heloc-calculator",
  category: "Finance",
  subcategory: "Mortgage and Real Estate",
  description:
    "Free HELOC & Revolving Credit Planning Suite. Calculate 2-phase monthly payments (interest-only draw vs amortizing repayment), payment shock jump, maximum CLTV credit limits, variable rate stress testing, and IRS tax rules.",
  iconName: "CreditCard",
  featured: true,
  keywords: [
    "HELOC Calculator",
    "Home Equity Line of Credit Calculator",
    "HELOC Payment Calculator",
    "HELOC Draw Period Calculator",
    "HELOC Repayment Calculator",
    "HELOC Payment Shock Calculator",
    "HELOC vs Home Equity Loan Calculator",
    "Calculate Max HELOC Amount",
    "HELOC Variable Interest Rate Calculator",
    "HELOC Amortization Schedule"
  ],
  priority: 1,
  relatedCalculators: [
    "home-equity-loan-calculator",
    "mortgage-calculator",
    "refinance-calculator",
    "dti-calculator",
    "house-affordability-calculator"
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
