import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, Lock, EyeOff, Server, Database, UserCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Zero-Data Client-Side Guarantee | CalcPlatform",
  description:
    "CalcPlatform's privacy policy explains our client-side computing architecture, zero personal data storage, cookie usage, and international compliance with GDPR and CCPA.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 19, 2026";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-700">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" /> Privacy & Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Last Updated: {lastUpdated} • Effective Immediately
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Core Guarantee Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold text-base sm:text-lg">
            <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Zero-Knowledge, Client-Side Computation Guarantee
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
            All numerical inputs, loan amounts, salaries, personal health metrics, dates, and calculations you perform on <strong>CalcPlatform</strong> are executed exclusively inside your web browser using JavaScript. <strong>We do not collect, transmit, record, or store your calculation inputs on any server.</strong>
          </p>
        </div>

        {/* Section 1: Information We Do Not Collect */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <EyeOff className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            1. Information We Do Not Collect
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p>Because our platform requires no user registration, we explicitly DO NOT collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li>Names, email addresses, phone numbers, or account credentials.</li>
              <li>Financial records, account numbers, credit scores, debt figures, or tax data.</li>
              <li>Personal health metrics, biometric measurements, medical conditions, or pregnancy histories.</li>
              <li>Proprietary equations or commercial engineering inputs.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Technical Telemetry & Hosting Logs */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            2. Standard Technical Logs & Hosting Telemetry
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p>
              Like virtually all standard web platforms, our CDN edge servers automatically process anonymous technical connection data when delivering web pages to your browser:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li>Anonymized IP addresses (used exclusively for regional CDN caching and DDoS mitigation).</li>
              <li>Browser type, device classification (mobile/desktop), and operating system version.</li>
              <li>Requested URLs, timestamps, and HTTP response codes.</li>
            </ul>
            <p>
              This technical routing data is aggregated anonymously and is never connected to any individual person or calculation.
            </p>
          </div>
        </section>

        {/* Section 3: Cookies & Local Storage */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            3. Browser Storage & Cookies
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p>
              <strong>Cookies:</strong> CalcPlatform uses minimal essential session cookies required for network performance and CDN distribution.
            </p>
            <p>
              <strong>Browser LocalStorage:</strong> If you toggle dark/light theme mode, your preference is saved locally on your own device memory (<code className="text-blue-600 dark:text-blue-400">localStorage</code>) so your preference persists across visits. You can clear this anytime through your browser settings.
            </p>
          </div>
        </section>

        {/* Section 4: GDPR, CCPA & Global Compliance */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            4. International Data Protection (GDPR, UK GDPR, CCPA/CPRA)
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <p>
              Under global data privacy laws including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li><strong>Right to Know / Access:</strong> Since we do not maintain accounts or store identifiable user records, we store no personal profile data on our infrastructure.</li>
              <li><strong>Right to Non-Discrimination:</strong> Equal, 100% free access to all calculators is provided without discrimination.</li>
              <li><strong>No Data Sale:</strong> We never sell, rent, monetize, or broker user data to third parties or advertising networks.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Children's Privacy */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            5. Children's Online Privacy (COPPA)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our educational mathematical tools are completely safe and open for all ages, including students. We never solicit or collect any personal information from children under the age of 13.
          </p>
        </section>

        {/* Section 6: Contact Regarding Privacy */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-lg">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            6. Privacy Inquiries & Contact
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you have questions or concerns regarding this privacy policy or our client-side architecture, please visit our{" "}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">
              Contact Page
            </Link>{" "}
            or email us directly at <span className="font-mono text-zinc-800 dark:text-zinc-200">xasvmax@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
