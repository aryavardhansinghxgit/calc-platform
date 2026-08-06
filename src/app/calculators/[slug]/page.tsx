import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getCalculatorBySlug, CALCULATORS } from "@/data/calculators";
import {
  MortgageCalculator,
  LoanCalculator,
  EmiCalculator,
  SipCalculator,
  CompoundInterestCalculator,
  BmiCalculator,
  PercentageCalculator,
} from "@/components/calculator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return { title: "Calculator Not Found" };

  return {
    title: `${calc.title} - Free Online Calculator | CalcPlatform`,
    description: calc.description,
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    notFound();
  }

  const renderCalculatorComponent = (id: string) => {
    switch (id) {
      case "mortgage":
      case "mortgage-calculator":
        return <MortgageCalculator />;
      case "loan":
      case "loan-calculator":
        return <LoanCalculator />;
      case "emi":
      case "emi-calculator":
        return <EmiCalculator />;
      case "sip":
      case "sip-calculator":
        return <SipCalculator />;
      case "compound-interest":
      case "compound-interest-calculator":
        return <CompoundInterestCalculator />;
      case "bmi":
      case "bmi-calculator":
        return <BmiCalculator />;
      case "percentage":
      case "percentage-calculator":
        return <PercentageCalculator />;
      default:
        return <MortgageCalculator />;
    }
  };

  const Icon = calc.icon;

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700"
        >
          <ArrowLeft className="h-4 w-4" /> All Calculators
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Sparkles className="h-3.5 w-3.5" /> {calc.category} Tool
        </span>
      </div>

      {/* Calculator Header Info */}
      <div className="space-y-3 text-left border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shadow-lg shadow-sky-500/5">
            <Icon className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {calc.title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1 leading-relaxed">
              {calc.description}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Calculator Render */}
      <div className="w-full">
        {renderCalculatorComponent(calc.id)}
      </div>
    </div>
  );
}
