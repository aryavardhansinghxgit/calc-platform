import { CalculatorModuleDefinition } from "../../types";
import { calculateSipFormula } from "@/lib/calculator-engine/formulas/sip";

export const SIP_CALCULATOR: CalculatorModuleDefinition = {
  id: "sip",
  title: "SIP Calculator — Systematic Investment Plan & Mutual Fund Returns",
  slug: "sip-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate expected mutual fund returns, SIP wealth accumulation, step-up growth, lumpsum compounding, inflation purchasing power, and target financial goal seeking.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "sip calculator",
    "mutual fund calculator",
    "systematic investment plan",
    "lumpsum calculator",
    "step up sip calculator",
    "wealth growth",
    "compound interest",
    "financial planning",
    "sip returns",
  ],
  formulaDescription: "M = P \\times \\left[ \\frac{(1 + i)^n - 1}{i} \\right] \\times (1 + i)",
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
      answer: "A Systematic Investment Plan (SIP) is an investment vehicle offered by mutual funds that allows individuals to invest a fixed sum of money periodically (monthly, quarterly) into a chosen fund, instilling financial discipline and benefiting from rupee-cost averaging.",
    },
    {
      question: "How does the SIP return calculator work?",
      answer: "The SIP calculator uses compound interest formula for annuity due: M = P × [((1+i)^n - 1) / i] × (1+i), where P is monthly deposit, i is monthly interest rate (annual return / 12), and n is total number of monthly payments.",
    },
    {
      question: "What is the difference between SIP and Lumpsum investment?",
      answer: "A SIP involves making small, regular recurring investments over time, reducing market timing risk through cost averaging. A Lumpsum investment involves committing a large single sum upfront, which gains maximum compounding if timed near market bottoms.",
    },
    {
      question: "What is Step-Up (Top-Up) SIP and why is it beneficial?",
      answer: "A Step-Up SIP automatically increases your monthly investment contribution by a set percentage (e.g., 10%) every year as your salary increases. Step-Up SIPs can more than double your final maturity corpus compared to a flat SIP.",
    },
    {
      question: "Can I alter or pause my monthly SIP amount at any time?",
      answer: "Yes, mutual fund SIPs offer complete liquidity and operational flexibility. You can pause, increase, decrease, or terminate your SIP without incurring penalties from the fund house.",
    },
    {
      question: "Is SIP investment guaranteed to generate positive returns?",
      answer: "No, mutual fund investments are subject to market risks and underlying equity/debt price movements. However, long-term equity SIPs (over 7-10+ years) historically deliver attractive inflation-beating compound growth.",
    },
    {
      question: "How are mutual fund SIP returns taxed?",
      answer: "Equity mutual fund gains held for over 12 months are classified as Long-Term Capital Gains (LTCG) and taxed at concessional rates (typically 10-12.5%). Short-term gains (under 12 months) are taxed as STCG (typically 15-20%). Each SIP installment carries its own 12-month holding clock.",
    },
    {
      question: "What is Rupee-Cost / Dollar-Cost Averaging?",
      answer: "Dollar-cost averaging occurs automatically in a SIP when your fixed monthly deposit purchases more fund units when market prices drop and fewer units when prices rise, lowering your average cost per unit over time.",
    },
    {
      question: "What is an ideal return rate assumption for equity SIP calculations?",
      answer: "Financial planners typically recommend assuming conservative long-term equity returns between 10% and 14% p.a., debt fund returns between 6% and 8% p.a., and hybrid funds around 9% to 11% p.a.",
    },
    {
      question: "How does inflation impact my final SIP maturity value?",
      answer: "Inflation reduces real purchasing power over time. A nominal $500,000 maturity value achieved after 20 years at 4% annual inflation has an effective purchasing power of approximately $228,193 in today's money.",
    },
    {
      question: "What is the minimum amount required to start a mutual fund SIP?",
      answer: "Most mutual fund schemes allow investors to initiate SIPs with as little as $10 or ₹500 per month.",
    },
    {
      question: "Can I withdraw money from my SIP fund whenever I need cash?",
      answer: "Yes, open-ended mutual funds allow redemption at current Net Asset Value (NAV) on any business day. Only ELSS tax-saving funds have a mandatory 3-year lock-in period.",
    },
    {
      question: "What is the 15x15x15 rule in SIP investing?",
      answer: "The 15x15x15 rule states that investing $15,000/month for 15 years at an expected annual return rate of 15% yields a maturity corpus of approximately 1 Crore ($100,000+).",
    },
    {
      question: "How does the Goal Seeker mode in this calculator work?",
      answer: "Goal Seeker solves the inverse compounding equation to tell you the exact monthly SIP contribution or lump-sum deposit required today to reach a target future goal (e.g., $250,000 for college education or home down payment).",
    },
    {
      question: "What is SWP (Systematic Withdrawal Plan)?",
      answer: "A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed monthly income stream from your accumulated mutual fund corpus while the remaining balance continues earning compound returns.",
    },
    {
      question: "Why should I use Direct mutual fund plans over Regular plans?",
      answer: "Direct plans eliminate distributor commissions, saving you 0.5% to 1.5% in annual expense ratios, which compounds into tens of thousands of dollars in extra returns over a 20-year horizon.",
    },
    {
      question: "What frequency is best for SIP investments: daily, weekly, or monthly?",
      answer: "Historical backtesting shows negligible difference between daily, weekly, and monthly SIP frequencies over 5+ year horizons. Monthly SIPs remain the standard for aligning with paycheck cycles.",
    },
    {
      question: "What is XIRR and how does it relate to SIP returns?",
      answer: "XIRR (Extended Internal Rate of Return) is the accurate mathematical metric used to calculate compound annualized returns for multiple cash inflows occurring at different dates, such as monthly SIP payments.",
    },
    {
      question: "How does market volatility affect long-term SIP compounding?",
      answer: "Volatility is beneficial for SIP investors during the accumulation phase because price dips allow you to accumulate more fund units at discounted prices.",
    },
    {
      question: "Can I download a PDF or Excel report of my calculation?",
      answer: "Yes, CalcPlatform's SIP Calculator provides instant export buttons for PDF audit reports, CSV, Excel schedule tables, and raw JSON data.",
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
