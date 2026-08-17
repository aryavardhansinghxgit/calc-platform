import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardCd } from "./calculator";
import { cdFaqs } from "./faq";
import { CdCalculator } from "@/components/calculator/cd/CdCalculator";
import { CdContent } from "@/components/calculator/cd/CdContent";

export const cdConfig: CalculatorModuleDefinition = {
  id: "cd-calculator",
  title: "CD Calculator — Certificate of Deposit Interest & APY Growth",
  slug: "cd-calculator",
  category: "Finance",
  subcategory: "Savings",
  description:
    "Free CD Calculator. Calculate Certificate of Deposit interest returns, effective APY, tax drag, inflation purchasing power, CD ladder strategies, early withdrawal penalties, and CD vs HYSA comparisons.",
  iconName: "PiggyBank",
  featured: true,
  tags: [
    "cd",
    "cd calculator",
    "certificate of deposit",
    "cd interest",
    "cd apy",
    "cd ladder",
    "early withdrawal penalty",
    "cd vs hysa",
  ],
  keywords: [
    "CD Calculator",
    "Certificate of Deposit Calculator",
    "CD Interest Calculator",
    "CD APY Calculator",
    "CD Ladder Calculator",
    "CD Early Withdrawal Penalty Calculator",
    "Best CD Rates Calculator",
    "CD vs High Yield Savings Calculator",
    "Compound Interest CD Calculator",
    "Certificate of Deposit Return Calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "savings-calculator",
    "compound-interest-calculator",
    "interest-calculator",
    "interest-rate-calculator",
    "fd-calculator",
  ],
  formulaDescription:
    "Compound Interest: A = P*(1 + r/n)^(n*t). APY Conversion: r = n*[(1+APY)^(1/n) - 1]. Real Value: Real = AfterTax / (1+Inflation)^t.",
  faqs: cdFaqs,
  inputs: [
    {
      name: "startingDeposit",
      label: "Starting Deposit ($)",
      type: "number",
      defaultValue: 10000,
    },
    {
      name: "termMonths",
      label: "CD Term Length (Months)",
      type: "number",
      defaultValue: 12,
    },
    {
      name: "rateValue",
      label: "Interest Rate / APY (%)",
      type: "number",
      defaultValue: 5.0,
    },
    {
      name: "marginalTaxRate",
      label: "Marginal Tax Rate (%)",
      type: "number",
      defaultValue: 24,
    },
  ],
  outputs: [
    {
      name: "finalBalance",
      label: "Final Balance at Maturity",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterestPreTax",
      label: "Pre-Tax Interest Earned",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterestAfterTax",
      label: "Net After-Tax Interest",
      format: "currency",
    },
  ],
  calculate: calculateStandardCd as any,
  CustomComponent: CdCalculator,
  ContentComponent: CdContent,
};

export default cdConfig;
