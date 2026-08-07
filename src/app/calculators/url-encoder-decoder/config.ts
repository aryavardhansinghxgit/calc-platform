import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateURLEncodeDecode } from "./calculator";
import { url_encoder_decoderFaqs } from "./faq";

export const url_encoder_decoderConfig: CalculatorModuleDefinition = {
  id: "url-encoder-decoder",
  title: "URL Encode / Decode",
  slug: "url-encoder-decoder",
  category: "converters",
  subcategory: "Internet",
  description: "Encode special characters for web URLs or decode percent-encoded URLs.",
  iconName: "Link",
  featured: true,
  keywords: ["url encoder","url decoder","percent encoding"],
  priority: 1,
  relatedCalculators: ["base64-calculator"],
  formulaDescription: "Percent-Encoding RFC 3986 Standard",
  faqs: url_encoder_decoderFaqs,
  inputs: [
  {
    "name": "text",
    "label": "Input URL / Text",
    "type": "text",
    "defaultValue": "https://calcplatform.com/search?q=math & health"
  },
  {
    "name": "mode",
    "label": "Operation",
    "type": "select",
    "defaultValue": "encode",
    "options": [
      {
        "label": "URL Encode",
        "value": "encode"
      },
      {
        "label": "URL Decode",
        "value": "decode"
      }
    ]
  }
],
  outputs: [
  {
    "name": "result",
    "label": "Processed URL Output",
    "format": "text",
    "highlight": true
  }
],
  calculate: calculateURLEncodeDecode,
};

export default url_encoder_decoderConfig;
