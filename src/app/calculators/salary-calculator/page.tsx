import { Metadata } from "next";
import { salary_calculatorMetadata } from "./metadata";
import { salary_calculatorConfig } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = salary_calculatorMetadata;

export default function SalaryCalculatorPage() {
  const { calculate, ...serializableDef } = salary_calculatorConfig;

  const schemas = generateJsonLdSchema({
    title: salary_calculatorConfig.title,
    description: salary_calculatorConfig.description,
    slug: salary_calculatorConfig.slug,
    category: salary_calculatorConfig.category,
    faqs: [
      {
        question: "How do I calculate annual salary from hourly pay?",
        answer:
          "Multiply your hourly wage rate by the number of paid hours worked per week, then multiply by 52 weeks in a calendar year (Annual = Hourly Rate × Hours/Week × 52). For a standard 40-hour week, multiply your hourly rate by 2,080.",
      },
      {
        question: "How do I calculate hourly wage from annual salary?",
        answer:
          "Divide your contractual annual gross salary by the total annual working hours (Hourly = Annual Salary ÷ (Hours/Week × 52)). For a 40-hour week, divide by 2,080. An $80,000 salary equals $38.46/hour.",
      },
      {
        question: "What is the difference between bi-weekly and semi-monthly pay?",
        answer:
          "Bi-weekly employees are paid every two weeks (26 paychecks per year). Semi-monthly employees are paid twice per month on specific dates (24 paychecks per year). For the same annual salary, semi-monthly checks are ~8.33% larger.",
      },
      {
        question: "How many work hours are in a typical full-time year?",
        answer:
          "2,080 hours (40 hrs/wk × 52 wks) is a common full-time planning convention. U.S. Federal Government civilian payroll uses a 2,087-hour divisor under 5 U.S.C. § 5504(b) to account for leap years and calendar drift.",
      },
      {
        question: "Does taking paid PTO reduce my contractual annual salary?",
        answer:
          "No. Paid PTO and paid holidays preserve 100% of your agreed contractual salary. Salaried workers receive their full contractual pay while working fewer active on-the-clock hours.",
      },
      {
        question: "How does PTO affect effective hourly compensation?",
        answer:
          "Because your full salary is earned over fewer active hours, your effective hourly compensation increases (Annual Salary ÷ Active Hours). A $104,000 salary with 25 paid non-working days yields an effective rate of $55.32/hr over 1,880 active hours.",
      },
      {
        question: "How is overtime pay calculated under the FLSA?",
        answer:
          "Covered nonexempt employees generally receive at least 1.5× their regular hourly rate for hours worked over 40 in a single 7-day statutory workweek. Overtime cannot be averaged across two weeks in a bi-weekly cycle.",
      },
      {
        question: "What is the difference between gross pay and net take-home pay?",
        answer:
          "Gross pay is total compensation earned before any deductions. Net take-home pay is the cash remaining after federal and state income taxes, FICA (Social Security and Medicare), and voluntary benefit deductions are subtracted.",
      },
      {
        question: "How are FICA payroll taxes calculated?",
        answer:
          "Employees pay 6.2% Social Security tax on covered wages up to the statutory cap ($176,100 in 2025; $184,500 in 2026) and 1.45% Medicare tax on all covered wages. Employers withhold an extra 0.9% Additional Medicare surtax on wages over $200,000.",
      },
      {
        question: "What is an equivalent 1099 contractor billing rate?",
        answer:
          "A 1.25× to 1.40× markup is sometimes used as a rough planning heuristic over an equivalent W-2 hourly rate to account for the 7.65% employer FICA match, self-funded health insurance, unpaid PTO, business expenses, and unbillable administrative hours.",
      },
      {
        question: "How does the target salary solver work?",
        answer:
          "The solver algebraically grosses up desired net monthly earnings using an assumed effective tax rate (Gross = (Net Monthly × 12) ÷ (1 - Tax Rate)). The entered tax percentage represents an illustrative user modeling assumption.",
      },
      {
        question: "How does cost of living affect required salary across cities?",
        answer:
          "Because housing, goods, and services vary by location, maintaining an equivalent standard of living requires scaling nominal salary by the relative index ratio (Salary × (Target Index ÷ Source Index)).",
      },
    ],
  });

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Salary Calculator: Hourly to Salary & Paycheck Conversion",
    url: "/calculators/salary-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Calculate annual salary, hourly wage, bi-weekly pay, and take-home pay. Features paid PTO adjustment, FLSA overtime, and cost-of-living comparison.",
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
      <CalculatorLayout definition={serializableDef as any} />
    </>
  );
}
