import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTakeHomePay } from "./calculator";
import { TakeHomePayCalculator } from "@/components/calculator/take-home-pay/TakeHomePayCalculator";
import { TakeHomePayContent } from "@/components/calculator/take-home-pay/TakeHomePayContent";

export const take_home_pay_calculatorConfig: CalculatorModuleDefinition = {
  id: "take-home-pay-calculator",
  title: "Take-Home Paycheck Calculator — Calculate Net Pay & Tax Withholdings",
  slug: "take-home-pay-calculator",
  category: "Finance",
  subcategory: "Salary & Taxes",
  description:
    "Calculate your net take-home paycheck after federal, state, and FICA taxes, pre-tax 401(k) deductions, and Form W-4 adjustments with our free paycheck calculator.",
  iconName: "Briefcase",
  featured: true,
  keywords: [
    "take home paycheck calculator",
    "paycheck calculator",
    "net pay calculator",
    "salary take home calculator",
    "hourly paycheck calculator",
    "tax withholding calculator",
    "biweekly paycheck calculator",
    "gross to net paycheck calculator",
    "how to calculate take home pay",
    "w4 paycheck calculator",
    "state paycheck tax calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "salary-calculator",
    "income-tax-calculator",
    "marriage-tax-calculator",
    "budget-calculator",
    "401k-calculator",
    "estate-tax-calculator",
  ],
  formulaDescription:
    "Net Paycheck = Gross Pay - Pre-Tax Deductions - Federal Tax - FICA Taxes - State/Local Taxes - Post-Tax Deductions",
  inputs: [
    {
      name: "grossSalary",
      label: "Gross Annual Salary ($)",
      type: "currency",
      defaultValue: 80000,
      min: 0,
      max: 100000000,
    },
    {
      name: "frequency",
      label: "Pay Frequency",
      type: "select",
      defaultValue: "biweekly",
      options: [
        { label: "Bi-Weekly (26/yr)", value: "biweekly" },
        { label: "Semi-Monthly (24/yr)", value: "semimonthly" },
        { label: "Monthly (12/yr)", value: "monthly" },
        { label: "Weekly (52/yr)", value: "weekly" },
        { label: "Annually", value: "annually" },
      ],
    },
  ],
  outputs: [
    {
      name: "netPaycheck",
      label: "Net Take-Home Paycheck",
      type: "currency",
    },
    {
      name: "takeHomePercentage",
      label: "Take-Home Percentage (%)",
      type: "percentage",
    },
    {
      name: "annualNetPay",
      label: "Annual Net Take-Home Pay",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const gross = Number(inputs.grossSalary) || 80000;
    const freq = inputs.frequency || "biweekly";

    const res = calculateTakeHomePay({
      grossPay: gross,
      isGrossAnnual: true,
      frequency: freq,
      filingStatus: "single",
      stateCode: "US",
      stateTaxRatePercent: 0,
      localTaxRatePercent: 0,
      isFicaExempt: false,
      preTaxDeductions: {
        retirement401k: 230.77,
        healthDentalVision: 0,
        hsaFsa: 0,
        transitCommuter: 0,
        otherPreTax: 0,
      },
      postTaxDeductions: {
        roth401k: 0,
        garnishmentsChildSupport: 0,
        unionDuesCharity: 0,
        otherPostTax: 0,
      },
      w4Adjustments: {
        multipleJobsStep2c: false,
        claimDependentsStep3: 0,
        otherIncomeStep4a: 0,
        extraDeductionsStep4b: 0,
        extraWithholdingStep4c: 0,
      },
    });

    return {
      netPaycheck: `$${res.netTakeHomePayPerPeriod.toLocaleString()}`,
      takeHomePercentage: `${res.takeHomePercentage}%`,
      annualNetPay: `$${res.netTakeHomePayAnnual.toLocaleString()}`,
    };
  },
  CustomComponent: TakeHomePayCalculator,
  ContentComponent: TakeHomePayContent,
};

export default take_home_pay_calculatorConfig;
