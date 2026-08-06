/**
 * Calculator Registry - Central Registry for Calculator Definitions and Execution Logic.
 */

import { CalculatorDefinition } from "./types";
import { calculateMortgageFormula } from "./formulas/mortgage";
import { calculateLoanFormula } from "./formulas/loan";
import { calculateEmiFormula } from "./formulas/emi";
import { calculateSipFormula } from "./formulas/sip";
import { calculateCompoundInterestFormula } from "./formulas/compound-interest";
import { formatCurrency, formatPercent, formatNumber } from "./formatters";

export const MORTGAGE_CALCULATOR: CalculatorDefinition = {
  id: "mortgage",
  title: "Mortgage Calculator",
  slug: "mortgage-calculator",
  category: "Finance",
  description: "Calculate home loan payments, monthly principal & interest breakdown, property taxes, insurance, HOA fees, extra payments, and amortization schedule.",
  iconName: "Home",
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
  calculate: (inputs) => {
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


export const LOAN_CALCULATOR: CalculatorDefinition = {
  id: "loan",
  title: "Loan Calculator",
  slug: "loan-calculator",
  category: "Finance",
  description: "Estimate monthly auto and personal loan payments with custom interest rates and terms.",
  iconName: "CalcIcon",
  inputs: [
    {
      name: "loanAmount",
      label: "Loan Amount",
      type: "currency",
      defaultValue: 25000,
      unit: "$",
      min: 1000,
      max: 500000,
      step: 500,
    },
    {
      name: "interestRate",
      label: "Interest Rate",
      type: "percentage",
      defaultValue: 7.5,
      unit: "%",
      min: 0.1,
      max: 30,
      step: 0.1,
    },
    {
      name: "loanTermYears",
      label: "Loan Term",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 1,
      max: 10,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "monthlyPayment",
      label: "Monthly Payment",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterestPaid",
      label: "Total Interest",
      format: "currency",
    },
    {
      name: "totalPaid",
      label: "Total Amount Paid",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateLoanFormula({
      loanAmount: Number(inputs.loanAmount || 25000),
      interestRate: Number(inputs.interestRate || 7.5),
      loanTermYears: Number(inputs.loanTermYears || 5),
    });
    return {
      monthlyPayment: res.monthlyPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalPaid: res.totalPaid,
    };
  },
};

export const EMI_CALCULATOR: CalculatorDefinition = {
  id: "emi",
  title: "EMI Calculator",
  slug: "emi-calculator",
  category: "Finance",
  description: "Calculate Equated Monthly Installment (EMI) and interest component schedule.",
  iconName: "DollarSign",
  inputs: [
    {
      name: "principal",
      label: "Loan Principal",
      type: "currency",
      defaultValue: 50000,
      unit: "$",
      min: 1000,
      max: 1000000,
      step: 1000,
    },
    {
      name: "interestRate",
      label: "Interest Rate (p.a.)",
      type: "percentage",
      defaultValue: 8.5,
      unit: "%",
      min: 0.5,
      max: 30,
      step: 0.1,
    },
    {
      name: "tenureMonths",
      label: "Tenure (Months)",
      type: "slider",
      defaultValue: 36,
      unit: "months",
      min: 6,
      max: 360,
      step: 6,
    },
  ],
  outputs: [
    {
      name: "monthlyEmi",
      label: "Monthly EMI",
      format: "currency",
      highlight: true,
    },
    {
      name: "totalInterestPayable",
      label: "Total Interest Payable",
      format: "currency",
    },
    {
      name: "totalPayment",
      label: "Total Payment",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateEmiFormula({
      principal: Number(inputs.principal || 50000),
      interestRate: Number(inputs.interestRate || 8.5),
      tenureMonths: Number(inputs.tenureMonths || 36),
    });
    return {
      monthlyEmi: res.monthlyEmi,
      totalInterestPayable: res.totalInterestPayable,
      totalPayment: res.totalPayment,
    };
  },
};

export const SIP_CALCULATOR: CalculatorDefinition = {
  id: "sip",
  title: "SIP Calculator",
  slug: "sip-calculator",
  category: "Finance",
  description: "Estimate Systematic Investment Plan returns, compounding growth, and maturity value.",
  iconName: "TrendingUp",
  inputs: [
    {
      name: "monthlyInvestment",
      label: "Monthly Investment",
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
      label: "Total Invested Amount",
      format: "currency",
    },
    {
      name: "estimatedReturns",
      label: "Estimated Returns",
      format: "currency",
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

export const COMPOUND_INTEREST_CALCULATOR: CalculatorDefinition = {
  id: "compound-interest",
  title: "Compound Interest Calculator",
  slug: "compound-interest-calculator",
  category: "Finance",
  description: "Calculate compounding growth for savings, fixed deposits, and long-term investments.",
  iconName: "TrendingUp",
  inputs: [
    {
      name: "principal",
      label: "Initial Principal",
      type: "currency",
      defaultValue: 10000,
      unit: "$",
      min: 100,
      max: 1000000,
      step: 100,
    },
    {
      name: "annualInterestRate",
      label: "Annual Interest Rate",
      type: "percentage",
      defaultValue: 7,
      unit: "%",
      min: 0.1,
      max: 25,
      step: 0.1,
    },
    {
      name: "years",
      label: "Length of Time",
      type: "slider",
      defaultValue: 5,
      unit: "years",
      min: 1,
      max: 30,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "futureValue",
      label: "Future Investment Value",
      format: "currency",
      highlight: true,
    },
    {
      name: "principal",
      label: "Initial Principal",
      format: "currency",
    },
    {
      name: "totalInterestEarned",
      label: "Total Interest Earned",
      format: "currency",
    },
  ],
  calculate: (inputs) => {
    const res = calculateCompoundInterestFormula({
      principal: Number(inputs.principal || 10000),
      annualInterestRate: Number(inputs.annualInterestRate || 7),
      years: Number(inputs.years || 5),
    });
    return {
      futureValue: res.futureValue,
      principal: res.principal,
      totalInterestEarned: res.totalInterestEarned,
    };
  },
};

const CALCULATOR_REGISTRY: Record<string, CalculatorDefinition> = {
  mortgage: MORTGAGE_CALCULATOR,
  "mortgage-calculator": MORTGAGE_CALCULATOR,
  loan: LOAN_CALCULATOR,
  "loan-calculator": LOAN_CALCULATOR,
  emi: EMI_CALCULATOR,
  "emi-calculator": EMI_CALCULATOR,
  sip: SIP_CALCULATOR,
  "sip-calculator": SIP_CALCULATOR,
  "compound-interest": COMPOUND_INTEREST_CALCULATOR,
  "compound-interest-calculator": COMPOUND_INTEREST_CALCULATOR,
};

export function getCalculatorDefinition(idOrSlug: string): CalculatorDefinition | undefined {
  if (!idOrSlug) return undefined;
  return CALCULATOR_REGISTRY[idOrSlug.toLowerCase()];
}

export function getAllCalculatorDefinitions(): CalculatorDefinition[] {
  return [
    MORTGAGE_CALCULATOR,
    LOAN_CALCULATOR,
    EMI_CALCULATOR,
    SIP_CALCULATOR,
    COMPOUND_INTEREST_CALCULATOR,
  ];
}
