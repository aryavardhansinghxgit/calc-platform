import { CalculatorModuleDefinition } from "../../types";
import { calculateFdFormula } from "@/lib/calculator-engine/formulas/fd";

export const FD_CALCULATOR: CalculatorModuleDefinition = {
  id: "fd",
  title: "FD Calculator — Fixed Deposit Interest & Maturity Planner",
  slug: "fd-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate guaranteed Fixed Deposit (FD) maturity amounts, compound interest earnings, periodic payout income, senior citizen bonus rates, and TDS tax deductions.",
  iconName: "Landmark",
  featured: true,
  tags: [
    "fd calculator",
    "fixed deposit calculator",
    "bank deposit calculator",
    "term deposit calculator",
    "interest rate calculator",
    "senior citizen fd",
    "fd interest calculator",
    "tds calculator",
    "tax saving fd",
  ],
  formulaDescription: "A = P \\times (1 + r / n)^{n \\times t}",
  inputs: [
    {
      name: "depositAmount",
      label: "Total Principal Deposit",
      type: "currency",
      defaultValue: 10000,
      unit: "$",
      min: 1000,
      max: 1000000,
      step: 1000,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 7.5,
      unit: "%",
      min: 1,
      max: 20,
      step: 0.1,
    },
    {
      name: "tenureYears",
      label: "Tenure (Years)",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 1,
      max: 20,
      step: 1,
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
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
      highlight: true,
    },
    {
      name: "depositAmount",
      label: "Principal Deposit",
      format: "currency",
    },
  ],
  faqs: [
    {
      question: "What is a Fixed Deposit (FD)?",
      answer: "A Fixed Deposit (FD) is a secure, low-risk financial instrument offered by commercial banks and financial institutions that pays a fixed, guaranteed rate of interest for a chosen lock-in period.",
    },
    {
      question: "How is Fixed Deposit maturity calculated?",
      answer: "For cumulative FDs, interest compounds quarterly using the formula: A = P(1 + r/n)^(nt), where P is principal deposit, r is annual interest rate in decimal, n is compounding frequency per year (4 for quarterly), and t is tenure in years.",
    },
    {
      question: "What is the difference between Cumulative and Non-Cumulative FD?",
      answer: "In a Cumulative FD, interest is reinvested continuously and paid out in a single bulk sum upon maturity, maximizing compound growth. In a Non-Cumulative FD, interest is paid out periodically (monthly, quarterly) into your bank account as liquid income.",
    },
    {
      question: "What interest rate bonus do Senior Citizens receive on FDs?",
      answer: "Most commercial banks provide senior citizens (age 60 and above) an extra rate premium of +0.50% to +0.75% per annum over standard published FD rates.",
    },
    {
      question: "What is Tax Deducted at Source (TDS) on bank FDs?",
      answer: "Under Section 194A, banks deduct 10% TDS if your total annual FD interest across branches exceeds statutory thresholds ($500 / ₹40,000 for regular investors; ₹50,000 for senior citizens). If PAN is not provided, 20% TDS is deducted.",
    },
    {
      question: "How can I avoid TDS deduction on FD interest?",
      answer: "If your total taxable income is below the statutory basic exemption limit, you can submit Form 15G (for individuals below 60) or Form 15H (for senior citizens) at the beginning of each financial year to request zero TDS deduction.",
    },
    {
      question: "What is a 5-Year Tax Saving Fixed Deposit?",
      answer: "A Tax Saving FD carries a mandatory 5-year lock-in period and qualifies for tax deductions under Section 80C up to $1,500 / ₹1,50,000 per year. Premature withdrawals are not permitted.",
    },
    {
      question: "Can I break a Fixed Deposit before its maturity date?",
      answer: "Yes, standard FDs permit premature withdrawal, but banks usually penalize the interest rate by 0.5% to 1.0% below the applicable rate for the actual duration the deposit remained with the bank.",
    },
    {
      question: "What is FD Laddering and how does it benefit investors?",
      answer: "FD Laddering involves dividing a single large sum into multiple smaller FDs with staggered maturity dates (e.g. 1-year, 2-year, 3-year, 5-year). This strategy ensures continuous liquidity and allows reinvestment at higher interest rates when rates rise.",
    },
    {
      question: "Is FD interest compounded monthly, quarterly, or annually?",
      answer: "Standard Indian and global commercial bank Fixed Deposits compound interest on a quarterly basis (every 3 months), whereas simple interest applies for tenures under 6 months.",
    },
    {
      question: "How does inflation affect my Fixed Deposit returns?",
      answer: "Inflation erodes real purchasing power. If your FD yields 7% interest and annual inflation averages 4%, your real pre-tax return is approximately 3%. Factor in inflation and taxes to measure true wealth growth.",
    },
    {
      question: "What happens to my FD upon maturity?",
      answer: "You can set auto-renewal (reinvesting principal and interest for the same tenure at prevailing interest rates) or request auto-liquidation into your linked savings account.",
    },
    {
      question: "Can I get a loan against my Fixed Deposit?",
      answer: "Yes, most commercial banks allow you to take an overdraft facility or loan against FD up to 90%–95% of your deposit value at interest rates typically 1% to 2% above the FD rate.",
    },
    {
      question: "Are Corporate FDs different from Bank FDs?",
      answer: "Yes, Corporate FDs are issued by non-banking financial companies (NBFCs) and corporations. They offer higher interest rates than bank FDs but carry higher credit default risk. Always check credit ratings (AAA/AA+).",
    },
    {
      question: "How does the Goal Seeker mode in this calculator work?",
      answer: "Goal Seeker calculates the exact initial principal deposit required today to reach a specific target maturity goal (e.g., $25,000 for college tuition or vacation funding).",
    },
    {
      question: "How does the Bank Rate Comparison matrix help me?",
      answer: "The Bank Rate Matrix benchmarks your deposit amount across major commercial banks (SBI, HDFC, ICICI, Axis, Post Office) to immediately reveal which bank yields the highest maturity payout.",
    },
    {
      question: "Is Fixed Deposit interest subject to wealth tax?",
      answer: "No, FD principal is not subject to wealth tax, but the interest earned is added to your annual gross income and taxed according to your marginal income tax slab.",
    },
    {
      question: "What is the maximum tenure for a bank Fixed Deposit?",
      answer: "Commercial banks typically accept Fixed Deposits for tenures ranging from 7 days minimum up to 10 years maximum.",
    },
    {
      question: "What is an Effective APY (Annual Percentage Yield)?",
      answer: "Effective APY measures the actual annualized return on your deposit when quarterly compounding is taken into account (e.g. a 7.5% nominal rate compounded quarterly yields an effective APY of 7.71%).",
    },
    {
      question: "Can I export my calculation results and schedule?",
      answer: "Yes, CalcPlatform's FD Calculator supports instant downloads of audit PDF reports, CSV, Excel schedule spreadsheets, and raw JSON data.",
    },
  ],
  calculate: (inputs) => {
    const res = calculateFdFormula({
      depositAmount: Number(inputs.depositAmount || 10000),
      interestRate: Number(inputs.interestRate || 7.5),
      tenureYears: Number(inputs.tenureYears || 5),
    });
    return {
      maturityAmount: res.maturityAmount,
      totalInterestEarned: res.totalInterestEarned,
      depositAmount: res.depositAmount,
    };
  },
};

export default FD_CALCULATOR;
