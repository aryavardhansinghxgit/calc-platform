import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePregnancyConceptionCalculator } from "./calculator";
import { pregnancy_conception_calculatorFaqs } from "./faq";
import { PregnancyConceptionContent } from "@/components/calculator/pregnancy-conception/PregnancyConceptionContent";

export const pregnancy_conception_calculatorConfig: CalculatorModuleDefinition = {
  id: "pregnancy-conception-calculator",
  title: "Pregnancy Conception Calculator",
  slug: "pregnancy-conception-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description:
    "Estimate conception, ovulation, fertile-window timing and due dates from your cycle, ultrasound, conception or IVF dates with a clear pregnancy timeline.",
  iconName: "Heart",
  featured: true,
  keywords: [
    "pregnancy conception calculator",
    "conception date calculator",
    "when did i conceive calculator",
    "pregnancy conception estimator",
    "fertile window calculator",
    "ovulation calculator",
    "ivf conception calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "pregnancy-calculator",
    "due-date-calculator",
    "ovulation-calculator",
    "pregnancy-weight-gain-calculator",
    "bmi-calculator",
  ],
  formulaDescription:
    "Calculates conception date using 7 clinical methods based on ACOG & ASRM standards: Due Date (-266d), LMP (+CycleLength - LutealPhase), Ultrasound Scan (ScanDate - GestationalAge + (CycleLength - LutealPhase)), or IVF Embryo Transfer Date.",
  faqs: pregnancy_conception_calculatorFaqs,
  ContentComponent: PregnancyConceptionContent,
  inputs: [
    {
      name: "calculationMode",
      label: "Calculation Mode",
      type: "select",
      defaultValue: "due-date",
      options: [
        { label: "Calculate Using Due Date", value: "due-date" },
        { label: "Calculate Using Last Menstrual Period (LMP)", value: "lmp" },
        { label: "Calculate Using Ultrasound Date", value: "ultrasound" },
        { label: "Calculate Using Conception Date", value: "conception-date" },
        { label: "Calculate Using Ovulation Date", value: "ovulation-date" },
        { label: "Reverse Intercourse Dating Mode", value: "reverse" },
        { label: "Calculate Using IVF Transfer Date", value: "ivf" },
      ],
    },
    {
      name: "dueDate",
      label: "Estimated Due Date",
      type: "date",
      defaultValue: "2026-10-08",
    },
    {
      name: "lmpDate",
      label: "First Day of Last Period (LMP)",
      type: "date",
      defaultValue: "2026-01-01",
    },
    {
      name: "ultrasoundDate",
      label: "Ultrasound Date",
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
      name: "ovulationDate",
      label: "Ovulation Date",
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
        { label: "Day 5 Blastocyst", value: "day5" },
        { label: "Day 3 Embryo", value: "day3" },
        { label: "Fresh Egg Retrieval", value: "fresh-retrieval" },
      ],
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
      name: "lutealPhaseLength",
      label: "Luteal Phase Length (Days)",
      type: "number",
      defaultValue: 14,
      min: 9,
      max: 18,
    },
    {
      name: "motherAge",
      label: "Mother's Age",
      type: "number",
      defaultValue: 28,
      min: 18,
      max: 50,
    },
  ],
  outputs: [
    {
      name: "estimatedConceptionDateFormatted",
      label: "Estimated Conception Date",
      format: "text",
      highlight: true,
    },
    {
      name: "fertileWindowFormatted",
      label: "Most Fertile Intercourse Window",
      format: "text",
      highlight: true,
    },
    {
      name: "implantationWindowFormatted",
      label: "Estimated Implantation Window",
      format: "text",
    },
    {
      name: "estimatedDueDateFormatted",
      label: "Estimated Due Date",
      format: "text",
      highlight: true,
    },
    {
      name: "earliestHcgUrineTestDateFormatted",
      label: "Earliest Reliable Home Pregnancy Test",
      format: "text",
    },
  ],
  calculate: calculatePregnancyConceptionCalculator,
};

export default pregnancy_conception_calculatorConfig;
