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
  Cpu,
  BookOpen,
  Atom,
  HardHat,
  Sparkles,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Mission, Mathematical Rigor & Privacy Architecture | CalcPlatform",
  description:
    "Discover CalcPlatform's mission to provide 190+ free, mathematically verified, client-side calculators across finance, health, math, science, and engineering.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Scale,
      title: "Mathematical Accuracy & Deterministic Proofs",
      desc: "Every calculator engine is built from verified mathematical axioms, peer-reviewed scientific literature, and standard banking amortization protocols. We eliminate black-box approximations in favor of step-by-step transparency.",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Data, Client-Side Computing Architecture",
      desc: "Your personal financial figures, salary data, loan metrics, and health biometrics are calculated exclusively inside your browser's memory using JavaScript. No calculation inputs are ever sent to, processed by, or stored on our servers.",
    },
    {
      icon: GraduationCap,
      title: "Educational Depth & Methodological Clarity",
      desc: "We believe a calculator is only as useful as the user's understanding of its results. Every tool provides underlying formulas, variable definitions, worked examples, and real-world application contexts.",
    },
    {
      icon: Zap,
      title: "Instant Execution & Zero Digital Clutter",
      desc: "No forced account sign-ups, no subscription paywalls, no obstructive interstitial popups, and no tracking scripts. Fast, responsive, clean layouts engineered for seamless calculation across desktop, tablet, and mobile devices.",
    },
  ];

  const stats = [
    { label: "Precision Calculators", value: "190+" },
    { label: "Core Disciplines", value: "6" },
    { label: "Client-Side Processing", value: "100%" },
    { label: "Access Cost", value: "Free Forever" },
  ];

  const disciplines = [
    {
      icon: DollarSign,
      title: "Financial & Actuarial Modeling",
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      desc: "Mortgage amortization schedules conforming to CFPB standards, compound growth with multi-frequency compounding, auto leases, debt avalanche/snowball payoff engines, and tax/retirement estimations aligned with modern tax code guidelines.",
    },
    {
      icon: HeartPulse,
      title: "Health & Anthropometric Science",
      color: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
      desc: "Basal metabolic rate (Mifflin-St Jeor, Katch-McArdle), WHO-standard Body Mass Index (BMI), body surface area, macronutrient partitioning, pregnancy milestone forecasting, and renal function estimation (CKD-EPI equations).",
    },
    {
      icon: Calculator,
      title: "Pure & Applied Mathematics",
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
      desc: "Arbitrary-precision BigInt binary arithmetic, quadratic and polynomial root solvers, matrix transformations, statistics (standard deviation, z-scores, confidence intervals), permutation/combination combinatorics, and geometry solvers.",
    },
    {
      icon: Atom,
      title: "Physical Science & Thermodynamics",
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800",
      desc: "NIST-standard physical constants, molarity/molecular mass conversions, radioactive half-life exponential decay, psychrometric dew point equations, and NOAA heat index / wind chill thermal formulas.",
    },
    {
      icon: HardHat,
      title: "Construction & Engineering Metrics",
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
      desc: "Volume and material estimations for concrete, gravel, mulch, and tile, alongside electrical Ohm's law, voltage drop calculations, stair geometric stringers, and structural square-footage modeling.",
    },
    {
      icon: Cpu,
      title: "Everyday Utilities & Conversions",
      color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800",
      desc: "Time zone arithmetic, high-entropy cryptographic password generation, unit conversion matrices, tip distribution splits, speed/pace tracking, and URL percent-encoding tools.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-700 shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-700/60 border border-blue-400/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" /> About CalcPlatform
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Mathematical Precision for Smarter Decisions
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            CalcPlatform is dedicated to building the web&apos;s most transparent, accurate, and privacy-respecting computation platform across finance, health, science, engineering, and mathematics.
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
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-heading">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Purpose */}
        <section className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <BookOpen className="h-4 w-4" /> The Problem We Solve
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Why CalcPlatform Exists
            </h2>
            <div className="h-1 w-14 bg-blue-600 rounded-full" />
          </div>

          <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>
              In modern digital tools, online calculators are frequently burdened by invasive advertising scripts, paywalled features, obscure proprietary formulas, or invisible collection of sensitive personal figures. Users calculating a mortgage are bombarded with lead-generation forms, and those tracking health metrics unknowingly leak biometric data.
            </p>
            <p>
              <strong>CalcPlatform was engineered as an antidote to this paradigm.</strong> We operate on a foundation of <strong>100% client-side computing</strong>: every formula executes locally in your device&apos;s browser memory. When you compute a loan payoff, calculate a body fat percentage, or model a retirement timeline, your numbers remain exclusively yours.
            </p>
            <p>
              Beyond privacy, we believe that numerical tools should be educational instruments. We do not just present an answer; we explain <em>why the formula works</em>, show intermediate derivation steps, highlight boundary assumptions, and warn against common calculation pitfalls.
            </p>
          </div>
        </section>

        {/* Scientific Disciplines */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
              Comprehensive Coverage
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              6 Core Scientific & Practical Disciplines
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Covering over 190+ specialized calculators built to industry specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {disciplines.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className={`p-2.5 w-fit rounded-xl border ${d.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {d.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
              Our Guiding Principles
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              The four commitments that guide every algorithm and interface we design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
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
        <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 dark:from-blue-950/30 dark:via-zinc-900 dark:to-indigo-950/20 p-8 sm:p-10 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-300 font-extrabold text-lg sm:text-xl">
            <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
            Rigorous Formula Verification Standards
          </div>
          <p className="text-xs sm:text-sm text-blue-950 dark:text-blue-200 leading-relaxed">
            We don&apos;t rely on unverified third-party scripts. All platform engines undergo systematic test suites cross-referenced against authoritative institutions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-800 dark:text-zinc-200 font-medium">
            <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-blue-200/60 dark:border-zinc-700 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>CFPB & Federal Reserve:</strong> Standard financial amortization formulas, annual percentage rate (APR) bisection solvers, and compounding standards.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-blue-200/60 dark:border-zinc-700 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>WHO, CDC & NIH:</strong> Validated biometric models for body composition, metabolic expenditure, renal clearance, and gestational milestones.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-blue-200/60 dark:border-zinc-700 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>NIST, ISO & NOAA:</strong> International physical constants, conversion factors, thermodynamic indices, and psychrometric equations.</span>
            </div>
            <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-blue-200/60 dark:border-zinc-700 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>IEEE 754 & BigInt Safeguards:</strong> Floating-point precision error remediation, division-by-zero boundary locks, and exact integer arithmetic.</span>
            </div>
          </div>
        </section>

        {/* Categories CTA */}
        <section className="text-center py-6 space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Explore the Calculator Suite
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Choose from over 190+ precision calculators across finance, health, math, construction, and science.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/category/finance"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <DollarSign className="h-4 w-4" />
              Finance Hub
            </Link>
            <Link
              href="/category/health"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <HeartPulse className="h-4 w-4" />
              Health Hub
            </Link>
            <Link
              href="/category/math"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Math Category
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold transition-colors"
            >
              Contact Engineering
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
