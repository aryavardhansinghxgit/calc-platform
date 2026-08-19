import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePasswordGenerator } from "./calculator";
import { password_generatorFaqs } from "./faq";
import { PasswordGenerator } from "@/components/calculator/password/PasswordGenerator";
import { PasswordContent } from "@/components/calculator/password/PasswordContent";

export const password_generatorConfig: CalculatorModuleDefinition = {
  id: "password-generator",
  title: "Password Generator",
  slug: "password-generator",
  category: "other",
  subcategory: "Tech & Electrical",
  description: "Generate cryptographically secure, fully customizable random passwords, memorizable passphrases, or secure PIN codes with local entropy and strength audits.",
  iconName: "Lock",
  featured: true,
  keywords: [
    "password generator",
    "secure password",
    "random password",
    "password strength",
    "password generator online",
    "random passphrase generator",
    "password entropy calculator",
    "CSPRNG password generator"
  ],
  priority: 1,
  relatedCalculators: ["ip-subnet-calculator", "binary-calculator"],
  formulaDescription: "Entropy Bits = Length × log2(Character Pool Size)",
  faqs: password_generatorFaqs,
  ContentComponent: PasswordContent,
  CustomComponent: PasswordGenerator,
  inputs: [
    {
      name: "length",
      label: "Password Length",
      type: "number",
      defaultValue: 16,
      min: 4,
      max: 128,
      step: 1
    }
  ],
  outputs: [
    {
      name: "generatedPassword",
      label: "Generated Password",
      format: "text",
      highlight: true
    },
    {
      name: "entropyBits",
      label: "Password Entropy",
      format: "number",
      unit: "bits"
    }
  ],
  calculate: calculatePasswordGenerator,
};

export default password_generatorConfig;
