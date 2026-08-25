import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardCd } from "./calculator";
import { cdFaqs } from "./faq";
import { CdCalculator } from "@/components/calculator/cd/CdCalculator";
import { CdContent } from "@/components/calculator/cd/CdContent";

export const cdConfig: CalculatorModuleDefinition = {
  id: "cd-calculator",
  title: "CD Calculator — Maturity Value, Interest, APY, Tax & CD Ladder",
  slug: "cd-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate CD maturity value, interest, APY, after-tax growth, inflation-adjusted value, early-withdrawal penalties, CD ladder results and CD vs HYSA comparisons.",
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
    "CD calculator",
    "certificate of deposit calculator",
    "CD interest calculator",
    "CD maturity calculator",
    "CD APY calculator",
    "CD earnings calculator",
    "CD growth calculator",
    "CD ladder calculator",
    "CD early withdrawal penalty calculator",
    "CD vs HYSA calculator",
    "CD tax calculator",
    "CD break-even calculator",
    "CD goal calculator",
    "CD rate comparison calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "savings-calculator",
    "interest-rate-calculator",
    "future-value-calculator",
    "inflation-calculator",
    "fd-calculator",
    "investment-calculator",
    "roi-calculator",
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
