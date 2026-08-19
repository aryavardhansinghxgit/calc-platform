import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  Zap,
  GraduationCap,
  Scale,
  Calculator,
  HeartPulse,
  DollarSign,
  Layers,
  CheckCircle2,
  ArrowRight,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Mission, Rigor & Privacy | CalcPlatform",
  description:
    "Learn about CalcPlatform's mission to provide 100% free, mathematically rigorous, privacy-first calculators for finance, health, science, math, and everyday engineering.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Scale,
      title: "Mathematical Accuracy & Rigor",
      desc: "Every calculation algorithm is grounded in established mathematical proofs, standard banking amortization protocols, and peer-reviewed scientific constants.",
    },
    {
      icon: ShieldCheck,
      title: "100% Client-Side Privacy",
      desc: "Your financial data, health metrics, and personal scenarios never leave your browser. Calculations run locally in your browser memory with zero server telemetry.",
    },
    {
      icon: GraduationCap,
      title: "Educational Depth & Clarity",
      desc: "We don't just output numbers. Every calculator breaks down formulas, step-by-step worked examples, edge cases, and practical real-world applications.",
    },
    {
      icon: Zap,
      title: "Lightning-Fast & Zero Clutter",
      desc: "No paywalls, no forced registrations, and no obstructive popups. Clean, responsive layouts optimized for instant calculations across all devices.",
    },
  ];

  const stats = [
    { label: "Precision Calculators", value: "200+" },
    { label: "Specialized Categories", value: "7" },
    { label: "Client-Side Processing", value: "100%" },
    { label: "Access Cost", value: "Free Forever" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-700">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            About CalcPlatform
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Precision Tools for Smarter Decisions
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to building the most transparent, accurate, and accessible calculation suite for finance, health, math, construction, and science.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center shadow-xs"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <section className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Our Mission
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            In an era where online calculators are often cluttered with advertisements, opaque formulas, or hidden data tracking, <strong>CalcPlatform</strong> was created with a singular focus: <strong>uncompromising mathematical transparency</strong>.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
            Whether you are a homebuyer assessing mortgage amortization schedules, a student exploring calculus derivatives, a fitness enthusiast tuning macronutrient ratios, or an engineer calculating voltage drops, our tools give you instant, reliable numbers alongside the theory behind them.
          </p>
        </section>

        {/* Core Pillars Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Why Users Rely on CalcPlatform
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Designed from the ground up for speed, privacy, and educational value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-colors space-y-3"
                >
                  <div className="p-2.5 w-fit rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Verification Methodology */}
        <section className="bg-blue-50 dark:bg-blue-950/30 p-8 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-4">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-lg">
            <Code2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Rigorous Formula Verification
          </div>
          <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed">
            All algorithms are verified against industry standard benchmarks:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-900 dark:text-blue-300 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              Consumer Financial Protection Bureau (CFPB) mortgage models
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              World Health Organization (WHO) & CDC biometric metrics
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              NIST and ISO standard measurement and physical constants
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
              Standard floating-point and rounding error safeguards
            </li>
          </ul>
        </section>

        {/* Categories CTA */}
        <section className="text-center py-8 space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Ready to explore?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Choose from over 200+ specialized calculators across finance, health, math, construction, and science.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/category/finance"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              Finance Suite
            </Link>
            <Link
              href="/category/health"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              <HeartPulse className="h-4 w-4" />
              Health Tools
            </Link>
            <Link
              href="/category/math"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Math Solvers
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
