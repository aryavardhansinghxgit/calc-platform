import { CalculatorModuleDefinition } from "../../types";
import { calculateBoatLoan } from "@/lib/calculator-engine/formulas/boat-loan";

export const BOAT_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "boat-loan",
  title: "Boat Loan Calculator",
  slug: "boat-loan-calculator",
  category: "Finance",
  subcategory: "Auto & Lease",
  description:
    "Calculate boat loan payments, total marine financing interest, upfront purchase costs, slip/marina storage fees, and true total cost of vessel ownership.",
  iconName: "Ship",
  featured: true,
  tags: [
    "boat loan calculator",
    "marine financing calculator",
    "boat payment calculator",
    "yacht loan calculator",
    "boat cost of ownership",
    "boat insurance and marina",
  ],
  formulaDescription:
    "Monthly Boat Payment = L × [ r(1+r)^n / ((1+r)^n - 1) ]. Total Cost = Boat Price + Total Interest + Sales Tax + Dealer Rigging Fees.",
  faqs: [
    {
      question: "How are boat loan interest rates and terms calculated?",
      answer:
        "Boat loan interest rates are fixed based on credit history and loan size, with repayment terms ranging from 2 to 20 years depending on vessel price and age.",
    },
    {
      question: "What is the typical down payment on a boat loan?",
      answer:
        "Most marine lenders require 10% to 20% down payment in cash or trade-in equity.",
    },
    {
      question: "What recurring expenses should I budget for boat ownership?",
      answer:
        "Beyond monthly loan payments, budget 10% to 15% of the boat value annually for marina slip/storage fees, marine insurance, engine servicing, winterization, and fuel.",
    },
  ],
  inputs: [
    {
      name: "boatPrice",
      label: "Boat Price ($)",
      type: "currency",
      defaultValue: 35000,
      min: 0,
      max: 10000000,
      step: 500,
    },
    {
      name: "downPayment",
      label: "Down Payment ($)",
      type: "currency",
      defaultValue: 7000,
      min: 0,
      max: 10000000,
      step: 500,
    },
    {
      name: "loanTermYears",
      label: "Loan Term (Years)",
      type: "number",
      defaultValue: 10,
      min: 1,
      max: 30,
      step: 1,
    },
    {
      name: "interestRatePct",
      label: "Interest Rate (% APR)",
      type: "percentage",
      defaultValue: 7.0,
      min: 0,
      max: 30,
      step: 0.1,
    },
  ],
  outputs: [
    {
      name: "monthlyPayment",
      label: "Monthly Boat Payment",
      format: "currency",
    },
    {
      name: "totalLoanAmount",
      label: "Total Loan Amount",
      format: "currency",
    },
    {
      name: "totalInterestPaid",
      label: "Total Finance Interest",
      format: "currency",
    },
    {
      name: "totalCostOfBoat",
      label: "Total Cost of Boat",
      format: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateBoatLoan({
      boatPrice: Number(inputs.boatPrice) || 35000,
      downPayment: Number(inputs.downPayment) || 7000,
      loanTermYears: Number(inputs.loanTermYears) || 10,
      interestRatePct: Number(inputs.interestRatePct) || 7.0,
      salesTaxRatePct: 3.0,
      dealerFees: 2800,
    });

    return {
      monthlyPayment: res.monthlyPayment,
      totalLoanAmount: res.totalLoanAmount,
      totalInterestPaid: res.totalInterestPaid,
      totalCostOfBoat: res.totalCostOfBoat,
    };
  },
};
