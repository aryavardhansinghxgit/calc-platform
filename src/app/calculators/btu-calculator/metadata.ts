import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const btu_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BTU Calculator — AC Cooling & Heating Load Sizing Suite",
  description:
    "Free BTU calculator to determine exact cooling and heating capacity (BTU/hr, Tons, kW), SEER energy running costs, and room sizing charts for homes and commercial spaces.",
  slug: "btu-calculator",
});
