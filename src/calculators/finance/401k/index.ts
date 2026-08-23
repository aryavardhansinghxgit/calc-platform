import { CalculatorModuleDefinition } from "../../types";
import { calculate401kGrowth } from "@/lib/calculator-engine/formulas/401k";
import { four_zero_one_kFaqs } from "./faq";
import { FourZeroOneKCalculator } from "@/components/calculator/401k/FourZeroOneKCalculator";
import { FourZeroOneKContent } from "@/components/calculator/401k/FourZeroOneKContent";

export const FOUR_ZERO_ONE_K_CALCULATOR: CalculatorModuleDefinition = {
  id: "401k",
  title: "401(k) Calculator - Retirement Growth, Employer Match & Withdrawal",
  slug: "401k-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Estimate 401(k) growth with salary increases, employee contributions, employer matching, inflation-adjusted purchasing power and early-withdrawal scenarios.",
  iconName: "TrendingUp",
  featured: true,
  CustomComponent: FourZeroOneKCalculator,
  ContentComponent: FourZeroOneKContent,
  tags: [
    "401k calculator",
    "401(k) retirement calculator",
    "401k contribution calculator",
    "401k employer match calculator",
    "401k savings calculator",
    "401k growth calculator",
    "401k retirement savings calculator",
    "401k calculator with employer match",
    "401k early withdrawal calculator",
    "401k withdrawal calculator",
    "Roth 401(k) calculator",
    "traditional 401(k) calculator",
    "401k contribution limits",
    "401k catch-up contribution",
    "retirement balance calculator",
  ],
  formulaDescription:
    "Applies annual employee salary deferrals up to 2026 IRS caps ($24,500 base, $8,000 age-50+ catch-up), adds employer matching contributions, and compounds annual investment growth with purchasing power inflation adjustments.",
  relatedCalculators: [
    "retirement-calculator",
    "investment-calculator",
    "savings-calculator",
    "ira-calculator",
    "future-value-calculator",
    "compound-interest-calculator",
    "inflation-calculator",
  ],
  faqs: four_zero_one_kFaqs,
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
    { name: "totalEmployerMatch", label: "Total Employer Match", format: "currency" },
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
