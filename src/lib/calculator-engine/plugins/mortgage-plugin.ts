/**
 * Reference Plugin Implementation - Mortgage Calculator Plugin.
 */

import { CalculatorPlugin } from "../plugin";
import { calculateMortgageFormula } from "../formulas/mortgage";

export const MortgagePlugin: CalculatorPlugin = {
  metadata: {
    id: "mortgage",
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "Finance",
    description: "Calculate home loan payments, monthly principal & interest breakdown, property taxes, insurance, HOA fees, extra payments, and amortization schedule.",
    iconName: "Home",
    keywords: ["mortgage", "home loan", "down payment", "housing", "property tax", "monthly payment", "interest"],
    version: "1.0.0",
  },
  formulaDescription: "Monthly Payment = P × [r(1 + r)^n] / [(1 + r)^n - 1] + Monthly Taxes + Insurance + HOA + Extra Principal",
  faqs: [
    {
      question: "How is my monthly mortgage payment calculated?",
      answer:
        "Your monthly payment consists of Principal & Interest (calculated via loan amount, interest rate, and term), plus estimated Property Tax, Home Insurance, and HOA fees.",
    },
    {
      question: "How does making extra payments affect my mortgage?",
      answer:
        "Extra monthly payments go directly toward reducing your principal balance, which significantly decreases total interest paid and shortens your payoff date.",
    },
    {
      question: "What is a good down payment percentage?",
      answer:
        "Standard down payments range from 3% to 20%. Putting down 20% or more eliminates Private Mortgage Insurance (PMI) requirements.",
    },
  ],
  inputs: [
    {
      name: "homePrice",
      label: "Home Purchase Price",
      type: "currency",
      defaultValue: 400000,
      unit: "$",
      min: 10000,
      max: 10000000,
      step: 5000,
      tooltip: "The total purchase price of the property",
    },
    {
      name: "downPayment",
      label: "Down Payment",
      type: "currency",
      defaultValue: 80000,
      unit: "$",
      min: 0,
      max: 5000000,
      step: 1000,
      tooltip: "Initial upfront cash payment towards the property",
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 6.5,
      unit: "%",
      min: 0.1,
      max: 25,
      step: 0.1,
      tooltip: "Annual mortgage interest rate",
    },
    {
      name: "loanTermYears",
      label: "Loan Term",
      type: "slider",
      defaultValue: 30,
      unit: "years",
      min: 5,
      max: 40,
      step: 1,
      tooltip: "Duration of the home loan in years",
    },
    {
      name: "propertyTaxRate",
      label: "Property Tax Rate",
      type: "percentage",
      defaultValue: 1.2,
      unit: "%",
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: "Estimated annual property tax percentage of home price",
    },
    {
      name: "homeInsuranceAnnual",
      label: "Home Insurance (Annual)",
      type: "currency",
      defaultValue: 1200,
      unit: "$",
      min: 0,
      max: 50000,
      step: 100,
      tooltip: "Estimated annual homeowner insurance premium",
    },
    {
      name: "hoaFeeMonthly",
      label: "HOA Fees (Monthly)",
      type: "currency",
      defaultValue: 0,
      unit: "$",
      min: 0,
      max: 5000,
      step: 25,
      tooltip: "Monthly Homeowners Association fees if applicable",
    },
    {
      name: "extraMonthlyPayment",
      label: "Extra Monthly Payment",
      type: "currency",
      defaultValue: 0,
      unit: "$",
      min: 0,
      max: 10000,
      step: 50,
      tooltip: "Additional monthly payment applied directly to loan principal",
    },
  ],
  outputs: [
    {
      name: "totalMonthlyPayment",
      label: "Total Monthly Payment",
      format: "currency",
      highlight: true,
      description: "Includes Principal, Interest, Tax, Insurance, HOA & Extra Payment",
    },
    {
      name: "monthlyPrincipalAndInterest",
      label: "Principal & Interest",
      format: "currency",
      description: "Base monthly loan payment",
    },
    {
      name: "loanAmount",
      label: "Total Loan Amount",
      format: "currency",
      description: "Home price minus down payment",
    },
    {
      name: "totalInterestPaid",
      label: "Total Interest Paid",
      format: "currency",
      description: "Cumulative interest paid over loan lifespan",
    },
    {
      name: "payoffDate",
      label: "Estimated Payoff Date",
      format: "text",
      description: "Target payoff month and year",
    },
  ],
  formula: (inputs) => {
    const res = calculateMortgageFormula({
      homePrice: Number(inputs.homePrice || 400000),
      downPayment: Number(inputs.downPayment || 80000),
      interestRate: Number(inputs.interestRate || 6.5),
      loanTermYears: Number(inputs.loanTermYears || 30),
      propertyTaxRate: Number(inputs.propertyTaxRate || 1.2),
      homeInsuranceAnnual: Number(inputs.homeInsuranceAnnual || 1200),
      hoaFeeMonthly: Number(inputs.hoaFeeMonthly || 0),
      extraMonthlyPayment: Number(inputs.extraMonthlyPayment || 0),
    });
    return {
      totalMonthlyPayment: res.totalMonthlyPayment,
      monthlyPrincipalAndInterest: res.monthlyPrincipalAndInterest,
      monthlyPropertyTax: res.monthlyPropertyTax,
      monthlyInsurance: res.monthlyInsurance,
      hoaFeeMonthly: res.hoaFeeMonthly,
      loanAmount: res.loanAmount,
      totalInterestPaid: res.totalInterestPaid,
      totalTaxesAndFeesPaid: res.totalTaxesAndFeesPaid,
      totalPaid: res.totalPaid,
      payoffDate: res.payoffDate,
      payoffMonths: res.payoffMonths,
      amortizationSchedule: res.amortizationSchedule,
    };
  },
};

export default MortgagePlugin;
