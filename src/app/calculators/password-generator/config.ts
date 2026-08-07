import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePasswordGenerator } from "./calculator";
import { password_generatorFaqs } from "./faq";

export const password_generatorConfig: CalculatorModuleDefinition = {
  id: "password-generator",
  title: "Password Generator",
  slug: "password-generator",
  category: "other",
  subcategory: "Internet",
  description: "Generate secure, customizable random passwords with entropy metrics.",
  iconName: "Lock",
  featured: true,
  keywords: ["password generator","secure password","random password","password strength"],
  priority: 1,
  relatedCalculators: ["ip-subnet-calculator"],
  formulaDescription: "Entropy Bits = Length × log2(Character Pool Size)",
  faqs: password_generatorFaqs,
  inputs: [
  {
    "name": "length",
    "label": "Password Length",
    "type": "number",
    "defaultValue": 16,
    "min": 6,
    "max": 64,
    "step": 1
  }
],
  outputs: [
  {
    "name": "generatedPassword",
    "label": "Generated Password",
    "format": "text",
    "highlight": true
  },
  {
    "name": "entropyBits",
    "label": "Password Entropy",
    "format": "number",
    "unit": "bits"
  }
],
  calculate: calculatePasswordGenerator,
};

export default password_generatorConfig;
