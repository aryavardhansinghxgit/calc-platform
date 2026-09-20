import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Scale,
  AlertTriangle,
  CheckCircle,
  FileText,
  HelpCircle,
  ShieldAlert,
  HeartPulse,
  DollarSign,
  HardHat,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions of Use – Mathematical Disclaimers | CalcPlatform",
  description:
    "Review the terms and conditions of using CalcPlatform, including mathematical estimation disclaimers, medical & financial disclaimers, and acceptable use guidelines.",
};

export default function TermsPage() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-700 shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-700/60 border border-blue-400/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <Scale className="h-3.5 w-3.5 text-blue-300" /> Legal Terms & Usage Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Last Updated: {lastUpdated} • Please Read Carefully Before Using Our Tools
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Core Estimation Disclaimer Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-extrabold text-base sm:text-lg">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0" />
            General Estimation & Educational Purpose Disclaimer
          </div>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            All calculations, algorithms, simulations, amortization schedules, formulas, and data outputs provided across <strong>CalcPlatform</strong> are provided strictly for <strong>educational, informational, and preliminary analytical purposes</strong>. Outputs do not constitute binding professional financial, medical, legal, tax, architectural, or structural engineering advice.
          </p>
        </div>

        {/* Section 1: Agreement to Terms */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            1. Agreement to Terms
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            By visiting, accessing, or performing calculations on CalcPlatform (including all 190+ calculators across all categories), you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must discontinue use of the platform immediately.
          </p>
        </section>

        {/* Section 2: Specific Sensitive Category Disclaimers */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            2. Category-Specific & Sensitive Calculator Disclaimers
          </div>

          <div className="space-y-4 text-xs">
            {/* Health & Medical Tools */}
            <div className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-200 text-sm">
                <HeartPulse className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                Health, Wellness & Biological Calculators
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Calculators covering Body Mass Index (BMI), Basal Metabolic Rate (BMR/TDEE), Body Fat Percentage, Caloric Targets, Glomerular Filtration Rate (GFR), Target Heart Rate, Pregnancy Due Dates, and Conception Timelines are derived from population-level statistical formulas (e.g. Mifflin-St Jeor, WHO standards, Naegele&apos;s rule, CKD-EPI).
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                <strong>Medical Notice:</strong> These outputs are mathematical models and are NOT clinical medical diagnostics, obstetric evaluations, or personal treatment plans. Biological variance, medical conditions, medication regimens, and individual physiology mean results will differ. Never ignore or delay professional medical advice from a licensed physician or obstetrician based on an online calculation.
              </p>
            </div>

            {/* Financial, Loan & Tax Tools */}
            <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Financial, Investment, Loan & Tax Calculators
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Tools modeling mortgages, auto loans, compound interest, SIP wealth projections, 401(k) / IRA contributions, RMD schedules, estate taxes, and income taxes utilize standard compound formulas and federal tax brackets.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                <strong>Financial Notice:</strong> Calculations do not include variable lender origination fees, fluctuating escrow assessments, localized property tax variances, dynamic market volatility, or individual tax deductions. Outputs do not constitute an offer of credit, a guarantee of return, or fiduciary investment or tax advice. Consult a licensed Certified Financial Planner (CFP) or Certified Public Accountant (CPA).
              </p>
            </div>

            {/* Construction & Engineering Tools */}
            <div className="p-5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm">
                <HardHat className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                Construction, Material & Engineering Solvers
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Concrete yardage, gravel tonnage, mulch coverage, electrical voltage drop, BTU heating/cooling, and stair riser dimensions represent idealized mathematical geometry and standard material density coefficients.
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                <strong>Engineering Notice:</strong> Physical construction involves subgrade compaction, material wastage (typically 5%–15%), local municipal building code compliance, and structural load constraints. Always verify specifications with licensed general contractors, electricians, or structural engineers prior to procurement.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Intellectual Property */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            3. Intellectual Property & Public Domain Mathematics
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The platform design, brand identity, component architecture, layout implementations, and educational explanations are the exclusive intellectual property of CalcPlatform. Mathematical theorems, public scientific constants (e.g. NIST, WHO, ISO), and standard banking formulas reside within the public domain.
          </p>
        </section>

        {/* Section 4: Acceptable Use Policy */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            4. Acceptable Use Policy
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            You agree to use CalcPlatform only for lawful personal, educational, research, or professional analysis. You agree not to attempt to disrupt platform availability through automated denial-of-service attacks, malicious scrapers designed to degrade server performance, or unauthorized reverse-engineering of backend infrastructure.
          </p>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            5. Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In no event shall CalcPlatform, its developers, contributors, or affiliates be liable for any direct, indirect, incidental, consequential, special, or punitive damages (including, but not limited to, financial losses, tax penalties, construction material miscalculations, or health consequences) arising from the use of, or inability to use, any calculation, formula breakdown, or data provided on this platform.
          </p>
        </section>

        {/* Section 6: Inquiries & Contact */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            6. Legal Questions & Inquiries
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            For questions regarding these terms, please visit our{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Contact Page
            </Link>{" "}
            or email us directly at <span className="font-mono text-zinc-800 dark:text-zinc-200 font-bold">contact@calcplatform.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
