import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateOvulationCalculator } from "./calculator";
import { ovulation_calculatorFaqs } from "./faq";
import { OvulationContent } from "@/components/calculator/ovulation/OvulationContent";

export const ovulation_calculatorConfig: CalculatorModuleDefinition = {
  id: "ovulation-calculator",
  title: "Ovulation Calculator",
  slug: "ovulation-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description:
    "Predict your peak ovulation date, 6-day fertile window, daily fertility score, and 35-day interactive calendar. Features 6 calculation modes and Shettles gender timing optimization.",
  iconName: "Sparkles",
  featured: true,
  keywords: [
    "ovulation calculator",
    "fertility calculator",
    "fertile window predictor",
    "conception calculator",
    "ovulation tracker",
    "shettles method calculator",
    "bb-temperature ovulation calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "pregnancy-calculator",
    "pregnancy-conception-calculator",
    "due-date-calculator",
    "pregnancy-weight-gain-calculator",
    "bmi-calculator",
  ],
  formulaDescription:
    "Predicts ovulation using ASRM guidelines & 6 clinical methods: LMP (+CycleLength - LutealPhase), Next Period (-LutealPhase), Due Date (-266d), or Symptothermal Biomarkers (BBT + OPK + EWCM).",
  faqs: ovulation_calculatorFaqs,
  ContentComponent: OvulationContent,
  inputs: [
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "lmp",
      options: [
        { label: "First Day of Last Period (LMP)", value: "lmp" },
        { label: "Next Expected Period Date", value: "next-period" },
        { label: "Target Delivery Due Date", value: "due-date" },
        { label: "Known Conception Date", value: "conception-date" },
        { label: "Symptothermal Biomarker Planner", value: "advanced-planner" },
      ],
    },
    {
      name: "lastPeriodDate",
      label: "First Day of Last Period",
      type: "date",
      defaultValue: "2026-08-01",
    },
    {
      name: "cycleLength",
      label: "Average Cycle Length (Days)",
      type: "number",
      defaultValue: 28,
      min: 20,
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
      max: 18,
    },
    {
      name: "fertilityGoal",
      label: "Fertility Goal (Shettles Timing)",
      type: "select",
      defaultValue: "general-conception",
      options: [
        { label: "General Conception Optimization", value: "general-conception" },
        { label: "Shettles Method for Conceiving a Boy", value: "conceive-boy" },
        { label: "Shettles Method for Conceiving a Girl", value: "conceive-girl" },
        { label: "Natural Family Planning (Abstinence)", value: "avoid-pregnancy" },
      ],
    },
  ],
  outputs: [
    {
      name: "predictedOvulationDateFormatted",
      label: "Predicted Peak Ovulation Date",
      format: "text",
      highlight: true,
    },
    {
      name: "fertileWindowStartFormatted",
      label: "6-Day Fertile Window Start",
      format: "text",
      highlight: true,
    },
    {
      name: "fertileWindowEndFormatted",
      label: "6-Day Fertile Window End",
      format: "text",
    },
    {
      name: "dailyFertilityScore",
      label: "Today's Conception Probability (%)",
      format: "number",
    },
    {
      name: "estimatedDueDateFormatted",
      label: "Estimated Due Date (If Conceived)",
      format: "text",
    },
  ],
  calculate: calculateOvulationCalculator,
};

export default ovulation_calculatorConfig;
