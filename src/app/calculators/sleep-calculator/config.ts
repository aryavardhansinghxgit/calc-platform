import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSleepFromInputs } from "./calculator";
import { sleep_calculatorFaqs } from "./faq";
import { SleepCalculator } from "@/components/calculator/sleep/SleepCalculator";
import { SleepContent } from "@/components/calculator/sleep/SleepContent";

export const sleep_calculatorConfig: CalculatorModuleDefinition = {
  id: "sleep-calculator",
  title: "Sleep Calculator",
  slug: "sleep-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Free online sleep cycle calculator. Calculate optimal bedtimes and wake-up times based on 90-minute ultradian cycles, sleep latency, power naps, and chronotypes.",
  iconName: "Moon",
  featured: true,
  keywords: [
    "sleep calculator",
    "bedtime calculator",
    "sleep cycle calculator",
    "wake up calculator",
    "power nap calculator",
    "sleep latency buffer",
    "nappuccino"
  ],
  priority: 1,
  relatedCalculators: ["time-calculator"],
  formulaDescription: "Target Time ± (N × 90 min Sleep Cycles) ± Sleep Latency Buffer",
  faqs: sleep_calculatorFaqs,
  CustomComponent: SleepCalculator,
  ContentComponent: SleepContent,
  inputs: [
    {
      name: "targetTime",
      label: "Desired Time (HH:MM AM/PM)",
      type: "text",
      defaultValue: "07:00 AM"
    },
    {
      name: "latency",
      label: "Sleep Latency Buffer (mins)",
      type: "number",
      defaultValue: 15,
      min: 0,
      max: 60
    }
  ],
  outputs: [
    {
      name: "idealBedtime",
      label: "Optimal Bedtime (5 Cycles / 7.5 hrs)",
      format: "text",
      highlight: true
    }
  ],
  calculate: calculateSleepFromInputs,
} as any;

export default sleep_calculatorConfig;
