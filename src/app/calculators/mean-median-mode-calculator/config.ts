import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMeanMedianModeRangeCalculator } from "./calculator";
import { mean_median_mode_calculatorFaqs } from "./faq";

export const mean_median_mode_calculatorConfig: CalculatorModuleDefinition = {
  id: "mean-median-mode-calculator",
  title: "Mean, Median, Mode & Range Calculator",
  slug: "mean-median-mode-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate central tendency metrics (Mean, Median, Mode) and dispersion Range for data sets.",
  iconName: "Sliders",
  featured: true,
  keywords: ["mean median mode","average","central tendency","range"],
  priority: 1,
  relatedCalculators: ["statistics-calculator","standard-deviation-calculator"],
  formulaDescription: "Mean = Σx / N; Median = Middle Value; Mode = Most Frequent",
  faqs: mean_median_mode_calculatorFaqs,
  inputs: [
  {
    "name": "dataSeries",
    "label": "Numbers (comma-separated)",
    "type": "text",
    "defaultValue": "12, 15, 12, 18, 22, 12, 15, 30"
  }
],
  outputs: [
  {
    "name": "mean",
    "label": "Mean (Average)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "median",
    "label": "Median",
    "format": "number"
  },
  {
    "name": "mode",
    "label": "Mode(s)",
    "format": "text"
  },
  {
    "name": "range",
    "label": "Range",
    "format": "number"
  }
],
  calculate: calculateMeanMedianModeRangeCalculator,
};

export default mean_median_mode_calculatorConfig;
