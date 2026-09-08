import { Metadata } from "next";

export const density_calculatorMetadata: Metadata = {
  title: "Density Calculator – Density, Mass, Volume & Specific Gravity",
  description:
    "Calculate density, mass, or volume from ρ = m/V. Convert density units, compare specific gravity, test buoyancy, calculate gas density and hydrostatic pressure.",
  alternates: {
    canonical: "https://calcplatform.com/calculators/density-calculator",
  },
  openGraph: {
    title: "Density Calculator – Mass, Volume, Specific Gravity & Buoyancy",
    description:
      "Calculate density from mass and volume, find mass or volume, convert density units, explore material densities, and solve gas and fluid-pressure problems.",
    url: "https://calcplatform.com/calculators/density-calculator",
    type: "website",
    images: [
      {
        url: "https://calcplatform.com/og?title=Density%20Calculator",
        width: 1200,
        height: 630,
        alt: "Density Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Density Calculator – Mass, Volume, Specific Gravity & Buoyancy",
    description:
      "Calculate density from mass and volume, find mass or volume, convert density units, explore material densities, and solve gas and fluid-pressure problems.",
  },
};
