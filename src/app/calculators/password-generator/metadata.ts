import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const password_generatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Password Generator — Free Online Calculator",
  description: "Generate secure, customizable random passwords with entropy metrics.",
  slug: "password-generator",
});
