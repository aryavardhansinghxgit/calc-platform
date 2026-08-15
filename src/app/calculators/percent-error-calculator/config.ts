import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePercentErrorCalculator } from "./calculator";
import { PercentErrorCalculator } from "@/components/calculator/percent-error/PercentErrorCalculator";
import { PercentErrorContent } from "@/components/calculator/percent-error/PercentErrorContent";

export const percent_error_calculatorConfig: CalculatorModuleDefinition = {
  id: "percent-error-calculator",
  title: "Percent Error Calculator",
  slug: "percent-error-calculator",
  category: "Math",
  subcategory: "General Math",
   description: "Calculate absolute and signed percent error, measurement accuracy, and error direction from an observed value and a true value.",
  iconName: "AlertCircle",
  featured: true,
   keywords: ["percent error","percentage error calculator","experimental error","relative error","measurement accuracy","absolute error"],
  priority: 1,
  relatedCalculators: ["percentage-calculator","rounding-calculator"],
   formulaDescription: "Percent Error = |Observed - True| / |True| × 100%",
   ContentComponent: PercentErrorContent,
   CustomComponent: PercentErrorCalculator,
  inputs: [
  {
    "name": "expVal",
     "label": "Observed / Measured Value",
    "type": "number",
    "defaultValue": 56.891,
    "min": -1000000,
    "max": 1000000,
     "step": 0.001
  },
  {
    "name": "theoVal",
     "label": "True / Accepted Value",
    "type": "number",
    "defaultValue": 62.327,
    "min": -1000000,
    "max": 1000000,
     "step": 0.001
  }
],
  outputs: [
   {
     "name": "percentError",
     "label": "Absolute Percent Error",
     "format": "percentage",
     "highlight": true
   },
   {
     "name": "absoluteError",
     "label": "Absolute Error",
     "format": "number"
   },
   {
     "name": "signedPercentError",
     "label": "Signed Percent Error",
     "format": "percentage"
   },
   {
     "name": "relativeError",
     "label": "Relative Error",
     "format": "number"
   },
   {
     "name": "accuracy",
     "label": "Closeness Score",
     "format": "percentage"
   }
],
  calculate: calculatePercentErrorCalculator,
};

export default percent_error_calculatorConfig;
