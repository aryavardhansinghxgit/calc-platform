import { CalculatorModuleDefinition } from "../../types";

export const ROI_CALCULATOR: CalculatorModuleDefinition = {
  id: "roi",
  title: "ROI Calculator",
  slug: "roi-calculator",
  category: "Finance",
  subcategory: "Investment",
  description: "Calculate Return on Investment (ROI) percentage, net profit, and annualized return.",
  iconName: "TrendingUp",
  featured: false,
  tags: ["roi", "return on investment", "profitability", "gain"],
  formulaDescription: "ROI = [(Net Profit / Total Cost) × 100]. Annualized ROI = [(1 + ROI)^(1 / Years) - 1] × 100.",
  faqs: [
    {
      question: "What is Return on Investment (ROI)?",
      answer: "ROI measures the efficiency or profitability of an investment relative to its initial cost.",
    },
  ],
  inputs: [
    { name: "amountInvested", label: "Amount Invested", type: "currency", defaultValue: 15000, unit: "$", min: 10, max: 100000000, step: 1000 },
    { name: "amountReturned", label: "Amount Returned / Value", type: "currency", defaultValue: 22500, unit: "$", min: 0, max: 100000000, step: 1000 },
    { name: "holdingPeriodYears", label: "Holding Period", type: "slider", defaultValue: 3, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "roiPercentage", label: "Total ROI", format: "percentage", highlight: true },
    { name: "netProfit", label: "Net Dollar Profit", format: "currency", highlight: true },
    { name: "annualizedRoi", label: "Annualized ROI", format: "percentage" },
  ],
  calculate: (inputs) => {
    const cost = Number(inputs.amountInvested || 15000);
    const ret = Number(inputs.amountReturned || 22500);
    const years = Number(inputs.holdingPeriodYears || 3);

    if (cost <= 0) return { roiPercentage: "0%", netProfit: 0, annualizedRoi: "0%" };

    const netProfit = ret - cost;
    const roi = (netProfit / cost) * 100;
    let annRoi = 0;

    if (years > 0 && ret > 0) {
      annRoi = (Math.pow(ret / cost, 1 / years) - 1) * 100;
    }

    return {
      roiPercentage: `${roi.toFixed(2)}%`,
      netProfit: Number(netProfit.toFixed(2)),
      annualizedRoi: `${annRoi.toFixed(2)}%`,
    };
  },
};

export default ROI_CALCULATOR;
