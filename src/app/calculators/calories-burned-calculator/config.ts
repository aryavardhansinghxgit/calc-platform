import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCaloriesBurnedCalculator } from "./calculator";
import { calories_burned_calculatorFaqs } from "./faq";

export const calories_burned_calculatorConfig: CalculatorModuleDefinition = {
  id: "calories-burned-calculator",
  title: "Calories Burned Calculator",
  slug: "calories-burned-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Estimate calories burned during physical activities such as running, cycling, swimming, and weightlifting.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["calories burned","exercise calories","met","workout calories"],
  priority: 1,
  relatedCalculators: ["calorie-calculator","pace-calculator"],
  formulaDescription: "Calories = MET × 3.5 × Weight(kg) / 200 × Duration(minutes)",
  faqs: calories_burned_calculatorFaqs,
  inputs: [
  {
    "name": "activity",
    "label": "Activity Type",
    "type": "select",
    "defaultValue": "running_8kmh",
    "options": [
      {
        "label": "Walking (5 km/h)",
        "value": "3.5"
      },
      {
        "label": "Running (8 km/h)",
        "value": "8.3"
      },
      {
        "label": "Running (12 km/h)",
        "value": "11.5"
      },
      {
        "label": "Cycling (moderate)",
        "value": "7.5"
      },
      {
        "label": "Swimming (freestyle)",
        "value": "8.0"
      },
      {
        "label": "Weightlifting (intense)",
        "value": "6.0"
      },
      {
        "label": "Yoga",
        "value": "3.0"
      }
    ]
  },
  {
    "name": "weightKg",
    "label": "Your Weight (kg)",
    "type": "number",
    "defaultValue": 70,
    "min": 30,
    "max": 250,
    "step": 1
  },
  {
    "name": "durationMins",
    "label": "Duration (minutes)",
    "type": "number",
    "defaultValue": 45,
    "min": 1,
    "max": 600,
    "step": 5
  }
],
  outputs: [
  {
    "name": "caloriesBurned",
    "label": "Total Calories Burned",
    "format": "number",
    "highlight": true,
    "unit": "kcal"
  },
  {
    "name": "metValue",
    "label": "MET Value",
    "format": "number"
  },
  {
    "name": "calPerMin",
    "label": "Burn Rate",
    "format": "number",
    "unit": "kcal/min"
  }
],
  calculate: calculateCaloriesBurnedCalculator,
};

export default calories_burned_calculatorConfig;
