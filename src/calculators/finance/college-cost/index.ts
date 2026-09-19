import { CalculatorModuleDefinition } from "../../types";
import { calculateCollegeCost } from "@/lib/calculator-engine/formulas/college-cost";
import { CollegeCostCalculator } from "@/components/calculator/college-cost/CollegeCostCalculator";
import { CollegeCostContent, collegeCostFaqs } from "@/components/calculator/college-cost/CollegeCostContent";

export const COLLEGE_COST_CALCULATOR: CalculatorModuleDefinition = {
  id: "college-cost",
  title: "College Cost Calculator",
  slug: "college-cost-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate future college costs with tuition inflation, estimate 529 savings plans, required monthly savings, student loan repayment burdens, and major ROI.",
  iconName: "GraduationCap",
  featured: true,
  CustomComponent: CollegeCostCalculator,
  ContentComponent: CollegeCostContent,
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
  faqs: collegeCostFaqs,
  inputs: [
    {
      name: "currentAnnualCost",
      label: "Today's Annual College Cost ($)",
      type: "currency",
      defaultValue: 30990,
      min: 1000,
      max: 200000,
      step: 100,
    },
    {
      name: "annualCostInflationPct",
      label: "College Cost Inflation Rate (%)",
      type: "percentage",
      defaultValue: 5.0,
      min: 0,
      max: 20,
      step: 0.1,
    },
    {
      name: "collegeDurationYears",
      label: "College Attendance Duration (Years)",
      type: "number",
      defaultValue: 4,
      min: 1,
      max: 8,
      step: 1,
    },
    {
      name: "yearsUntilCollege",
      label: "College Starts In (Years)",
      type: "number",
      defaultValue: 3,
      min: 0,
      max: 25,
      step: 1,
    },
    {
      name: "percentCostsFromSavings",
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
      name: "totalProjectedCollegeCost",
      label: "Total Projected College Cost",
      format: "currency",
    },
    {
      name: "projectedSavingsAtCollegeStart",
      label: "Accumulated Savings at Start",
      format: "currency",
    },
    {
      name: "requiredMonthlySavingsToMeetGoal",
      label: "Required Monthly Savings",
      format: "currency",
    },
    {
      name: "totalOutOfPocketShortfall",
      label: "Unfunded Shortfall / Loans",
      format: "currency",
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
