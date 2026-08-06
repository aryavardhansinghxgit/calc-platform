/**
 * SEO & Structured Data (JSON-LD) Helper Module.
 */

export interface CalculatorSeoProps {
  title: string;
  description: string;
  slug: string;
  baseUrl?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export function generateCalculatorMetadata({
  title,
  description,
  slug,
  baseUrl = "https://calcplatform.example.com",
}: CalculatorSeoProps) {
  const canonicalUrl = `${baseUrl}/calculators/${slug}`;

  return {
    title: `${title} - Free Online Calculator | CalcPlatform`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | CalcPlatform`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | CalcPlatform`,
      description,
    },
  };
}

export function generateJsonLdSchema({
  title,
  description,
  slug,
  baseUrl = "https://calcplatform.example.com",
  faqs = [],
}: CalculatorSeoProps) {
  const canonicalUrl = `${baseUrl}/calculators/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${baseUrl}/#calculators`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    url: canonicalUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return [breadcrumbSchema, calculatorSchema, faqSchema].filter(Boolean);
}
