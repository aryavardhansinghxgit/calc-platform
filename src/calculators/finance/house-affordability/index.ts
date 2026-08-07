import { CalculatorModuleDefinition } from "../../types";

export const HOUSE_AFFORDABILITY_CALCULATOR: CalculatorModuleDefinition = {
  id: "house-affordability",
  title: "House Affordability Calculator",
  slug: "house-affordability-calculator",
  category: "Finance",
  subcategory: "Mortgage & Home",
  description: "Determine how much house you can afford based on gross income, monthly debts, down payment, and DTI ratios.",
  iconName: "Home",
  featured: true,
  tags: ["house affordability", "how much house can i afford", "dti", "mortgage limit"],
  formulaDescription: "Uses 28/36 Debt-to-Income (DTI) ratio rules to calculate maximum allowable monthly housing payment and home purchase price.",
  faqs: [
    {
      question: "What is the 28/36 DTI rule?",
      answer: "Lenders typically require housing expenses to be under 28% of gross monthly income, and total debt payments under 36%.",
    },
  ],
  inputs: [
    { name: "annualIncome", label: "Annual Gross Income", type: "currency", defaultValue: 100000, unit: "$", min: 10000, max: 2000000, step: 5000 },
    { name: "monthlyDebt", label: "Monthly Debt Payments", type: "currency", defaultValue: 500, unit: "$", min: 0, max: 20000, step: 100 },
    { name: "downPayment", label: "Available Down Payment", type: "currency", defaultValue: 50000, unit: "$", min: 0, max: 1000000, step: 5000 },
    { name: "interestRate", label: "Mortgage Interest Rate", type: "percentage", defaultValue: 6.5, unit: "%", min: 0.1, max: 20, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 30, unit: "years", min: 10, max: 30, step: 5 },
  ],
  outputs: [
    { name: "maxHomePrice", label: "Maximum Home Price", format: "currency", highlight: true },
    { name: "maxMonthlyPayment", label: "Max Monthly Payment", format: "currency" },
    { name: "maxLoanAmount", label: "Max Loan Amount", format: "currency" },
  ],
  calculate: (inputs) => {
    const grossMonthly = Math.max(0, Number(inputs.annualIncome || 100000)) / 12;
    const debt = Math.max(0, Number(inputs.monthlyDebt || 500));
    const down = Math.max(0, Number(inputs.downPayment || 50000));
    const rate = Math.min(100, Math.max(0, Number(inputs.interestRate || 6.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.loanTermYears || 30)) * 12;

    const rule28 = grossMonthly * 0.28;
    const rule36 = Math.max(0, (grossMonthly * 0.36) - debt);

    const maxMonthlyHousing = Math.min(rule28, rule36);
    const maxPmt = maxMonthlyHousing * 0.8;

    let maxLoan = 0;
    if (rate > 0 && n > 0 && rate < 10) {
      const pow = Math.pow(1 + rate, n);
      if (isFinite(pow) && pow > 0) {
        maxLoan = (maxPmt * (pow - 1)) / (rate * pow);
      }
    } else if (n > 0) {
      maxLoan = maxPmt * n;
    }

    const maxHomePrice = maxLoan + down;

    return {
      maxHomePrice: Number((isNaN(maxHomePrice) ? down : maxHomePrice).toFixed(2)),
      maxMonthlyPayment: Number(maxMonthlyHousing.toFixed(2)),
      maxLoanAmount: Number((isNaN(maxLoan) ? 0 : maxLoan).toFixed(2)),
    };
  },
};

export default HOUSE_AFFORDABILITY_CALCULATOR;
