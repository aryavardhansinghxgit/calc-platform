import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBandwidthCalculator } from "./calculator";
import { bandwidth_calculatorFaqs } from "./faq";

export const bandwidth_calculatorConfig: CalculatorModuleDefinition = {
  id: "bandwidth-calculator",
  title: "Bandwidth Calculator",
  slug: "bandwidth-calculator",
  category: "other",
  subcategory: "Internet",
  description: "Calculate file download and upload duration based on network bandwidth speed.",
  iconName: "Wifi",
  featured: true,
  keywords: ["bandwidth calculator","download time","mbps to megabytes","speed test"],
  priority: 1,
  relatedCalculators: ["ip-subnet-calculator"],
  formulaDescription: "Download Time = (File Size MB × 8) / Connection Speed Mbps",
  faqs: bandwidth_calculatorFaqs,
  inputs: [
  {
    "name": "fileSizeMb",
    "label": "File Size (MB)",
    "type": "number",
    "defaultValue": 1000,
    "min": 1,
    "max": 1000000,
    "step": 50
  },
  {
    "name": "speedMbps",
    "label": "Internet Speed (Mbps)",
    "type": "number",
    "defaultValue": 100,
    "min": 1,
    "max": 10000,
    "step": 10
  }
],
  outputs: [
  {
    "name": "downloadTimeSecs",
    "label": "Download Time (Seconds)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "formattedTime",
    "label": "Formatted Duration",
    "format": "text"
  }
],
  calculate: calculateBandwidthCalculator,
};

export default bandwidth_calculatorConfig;
