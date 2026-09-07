import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const btu_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BTU Calculator – AC Cooling, Heating Load & Energy Cost",
  description:
    "Calculate AC cooling BTUs, heating load, AC tonnage, kW, fuel use, SEER energy costs and carbon estimates. Free BTU calculator with step-by-step results.",
  slug: "btu-calculator",
});
