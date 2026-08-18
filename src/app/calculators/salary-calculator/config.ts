import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateUniversalSalary } from "./calculator";
import { SalaryCalculator } from "@/components/calculator/salary/SalaryCalculator";
import { SalaryContent } from "@/components/calculator/salary/SalaryContent";

export const salary_calculatorConfig: CalculatorModuleDefinition = {
  id: "salary-calculator",
  title: "Salary Calculator — Hourly, Monthly & Annual Paycheck Converter",
  slug: "salary-calculator",
  category: "Finance",
  subcategory: "Income & Payroll",
  description:
    "Convert salary and wages across Hourly, Daily, Weekly, Bi-Weekly, Semi-Monthly, Monthly, and Annual pay periods with paid time off, holidays, overtime, and net take-home tax estimations.",
  iconName: "DollarSign",
  featured: true,
  keywords: [
    "salary calculator",
    "hourly to salary calculator",
    "salary to hourly calculator",
    "paycheck calculator",
    "biweekly to annual salary calculator",
    "net take home pay calculator",
    "how much do i make an hour",
    "annual to monthly salary calculator",
    "gross to net salary calculator",
    "overtime pay calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "income-tax-calculator",
    "401k-calculator",
    "budget-calculator",
    "savings-calculator",
    "hourly-wage-calculator",
    "inflation-calculator",
    "present-value-calculator",
  ],
  formulaDescription:
    "Annual Salary = Hourly Wage * Hours/Week * 52 | Bi-Weekly = Annual / 26 | Semi-Monthly = Annual / 24",
  inputs: [
    {
      name: "salaryAmount",
      label: "Salary Amount ($)",
      type: "currency",
      defaultValue: 50,
      min: 0,
      max: 100000000,
    },
    {
      name: "hoursPerWeek",
      label: "Hours per Week",
      type: "number",
      defaultValue: 40,
      min: 1,
      max: 168,
    },
  ],
  outputs: [
    {
      name: "unadjustedAnnual",
      label: "Annual Salary (Unadjusted)",
      type: "currency",
    },
    {
      name: "unadjustedMonthly",
      label: "Monthly Gross Pay",
      type: "currency",
    },
    {
      name: "unadjustedBiWeekly",
      label: "Bi-Weekly Paycheck",
      type: "currency",
    },
    {
      name: "unadjustedHourly",
      label: "Hourly Wage",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateUniversalSalary({
      salaryAmount: Number(inputs.salaryAmount) || 50,
      frequency: "hourly",
      hoursPerWeek: Number(inputs.hoursPerWeek) || 40,
      daysPerWeek: 5,
      holidaysPerYear: 10,
      vacationDaysPerYear: 15,
    });

    return {
      unadjustedAnnual: `$${res.unadjustedAnnual.toLocaleString()}`,
      unadjustedMonthly: `$${res.unadjustedMonthly.toLocaleString()}`,
      unadjustedBiWeekly: `$${res.unadjustedBiWeekly.toLocaleString()}`,
      unadjustedHourly: `$${res.unadjustedHourly.toFixed(2)}/hr`,
    };
  },
  CustomComponent: SalaryCalculator,
  ContentComponent: SalaryContent,
};

export default salary_calculatorConfig;
