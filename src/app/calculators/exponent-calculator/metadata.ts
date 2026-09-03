import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const exponent_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Exponent Calculator: Powers, Fractional Exponents & Exponent Laws",
    description: "Calculate powers, solve for bases or exponents, simplify fractional and negative exponents, apply exponent laws, and convert numbers to scientific, engineering and E notation with step-by-step solutions.",
    slug: "exponent-calculator"
  }),
  keywords: [
    "exponent calculator",
    "power calculator",
    "exponent rules",
    "fractional exponent calculator",
    "radical solver",
    "scientific notation exponent",
    "solve for base",
    "solve for exponent",
    "exponent laws step by step"
  ]
};

export default exponent_calculatorMetadata;
