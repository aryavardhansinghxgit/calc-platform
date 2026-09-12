import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const password_generatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Password Generator – Strong Random Passwords, Passphrases & PINs",
  description: "Generate strong random passwords, passphrases and PINs with a cryptographic random source. Check entropy, search space, exclusions and password strength locally.",
  slug: "password-generator",
});
