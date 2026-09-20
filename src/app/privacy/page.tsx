import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  Database,
  UserCheck,
  HelpCircle,
  FileCheck2,
  HardDrive,
  MailCheck,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy – Zero-Data Client-Side Guarantee | CalcPlatform",
  description:
    "CalcPlatform's privacy policy details our 100% client-side computing architecture, zero server-side storage of calculation data, cookie-free operation, and international GDPR/CCPA compliance.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-700 shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-700/60 border border-blue-400/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-300" /> Privacy & Security Commitment
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Last Updated: {lastUpdated} • Effective Immediately Across All 190+ Calculators
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Core Guarantee Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-4 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-base sm:text-lg">
            <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Zero-Knowledge, Client-Side Computation Guarantee
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed">
            All numerical inputs, financial salary figures, mortgage balances, debt figures, personal health biometrics, pregnancy dates, and formulas you evaluate on <strong>CalcPlatform</strong> are executed exclusively inside your browser&apos;s local memory (RAM) via JavaScript. <strong>We do not collect, transmit, log, or store your calculation inputs or results on any server or database.</strong>
          </p>
        </div>

        {/* Section 1: Information We Do Not Collect */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <EyeOff className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            1. Information We Explicitly Do Not Collect
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
            <p>
              CalcPlatform requires <strong>no user registration, no login, and no profile creation</strong>. As a result, our platform infrastructure never collects, captures, or maintains:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300">
              <li><strong>Financial Data:</strong> Bank account balances, credit scores, debt obligations, mortgage loan numbers, or tax filing records.</li>
              <li><strong>Health & Biometric Data:</strong> Body weight, height, body fat measurements, caloric intake, estimated due dates, ovulation cycles, or renal clearance figures.</li>
              <li><strong>Account Identifiers:</strong> Usernames, passwords, multi-factor tokens, or billing addresses.</li>
              <li><strong>Behavioral Profiling:</strong> Cross-site tracking beacons, advertising cookies, or individual user session recordings.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Technical Telemetry & CDN Edge Logs */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            2. Ephemeral Technical Telemetry & CDN Edge Routing
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
            <p>
              When your browser requests a web page or static asset (e.g. HTML, CSS, JavaScript chunks), standard Content Delivery Network (CDN) edge servers process ephemeral connection metadata:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li>Anonymized IP addresses (processed temporarily for regional DDoS protection and edge caching).</li>
              <li>Browser user-agent, device classification (mobile/desktop), and operating system for responsive delivery.</li>
              <li>Requested resource URL paths, HTTP status codes, and network latency metrics.</li>
            </ul>
            <p>
              This network routing metadata is aggregated anonymously for infrastructure reliability and is completely decoupled from any calculation variables you evaluate in your browser.
            </p>
          </div>
        </section>

        {/* Section 3: Browser Storage & Zero Tracking Cookies */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <HardDrive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            3. Browser Storage & Zero Tracking Cookies
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
            <p>
              <strong>Zero Tracking Cookies:</strong> CalcPlatform does not use advertising cookies, third-party marketing cookies, or tracking pixels.
            </p>
            <p>
              <strong>Local Device Storage (<code className="text-blue-600 dark:text-blue-400 font-mono">window.localStorage</code>):</strong> To provide a smooth user experience, minimal non-personal preference keys are stored locally on your device:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
              <li><code className="text-blue-600 dark:text-blue-400 font-mono">theme</code>: Remembers whether you selected Dark Mode or Light Mode.</li>
              <li><code className="text-blue-600 dark:text-blue-400 font-mono">saved_calc_[id]</code>: If you explicitly click the &quot;Save Calculation&quot; bookmark button on a tool, your result is stored locally in your browser so you can reference it later.</li>
            </ul>
            <p>
              You maintain complete ownership of this data. You can delete any saved calculation anytime using the trash button in the calculator UI or by clearing your browser cookies and site data.
            </p>
          </div>
        </section>

        {/* Section 4: Contact Form Communication Privacy */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <MailCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            4. Support Communications & Inquiries
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
            <p>
              When you voluntarily reach out via our <Link href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">Contact Page</Link>, you provide your email address, optional name, topic, and message content.
            </p>
            <p>
              This communication is transmitted securely over TLS/HTTPS and is strictly used by our engineering and editorial team to reply to your inquiry, investigate reported formula bugs, or review calculator requests. We never sell, rent, or add contact addresses to promotional mailing lists.
            </p>
          </div>
        </section>

        {/* Section 5: International Privacy Compliance */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            5. International Data Protection (GDPR, UK GDPR, CCPA/CPRA)
          </div>
          <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-3 leading-relaxed">
            <p>
              Under international privacy frameworks including the General Data Protection Regulation (EU GDPR / UK GDPR) and the California Consumer Privacy Act (CCPA as amended by CPRA):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300">
              <li><strong>Right to Know & Access:</strong> Because we do not create accounts or store user identity records in a database, no personal profiles exist on our infrastructure to access.</li>
              <li><strong>Right to Deletion:</strong> Local calculation histories exist only on your own device and are erasable by you at any time.</li>
              <li><strong>No Sale or Sharing of Personal Information:</strong> We do not sell, rent, monetize, or trade user information under any circumstances.</li>
              <li><strong>Non-Discrimination:</strong> 100% of all calculators, amortization tables, and PDF reporting features are universally free for all visitors.</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Children's Online Privacy Protection (COPPA) */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <h2 className="text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            6. Children&apos;s Online Privacy (COPPA)
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our educational mathematical platforms are completely safe for students and learners of all ages. We do not solicit or knowingly collect personal information from children under the age of 13.
          </p>
        </section>

        {/* Section 7: Questions & Privacy Contact */}
        <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-extrabold text-lg">
            <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            7. Privacy Questions & Inquiries
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you have questions regarding this privacy policy or our client-side architecture, please reach us through our{" "}
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
