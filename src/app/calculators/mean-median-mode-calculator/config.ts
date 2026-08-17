import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMeanMedianModeRangeCalculator } from "./calculator";
import { MeanMedianModeCalculator } from "@/components/calculator/mean-median-mode/MeanMedianModeCalculator";
import { MeanMedianModeContent } from "@/components/calculator/mean-median-mode/MeanMedianModeContent";

export const mean_median_mode_calculatorConfig: CalculatorModuleDefinition = {
  id: "mean-median-mode-calculator",
  title: "Mean, Median, Mode & Range Calculator — Central Tendency Suite",
  slug: "mean-median-mode-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate central tendency metrics (Mean, Median, Mode), Range, Weighted Means, Grouped Data, Target Score Solvers, and Outlier Skewness.",
  iconName: "Sliders",
  featured: true,
  keywords: ["mean median mode","average calculator","median calculator","mode calculator","central tendency","range calculator"],
  priority: 1,
  relatedCalculators: ["statistics-calculator","standard-deviation-calculator"],
  formulaDescription: "Mean = Σx / N; Median = Middle Value; Mode = Most Frequent",
  faqs: [],
  CustomComponent: MeanMedianModeCalculator,
  ContentComponent: MeanMedianModeContent,
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
