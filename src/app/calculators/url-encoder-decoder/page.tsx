import { Metadata } from "next";
import { url_encoder_decoderMetadata } from "./metadata";
import { url_encoder_decoderConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = url_encoder_decoderMetadata;

export default function URLEncodeDecodePage() {
  const { calculate, ...serializableDef } = url_encoder_decoderConfig;
  const schemas = generateJsonLdSchema({
    title: url_encoder_decoderConfig.title,
    description: url_encoder_decoderConfig.description,
    slug: url_encoder_decoderConfig.slug,
    category: url_encoder_decoderConfig.category,
    faqs: url_encoder_decoderConfig.faqs,
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
