import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBase64EncodeDecode } from "./calculator";
import { base64_calculatorFaqs } from "./faq";

export const base64_calculatorConfig: CalculatorModuleDefinition = {
  id: "base64-calculator",
  title: "Base64 Encode / Decode",
  slug: "base64-calculator",
  category: "other",
  subcategory: "Internet",
  description: "Encode text strings into Base64 format or decode Base64 back to plain text.",
  iconName: "Code",
  featured: true,
  keywords: ["base64 encoder","base64 decoder","base64 converter"],
  priority: 1,
  relatedCalculators: ["url-encoder-decoder"],
  formulaDescription: "Base64 Binary-to-Text Encoding Standard",
  faqs: base64_calculatorFaqs,
  inputs: [
  {
    "name": "text",
    "label": "Input Text",
    "type": "text",
    "defaultValue": "Hello CalcPlatform!"
  },
  {
    "name": "mode",
    "label": "Operation",
    "type": "select",
    "defaultValue": "encode",
    "options": [
      {
        "label": "Encode to Base64",
        "value": "encode"
      },
      {
        "label": "Decode from Base64",
        "value": "decode"
      }
    ]
  }
],
  outputs: [
  {
    "name": "result",
    "label": "Processed Output",
    "format": "text",
    "highlight": true
  }
],
  calculate: calculateBase64EncodeDecode,
};

export default base64_calculatorConfig;
