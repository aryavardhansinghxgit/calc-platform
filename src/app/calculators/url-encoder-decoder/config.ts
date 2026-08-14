import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateUrlEncoderDecoder } from "./calculator";
import { url_encoder_decoderFaqs } from "./faq";
import { URLEncoderDecoder } from "@/components/calculator/url-encoder/URLEncoderDecoder";
import { URLEncoderContent } from "@/components/calculator/url-encoder/URLEncoderContent";

export const url_encoder_decoderConfig: CalculatorModuleDefinition = {
  id: "url-encoder-decoder",
  title: "URL Encoder / Decoder",
  slug: "url-encoder-decoder",
  category: "other",
  subcategory: "Internet",
  description: "Advanced client-side percent-encoding and decoding tool. Includes interactive query parameter key-value table editor, URL breakdown inspector, 4 encoding modes, and RFC 3986 compliance.",
  iconName: "Link2",
  featured: true,
  keywords: [
    "url encoder",
    "url decoder",
    "percent encoding",
    "encodeuricomponent",
    "encodeuri",
    "url query string parser",
    "rfc 3986"
  ],
  priority: 1,
  relatedCalculators: ["base64-calculator", "ip-subnet-calculator"],
  formulaDescription: "RFC 3986 Percent-Encoding Algorithm (%XX)",
  faqs: url_encoder_decoderFaqs,
  CustomComponent: URLEncoderDecoder,
  ContentComponent: URLEncoderContent,
  inputs: [
    {
      name: "text",
      label: "Input Text / URL",
      type: "text",
      defaultValue: "https://api.example.com/v1/search?query=hello world"
    },
    {
      name: "mode",
      label: "Operation",
      type: "select",
      defaultValue: "encode",
      options: [
        {
          label: "Encode URL",
          value: "encode"
        },
        {
          label: "Decode URL",
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
  calculate: calculateUrlEncoderDecoder,
} as any;

export default url_encoder_decoderConfig;
