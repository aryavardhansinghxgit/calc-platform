import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const heat_index_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Heat Index Calculator — NOAA Formula & OSHA Work Schedule",
  description: "Free online Heat Index Calculator. Calculate feels-like heat index with NOAA Rothfusz regression, Dew Point dual mode, direct sunshine +15°F toggle & OSHA work/rest schedules.",
  slug: "heat-index-calculator",
});
