import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSleepFromInputs } from "./calculator";
import { sleep_calculatorFaqs } from "./faq";

export const sleep_calculatorConfig: CalculatorModuleDefinition = {
  id: "sleep-calculator",
  title: "Sleep Calculator",
  slug: "sleep-calculator",
  category: "other",
  subcategory: "Everyday & Lifestyle",
  description: "Plan sleep and wake times, estimate bedtime from your target wake time, plan naps, calculate a weekly sleep deficit, and explore sleep-pattern preferences.",
  iconName: "Moon",
  featured: true,
  keywords: [
    "sleep calculator",
    "sleep cycle calculator",
    "bedtime calculator",
    "wake up calculator",
    "what time should I go to bed",
    "what time should I wake up",
    "sleep calculator bedtime",
    "sleep schedule calculator",
    "sleep cycle calculator 90 minutes",
    "nap calculator",
    "power nap calculator",
    "20 minute nap calculator",
    "90 minute nap calculator",
    "sleep debt calculator",
    "sleep deficit calculator",
    "sleep deprivation calculator",
    "chronotype quiz",
    "sleep schedule planner",
    "recommended bedtime calculator",
    "calculate bedtime from wake time"
  ],
  priority: 1,
  relatedCalculators: ["time-calculator"],
  formulaDescription: "Target Time ± (N × 90 min Sleep Cycles) ± Sleep Latency Buffer",
  faqs: sleep_calculatorFaqs,
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
