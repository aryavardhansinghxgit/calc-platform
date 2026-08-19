import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Scale, AlertTriangle, CheckCircle, FileText, HelpCircle, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions of Use | CalcPlatform",
  description:
    "Review the terms and conditions of using CalcPlatform, including mathematical estimation disclaimers, intellectual property, and acceptable use guidelines.",
};

export default function TermsPage() {
  const lastUpdated = "August 19, 2026";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-700">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <Scale className="h-3.5 w-3.5" /> Legal Terms
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Last Updated: {lastUpdated} • Please Read Carefully
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Core Disclaimer Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-bold text-base sm:text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
            General Estimation & Educational Disclaimer
          </div>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            All calculations, simulations, formula breakdowns, and outputs provided by <strong>CalcPlatform</strong> are for <strong>informational and educational purposes only</strong>. Outputs should never be treated as professional financial, legal, medical, tax, or structural engineering advice.
          </p>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            1. Agreement to Terms
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            By accessing or using CalcPlatform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of these terms, you should discontinue use of the platform immediately.
          </p>
        </section>

        {/* Section 2: Specific Professional Field Disclaimers */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            2. Specific Category Disclaimers
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                Financial & Tax Tools
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Mortgage rates, loan APRs, taxes, and compound interest forecasts do not include dynamic bank closing fees, local property assessments, or real-time regulatory adjustments. Consult a licensed CFP or CPA.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                Health & Wellness Tools
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                BMI, caloric targets, pregnancy due dates, and body composition figures are population-level statistical estimates and are not clinical medical diagnostics. Consult a licensed physician.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <div className="font-bold text-zinc-900 dark:text-zinc-100">
                Construction & Engineering
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Concrete volumes, electrical drop calculations, and structural dimensions do not account for environmental stress or specific building codes. Confirm with licensed contractors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Intellectual Property */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            3. Intellectual Property Rights
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The platform design, component implementations, proprietary UI workflows, software source code, and educational reference text are the exclusive intellectual property of CalcPlatform. Mathematical formulas and public scientific constants remain within the public domain.
          </p>
        </section>

        {/* Section 4: Acceptable Use */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            4. Acceptable Use Policy
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            You agree to use CalcPlatform only for lawful educational, personal, academic, or professional analysis. You agree not to attempt to disrupt platform availability through automated denial-of-service, malicious scraping, or network degradation attacks.
          </p>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            5. Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In no event shall CalcPlatform, its authors, or contributors be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, any calculation or information provided on this platform.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            6. Questions & Legal Inquiries
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            For questions regarding these terms, please visit our{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Contact Page
            </Link>{" "}
            or email us directly at <span className="font-mono text-zinc-800 dark:text-zinc-200">legal@calcplatform.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
