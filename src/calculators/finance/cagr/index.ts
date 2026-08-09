import { CalculatorModuleDefinition } from "../../types";
import { calculateCagrFormula } from "@/lib/calculator-engine/formulas/cagr";

export const CAGR_CALCULATOR: CalculatorModuleDefinition = {
  id: "cagr",
  title: "CAGR Calculator — Compound Annual Growth Rate Planner",
  slug: "cagr-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate Compound Annual Growth Rate (CAGR), target future portfolio value, required initial capital, inflation-adjusted real returns, and capital gains tax impact.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "cagr calculator",
    "compound annual growth rate",
    "annualized return calculator",
    "investment return calculator",
    "reverse cagr calculator",
    "stock return calculator",
    "real cagr calculator",
    "portfolio growth calculator",
  ],
  formulaDescription: "CAGR = (FV / PV)^{1 / N} - 1",
  inputs: [
    {
      name: "initialValue",
      label: "Initial Investment (PV)",
      type: "currency",
      defaultValue: 10000,
      unit: "$",
      min: 100,
      max: 100000000,
      step: 500,
    },
    {
      name: "finalValue",
      label: "Final Portfolio Value (FV)",
      type: "currency",
      defaultValue: 25000,
      unit: "$",
      min: 100,
      max: 100000000,
      step: 1000,
    },
    {
      name: "years",
      label: "Time Horizon (Years)",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 0.5,
      max: 30,
      step: 0.5,
    },
  ],
  outputs: [
    {
      name: "cagrPercent",
      label: "Compound Annual Growth Rate (CAGR)",
      format: "percentage",
      highlight: true,
    },
    {
      name: "absoluteReturnPercent",
      label: "Total Absolute Return",
      format: "percentage",
    },
    {
      name: "totalProfit",
      label: "Total Dollar Profit",
      format: "currency",
      highlight: true,
    },
  ],
  faqs: [
    {
      question: "What is Compound Annual Growth Rate (CAGR)?",
      answer: "CAGR is the geometric mean annual growth rate of an investment over a period longer than one year, representing the constant rate at which capital would have grown if compounded steadily without annual volatility.",
    },
    {
      question: "What is the formula for calculating CAGR?",
      answer: "The formula for CAGR is: CAGR = [ (FV / PV)^(1 / N) - 1 ] × 100, where FV is Final Value, PV is Present/Initial Value, and N is the number of years.",
    },
    {
      question: "What is the difference between CAGR and Absolute Return?",
      answer: "Absolute Return measures total percentage change from start to finish without regard to time. CAGR normalizes returns on an annualized compounding basis over the entire investment duration.",
    },
    {
      question: "What is the difference between CAGR and IRR / XIRR?",
      answer: "CAGR evaluates a single initial lump sum deposit growing to a final value. IRR (or XIRR) accounts for multiple intermediate cash inflows and outflows occurring at different dates, such as monthly SIPs or recurring deposits.",
    },
    {
      question: "Can CAGR be negative?",
      answer: "Yes, if the final value of an investment is lower than the initial investment capital, the CAGR result will be negative, representing the annualized percentage rate of portfolio loss.",
    },
    {
      question: "What is Reverse CAGR / Future Value Planning?",
      answer: "Reverse CAGR calculates the future value your investment will achieve given an initial principal amount, an expected annual CAGR percentage rate, and a time horizon: FV = PV × (1 + CAGR)^N.",
    },
    {
      question: "What is Real CAGR and how is it calculated?",
      answer: "Real CAGR adjusts nominal returns for inflation using the formula: Real CAGR = [ (1 + Nominal CAGR) / (1 + Inflation Rate) - 1 ] × 100, measuring true purchasing power growth.",
    },
    {
      question: "How does CAGR help in stock market investing?",
      answer: "CAGR allows investors to benchmark stock performance against major market indices (like S&P 500 or Nifty 50) and evaluate long-term corporate revenue or earnings growth.",
    },
    {
      question: "Why should I use CAGR instead of Average Annual Return?",
      answer: "Arithmetic average annual return ignores compounding and distorts true performance. For example, +50% in Year 1 and -50% in Year 2 has an arithmetic average of 0%, but an actual CAGR of -13.4% (your $100 drops to $75).",
    },
    {
      question: "What is a good CAGR for stock investments?",
      answer: "Historically, broad equity market indices like the S&P 500 deliver a long-term CAGR of 10%–11% before inflation. A CAGR above 12%–15% is generally considered strong equity performance.",
    },
    {
      question: "How does CAGR account for capital gains taxes?",
      answer: "Post-tax CAGR applies your marginal capital gains tax rate to net investment profits, showing the net after-tax annual growth rate.",
    },
    {
      question: "Can I use CAGR for time periods less than one year?",
      answer: "CAGR is mathematically intended for horizons of 1 year or longer. Annualizing short-term performance (e.g. 1 month) produces misleadingly exaggerated results.",
    },
    {
      question: "What is the Wealth Multiplier metric in this calculator?",
      answer: "The Wealth Multiplier shows how many times your initial principal multiplied over the tenure (e.g., 2.5x means your $10,000 grew to $25,000).",
    },
    {
      question: "How does the Required Tenure feature work?",
      answer: "Required Tenure calculates how many years it will take to grow a specific initial capital to a target final portfolio value at an assumed CAGR rate: N = ln(FV / PV) / ln(1 + CAGR).",
    },
    {
      question: "What is the Required Initial Capital feature?",
      answer: "Required Initial Capital calculates how much money you need to deposit today to achieve a future financial goal given an expected CAGR and time horizon: PV = FV / (1 + CAGR)^N.",
    },
    {
      question: "Does CAGR assume dividend reinvestment?",
      answer: "Standard CAGR calculations based on Total Return indices assume all cash dividends are fully reinvested into the asset.",
    },
    {
      question: "How does CAGR compare across different asset classes?",
      answer: "Historical long-term CAGRs average ~10% for equities, ~8% for real estate, ~7% for gold, and 4%–6% for government bonds or fixed deposits.",
    },
    {
      question: "What is the What-If Sensitivity Matrix in this calculator?",
      answer: "The What-If Sensitivity Matrix displays a grid comparing various growth rate percentages (6% to 20%) against different tenures (1 to 10 years) to show future portfolio outcomes.",
    },
    {
      question: "Is this CAGR Calculator free to use?",
      answer: "Yes, CalcPlatform's CAGR Calculator is 100% free with unlimited scenario analyses, export features, and zero registration requirements.",
    },
    {
      question: "Can I print or export a PDF report of my CAGR analysis?",
      answer: "Yes, click the 'Print / PDF' button to generate an executive financial report with key metrics, growth trajectory tables, and assumptions.",
    },
  ],
  calculate: (inputs) => {
    const res = calculateCagrFormula({
      initialValue: Number(inputs.initialValue || 10000),
      finalValue: Number(inputs.finalValue || 25000),
      years: Number(inputs.years || 5),
    });
    return {
      cagrPercent: `${res.cagrPercent}%`,
      absoluteReturnPercent: `${res.absoluteReturnPercent}%`,
      totalProfit: res.totalProfit,
    };
  },
};

export default CAGR_CALCULATOR;
