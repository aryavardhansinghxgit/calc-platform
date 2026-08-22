import { CalculatorModuleDefinition } from "../../types";
import { calculateRetirementMode1 } from "@/lib/calculator-engine/formulas/retirement";

export const RETIREMENT_CALCULATOR: CalculatorModuleDefinition = {
  id: "retirement",
  title: "Retirement Calculator – Nest Egg, Savings Gap & Income Planner",
  slug: "retirement-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Calculate your target retirement nest egg, projected savings gap, monthly withdrawal capacity, and portfolio longevity with a comprehensive retirement planning calculator.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "retirement calculator",
    "retirement savings calculator",
    "retirement planning calculator",
    "how much do I need to retire calculator",
    "retirement income calculator",
    "retirement nest egg calculator",
    "retirement calculator with inflation",
    "retirement calculator with Social Security",
    "retirement withdrawal calculator",
    "retirement savings goal calculator",
    "retirement shortfall calculator",
  ],
  relatedCalculators: [
    "401k-calculator",
    "roth-ira-calculator",
    "traditional-ira-calculator",
    "social-security-calculator",
    "pension-calculator",
    "investment-calculator",
    "annuity-calculator",
  ],
  formulaDescription:
    "Projects pre-tax final salary, applies income replacement ratio (e.g. 75%), offsets inflated other recurring income, and capitalizes required retirement nest egg using Fisher real returns r_real = (1 + r_ret)/(1 + i) - 1.",
  faqs: [
    {
      question: "What is the 4% Rule for retirement withdrawals?",
      answer:
        "Historical research such as the Trinity Study has examined 4% initial withdrawal scenarios over 30-year retirement periods under specific portfolio, market-return, inflation, and rebalancing assumptions. The 4% figure is a historical planning benchmark, not a guarantee of future portfolio survival.",
    },
    {
      question: "How is an income-replacement percentage used in retirement planning?",
      answer:
        "Many retirement-planning frameworks use 70% to 80% of pre-retirement gross income as a starting assumption to account for eliminated work-related expenses, payroll taxes, and ongoing savings contributions. Actual post-retirement spending needs vary substantially depending on lifestyle, debt, housing, and healthcare requirements.",
    },
    {
      question: "Is saving 10% of income enough for retirement?",
      answer:
        "Saving 10%–15% of income is a commonly cited planning rule of thumb, but an appropriate savings rate depends on retirement age, current assets, income growth, expected investment returns, employer matching benefits, and personal spending targets.",
    },
    {
      question: "How does inflation impact my retirement savings?",
      answer:
        "Inflation erodes purchasing power over time. Under an illustrative 3% annual inflation rate over 32 years, prices double roughly every 24 years, meaning $1,000,000 at age 67 will purchase what approximately $500,000 purchases today in real terms.",
    },
    {
      question: "What is the difference between a Traditional IRA and a Roth IRA?",
      answer:
        "Traditional IRAs allow tax-deductible contributions today, with withdrawals in retirement taxed as ordinary income. Roth IRAs are funded with after-tax dollars today, and qualified distributions of contributions and earnings (after meeting the 5-year holding period and reaching age 59½) are tax-free.",
    },
    {
      question: "How does an employer 401(k) match work?",
      answer:
        "Employer matching contributions provide an immediate benefit on matched employee contributions, depending on the plan's specific matching formula, annual contribution limits, and vesting schedule.",
    },
    {
      question: "What is Full Retirement Age (FRA) for Social Security?",
      answer:
        "In the United States, Full Retirement Age (FRA) is between age 66 and 67 depending on birth year. Claiming before Full Retirement Age permanently reduces the monthly benefit; the exact reduction depends on your birth year and claiming age, while delaying claiming to age 70 increases monthly benefits through delayed retirement credits.",
    },
    {
      question: "What is a Defined Benefit Pension vs. a Defined Contribution Plan?",
      answer:
        "A defined benefit pension provides a predetermined monthly benefit formula paid by an employer based on salary and service years. A defined contribution plan (like a 401k or 403b) depends on employee and employer contributions and market investment performance.",
    },
    {
      question: "What is an Immediate Annuity vs. a Deferred Annuity?",
      answer:
        "An immediate annuity converts a lump-sum premium into ongoing monthly income payments starting immediately. A deferred annuity accumulates investment growth on a tax-deferred basis until an agreed future distribution date.",
    },
    {
      question: "Should I count Social Security when calculating my nest egg?",
      answer:
        "You can include an estimated Social Security benefit as other retirement income in the model. Social Security benefits generally receive annual cost-of-living adjustments, but actual benefit amounts depend on earnings history, claiming age, and applicable rules.",
    },
    {
      question: "How does the retirement savings gap affect my required monthly contributions?",
      answer:
        "A retirement savings gap indicates that your projected accumulation falls short of your capitalized target nest egg. To eliminate the gap, you can increase your monthly contributions, extend your planned retirement age, or adjust your expected post-retirement living expenses.",
    },
    {
      question: "What is Sequence of Returns Risk?",
      answer:
        "Sequence of returns risk occurs when poor market returns happen in the years immediately before or early in retirement, accelerating portfolio depletion if fixed withdrawals continue during market downturns.",
    },
    {
      question: "What is the FIRE Movement (Financial Independence, Retire Early)?",
      answer:
        "FIRE practitioners target high annual savings rates (often 50% or more) to accumulate approximately 25 times their annual living expenses, aiming to achieve financial independence before traditional retirement ages.",
    },
    {
      question: "How does asset allocation change as you approach retirement?",
      answer:
        "Investors frequently adjust asset allocation from aggressive equity growth during early working years toward more conservative allocations (incorporating fixed income and cash reserves) near retirement to reduce portfolio volatility.",
    },
    {
      question: "What is a Required Minimum Distribution (RMD)?",
      answer:
        "Under federal tax law (SECURE 2.0), traditional 401(k) and traditional IRA owners must begin taking mandatory annual taxable withdrawals (RMDs) starting at age 73 (increasing to age 75 in 2033).",
    },
    {
      question: "Can I withdraw from my 401(k) or IRA without penalty before age 59½?",
      answer:
        "Early distributions before age 59½ may be subject to income tax and a 10% additional federal tax, although numerous account-specific exceptions exist. The applicable exceptions differ between IRAs and employer plans.",
    },
    {
      question: "How much healthcare expense should I plan for in retirement?",
      answer:
        "Healthcare can represent a substantial retirement expense, including Medicare premiums, supplemental coverage, prescriptions, and out-of-pocket costs. Actual costs vary by health status, coverage, location, and longevity.",
    },
    {
      question: "What is a Health Savings Account (HSA) for retirement?",
      answer:
        "HSAs offer triple-tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. After age 65, nonmedical distributions are subject to ordinary income tax without the 20% penalty.",
    },
    {
      question: "What is the Catch-up Contribution limit?",
      answer:
        "Catch-up contribution limits vary by account type and age and are adjusted under federal law. For current contribution limits, see the applicable 401(k), IRA, or other retirement-plan rules.",
    },
    {
      question: "Why use an online Retirement Calculator?",
      answer:
        "An online retirement calculator projects compounding wealth growth, models inflation and salary progression, evaluates post-retirement withdrawal capacities, and illustrates accumulation schedules for financial planning.",
    },
  ],
  inputs: [
    { name: "currentAge", label: "Current Age", type: "number", defaultValue: 35, unit: "yrs", min: 18, max: 100, step: 1 },
    { name: "retirementAge", label: "Planned Retirement Age", type: "number", defaultValue: 67, unit: "yrs", min: 19, max: 100, step: 1 },
    { name: "currentIncome", label: "Current Pre-Tax Income ($/yr)", type: "currency", defaultValue: 70000, unit: "$", min: 0, max: 10000000, step: 5000 },
    { name: "investmentReturn", label: "Average Investment Return (%/yr)", type: "percentage", defaultValue: 6, unit: "%", min: 0, max: 20, step: 0.5 },
    { name: "inflationRate", label: "Inflation Rate (%/yr)", type: "percentage", defaultValue: 3, unit: "%", min: 0, max: 20, step: 0.5 },
  ],
  outputs: [
    { name: "targetNestEggAtRetirement", label: "Target Nest Egg Needed", format: "currency", highlight: true },
    { name: "projectedSavingsAtRetirement", label: "Projected Savings", format: "currency" },
    { name: "savingsGapOrSurplus", label: "Savings Gap / Surplus", format: "currency", highlight: true },
    { name: "monthlyIncomeNeededAtRetirement", label: "Monthly Income Needed", format: "currency" },
    { name: "fourPercentRuleAnnualIncome", label: "4% Benchmark Annual Payout", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateRetirementMode1({
      currentAge: Number(inputs.currentAge ?? 35),
      retirementAge: Number(inputs.retirementAge ?? 67),
      lifeExpectancy: 85,
      currentIncome: Number(inputs.currentIncome ?? 70000),
      incomeIncreaseRate: 3,
      incomeReplacementPercent: 75,
      investmentReturn: Number(inputs.investmentReturn ?? 6),
      inflationRate: Number(inputs.inflationRate ?? 3),
      currentSavings: 30000,
      futureSavingsPercent: 10,
    });

    return {
      targetNestEggAtRetirement: res.targetNestEggAtRetirement,
      projectedSavingsAtRetirement: res.projectedSavingsAtRetirement,
      savingsGapOrSurplus: res.savingsGapOrSurplus,
      monthlyIncomeNeededAtRetirement: res.monthlyIncomeNeededAtRetirement,
      fourPercentRuleAnnualIncome: res.fourPercentRuleAnnualIncome,
    };
  },
};

export default RETIREMENT_CALCULATOR;
