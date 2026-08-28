import { CalculatorModuleDefinition } from "../../types";
import { calculatePensionSuite } from "@/lib/calculator-engine/formulas/pension";
import { pensionFaqs } from "./faq";

export const PENSION_CALCULATOR: CalculatorModuleDefinition = {
  id: "pension",
  title: "Pension Calculator – Lump Sum, Monthly Pension, Survivor & Retirement Comparison",
  slug: "pension-calculator",
  category: "Finance",
  subcategory: "Retirement",
  description:
    "Free Pension Calculator. Compare Lump Sum Payout vs Monthly Pension, Single-Life vs Joint-and-Survivor annuity options, and Work Longer vs Retire Earlier trade-offs with COLA, present value math, and interactive charts.",
  iconName: "Shield",
  featured: true,
  tags: [
    "pension",
    "lump sum vs pension",
    "joint survivor pension",
    "work longer vs retire early",
    "defined benefit",
    "annuity payout",
    "pension calculator",
  ],
  formulaDescription:
    "Evaluates annuity present values PV = Σ (PMT × (1+COLA)^t / (1+r)^t) vs Lump Sum investments and joint life expectancies.",
  faqs: pensionFaqs,
  inputs: [
    { name: "retirementAge", label: "Retirement Age", type: "number", defaultValue: 65, min: 18, max: 100, step: 1 },
    { name: "lumpSumAmount", label: "Lump Sum Amount ($)", type: "currency", defaultValue: 800000, unit: "$", min: 0, max: 10000000, step: 25000 },
    { name: "monthlyPension", label: "Monthly Pension Income ($)", type: "currency", defaultValue: 5000, unit: "$", min: 0, max: 100000, step: 250 },
    { name: "investmentReturnPercent", label: "Investment Return (%)", type: "number", defaultValue: 5.0, min: 0, max: 25, step: 0.25 },
    { name: "colaPercent", label: "Cost-of-Living Adjustment (COLA %)", type: "number", defaultValue: 3.5, min: 0, max: 20, step: 0.25 },
  ],
  outputs: [
    { name: "recommendedOption", label: "Recommended Option", format: "text", highlight: true },
    { name: "presentValueOfPension", label: "Present Value of Pension", format: "currency", highlight: true },
    { name: "totalLifetimePensionIncome", label: "Total Lifetime Income", format: "currency" },
    { name: "breakevenAge", label: "Breakeven Crossover Age", format: "number" },
  ],
  calculate: (inputs) => {
    const res = calculatePensionSuite(
      {
        retirementAge: Number(inputs.retirementAge !== undefined && inputs.retirementAge !== "" ? inputs.retirementAge : 65),
        lifeExpectancy: 85,
        lumpSumAmount: Number(inputs.lumpSumAmount !== undefined && inputs.lumpSumAmount !== "" ? inputs.lumpSumAmount : 800000),
        investmentReturnPercent: Number(inputs.investmentReturnPercent !== undefined && inputs.investmentReturnPercent !== "" ? inputs.investmentReturnPercent : 5.0),
        monthlyPension: Number(inputs.monthlyPension !== undefined && inputs.monthlyPension !== "" ? inputs.monthlyPension : 5000),
        colaPercent: Number(inputs.colaPercent !== undefined && inputs.colaPercent !== "" ? inputs.colaPercent : 3.5),
      },
      {
        retirementAge: Number(inputs.retirementAge !== undefined && inputs.retirementAge !== "" ? inputs.retirementAge : 65),
        retireeLifeExpectancy: 77,
        spouseAgeAtRetirement: 62,
        spouseLifeExpectancy: 82,
        singleLifeMonthly: 5000,
        jointSurvivorMonthly: 3000,
        survivorBenefitPercent: 100,
        investmentReturnPercent: Number(inputs.investmentReturnPercent !== undefined && inputs.investmentReturnPercent !== "" ? inputs.investmentReturnPercent : 5.0),
        colaPercent: Number(inputs.colaPercent !== undefined && inputs.colaPercent !== "" ? inputs.colaPercent : 3.5),
      },
      {
        optionAAge: 60,
        optionAMonthly: 2500,
        optionBAge: 65,
        optionBMonthly: 3800,
        investmentReturnPercent: Number(inputs.investmentReturnPercent !== undefined && inputs.investmentReturnPercent !== "" ? inputs.investmentReturnPercent : 5.0),
        colaPercent: Number(inputs.colaPercent !== undefined && inputs.colaPercent !== "" ? inputs.colaPercent : 3.5),
      },
      {
        finalSalary: 80000,
        yearsOfService: 25,
        multiplierPercent: 2.0,
      }
    );

    return {
      recommendedOption: res.lumpSumVsPension.recommendedOption,
      presentValueOfPension: res.lumpSumVsPension.presentValueOfPension,
      totalLifetimePensionIncome: res.lumpSumVsPension.totalLifetimePensionIncome,
      breakevenAge: res.lumpSumVsPension.breakevenAge,
    };
  },
};

export default PENSION_CALCULATOR;
