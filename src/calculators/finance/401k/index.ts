import { CalculatorModuleDefinition } from "../../types";
import { calculate401kGrowth } from "@/lib/calculator-engine/formulas/401k";

export const FOUR_ZERO_ONE_K_CALCULATOR: CalculatorModuleDefinition = {
  id: "401k",
  title: "401(k) Calculator – Wealth & Retirement Suite",
  slug: "401k-calculator",
  category: "Finance",
  subcategory: "Retirement & Investing",
  description:
    "Free 401(k) Calculator. Calculate gross 401(k) retirement balance, purchasing power in today's dollars, employer match maximization, early withdrawal penalty costs, and 2025/2026 IRS contribution caps.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "401k calculator",
    "401k match calculator",
    "401k growth calculator",
    "401k early withdrawal penalty",
    "roth 401k calculator",
    "retirement savings calculator",
  ],
  formulaDescription:
    "Applies annual employee salary deferrals up to IRS caps ($23,500/$24,500), adds employer matching free money, and compounds annual investment growth with purchasing power inflation adjustments.",
  faqs: [
    {
      question: "What is the 2025 and 2026 IRS 401(k) contribution limit?",
      answer:
        "For 2025, the IRS 401(k) employee elective deferral limit is $23,500 ($24,500 for 2026). Individuals aged 50 and older can make an additional catch-up contribution of $7,500.",
    },
    {
      question: "What is an Employer 401(k) Match?",
      answer:
        "An employer match is additional money contributed by your employer based on your contributions (e.g. matching 50% up to 6% of salary).",
    },
  ],
  inputs: [
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 30, unit: "yrs", min: 18, max: 100, step: 1 },
    { name: "currentSalary", label: "Current Annual Salary ($)", type: "currency", defaultValue: 75000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "currentBalance", label: "Current 401(k) Balance ($)", type: "currency", defaultValue: 35000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "contributionPercent", label: "Your Deferral (% salary)", type: "percentage", defaultValue: 10, unit: "%", min: 0, max: 100, step: 1 },
    { name: "employerMatchPercent", label: "Employer Match (%)", type: "percentage", defaultValue: 50, unit: "%", min: 0, max: 100, step: 5 },
    { name: "employerMatchLimitPercent", label: "Match Limit (% salary)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 100, step: 1 },
  ],
  outputs: [
    { name: "balanceAtRetirement", label: "Gross Balance at Retirement", format: "currency", highlight: true },
    { name: "purchasingPowerAtRetirement", label: "Purchasing Power (Today's $)", format: "currency", highlight: true },
    { name: "totalEmployeeContributions", label: "Total Employee Contributions", format: "currency" },
    { name: "totalEmployerMatch", label: "Total Employer Match Free Money", format: "currency" },
    { name: "monthlyWithdrawalFixedPurchasingPower", label: "Monthly Withdrawal Capacity", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculate401kGrowth({
      currentAge: Number(inputs.currentAge || 30),
      currentSalary: Number(inputs.currentSalary || 75000),
      currentBalance: Number(inputs.currentBalance || 35000),
      contributionPercent: Number(inputs.contributionPercent || 10),
      employerMatchPercent: Number(inputs.employerMatchPercent || 50),
      employerMatchLimitPercent: Number(inputs.employerMatchLimitPercent || 6),
      retirementAge: 65,
      lifeExpectancy: 85,
      salaryIncreaseRate: 3,
      investmentReturn: 6,
      inflationRate: 3,
    });

    return {
      balanceAtRetirement: res.balanceAtRetirement,
      purchasingPowerAtRetirement: res.purchasingPowerAtRetirement,
      totalEmployeeContributions: res.totalEmployeeContributions,
      totalEmployerMatch: res.totalEmployerMatch,
      monthlyWithdrawalFixedPurchasingPower: res.monthlyWithdrawalFixedPurchasingPower,
    };
  },
};

export const FOUR_OH_ONE_K_CALCULATOR = FOUR_ZERO_ONE_K_CALCULATOR;
export default FOUR_ZERO_ONE_K_CALCULATOR;
