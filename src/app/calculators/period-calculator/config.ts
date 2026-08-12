import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePeriodOutputs } from "./calculator";
import { period_calculatorFaqs } from "./faq";

export const period_calculatorConfig: CalculatorModuleDefinition = {
  id: "period-calculator",
  title: "Period Calculator",
  slug: "period-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description:
    "Predict your next period date, future 12-month cycle calendar, peak fertile window, ovulation dates, and overall cycle health score.",
  iconName: "Calendar",
  featured: true,
  keywords: [
    "period",
    "period calculator",
    "menstrual cycle",
    "period tracker",
    "ovulation date",
    "fertile window",
    "cycle health",
  ],
  priority: 1,
  relatedCalculators: [
    "ovulation-calculator",
    "pregnancy-calculator",
    "due-date-calculator",
    "pregnancy-conception-calculator",
    "conception-calculator",
    "pregnancy-weight-gain-calculator",
  ],
  formulaDescription:
    "Next Period Date = First Day of Last Period + Average Cycle Length (Days)",
  faqs: period_calculatorFaqs,
  inputs: [
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "lmp",
      options: [
        { label: "Last Menstrual Period (LMP)", value: "lmp" },
        { label: "Average Cycle Length", value: "cycle-length" },
        { label: "12-Month Future Prediction", value: "future-12m" },
        { label: "Period Tracker & History", value: "tracker" },
        { label: "Irregular Cycle Predictor", value: "irregular" },
        { label: "Fertility Planning Mode", value: "fertility" },
        { label: "Pregnancy Planning Mode", value: "pregnancy-plan" },
        { label: "Cycle Health Analysis", value: "analysis" },
      ],
    },
    {
      name: "lmpDate",
      label: "First Day of Last Period",
      type: "date",
      defaultValue: "2026-01-01",
    },
    {
      name: "periodLength",
      label: "Period Duration (Days)",
      type: "number",
      defaultValue: 5,
      min: 2,
      max: 10,
    },
    {
      name: "cycleLength",
      label: "Average Cycle Length (Days)",
      type: "number",
      defaultValue: 28,
      min: 21,
      max: 45,
    },
    {
      name: "userAge",
      label: "User Age",
      type: "number",
      defaultValue: 28,
      min: 12,
      max: 55,
    },
  ],
  outputs: [
    {
      name: "nextPeriodDate",
      label: "Next Period Start Date",
      format: "text",
      highlight: true,
    },
    {
      name: "nextPeriodEndDate",
      label: "Next Period End Date",
      format: "text",
    },
    {
      name: "ovulationDate",
      label: "Estimated Ovulation Date",
      format: "text",
      highlight: true,
    },
    {
      name: "fertileWindow",
      label: "Fertile Window Range",
      format: "text",
    },
    {
      name: "healthStatus",
      label: "Cycle Health Status",
      format: "text",
    },
  ],
  calculate: calculatePeriodOutputs,
};

export default period_calculatorConfig;
