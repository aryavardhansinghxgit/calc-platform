import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSleepCalculator } from "./calculator";
import { sleep_calculatorFaqs } from "./faq";

export const sleep_calculatorConfig: CalculatorModuleDefinition = {
  id: "sleep-calculator",
  title: "Sleep Calculator",
  slug: "sleep-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate optimal bedtimes and wake times based on 90-minute natural sleep cycles.",
  iconName: "Moon",
  featured: true,
  keywords: ["sleep calculator","bedtime calculator","sleep cycles","rem sleep"],
  priority: 1,
  relatedCalculators: ["time-calculator"],
  formulaDescription: "Bedtime = Wake Time - (N × 90 min Sleep Cycles + 14 min Fall Asleep Time)",
  faqs: sleep_calculatorFaqs,
  inputs: [
  {
    "name": "wakeTime",
    "label": "Desired Wake Up Time (HH:MM)",
    "type": "text",
    "defaultValue": "07:00"
  }
],
  outputs: [
  {
    "name": "idealBedtime",
    "label": "Ideal Bedtime (6 cycles - 9 hrs)",
    "format": "text",
    "highlight": true
  },
  {
    "name": "goodBedtime",
    "label": "Good Bedtime (5 cycles - 7.5 hrs)",
    "format": "text"
  }
],
  calculate: calculateSleepCalculator,
};

export default sleep_calculatorConfig;
