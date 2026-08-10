import { CalculatorModuleDefinition } from "../../types";
import { calculateRmd } from "@/lib/calculator-engine/formulas/rmd";

export const RMD_CALCULATOR: CalculatorModuleDefinition = {
  id: "rmd",
  title: "RMD Calculator – IRS Required Minimum Distribution Estimator",
  slug: "rmd-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Calculate IRS Required Minimum Distributions (RMD) from Traditional IRAs, 401(k)s, and 403(b)s. Updated for SECURE Act 2.0 starting ages (73 & 75) with Pub 590-B tables, QCD tax savings, penalty calculators, and lifetime projection schedules.",
  iconName: "Shield",
  featured: true,
  tags: [
    "rmd",
    "required minimum distribution",
    "ira distribution",
    "irs rmd",
    "secure act 2.0",
    "qcd calculator",
    "publication 590-b",
    "401k rmd",
  ],
  formulaDescription:
    "RMD = Prior Year-End Account Balance / IRS Distribution Period Factor (Uniform Lifetime Table III or Joint Life Table II).",
  faqs: [
    {
      question: "What is a Required Minimum Distribution (RMD)?",
      answer:
        "A Required Minimum Distribution (RMD) is the mandatory annual withdrawal that account owners must make from tax-deferred retirement accounts—such as Traditional IRAs, 401(k)s, 403(b)s, and SEP IRAs—once reaching the IRS mandated starting age (age 73 under SECURE Act 2.0).",
    },
    {
      question: "What age do RMDs start under SECURE Act 2.0?",
      answer:
        "Under SECURE Act 2.0, if you turn 72 in 2023 or later, your RMD starting age is 73. If you were born in 1960 or later, your RMD starting age increases to 75 (effective 2033).",
    },
  ],
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
