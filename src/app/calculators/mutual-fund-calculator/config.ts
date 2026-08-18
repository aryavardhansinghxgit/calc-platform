import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardMutualFund } from "./calculator";
import { MutualFundCalculator } from "@/components/calculator/mutual-fund/MutualFundCalculator";
import { MutualFundContent } from "@/components/calculator/mutual-fund/MutualFundContent";

export const mutual_fund_calculatorConfig: CalculatorModuleDefinition = {
  id: "mutual-fund-calculator",
  title: "Mutual Fund Calculator — Calculate Returns, Expense Ratios & Net IRR",
  slug: "mutual-fund-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate mutual fund ending balances, expense ratio fee drag, sales loads (Front-End & CDSC Back-End), SIP dollar-cost averaging growth, and true Net Internal Rate of Return (Net IRR).",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "mutual fund calculator",
    "mutual fund return calculator",
    "mutual fund fee calculator",
    "expense ratio calculator",
    "mutual fund net irr calculator",
    "sip mutual fund calculator",
    "front end load vs back end load calculator",
    "mutual fund cost calculator",
    "mutual fund vs index fund fee calculator",
    "mutual fund growth calculator with monthly contributions",
    "cdsc fee calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "compound-interest-calculator",
    "sip-calculator",
    "investment-calculator",
    "cagr-calculator",
    "roi-calculator",
    "401k-calculator",
  ],
  formulaDescription:
    "Net Compounding Growth Rate: r_net = r_gross - Expense Ratio | Net IRR solved via Newton-Raphson root finding on all periodic cash flows.",
  inputs: [
    {
      name: "initialInvestment",
      label: "Initial Investment ($)",
      type: "currency",
      defaultValue: 20000,
      min: 0,
      max: 100000000,
    },
    {
      name: "monthlyContribution",
      label: "Monthly Contribution ($)",
      type: "currency",
      defaultValue: 1000,
      min: 0,
      max: 10000000,
    },
    {
      name: "expectedAnnualReturn",
      label: "Expected Rate of Return (%)",
      type: "percentage",
      defaultValue: 5.0,
      min: -50,
      max: 100,
      step: 0.1,
    },
    {
      name: "holdingYears",
      label: "Holding Period (Years)",
      type: "number",
      defaultValue: 5,
      min: 0,
      max: 60,
      step: 1,
    },
    {
      name: "frontEndLoad",
      label: "Front-End Sales Load (%)",
      type: "percentage",
      defaultValue: 2.0,
      min: 0,
      max: 15,
      step: 0.25,
    },
    {
      name: "expenseRatio",
      label: "Annual Expense Ratio (%)",
      type: "percentage",
      defaultValue: 0.5,
      min: 0,
      max: 10,
      step: 0.05,
    },
  ],
  outputs: [
    {
      name: "endingValue",
      label: "Ending Value",
      type: "currency",
    },
    {
      name: "totalPrincipal",
      label: "Total Principal",
      type: "currency",
    },
    {
      name: "netReturn",
      label: "Net Profit / Return",
      type: "currency",
    },
    {
      name: "netIrrPercent",
      label: "Net IRR (%/yr)",
      type: "percentage",
    },
    {
      name: "totalChargesAndFees",
      label: "Total Charges and Fees",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateStandardMutualFund({
      initialInvestment: Number(inputs.initialInvestment) || 0,
      monthlyContribution: Number(inputs.monthlyContribution) || 0,
      annualContribution: 0,
      expectedAnnualReturn: Number(inputs.expectedAnnualReturn) || 0,
      holdingYears: Number(inputs.holdingYears) || 0,
      holdingMonths: 0,
      frontEndLoad: Number(inputs.frontEndLoad) || 0,
      deferredBackEndLoad: 0,
      expenseRatio: Number(inputs.expenseRatio) || 0,
    });

    return {
      ...res,
      endingValue: `$${res.endingValue.toLocaleString()}`,
      totalPrincipal: `$${res.totalPrincipal.toLocaleString()}`,
      netReturn: `$${res.netReturn.toLocaleString()}`,
      netIrrPercent: `${res.netIrrPercent}%`,
      totalChargesAndFees: `$${res.totalChargesAndFees.toLocaleString()}`,
    };
  },
  CustomComponent: MutualFundCalculator,
  ContentComponent: MutualFundContent,
};

export default mutual_fund_calculatorConfig;
