import { CalculatorModuleDefinition } from "../../types";
import { calculateSipFormula } from "@/lib/calculator-engine/formulas/sip";
import { SipContent } from "@/components/calculator/sip/SipContent";

export const SIP_CALCULATOR: CalculatorModuleDefinition = {
  id: "sip",
  title: "SIP Calculator – Monthly Investment Growth Calculator",
  slug: "sip-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate future wealth from monthly recurring investments (SIP). Model Step-Up contributions, inflation purchasing power, tax drag, and SIP vs Lumpsum growth.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "sip calculator",
    "recurring investment calculator",
    "monthly investment calculator",
    "step up sip calculator",
    "investment growth calculator",
    "future value of monthly investments",
    "dollar cost averaging calculator",
    "mutual fund calculator",
  ],
  formulaDescription: "M = P × [((1 + i)^n − 1) / i] × (1 + i)",
  ContentComponent: SipContent,
  inputs: [
    {
      name: "monthlyInvestment",
      label: "Monthly Investment (SIP)",
      type: "currency",
      defaultValue: 500,
      unit: "$",
      min: 50,
      max: 50000,
      step: 50,
    },
    {
      name: "expectedReturnRate",
      label: "Expected Return Rate (p.a.)",
      type: "percentage",
      defaultValue: 12,
      unit: "%",
      min: 1,
      max: 30,
      step: 0.5,
    },
    {
      name: "timePeriodYears",
      label: "Time Period",
      type: "slider",
      defaultValue: 10,
      unit: "years",
      min: 1,
      max: 40,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "totalMaturityValue",
      label: "Total Maturity Value",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInvested",
      label: "Total Invested Capital",
      format: "currency",
    },
    {
      name: "estimatedReturns",
      label: "Estimated Returns",
      format: "currency",
      highlight: true,
    },
  ],
  faqs: [
    {
      question: "What is a Systematic Investment Plan (SIP)?",
      answer:
        "A Systematic Investment Plan (SIP) is a recurring-investment approach in which a fixed amount is contributed at regular periodic intervals (typically monthly). This calculator models the mathematical compound growth of those recurring contributions under a selected return assumption.",
    },
    {
      question: "What is the difference between a SIP and a recurring monthly investment?",
      answer:
        "For the recurring-contribution model used by this calculator, the underlying compounding mathematics is identical. 'SIP' is standard terminology internationally (particularly in India and the UK), while US financial institutions and investors typically use 'recurring investment,' 'monthly contribution,' or 'automated dollar-cost averaging.' Actual commercial investment products can differ in fees, taxes, custody, and transaction mechanics.",
    },
    {
      question: "How does the SIP return calculator work mathematically?",
      answer:
        "The calculator evaluates the compounding formula for an Annuity Due: M = P × [((1+i)^n - 1) / i] × (1+i), where P is the monthly contribution, i is the monthly periodic return rate (Annual Return / 12 / 100), and n is the total number of monthly compounding periods.",
    },
    {
      question: "Why does the calculator use beginning-of-period (Annuity Due) timing?",
      answer:
        "In automated recurring investment schedules, contributions are credited at the beginning of each monthly cycle, allowing that month's deposit to earn a full month of compound returns during the period.",
    },
    {
      question: "What is a Step-Up (Top-Up) SIP and how does it work?",
      answer:
        "A Step-Up SIP increases your monthly contribution by a specified percentage (e.g., 10%) or fixed dollar amount once per year, aligning investment growth with career earnings and salary raises.",
    },
    {
      question: "How does inflation affect projected investment wealth?",
      answer:
        "Inflation reduces the future purchasing power of money. The calculator computes real purchasing power using exponential discounting: Real Value = Nominal Value / (1 + Inflation Rate)^Years.",
    },
    {
      question: "How is capital gains tax modeled in this calculator?",
      answer:
        "The calculator applies a simplified percentage deduction against estimated capital gains (excluding original principal contributions). It serves as an illustrative model rather than an official multi-bracket tax filing engine.",
    },
    {
      question: "Are investment returns in a SIP guaranteed?",
      answer:
        "No. Market investments are subject to price volatility and capital risk. The return rate entered into the calculator is a hypothetical modeling assumption, not a guaranteed return forecast.",
    },
    {
      question: "How does recurring monthly investing compare to lump-sum investing?",
      answer:
        "Lump-sum investing deploys all capital upfront, gaining maximum compounding duration if markets rise immediately. Recurring monthly investing spreads capital deployment across time, mitigating point-in-time market peak risk.",
    },
    {
      question: "How does the Goal Seeker feature calculate required monthly savings?",
      answer:
        "Goal Seeker inverts the compounding annuity-due formula to solve for the monthly contribution needed to reach a target financial goal under your chosen time horizon and return assumptions.",
    },
  ],
  calculate: (inputs) => {
    const res = calculateSipFormula({
      monthlyInvestment: Number(inputs.monthlyInvestment || 500),
      expectedReturnRate: Number(inputs.expectedReturnRate || 12),
      timePeriodYears: Number(inputs.timePeriodYears || 10),
    });
    return {
      totalMaturityValue: res.totalMaturityValue,
      totalInvested: res.totalInvested,
      estimatedReturns: res.estimatedReturns,
    };
  },
};

export default SIP_CALCULATOR;
