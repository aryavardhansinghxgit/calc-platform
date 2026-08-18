import { CalculatorModuleDefinition } from "../../types";
import { calculateCollegeCost } from "@/lib/calculator-engine/formulas/college-cost";

export const COLLEGE_COST_CALCULATOR: CalculatorModuleDefinition = {
  id: "college-cost",
  title: "College Cost Calculator",
  slug: "college-cost-calculator",
  category: "Finance",
  subcategory: "Education & Debt",
  description:
    "Calculate future college costs with tuition inflation, estimate 529 savings plans, required monthly savings, student loan repayment burdens, and major ROI.",
  iconName: "GraduationCap",
  featured: true,
  tags: [
    "college cost calculator",
    "college savings calculator",
    "529 plan calculator",
    "student loan repayment",
    "tuition inflation",
    "college navigator",
    "financial aid",
  ],
  formulaDescription:
    "Future College Cost = Current Cost × (1 + Inflation Rate)^Years. Required Monthly Savings = Shortfall / [((1 + i)^n - 1) / i]",
  faqs: [
    {
      question: "How is future college cost calculated with inflation?",
      answer:
        "Future college costs are compounded using the formula FV = PV × (1 + r)^n, where PV is today's annual cost, r is the annual college inflation rate (typically 4% to 6%), and n is the number of years until college attendance.",
    },
    {
      question: "What is a 529 College Savings Plan?",
      answer:
        "A 529 plan is a tax-advantaged investment account where earnings grow 100% free of federal taxes and can be withdrawn tax-free for qualified educational expenses.",
    },
    {
      question: "How much should parents save each month for college?",
      answer:
        "Monthly savings depend on the child's age, target college type, and expected investment returns. Starting at birth, saving $250 to $500 per month in a 529 plan covers a substantial portion of in-state public university costs.",
    },
  ],
  inputs: [
    {
      id: "currentAnnualCost",
      label: "Today's Annual College Cost ($)",
      type: "currency",
      defaultValue: 30990,
      min: 1000,
      max: 200000,
      step: 100,
    },
    {
      id: "annualCostInflationPct",
      label: "College Cost Inflation Rate (%)",
      type: "percentage",
      defaultValue: 5.0,
      min: 0,
      max: 20,
      step: 0.1,
    },
    {
      id: "collegeDurationYears",
      label: "College Attendance Duration (Years)",
      type: "number",
      defaultValue: 4,
      min: 1,
      max: 8,
      step: 1,
    },
    {
      id: "yearsUntilCollege",
      label: "College Starts In (Years)",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 25,
      step: 1,
    },
    {
      id: "percentCostsFromSavings",
      label: "Percent of Costs from Savings (%)",
      type: "percentage",
      defaultValue: 35,
      min: 0,
      max: 100,
      step: 1,
    },
  ],
  outputs: [
    {
      id: "totalProjectedCollegeCost",
      label: "Total Projected College Cost",
      type: "currency",
    },
    {
      id: "projectedSavingsAtCollegeStart",
      label: "Accumulated Savings at Start",
      type: "currency",
    },
    {
      id: "requiredMonthlySavingsToMeetGoal",
      label: "Required Monthly Savings",
      type: "currency",
    },
    {
      id: "totalOutOfPocketShortfall",
      label: "Unfunded Shortfall / Loans",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateCollegeCost({
      currentAnnualCost: Number(inputs.currentAnnualCost) || 30990,
      annualCostInflationPct: Number(inputs.annualCostInflationPct) || 5.0,
      collegeDurationYears: Number(inputs.collegeDurationYears) || 4,
      yearsUntilCollege: Number(inputs.yearsUntilCollege) || 3,
      percentCostsFromSavings: Number(inputs.percentCostsFromSavings) || 35,
      currentSavings: Number(inputs.currentSavings) || 0,
      monthlySavings: Number(inputs.monthlySavings) || 250,
      investmentReturnPct: Number(inputs.investmentReturnPct) || 5.0,
      taxRateOnReturnPct: Number(inputs.taxRateOnReturnPct) || 25,
      annualFinancialAid: Number(inputs.annualFinancialAid) || 0,
    });

    return {
      totalProjectedCollegeCost: res.totalProjectedCollegeCost,
      projectedSavingsAtCollegeStart: res.projectedSavingsAtCollegeStart,
      requiredMonthlySavingsToMeetGoal: res.requiredMonthlySavingsToMeetGoal,
      totalOutOfPocketShortfall: res.totalOutOfPocketShortfall,
    };
  },
};
