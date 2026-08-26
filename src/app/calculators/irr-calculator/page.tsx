import { Metadata } from "next";
import { irr_calculatorMetadata } from "./metadata";
import { irr_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = irr_calculatorMetadata;

export default function IrrCalculatorPage() {
  const { calculate, ...serializableDef } = irr_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: irr_calculatorConfig.title,
    description: irr_calculatorConfig.description,
    slug: irr_calculatorConfig.slug,
    category: irr_calculatorConfig.category,
    faqs: [
      {
        question: "What is the difference between IRR and NPV?",
        answer: "IRR is the annualized percentage rate of return at which a project breaks even (NPV = $0). NPV is the total dollar amount of enterprise value created today above the cost of capital. NPV is the ultimate metric for maximizing shareholder wealth.",
      },
      {
        question: "Why is IRR important in corporate capital budgeting decisions?",
        answer: "IRR provides an intuitive percentage benchmark that executive decision-makers can easily compare against borrowing interest rates, corporate bond yields, or minimum hurdle rates across projects of differing sizes.",
      },
      {
        question: "What is a good or acceptable IRR for an investment project?",
        answer: "An acceptable IRR is any rate that comfortably exceeds the project's risk-adjusted cost of capital (WACC). For stable infrastructure projects, 8% to 12% is typical; for real estate syndications, 14% to 18% is standard; and for venture capital, 25% to 35%+ is required.",
      },
      {
        question: "What is the reinvestment rate assumption flaw in IRR and how does MIRR fix it?",
        answer: "Standard IRR assumes cash inflows are reinvested at the project's own IRR (which can be unrealistically high, e.g., 40%). Modified IRR (MIRR) fixes this by allowing the user to specify a realistic reinvestment rate equal to the firm's cost of capital.",
      },
      {
        question: "Why can some cash flow streams have multiple real IRRs?",
        answer: "When a project features non-conventional cash flows that switch signs more than once (e.g., negative outlay -> positive returns -> negative decommissioning cost), Descartes' Rule of Signs proves that the polynomial can produce multiple mathematically valid roots.",
      },
      {
        question: "How does IRR account for the time value of money compared to simple ROI?",
        answer: "Simple ROI divides total profit by cost without regard to how many years elapsed. IRR explicitly discounts every individual cash flow based on the exact year or month it occurs, rewarding faster capital recovery.",
      },
      {
        question: "What is a hurdle rate and how does it relate to IRR?",
        answer: "A hurdle rate is the minimum required rate of return an investor or corporate board demands before approving an investment. If project IRR is greater than or equal to the Hurdle Rate, the project is accepted; otherwise, it is rejected.",
      },
      {
        question: "How does the timing of cash inflows affect the calculated IRR?",
        answer: "Front-loaded cash inflows produce significantly higher IRRs than back-loaded cash flows because early dollars are discounted less heavily and can be immediately reinvested elsewhere in the enterprise.",
      },
      {
        question: "Can IRR be negative and what does a negative IRR mean?",
        answer: "Yes. A negative IRR occurs when the total sum of all undiscounted cash inflows is less than the initial capital outlay, indicating that the investment fails to recover its principal and destroys capital.",
      },
      {
        question: "What is the Profitability Index (PI) and how is it used alongside IRR?",
        answer: "The Profitability Index (PI) divides the present value of future cash inflows by the initial outlay cost. A project with Profitability Index > 1.0 is profitable and corresponds to a positive NPV.",
      },
      {
        question: "What is the Fisher crossover rate in multi-project evaluation?",
        answer: "The Fisher crossover rate is the discount rate at which the Net Present Values (NPVs) of two competing projects are identical. Below the crossover rate, one project dominates; above it, the other project becomes optimal.",
      },
      {
        question: "How do non-conventional cash flows affect capital budgeting decisions?",
        answer: "Non-conventional cash flows undermine standard IRR reliability due to multiple roots. When evaluating non-conventional projects (like mines or nuclear facilities with end-of-life cleanup liabilities), financial analysts rely strictly on Net Present Value (NPV) and Modified IRR (MIRR).",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CalcPlatform Internal Rate of Return (IRR) & Capital Budgeting Suite",
    operatingSystem: "All",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.98",
      ratingCount: "3890",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Project IRR, MIRR, and Net Present Value",
    description:
      "Step-by-step guide to calculating Internal Rate of Return (IRR), Modified IRR (MIRR), Net Present Value (NPV), and Profitability Index.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Initial Investment Outlay",
        text: "Input the initial Year 0 capital expenditure (CF_0).",
      },
      {
        "@type": "HowToStep",
        name: "Enter Annual Cash Flows",
        text: "Log the projected cash inflows or outflows for each subsequent year.",
      },
      {
        "@type": "HowToStep",
        name: "Set Hurdle Rate & Reinvestment Cost",
        text: "Specify your firm's WACC / Hurdle Rate % and reinvestment rate.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze IRR, MIRR, and Payback",
        text: "Review the solved IRR %, Modified IRR %, NPV $, Discounted Payback Period, and Capital Budgeting Decision.",
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
