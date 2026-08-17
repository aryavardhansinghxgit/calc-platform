import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const density_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Density Calculator — Mass, Volume, Buoyancy & Material Database (ρ = m/V)",
  description:
    "Free online density calculator to find density, mass, or volume. Features a searchable 50+ material database, interactive water tank buoyancy visualizer, ideal gas solver, and hydrostatic pressure calculator.",
  slug: "density-calculator",
});
