import { CalculatorModuleDefinition } from "../../types";
import { calculateRmd } from "@/lib/calculator-engine/formulas/rmd";
import { RMD_FAQS } from "./faq";

export const RMD_CALCULATOR: CalculatorModuleDefinition = {
  id: "rmd",
  title: "RMD Calculator – Required Minimum Distribution, Tax & QCD Planning",
  slug: "rmd-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Calculate required minimum distributions (RMDs) from IRAs and retirement accounts using IRS life-expectancy factors. Estimate RMD taxes, QCD savings, deadlines and future account balances.",
  iconName: "Shield",
  featured: true,
  tags: [
    "RMD calculator",
    "required minimum distribution calculator",
    "RMD calculation",
    "RMD tax calculator",
    "IRA RMD calculator",
    "RMD table",
    "RMD age",
    "RMD formula",
    "QCD calculator",
    "required minimum distribution 2026",
    "RMD withdrawal calculator",
  ],
  formulaDescription:
    "RMD = Prior Year-End Account Balance / IRS Distribution Period Factor (Uniform Lifetime Table III or Joint Life Table II).",
  faqs: RMD_FAQS,
  inputs: [
    { name: "birthYear", label: "Your Year of Birth", type: "number", defaultValue: 1951, min: 1920, max: 2010, step: 1 },
    { name: "rmdYear", label: "Year of RMD", type: "number", defaultValue: 2026, min: 2020, max: 2075, step: 1 },
    { name: "priorYearBalance", label: "Account Balance as of Dec 31 (Prior Year)", type: "currency", defaultValue: 300000, unit: "$", min: 0, max: 50000000, step: 5000 },
    {
      name: "isSpouseSoleBeneficiary",
      label: "Is Spouse Sole Beneficiary & >10 Yrs Younger?",
      type: "select",
      defaultValue: "no",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    { name: "spouseBirthYear", label: "Spouse Year of Birth", type: "number", defaultValue: 1965, min: 1920, max: 2010, step: 1 },
    { name: "growthRatePercent", label: "Estimated Annual Return (%)", type: "number", defaultValue: 5.0, min: -20, max: 30, step: 0.5 },
  ],
  outputs: [
    { name: "annualRmd", label: "Required Minimum Distribution (RMD)", format: "currency", highlight: true },
    { name: "monthlyRmd", label: "Equivalent Monthly Withdrawal", format: "currency" },
    { name: "distributionPeriod", label: "IRS Distribution Period Factor", format: "number" },
    { name: "taxableRmd", label: "Taxable RMD Amount", format: "currency" },
    { name: "estimatedTaxPaid", label: "Estimated Federal + State Income Tax", format: "currency" },
    { name: "netAfterTaxRmd", label: "Net After-Tax Income", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateRmd({
      birthYear: Number(inputs.birthYear || 1951),
      rmdYear: Number(inputs.rmdYear || 2026),
      priorYearBalance: Number(inputs.priorYearBalance || 300000),
      isSpouseSoleBeneficiary: inputs.isSpouseSoleBeneficiary === "yes" || inputs.isSpouseSoleBeneficiary === true,
      spouseBirthYear: Number(inputs.spouseBirthYear || 1965),
      growthRatePercent: Number(inputs.growthRatePercent || 5.0),
    });

    return {
      annualRmd: res.annualRmd,
      monthlyRmd: res.monthlyRmd,
      distributionPeriod: res.distributionPeriod,
      taxableRmd: res.taxableRmd,
      estimatedTaxPaid: res.estimatedTaxPaid,
      netAfterTaxRmd: res.netAfterTaxRmd,
    };
  },
};

export default RMD_CALCULATOR;
