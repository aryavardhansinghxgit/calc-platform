import { CalculatorModuleDefinition } from "../../types";

export const FOUR_OH_ONE_K_CALCULATOR: CalculatorModuleDefinition = {
  id: "401k",
  title: "401(k) Calculator",
  slug: "401k-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description: "Calculate your 401(k) retirement balance growth incorporating salary increases and employer matching contributions.",
  iconName: "Shield",
  featured: true,
  tags: ["401k", "employer match", "retirement plan", "salary contribution"],
  formulaDescription: "Projects annual employee contributions + employer match compounding over career span.",
  faqs: [
    {
      question: "What is employer match in a 401(k)?",
      answer: "Employer match is free money contributed by your employer (e.g. 50% match up to 6% of salary) to incentivize retirement savings.",
    },
  ],
  inputs: [
    { name: "currentSalary", label: "Annual Salary", type: "currency", defaultValue: 75000, unit: "$", min: 10000, max: 1000000, step: 2500 },
    { name: "employeeContributionPercent", label: "Your Contribution Rate", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 50, step: 0.5 },
    { name: "employerMatchPercent", label: "Employer Match (e.g. 50%)", type: "percentage", defaultValue: 50, unit: "%", min: 0, max: 100, step: 5 },
    { name: "employerMatchLimit", label: "Match Cap (% of Salary)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 15, step: 0.5 },
    { name: "currentBalance", label: "Current 401(k) Balance", type: "currency", defaultValue: 25000, unit: "$", min: 0, max: 5000000, step: 2500 },
    { name: "yearsToRetirement", label: "Years Until Retirement", type: "slider", defaultValue: 30, unit: "years", min: 1, max: 45, step: 1 },
    { name: "expectedReturn", label: "Expected Annual Return", type: "percentage", defaultValue: 7.5, unit: "%", min: 1, max: 15, step: 0.5 },
  ],
  outputs: [
    { name: "final401kBalance", label: "Projected 401(k) Balance", format: "currency", highlight: true },
    { name: "totalEmployeeContribution", label: "Total Employee Contribution", format: "currency" },
    { name: "totalEmployerMatch", label: "Total Employer Match Added", format: "currency", highlight: true },
  ],
  calculate: (inputs) => {
    const salary = Number(inputs.currentSalary || 75000);
    const empRate = Number(inputs.employeeContributionPercent || 6) / 100;
    const matchRate = Number(inputs.employerMatchPercent || 50) / 100;
    const matchCap = Number(inputs.employerMatchLimit || 6) / 100;
    const P = Number(inputs.currentBalance || 25000);
    const years = Number(inputs.yearsToRetirement || 30);
    const r = Number(inputs.expectedReturn || 7.5) / 100;

    const empAnnual = salary * empRate;
    const matchableSalary = Math.min(empRate, matchCap);
    const matchAnnual = salary * matchableSalary * matchRate;
    const totalAnnualContribution = empAnnual + matchAnnual;

    const fvPrincipal = P * Math.pow(1 + r, years);
    const fvAnnuity = totalAnnualContribution * ((Math.pow(1 + r, years) - 1) / r);
    const finalBalance = fvPrincipal + fvAnnuity;

    const totalEmp = empAnnual * years + P;
    const totalMatch = matchAnnual * years;

    return {
      final401kBalance: Number(finalBalance.toFixed(2)),
      totalEmployeeContribution: Number(totalEmp.toFixed(2)),
      totalEmployerMatch: Number(totalMatch.toFixed(2)),
    };
  },
};

export default FOUR_OH_ONE_K_CALCULATOR;
