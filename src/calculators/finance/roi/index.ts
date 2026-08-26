import { CalculatorModuleDefinition } from "../../types";
import { calculateRoiFormula } from "@/lib/calculator-engine/formulas/roi";

export const ROI_CALCULATOR: CalculatorModuleDefinition = {
  id: "roi",
  title: "ROI Calculator — Return on Investment & Profitability Planner",
  slug: "roi-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate ROI, annualized return, net profit, post-tax value, real purchasing power, target ROI, investment scenarios, benchmarks, and return sensitivity.",
  iconName: "TrendingUp",
  featured: true,
  tags: [
    "roi calculator",
    "return on investment calculator",
    "annualized roi calculator",
    "real return calculator",
    "investment return calculator",
    "profitability calculator",
    "capital gain calculator",
    "real estate roi calculator",
    "stock roi calculator",
    "what-if roi matrix",
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
      question: "What is ROI?",
      answer: "Return on Investment (ROI) measures the gain or loss on an investment relative to the amount originally invested. The basic formula is (Amount Returned − Amount Invested) ÷ Amount Invested × 100. A $1,000 investment that becomes $2,000 therefore produces a 100% ROI.",
    },
    {
      question: "How do I calculate annualized ROI?",
      answer: "Annualized ROI converts a total beginning-to-ending return into a geometric annual growth rate. The calculator uses [(Amount Returned ÷ Amount Invested)^(1/Years) − 1] × 100. This makes returns earned over different holding periods easier to compare.",
    },
    {
      question: "What is the difference between ROI and CAGR?",
      answer: "Simple ROI measures the total percentage gain or loss without normalizing for time. CAGR, or compound annual growth rate, expresses the equivalent annual compounded growth rate over a specified period. For one beginning value and one ending value, the calculator's annualized ROI follows the same geometric concept as CAGR.",
    },
    {
      question: "What is the difference between ROI and IRR?",
      answer: "ROI compares an initial investment with an ending result. IRR is designed for situations with multiple cash inflows and outflows whose timing affects the return. When contributions or withdrawals occur on different dates, IRR or XIRR may be more appropriate than a simple beginning-to-ending ROI.",
    },
    {
      question: "Can ROI be negative?",
      answer: "Yes. When the amount returned is less than the amount invested, ROI is negative. For example, investing $50,000 and receiving $30,000 produces a $20,000 loss and a total ROI of -40%.",
    },
    {
      question: "How do I calculate ROI using start and end dates?",
      answer: "Use the calculator's Date mode to enter the investment start and end dates. The calculator derives the holding period and then annualizes the return using that time interval. This avoids manually estimating the number of years.",
    },
    {
      question: "What is real ROI?",
      answer: "Real ROI adjusts investment performance for inflation so that the result is expressed in purchasing-power terms. The calculator uses the selected inflation assumption to estimate real annualized return and inflation-adjusted value rather than treating nominal dollars as having constant purchasing power.",
    },
    {
      question: "How does capital-gains tax affect ROI?",
      answer: "The calculator models a user-entered capital-gains tax rate against the modeled investment gain. In the $1,000-to-$2,000 example, a 15% assumption applied to the $1,000 gain produces $150 of modeled tax and a $1,850 post-tax final value. Actual tax liability depends on tax law and individual circumstances.",
    },
    {
      question: "What is a good ROI for a stock-market investment?",
      answer: "There is no single ROI that is universally 'good.' Expected return depends on the asset, time period, risk, diversification, fees, and market conditions. Investor.gov notes that historical long-term stock-market estimates can be useful reference points but also emphasizes that investments involve risk and that past performance does not guarantee future results.",
    },
    {
      question: "What is a good ROI for real estate?",
      answer: "There is no universal target ROI for every property. Real-estate return can combine appreciation, rental income, operating expenses, financing costs, taxes, maintenance, transaction costs, and the holding period. A property with a high gross return can have a much lower net return after those costs.",
    },
    {
      question: "How does the Target ROI Goal feature work?",
      answer: "Goal Seeker calculates the final amount required to achieve a specified ROI on the entered initial investment. For example, a $1,000 investment with a 100% ROI target requires a final value of $2,000.",
    },
    {
      question: "What is Scenario Comparison mode?",
      answer: "Scenario Comparison lets you enter two investment outcomes and compare their total ROI and annualized ROI side by side. This is particularly useful when the investments have different returns, capital amounts, or holding periods.",
    },
    {
      question: "What is the Wealth Multiplier?",
      answer: "The Wealth Multiplier is the final value divided by the original investment. A 2.0x multiplier means $1,000 became $2,000. A 1.5x multiplier means $1,000 became $1,500.",
    },
    {
      question: "Does ROI include dividends or rental income?",
      answer: "It can, provided those amounts are included in the calculator's Amount Returned according to the scenario being modeled. For a complete investment-return analysis, distributions and proceeds that belong to the investment should be included consistently rather than counting only the change in market price.",
    },
    {
      question: "How do I calculate ROI on a business investment?",
      answer: "At a basic level, subtract the investment's total cost from the amount ultimately returned, then divide the gain by the investment amount. A more complete business ROI should also consider operating costs, additional capital contributions, taxes, distributions, and the timing of cash flows.",
    },
    {
      question: "What is the What-If Sensitivity Matrix?",
      answer: "The What-If Matrix shows how a fixed starting investment could grow under different assumed annual return rates and holding periods. It is a scenario-analysis tool, not a forecast. Higher assumed returns and longer holding periods create larger modeled values through compound growth.",
    },
    {
      question: "Is this ROI Calculator free?",
      answer: "The calculator is designed as a free calculation and planning tool. The current interface also provides scenario analysis, schedule views, and export functions.",
    },
    {
      question: "Can I export my ROI analysis?",
      answer: "Yes. The current calculator provides CSV and Excel schedule exports and a Print/PDF option. The exported schedule should contain the same calculated values displayed in the calculator.",
    },
    {
      question: "What is the difference between gross ROI and net ROI?",
      answer: "Gross ROI describes the return before certain costs, fees, taxes, or expenses are deducted. Net ROI attempts to measure what remains after the applicable costs have been incorporated. For meaningful comparisons, the assumptions should be consistent across both investments.",
    },
    {
      question: "How does the holding period affect ROI?",
      answer: "Holding period does not change the basic point-to-point ROI percentage, but it strongly affects annualized ROI. The same 100% total ROI represents a much stronger annualized return when earned quickly than when earned over many years.",
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
