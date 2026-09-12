import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const heat_index_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Heat Index Calculator – NWS Formula, Chart & Heat Risk",
  description: "Calculate heat index from temperature and humidity using the NWS method. See the heat index chart, direct-sun estimate, dew point mode and heat-risk guidance.",
  slug: "heat-index-calculator",
});
