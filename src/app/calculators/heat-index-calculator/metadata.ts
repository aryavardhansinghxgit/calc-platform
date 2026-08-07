import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const heat_index_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Heat Index Calculator — Free Online Calculator",
  description: "Calculate apparent \"feels like\" heat index from air temperature and relative humidity.",
  slug: "heat-index-calculator",
});
