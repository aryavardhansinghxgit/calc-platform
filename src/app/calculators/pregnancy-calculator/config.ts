import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePregnancyCalculator } from "./calculator";
import { pregnancy_calculatorFaqs } from "./faq";
import { PregnancyContent } from "@/components/calculator/pregnancy/PregnancyContent";

export const pregnancy_calculatorConfig: CalculatorModuleDefinition = {
  id: "pregnancy-calculator",
  title: "Pregnancy Calculator",
  slug: "pregnancy-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description:
    "Use our pregnancy calculator to estimate your due date, gestational age, conception date, pregnancy milestones and weekly development using LMP, ultrasound, IVF or other dating methods.",
  iconName: "Baby",
  featured: true,
  keywords: [
    "pregnancy calculator",
    "due date calculator",
    "gestational age",
    "pregnancy tracker",
    "ivf due date",
    "ultrasound due date",
    "reverse due date calculator",
    "pregnancy weight gain calculator",
    "trimester timeline",
    "baby growth tracker",
  ],
  priority: 1,
  relatedCalculators: [
    "due-date-calculator",
    "ovulation-calculator",
    "conception-calculator",
    "pregnancy-weight-gain-calculator",
    "bmi-calculator",
    "calorie-calculator",
  ],
  formulaDescription:
    "LMP Mode: EDD = LMP + 280 Days + (Cycle - 28) | Conception Mode: EDD = Conception + 266 Days | IVF Day 5: EDD = Transfer + 261 Days",
  faqs: pregnancy_calculatorFaqs,
  ContentComponent: PregnancyContent,
  inputs: [
    {
      name: "lmpDate",
      label: "First Day of Last Period (LMP)",
      type: "date",
      defaultValue: "2026-01-01",
    },
    {
      name: "cycleLength",
      label: "Average Cycle Length (days)",
      type: "number",
      defaultValue: 28,
      min: 20,
      max: 45,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "dueDate",
      label: "Estimated Due Date",
      format: "text",
      highlight: true,
    },
    {
      name: "gestationalAge",
      label: "Current Gestational Age",
      format: "text",
    },
    {
      name: "trimester",
      label: "Current Trimester",
      format: "text",
    },
    {
      name: "conceptionDate",
      label: "Estimated Conception",
      format: "text",
    },
  ],
  calculate: calculatePregnancyCalculator,
};

export default pregnancy_calculatorConfig;
