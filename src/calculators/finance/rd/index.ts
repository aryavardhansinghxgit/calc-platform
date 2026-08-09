import { CalculatorModuleDefinition } from "../../types";
import { calculateRdFormula } from "@/lib/calculator-engine/formulas/rd";

export const RD_CALCULATOR: CalculatorModuleDefinition = {
  id: "rd",
  title: "RD Calculator — Recurring Deposit Interest & Maturity Planner",
  slug: "rd-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate guaranteed Recurring Deposit (RD) total maturity value, quarterly compounding interest, step-up deposit growth, senior citizen rate bonuses, and TDS tax deductions.",
  iconName: "RefreshCw",
  featured: true,
  tags: [
    "rd calculator",
    "recurring deposit calculator",
    "monthly deposit calculator",
    "bank rd calculator",
    "post office rd calculator",
    "senior citizen rd",
    "step up rd calculator",
    "tds rd calculator",
    "guaranteed savings",
  ],
  formulaDescription: "A = \\sum P \\times (1 + r/4)^{4 \\times \\text{rem}/12}",
  inputs: [
    {
      name: "monthlyDeposit",
      label: "Monthly Deposit Amount",
      type: "currency",
      defaultValue: 500,
      unit: "$",
      min: 50,
      max: 50000,
      step: 50,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 6.8,
      unit: "%",
      min: 1,
      max: 20,
      step: 0.1,
    },
    {
      name: "tenureMonths",
      label: "Tenure (Months)",
      type: "slider",
      defaultValue: 24,
      unit: "months",
      min: 6,
      max: 120,
      step: 6,
    },
  ],
  outputs: [
    {
      name: "maturityAmount",
      label: "Total Maturity Amount",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInvested",
      label: "Total Invested Capital",
      format: "currency",
    },
    {
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
      highlight: true,
    },
  ],
  faqs: [
    {
      question: "What is a Recurring Deposit (RD)?",
      answer: "A Recurring Deposit (RD) is a guaranteed investment scheme offered by commercial banks and post offices that allows individuals to deposit a fixed sum of money each month over a set tenure, earning high compound interest.",
    },
    {
      question: "How is Recurring Deposit maturity calculated?",
      answer: "Bank RDs compound interest on a quarterly basis. Each monthly deposit earns interest for its remaining tenure: A = Σ [ P × (1 + R/400)^(4 × (N - k + 1) / 12) ], where P is monthly deposit, R is annual rate, N is total months, and k is the installment number.",
    },
    {
      question: "What is the difference between an RD, FD, and SIP?",
      answer: "An RD involves fixed monthly deposits with guaranteed interest. An FD involves a single upfront lump sum with guaranteed interest. A SIP involves fixed monthly deposits into mutual funds with variable, market-linked equity returns.",
    },
    {
      question: "What interest rate bonus do Senior Citizens get on RDs?",
      answer: "Most commercial banks grant senior citizens (age 60+) an extra interest rate premium of +0.50% to +0.75% per annum over standard published RD rates.",
    },
    {
      question: "Is TDS applicable on Recurring Deposit interest?",
      answer: "Yes, under Section 194A, banks deduct 10% TDS if total annual interest across RD/FD deposits exceeds statutory limits ($500 / ₹40,000 for regular investors; ₹50,000 for senior citizens). If PAN is not provided, 20% TDS applies.",
    },
    {
      question: "How can I avoid TDS deduction on my RD interest?",
      answer: "Submit Form 15G (for individuals under 60) or Form 15H (for senior citizens) at the beginning of the financial year if your total taxable income is below the statutory basic exemption limit.",
    },
    {
      question: "What is a Step-Up RD?",
      answer: "A Step-Up RD automatically increases your monthly installment contribution by a fixed percentage (e.g. 10%) each year as your income grows, accelerating your guaranteed wealth accumulation.",
    },
    {
      question: "What happens if I miss an RD monthly installment payment?",
      answer: "If you default on an RD installment, banks charge a small penalty fee (typically ₹1.50 per ₹100 per month) and reduce total accrued interest earnings.",
    },
    {
      question: "Can I close my Recurring Deposit prematurely?",
      answer: "Yes, commercial banks permit premature closure, but an interest rate penalty of 0.5% to 1.0% is levied below the rate applicable for the actual tenure completed.",
    },
    {
      question: "What is the minimum and maximum tenure for a bank RD?",
      answer: "Recurring Deposit tenures range from a minimum of 6 months up to a maximum of 10 years (120 months) in 3-month or 6-month increments.",
    },
    {
      question: "How does inflation impact my RD maturity corpus?",
      answer: "Inflation reduces the real purchasing power of money over time. An RD yielding 7% interest in a 4% inflation environment provides a real pre-tax return of approximately 3%.",
    },
    {
      question: "Can I partial-withdraw money from an RD account?",
      answer: "Generally, partial withdrawals are not allowed on bank RDs. However, some banks offer loan or overdraft facilities up to 90% of the accumulated RD balance.",
    },
    {
      question: "What is Post Office RD and how does it compare to Bank RD?",
      answer: "Post Office RDs are 5-year government-backed schemes offering sovereign safety and competitive quarterly compounded rates, backed directly by the Ministry of Finance.",
    },
    {
      question: "How does the Goal Seeker feature work in this RD Calculator?",
      answer: "Goal Seeker calculates the exact monthly deposit required to achieve a desired target maturity corpus (e.g., $15,000 for a car down payment or vacation fund).",
    },
    {
      question: "How is RD interest taxed under income tax laws?",
      answer: "RD interest income is added to your total annual income and taxed as per your applicable marginal tax slab under 'Income from Other Sources'.",
    },
    {
      question: "Why should I use a Recurring Deposit for emergency funds?",
      answer: "RDs combine guaranteed principal safety, steady capital accumulation, and predictable liquidity, making them ideal low-risk emergency reserves.",
    },
    {
      question: "What is the Bank Rate Matrix feature in this calculator?",
      answer: "The Bank Rate Matrix benchmarks your monthly deposit across top commercial banks (SBI, Post Office, HDFC, ICICI, Axis, PNB) to highlight the best rate offers.",
    },
    {
      question: "Does RD interest compound monthly or quarterly?",
      answer: "Commercial bank and post office RDs compound interest on a quarterly basis (every 3 months), which yields slightly higher returns than annual simple interest.",
    },
    {
      question: "What is the minimum monthly deposit to start an RD?",
      answer: "Most banks allow investors to open an RD account with as little as $10 or ₹100 per month.",
    },
    {
      question: "Can I download an Excel or PDF report of my RD schedule?",
      answer: "Yes, CalcPlatform's RD Calculator allows instant exports of audit PDF reports, CSV, Excel schedule tables, and raw JSON data.",
    },
  ],
  calculate: (inputs) => {
    const res = calculateRdFormula({
      monthlyDeposit: Number(inputs.monthlyDeposit || 500),
      interestRate: Number(inputs.interestRate || 6.8),
      tenureMonths: Number(inputs.tenureMonths || 24),
    });
    return {
      maturityAmount: res.maturityAmount,
      totalInvested: res.totalInvested,
      totalInterestEarned: res.totalInterestEarned,
    };
  },
};

export default RD_CALCULATOR;
