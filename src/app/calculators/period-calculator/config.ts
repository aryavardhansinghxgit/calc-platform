import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePeriodCalculator } from "./calculator";
import { period_calculatorFaqs } from "./faq";

export const period_calculatorConfig: CalculatorModuleDefinition = {
  id: "period-calculator",
  title: "Period Calculator",
  slug: "period-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Predict upcoming menstrual cycles, period start dates, fertile days, and ovulation timing.",
  iconName: "CalendarDays",
  featured: true,
  keywords: ["period calculator","menstrual cycle","period tracker","cycle"],
  priority: 1,
  relatedCalculators: ["ovulation-calculator","pregnancy-calculator"],
  formulaDescription: "Next Period Date = Last Period + Cycle Length",
  faqs: period_calculatorFaqs,
  inputs: [
  {
    "name": "lastPeriod",
    "label": "First Day of Last Period",
    "type": "date",
    "defaultValue": "2026-08-01"
  },
  {
    "name": "cycleLength",
    "label": "Cycle Length (days)",
    "type": "number",
    "defaultValue": 28,
    "min": 20,
    "max": 45,
    "step": 1
  }
],
  outputs: [
  {
    "name": "nextPeriod",
    "label": "Next Period Start Date",
    "format": "text",
    "highlight": true
  },
  {
    "name": "followingPeriod",
    "label": "Subsequent Period Date",
    "format": "text"
  }
],
  calculate: calculatePeriodCalculator,
};

export default period_calculatorConfig;
