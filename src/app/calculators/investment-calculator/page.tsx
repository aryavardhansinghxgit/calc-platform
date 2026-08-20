import { Metadata } from "next";
import { INVESTMENT_CALCULATOR } from "@/calculators/finance/investment";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateCalculatorMetadata, generateJsonLdSchema } from "@/lib/seo-helpers";

export async function generateMetadata(): Promise<Metadata> {
  const baseMeta = generateCalculatorMetadata({
    title: "Investment Calculator — Portfolio Growth & Future Value Planner",
    description:
      "Calculate future portfolio growth with initial principal, recurring contributions, and expected rate of return.",
    slug: INVESTMENT_CALCULATOR.slug,
  });

  return {
    ...baseMeta,
    keywords: [
      "investment calculator",
      "portfolio growth calculator",
      "future value investment calculator",
      "compound investment calculator",
      "monthly investment calculator",
      "investment return calculator",
      "wealth building calculator",
      "fire investment calculator",
    ],
    openGraph: {
      ...baseMeta.openGraph,
      title: "Investment Calculator — Portfolio Growth & Future Value Planner",
      description:
        "Calculate future portfolio growth with initial principal, recurring contributions, and expected rate of return.",
    },
    twitter: {
      ...baseMeta.twitter,
      title: "Investment Calculator — Portfolio Growth & Future Value Planner",
      description:
        "Calculate future portfolio growth with initial principal, recurring contributions, and expected rate of return.",
    },
  };
}

export default function InvestmentCalculatorPage() {
  const { calculate, ...serializableDef } = INVESTMENT_CALCULATOR;

  const faqs = [
    {
      question: "What is a good annual investment return?",
      answer:
        "Historically, a broad stock market index fund (e.g. S&P 500) returns an average of 8–10% annually before inflation. Balanced portfolios with fixed-income bonds generally target 5–7% nominal annual returns.",
    },
    {
      question: "How much should I invest monthly?",
      answer:
        "Financial advisors generally recommend investing 15–20% of your gross annual income into retirement and growth portfolios to build long-term financial independence.",
    },
    {
      question: "What is dollar-cost averaging (DCA)?",
      answer:
        "Dollar-cost averaging (DCA) is the disciplined practice of investing a fixed dollar amount at recurring intervals regardless of market fluctuations, reducing timing risk and emotional volatility.",
    },
    {
      question: "Should I invest monthly or annually?",
      answer:
        "Monthly contributions put capital to work faster, capturing intra-year compound returns and dollar-cost averaging benefits compared to a single annual lump-sum deposit at year-end.",
    },
    {
      question: "How does the FIRE number work?",
      answer:
        "Your Financial Independence, Retire Early (FIRE) number typically equals 25 times your anticipated annual living expenses, derived from the academic 4% safe withdrawal rule.",
    },
    {
      question: "How does expense ratio impact portfolio growth?",
      answer:
        "High management fees compound exponentially over time. An expense ratio of 1.00% versus 0.05% in low-cost index funds can erase up to 25% of total potential investment wealth over a 30-year horizon.",
    },
  ];

  const schemas = generateJsonLdSchema({
    title: "Investment Calculator — Portfolio Growth & Future Value Planner",
    description:
      "Calculate future portfolio growth with initial principal, recurring contributions, and expected rate of return.",
    slug: INVESTMENT_CALCULATOR.slug,
    category: INVESTMENT_CALCULATOR.category,
    faqs: faqs,
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Investment Calculator — Portfolio Growth & Future Value Planner",
    url: "/calculators/investment-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Calculate future portfolio growth with initial principal, recurring contributions, and expected rate of return.",
  };

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <CalculatorLayout definition={serializableDef as any} />
    </>
  );
}
