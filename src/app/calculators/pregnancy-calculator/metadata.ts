import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pregnancy_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Advanced Pregnancy Calculator — Due Date, Timeline, Weekly Baby Growth & Weight Gain",
  description:
    "Free clinical-grade Pregnancy Calculator with 7 calculation modes (LMP, Due Date, Conception, Ultrasound, IVF, Custom, Reverse). Features week-by-week baby development (Weeks 1–42), IOM weight gain corridor, birth probability curve, milestone calendar, and clinical PDF report generator.",
  slug: "pregnancy-calculator",
});
