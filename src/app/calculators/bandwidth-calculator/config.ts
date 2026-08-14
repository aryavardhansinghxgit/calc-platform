import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBandwidthCalculator } from "./calculator";
import { bandwidth_calculatorFaqs } from "./faq";
import { BandwidthCalculator } from "@/components/calculator/bandwidth/BandwidthCalculator";
import { BandwidthContent } from "@/components/calculator/bandwidth/BandwidthContent";

export const bandwidth_calculatorConfig: CalculatorModuleDefinition = {
  id: "bandwidth-calculator",
  title: "Bandwidth Calculator",
  slug: "bandwidth-calculator",
  category: "other",
  subcategory: "Internet",
  description: "Calculate file download/upload duration, dynamic bandwidth unit conversions, web server hosting port bandwidth, and multi-device concurrency requirements.",
  iconName: "Wifi",
  featured: true,
  keywords: [
    "bandwidth calculator",
    "download time calculator",
    "upload time calculator",
    "mbps to megabytes",
    "internet speed converter",
    "hosting bandwidth calculator",
    "concurrency bandwidth planner",
    "protocol overhead loss"
  ],
  priority: 1,
  relatedCalculators: ["ip-subnet-calculator"],
  formulaDescription: "Download Time = (File Size MB × 8) / (Speed Mbps × Overhead Factor)",
  faqs: bandwidth_calculatorFaqs,
  inputs: [
    {
      name: "fileSizeMb",
      label: "File Size (MB)",
      type: "number",
      defaultValue: 1000,
      min: 1,
      max: 1000000,
      step: 50
    },
    {
      name: "speedMbps",
      label: "Internet Speed (Mbps)",
      type: "number",
      defaultValue: 100,
      min: 1,
      max: 10000,
      step: 10
    }
  ],
  outputs: [
    {
      name: "downloadTimeSecs",
      label: "Download Time (Seconds)",
      format: "number",
      highlight: true
    },
    {
      name: "formattedTime",
      label: "Formatted Duration",
      format: "text"
    }
  ],
  calculate: calculateBandwidthCalculator,
  CustomComponent: BandwidthCalculator,
  ContentComponent: BandwidthContent,
} as any;

export default bandwidth_calculatorConfig;
