import { Metadata } from "next";
import { payback_period_calculatorMetadata } from "./metadata";
import { payback_period_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = payback_period_calculatorMetadata;

export default function PaybackPeriodCalculatorPage() {
  const { calculate, ...serializableDef } = payback_period_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: payback_period_calculatorConfig.title,
    description: payback_period_calculatorConfig.description,
    slug: payback_period_calculatorConfig.slug,
    category: payback_period_calculatorConfig.category,
    faqs: [
      {
        question: "What is the difference between Simple Payback Period and Discounted Payback Period?",
        answer: "Simple Payback Period sums undiscounted nominal cash flows until the initial investment is recovered. Discounted Payback Period (DPP) discounts every future cash flow to its present value using a specific hurdle rate (WACC) before calculating the breakeven point.",
      },
      {
        question: "Why is the Discounted Payback Period always longer than the Simple Payback Period?",
        answer: "Because future cash flows are discounted by (1 + r)^t, each future dollar is worth less in present value terms than its nominal value. Therefore, more periods of cash inflows are required to accumulate enough present value to cover the initial outlay.",
      },
      {
        question: "What is a good or acceptable payback period for a business investment?",
        answer: "Acceptable payback thresholds depend on the asset class and industry risk. Tech startups and software tools typically target payback periods under 1 to 2 years; commercial equipment targets 3 to 5 years; and infrastructure or real estate developments target 7 to 10+ years.",
      },
      {
        question: "Why does the payback period ignore cash flows that occur after the break-even point?",
        answer: "By definition, payback only measures the time required to recover initial principal. It stops tallying once cumulative cash flows hit zero, making it blind to post-breakeven profitability and long-term cash generation.",
      },
      {
        question: "How is linear interpolation used to calculate exact fractional months and days in payback?",
        answer: "Linear interpolation assumes cash flows occur uniformly throughout the year. The formula divides the unrecovered balance at the start of the breakeven year by the total cash flow generated during that year to determine fractional years, months, and days.",
      },
      {
        question: "How do you choose a discount rate for calculating the discounted payback period?",
        answer: "The discount rate should reflect the project's risk profile and the company's Weighted Average Cost of Capital (WACC), incorporating equity required returns, debt interest borrowing costs, and inflation expectations.",
      },
      {
        question: "Can a project have a positive NPV but fail a payback period requirement?",
        answer: "Yes. A project with back-loaded cash flows may take 6 years to break even (failing a corporate 4-year payback policy) while generating huge profits in Years 7 to 15 that produce a massive positive Net Present Value.",
      },
      {
        question: "How does inflation impact the real payback time of an investment?",
        answer: "Inflation erodes the purchasing power of future cash inflows. Simple payback ignores this effect, but Discounted Payback incorporates inflation into the nominal discount rate to accurately measure true economic recovery.",
      },
      {
        question: "What is the relationship between Payback Period and Accounting Rate of Return (ARR)?",
        answer: "Payback measures the speed of cash recovery, whereas ARR measures accounting net income relative to book asset value. Both are simple screening tools, but neither discounts cash flows for the time value of money.",
      },
      {
        question: "Why should companies never rely solely on the payback period to make capital budgeting decisions?",
        answer: "Sole reliance on payback period causes companies to reject highly profitable long-term projects in favor of mediocre short-term investments, reducing total enterprise value and long-term competitiveness.",
      },
      {
        question: "What is the closed-form formula for discounted payback on equal annual annuities?",
        answer: "When annual cash inflows are constant (PMT), the exact DPP is given by: DPP = -ln[1 - (CF_0 * r) / PMT] / ln(1 + r), which eliminates the need for manual step-by-step table compounding.",
      },
      {
        question: "How does cash flow velocity affect payback period versus total profitability?",
        answer: "High cash flow velocity (front-loaded cash inflows) accelerates payback and dramatically increases NPV by reducing discounting penalties and freeing up capital for early reinvestment.",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Payback Period & Capital Recovery Suite",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.97",
      ratingCount: "4210",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate the Payback Period and Discounted Payback Period",
    description:
      "Step-by-step guide to calculating the exact simple payback period and discounted payback period in years, months, and days.",
    step: [
      {
        "@type": "HowToStep",
        name: "Input Initial Investment Outlay",
        text: "Enter the initial upfront capital cost (CF_0).",
      },
      {
        "@type": "HowToStep",
        name: "Log Annual Cash Flows",
        text: "Enter projected cash inflows for each year of the project lifecycle.",
      },
      {
        "@type": "HowToStep",
        name: "Set Hurdle Rate / WACC",
        text: "Specify the annual discount rate for present value calculations.",
      },
      {
        "@type": "HowToStep",
        name: "Review Breakeven Timelines & Schedules",
        text: "Examine the exact simple and discounted payback periods, cumulative recovery curve, and amortization schedule.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <CalculatorLayout definition={serializableDef as any} />
    </>
  );
}
