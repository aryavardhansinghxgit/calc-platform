import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateConceptionOutputs } from "./calculator";
import { conception_calculatorFaqs } from "./faq";

export const conception_calculatorConfig: CalculatorModuleDefinition = {
  id: "conception-calculator",
  title: "Conception Calculator",
  slug: "conception-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description:
    "Estimate your conception date, ovulation, fertile window, implantation timing and due date using LMP, ovulation, ultrasound, IVF or reverse due-date information.",
  iconName: "Heart",
  featured: true,
  keywords: [
    "conception",
    "conception date",
    "pregnancy conception",
    "fertile window",
    "ovulation date",
    "due date",
    "ivf conception",
  ],
  priority: 1,
  relatedCalculators: [
    "pregnancy-conception-calculator",
    "ovulation-calculator",
    "pregnancy-calculator",
    "due-date-calculator",
    "period-calculator",
    "pregnancy-weight-gain-calculator",
  ],
  formulaDescription:
    "Conception Date = Due Date - 266 Days OR LMP + (Cycle Length - Luteal Phase Length)",
  faqs: conception_calculatorFaqs,
  inputs: [
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "lmp",
      options: [
        { label: "Last Menstrual Period (LMP)", value: "lmp" },
        { label: "Ovulation Date", value: "ovulation" },
        { label: "Estimated Due Date", value: "due-date" },
        { label: "Ultrasound Scan Date", value: "ultrasound" },
        { label: "IVF Transfer Date", value: "ivf" },
        { label: "Reverse Conception (Sex Date)", value: "reverse" },
        { label: "Fertility Window Planner", value: "planner" },
        { label: "Pregnancy Timeline Predictor", value: "timeline" },
      ],
    },
    {
      name: "lmpDate",
      label: "First Day of Last Period",
      type: "date",
      defaultValue: "2026-01-01",
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
      name: "periodLength",
      label: "Period Duration (Days)",
      type: "number",
      defaultValue: 5,
      min: 2,
      max: 10,
    },
    {
      name: "lutealPhaseLength",
      label: "Luteal Phase Duration (Days)",
      type: "number",
      defaultValue: 14,
      min: 9,
      max: 16,
    },
    {
      name: "motherAge",
      label: "Maternal Age",
      type: "number",
      defaultValue: 28,
      min: 18,
      max: 50,
    },
  ],
  outputs: [
    {
      name: "conceptionDate",
      label: "Estimated Conception Date",
      format: "text",
      highlight: true,
    },
    {
      name: "fertileWindow",
      label: "Fertile Window Range",
      format: "text",
      highlight: true,
    },
    {
      name: "ovulationDate",
      label: "Estimated Ovulation Date",
      format: "text",
    },
    {
      name: "dueDate",
      label: "Estimated Due Date",
      format: "text",
    },
    {
      name: "implantationWindow",
      label: "Expected Implantation Window",
      format: "text",
    },
    {
      name: "earliestTestDate",
      label: "Earliest Test Date (10 DPO)",
      format: "text",
    },
  ],
  calculate: calculateConceptionOutputs,
};

export default conception_calculatorConfig;
