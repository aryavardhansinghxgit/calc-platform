import { CalculatorModuleDefinition } from "../../types";
import { calculateRoiFormula } from "@/lib/calculator-engine/formulas/roi";

export const ROI_CALCULATOR: CalculatorModuleDefinition = {
  id: "roi",
  title: "ROI Calculator — Return on Investment & Profitability Planner",
  slug: "roi-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate Return on Investment (ROI) percentage, annualized ROI, net dollar gain, inflation-adjusted real return, and capital gains tax impact.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "roi calculator",
    "return on investment calculator",
    "annualized roi calculator",
    "investment return calculator",
    "profitability calculator",
    "capital gain calculator",
    "real estate roi calculator",
    "stock roi calculator",
  ],
  formulaDescription: "ROI = [(Amount Returned - Amount Invested) / Amount Invested] × 100",
  inputs: [
    {
      name: "amountInvested",
      label: "Amount Invested (Initial Cost)",
      type: "currency",
      defaultValue: 1000,
      unit: "$",
      min: 100,
      max: 100000000,
      step: 500,
    },
    {
      name: "amountReturned",
      label: "Amount Returned (Final Value)",
      type: "currency",
      defaultValue: 2000,
      unit: "$",
      min: 0,
      max: 100000000,
      step: 1000,
    },
    {
      name: "holdingPeriodYears",
      label: "Holding Period (Years)",
      type: "slider",
      defaultValue: 4.395,
      unit: "years",
      min: 0.1,
      max: 30,
      step: 0.1,
    },
  ],
  outputs: [
    {
      name: "roiPercentage",
      label: "Total Return on Investment (ROI)",
      format: "percentage",
      highlight: true,
    },
    {
      name: "annualizedRoi",
      label: "Annualized ROI",
      format: "percentage",
      highlight: true,
    },
    {
      name: "netProfit",
      label: "Net Dollar Profit",
      format: "currency",
      highlight: true,
    },
  ],
  faqs: [
    {
      question: "What is Return on Investment (ROI)?",
      answer: "ROI measures the profitability or efficiency of an investment relative to its initial cost, calculated as: ROI = [ (Amount Returned - Amount Invested) / Amount Invested ] × 100.",
    },
    {
      question: "What is Annualized ROI and why is it important?",
      answer: "Annualized ROI normalizes total return over time on a geometric compounding basis: Annualized ROI = [ (Amount Returned / Amount Invested)^(1 / Years) - 1 ] × 100, enabling fair comparison between investments of different durations.",
    },
    {
      question: "What is the difference between ROI and CAGR?",
      answer: "Simple ROI measures total percentage change regardless of time. Annualized ROI and CAGR (Compound Annual Growth Rate) use the exact same mathematical formula to express annual compounded growth.",
    },
    {
      question: "What is the difference between ROI and IRR?",
      answer: "ROI evaluates a single initial lump sum deposit growing to a final value. IRR (Internal Rate of Return) accounts for multiple intermediate cash inflows and outflows occurring on different dates.",
    },
    {
      question: "Can ROI be negative?",
      answer: "Yes, if the amount returned is lower than the amount invested, the ROI will be negative, representing an investment loss.",
    },
    {
      question: "How do I calculate ROI with specific start and end dates?",
      answer: "Toggle to 'Use Dates' mode in our calculator to input your exact investment start date and end date. The tool calculates exact fractional years automatically.",
    },
    {
      question: "What is Real ROI and how is it calculated?",
      answer: "Real ROI adjusts nominal return for inflation: Real Annualized ROI = [ (1 + Nominal Rate) / (1 + Inflation Rate) - 1 ] × 100, evaluating true purchasing power growth.",
    },
    {
      question: "How does capital gains tax affect ROI?",
      answer: "Capital gains tax reduces net retained profit. Post-tax ROI calculates net return after subtracting estimated taxes on capital gains.",
    },
    {
      question: "What is a good ROI for stock market investments?",
      answer: "Historically, broad equity stock market indices (like the S&P 500) deliver a long-term annualized ROI of 10%–11% before inflation.",
    },
    {
      question: "What is a good ROI for real estate investments?",
      answer: "Real estate investments typically target a combined annual ROI of 8%–12%, factoring in rental income yield plus property price appreciation.",
    },
    {
      question: "How does the Goal Seeker feature work in this ROI Calculator?",
      answer: "Goal Seeker calculates the exact final amount returned needed to achieve a target desired ROI percentage on your initial capital.",
    },
    {
      question: "What is Scenario Comparison mode?",
      answer: "Scenario Comparison allows you to compare two investment options (Scenario A vs Scenario B) side-by-side to determine which produces superior total and annualized returns.",
    },
    {
      question: "What is the Wealth Multiplier metric?",
      answer: "Wealth Multiplier shows how many times your initial principal multiplied (e.g. 2.0x means your $1,000 doubled to $2,000).",
    },
    {
      question: "Does ROI include dividend income and rental income?",
      answer: "Yes, for complete accuracy, add all dividend payments, rental income, and proceeds received to your total 'Amount Returned'.",
    },
    {
      question: "How do I calculate ROI on a business venture?",
      answer: "Subtract total capital expenditures and operating costs from total net revenue generated, then divide by total cost.",
    },
    {
      question: "What is the What-If Sensitivity Matrix?",
      answer: "The Sensitivity Matrix displays a grid comparing various annual return rates (5% to 100%) across different holding tenures (1 to 10 years).",
    },
    {
      question: "Is this ROI Calculator free to use?",
      answer: "Yes, CalcPlatform's ROI Calculator is 100% free with unlimited calculations, scenario comparisons, and export options.",
    },
    {
      question: "Can I export my ROI analysis to Excel or PDF?",
      answer: "Yes, you can instantly export schedule tables to CSV or Excel, and click 'Print / PDF' to generate an executive PDF report.",
    },
    {
      question: "What is the difference between Gross ROI and Net ROI?",
      answer: "Gross ROI calculates return based on top-line revenue before fees, taxes, and expenses. Net ROI subtracts all transaction costs, fees, taxes, and expenses.",
    },
    {
      question: "How does holding period impact annualized ROI?",
      answer: "A longer holding period lowers the annualized ROI for the same total percentage gain, because growth is spread out over more years.",
    },
  ],
  calculate: (inputs) => {
    const res = calculateRoiFormula({
      amountInvested: Number(inputs.amountInvested || 1000),
      amountReturned: Number(inputs.amountReturned || 2000),
      years: Number(inputs.holdingPeriodYears || 4.395),
    });
    return {
      roiPercentage: `${res.roiPercent}%`,
      annualizedRoi: `${res.annualizedRoiPercent}%`,
      netProfit: res.netProfit,
    };
  },
};

export default ROI_CALCULATOR;
