import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBase64EncodeDecode } from "./calculator";
import { base64_calculatorFaqs } from "./faq";
import { Base64Calculator } from "@/components/calculator/base64/Base64Calculator";
import { Base64Content } from "@/components/calculator/base64/Base64Content";

export const base64_calculatorConfig: CalculatorModuleDefinition = {
  id: "base64-calculator",
  title: "Base64 Encoder / Decoder",
  slug: "base64-calculator",
  category: "other",
  subcategory: "Internet",
  description: "Advanced client-side Base64 encoder and decoder. Converts text and drag-and-drop file assets into Base64 strings, RFC 4648 URL-Safe variants, and HTML/CSS Data URIs.",
  iconName: "Code",
  featured: true,
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64url",
    "url safe base64",
    "image to base64",
    "data uri generator",
    "base64 converter"
  ],
  priority: 1,
  relatedCalculators: ["url-encoder-decoder"],
  formulaDescription: "Base64 Binary-to-Text Encoding Algorithm (RFC 4648)",
  faqs: base64_calculatorFaqs,
  CustomComponent: Base64Calculator,
  ContentComponent: Base64Content,
  inputs: [
    {
      name: "text",
      label: "Input Text",
      type: "text",
      defaultValue: "Hello CalcPlatform!"
    },
    {
      name: "mode",
      label: "Operation",
      type: "select",
      defaultValue: "encode",
      options: [
        {
          label: "Encode to Base64",
          value: "encode"
        },
        {
          label: "Decode from Base64",
          value: "decode"
        }
      ]
    }
  ],
  outputs: [
    {
      name: "result",
      label: "Processed Output",
      format: "text",
      highlight: true
    }
  ],
  calculate: calculateBase64EncodeDecode,
} as any;

export default base64_calculatorConfig;
