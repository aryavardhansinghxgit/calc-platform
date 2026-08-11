import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDueDateCalculator } from "./calculator";
import { due_date_calculatorFaqs } from "./faq";
import { DueDateContent } from "@/components/calculator/due-date/DueDateContent";

export const due_date_calculatorConfig: CalculatorModuleDefinition = {
  id: "due-date-calculator",
  title: "Due Date Calculator",
  slug: "due-date-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description:
    "Calculate your estimated delivery due date (EDD), gestational age, delivery probability, and 40-week milestone schedule. Features 5 clinical modes (LMP, Ultrasound, Conception Date, IVF Transfer, Reverse Target Date).",
  iconName: "Clock",
  featured: true,
  keywords: [
    "due date calculator",
    "pregnancy due date estimator",
    "delivery date calculator",
    "naegele rule calculator",
    "ultrasound due date calculator",
    "ivf due date calculator",
    "pregnancy milestone tracker",
  ],
  priority: 1,
  relatedCalculators: [
    "pregnancy-calculator",
    "pregnancy-conception-calculator",
    "ovulation-calculator",
    "pregnancy-weight-gain-calculator",
    "bmi-calculator",
  ],
  formulaDescription:
    "Calculates EDD using ACOG guidelines & 5 clinical methods: LMP (+280d + cycle adjustment), Ultrasound Scan (ScanDate + 280d - ScanAge), Conception (+266d), or IVF Transfer Date (+261d to +263d).",
  faqs: due_date_calculatorFaqs,
  ContentComponent: DueDateContent,
  inputs: [
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "lmp",
      options: [
        { label: "First Day of Last Period (LMP)", value: "lmp" },
        { label: "Ultrasound Scan Date", value: "ultrasound" },
        { label: "Known Conception Date", value: "conception-date" },
        { label: "IVF Embryo Transfer Date", value: "ivf" },
        { label: "Reverse Target Due Date", value: "reverse" },
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
      label: "Menstrual Cycle Length (Days)",
      type: "number",
      defaultValue: 28,
      min: 20,
      max: 45,
    },
    {
      name: "ultrasoundDate",
      label: "Ultrasound Scan Date",
      type: "date",
      defaultValue: "2026-03-01",
    },
    {
      name: "ultrasoundWeeks",
      label: "Gestational Age Weeks at Scan",
      type: "number",
      defaultValue: 10,
      min: 4,
      max: 40,
    },
    {
      name: "ultrasoundDays",
      label: "Gestational Age Days at Scan",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 6,
    },
    {
      name: "conceptionDate",
      label: "Conception Date",
      type: "date",
      defaultValue: "2026-01-15",
    },
    {
      name: "ivfTransferDate",
      label: "IVF Transfer Date",
      type: "date",
      defaultValue: "2026-04-15",
    },
    {
      name: "ivfEmbryoType",
      label: "IVF Embryo Type",
      type: "select",
      defaultValue: "day5",
      options: [
        { label: "Day 5 Blastocyst Transfer", value: "day5" },
        { label: "Day 3 Embryo Transfer", value: "day3" },
        { label: "Fresh Egg Retrieval", value: "fresh-retrieval" },
      ],
    },
    {
      name: "isFirstPregnancy",
      label: "First Pregnancy (Primipara Statistical Adjustment)",
      type: "select",
      defaultValue: "true",
      options: [
        { label: "Yes (First Pregnancy)", value: "true" },
        { label: "No (Subsequent Pregnancy)", value: "false" },
      ],
    },
  ],
  outputs: [
    {
      name: "estimatedDueDateFormatted",
      label: "Estimated Due Date (EDD)",
      format: "text",
      highlight: true,
    },
    {
      name: "fullTermStartFormatted",
      label: "Optimal Full-Term Delivery Window",
      format: "text",
      highlight: true,
    },
    {
      name: "currentGestationalWeeks",
      label: "Current Gestational Age (Weeks)",
      format: "number",
    },
    {
      name: "daysRemaining",
      label: "Days Remaining Until Delivery",
      format: "number",
    },
    {
      name: "fetalSizeFruit",
      label: "Fetal Size Fruit Analogy",
      format: "text",
    },
  ],
  calculate: calculateDueDateCalculator,
};

export default due_date_calculatorConfig;
