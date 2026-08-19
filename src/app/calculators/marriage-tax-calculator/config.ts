import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateThreeWayComparison } from "./calculator";
import { MarriageTaxCalculator } from "@/components/calculator/marriage-tax/MarriageTaxCalculator";
import { MarriageTaxContent } from "@/components/calculator/marriage-tax/MarriageTaxContent";

export const marriage_tax_calculatorConfig: CalculatorModuleDefinition = {
  id: "marriage-tax-calculator",
  title: "Marriage Tax Calculator — Penalty vs. Bonus Comparison",
  slug: "marriage-tax-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate your marriage tax penalty or bonus. Compare Two Singles vs. Married Filing Jointly (MFJ) vs. Married Filing Separately (MFS) with FICA, SALT cap, and surtax estimations.",
  iconName: "Heart",
  featured: true,
  keywords: [
    "marriage tax calculator",
    "marriage tax penalty calculator",
    "marriage tax bonus calculator",
    "married filing jointly vs separately calculator",
    "marriage penalty vs bonus",
    "do married couples pay more taxes",
    "marriage tax bracket calculator",
    "married tax deductions",
    "salt cap marriage penalty",
  ],
  priority: 1,
  relatedCalculators: [
    "income-tax-calculator",
    "salary-calculator",
    "budget-calculator",
    "take-home-pay-calculator",
    "estate-tax-calculator",
    "capital-gains-tax-calculator",
    "401k-calculator",
  ],
  formulaDescription:
    "Marriage Difference = Combined MFJ Tax - Combined Two Singles Tax (Negative = Bonus, Positive = Penalty)",
  inputs: [
    {
      name: "spouse1Salary",
      label: "Spouse 1 W-2 Salary ($)",
      type: "currency",
      defaultValue: 65000,
      min: 0,
      max: 100000000,
    },
    {
      name: "spouse2Salary",
      label: "Spouse 2 W-2 Salary ($)",
      type: "currency",
      defaultValue: 45000,
      min: 0,
      max: 100000000,
    },
  ],
  outputs: [
    {
      name: "differenceMFJvsSingles",
      label: "Marriage Bonus / Penalty",
      type: "currency",
    },
    {
      name: "mfjTotalTax",
      label: "Married Filing Jointly Tax",
      type: "currency",
    },
    {
      name: "singlesTotalTax",
      label: "Two Singles Combined Tax",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const baseSpouse = {
      salaryW2: 0,
      selfEmployment: 0,
      investmentIncome: 0,
      longTermCapGains: 0,
      otherTaxableIncome: 0,
      preTaxRetirement: 0,
      hsaFsa: 0,
      studentLoanInterest: 0,
      otherAdjustments: 0,
      useItemizedDeduction: false,
      mortgageInterest: 0,
      saltPaid: 0,
      charitableGifts: 0,
      medicalExpenses: 0,
      numChildrenCTC: 0,
      childCareExpenses: 0,
      isSelfEmployed: false,
    };

    const res = calculateThreeWayComparison({
      taxYear: "2025",
      spouse1: { ...baseSpouse, salaryW2: Number(inputs.spouse1Salary) || 65000 },
      spouse2: { ...baseSpouse, salaryW2: Number(inputs.spouse2Salary) || 45000 },
      stateTaxRatePercent: 5.0,
    });

    return {
      differenceMFJvsSingles: `$${res.differenceMFJvsSingles.toLocaleString()}`,
      mfjTotalTax: `$${res.mfj.totalTax.toLocaleString()}`,
      singlesTotalTax: `$${res.twoSinglesCombined.totalTax.toLocaleString()}`,
    };
  },
  CustomComponent: MarriageTaxCalculator,
  ContentComponent: MarriageTaxContent,
};

export default marriage_tax_calculatorConfig;
