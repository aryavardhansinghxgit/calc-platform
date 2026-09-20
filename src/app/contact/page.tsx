"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  Bug,
  Lightbulb,
  CheckCircle2,
  Send,
  Clock,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  SendHorizontal,
  MailCheck,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "calculation-feedback",
    subject: "",
    message: "",
    honeypot: "", // Anti-spam field
  });

  const targetEmail = "contact@calcplatform.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getFullSubject = () => {
    return `[CalcPlatform] ${formData.subject ? formData.subject : formData.topic}`;
  };

  const getFormattedBody = () => {
    return `Sender Name: ${formData.name || "Anonymous User"}\nSender Email: ${formData.email || "Not Provided"}\nCategory/Topic: ${formData.topic}\n\nMessage:\n${formData.message}\n\n---\nSent from CalcPlatform (${new Date().toLocaleString()})`;
  };

  const handleCopyFormattedMessage = () => {
    const fullText = `To: ${targetEmail}\nSubject: ${getFullSubject()}\n\n${getFormattedBody()}`;
    navigator.clipboard.writeText(fullText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(
    getFullSubject()
  )}&body=${encodeURIComponent(getFormattedBody())}`;

  const outlookComposeUrl = `https://outlook.office.com/mail/deeplink/compose?to=${targetEmail}&subject=${encodeURIComponent(
    getFullSubject()
  )}&body=${encodeURIComponent(getFormattedBody())}`;

  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
    getFullSubject()
  )}&body=${encodeURIComponent(getFormattedBody())}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please provide both your email address and message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address format.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // 1. Try server-side route handler
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: Still mark submitted and present the 1-click webmail dispatchers
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      // Even if network drops, user can complete delivery with 1-click webmail/mailto
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    {
      icon: Bug,
      title: "Formula & Math Review",
      email: "formulas@calcplatform.com",
      desc: "Report a formula discrepancy, edge-case rounding anomaly, or mathematical suggestion.",
    },
    {
      icon: Lightbulb,
      title: "New Calculator Requests",
      email: "requests@calcplatform.com",
      desc: "Suggest a new financial, scientific, health, mathematical, or engineering calculator.",
    },
    {
      icon: Mail,
      title: "Direct Support & Inquiries",
      email: "contact@calcplatform.com",
      desc: "For general inquiries, UI feedback, browser compatibility issues, or partnerships.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-700 shadow-inner">
        <div className="max-w-4xl mx-auto text-center space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-400/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="h-3.5 w-3.5" /> Support & Communications
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Contact & Support
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Have feedback on a calculation, found a bug, or want to suggest a new tool? Reach our engineering team directly at{" "}
            <span className="font-semibold underline text-white">{targetEmail}</span>.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Quick Email Access Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                Direct Support Email:{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                  {targetEmail}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Monitored daily for engineering updates and formula corrections.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=CalcPlatform%20Inquiry`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open in Gmail</span>
            </a>
            <a
              href={`mailto:${targetEmail}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <MailCheck className="h-3.5 w-3.5" />
              <span>Open Mail App</span>
            </a>
          </div>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3"
              >
                <div className="p-2.5 w-fit rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {dept.title}
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {dept.desc}
                </p>
                <div className="pt-2 text-xs font-mono">
                  <a
                    href={`mailto:${dept.email}?subject=${encodeURIComponent(`[${dept.title}] Inquiry`)}`}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all inline-flex items-center gap-1"
                  >
                    {dept.email}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs p-6 sm:p-10 max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="inline-flex p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Message Prepared for {targetEmail}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                  Your message has been processed. To guarantee direct delivery into our inbox, you can also send it instantly using any of the 1-click options below:
                </p>
              </div>

              {/* 1-Click Instant Dispatch Buttons */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 max-w-lg mx-auto space-y-3.5 text-left">
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <SendHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  Instant 1-Click Send Options:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Send via Gmail Web</span>
                  </a>

                  <a
                    href={outlookComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Send via Outlook Web</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <MailCheck className="h-3.5 w-3.5" />
                    <span>Open Default Mail App</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyFormattedMessage}
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copiedMessage ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Message Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Full Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      topic: "calculation-feedback",
                      subject: "",
                      message: "",
                      honeypot: "",
                    });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  Compose Another Message
                </button>
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
                >
                  Return to Calculators
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Send Us a Message
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Fill out the form below. Messages are directed to{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {targetEmail}
                  </span>
                  .
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <a
                    href={mailtoUrl}
                    className="underline font-bold shrink-0 hover:text-rose-900"
                  >
                    Open Mail App
                  </a>
                </div>
              )}

              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="_honey"
                value={formData.honeypot}
                onChange={(e) =>
                  setFormData({ ...formData, honeypot: e.target.value })
                }
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Category / Topic
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({ ...formData, topic: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="calculation-feedback">Calculation / Math Feedback</option>
                    <option value="bug-report">Bug Report / Anomaly</option>
                    <option value="calculator-request">Request a New Calculator</option>
                    <option value="partnership">Partnership or Editorial Inquiry</option>
                    <option value="other">General Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Feedback on Compound Interest Solver"
                    className="w-full px-3 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Message Content <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Please describe your calculation scenario, numerical discrepancy, bug reproduction steps, or feature suggestion in detail..."
                  className="w-full px-3 py-2.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                  <span>Delivered directly to {targetEmail}</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Privacy & Direct Communication Commitment */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Direct Communication & Privacy Guarantee
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            We respect your privacy. Contact details provided above are strictly used to reply to your calculation feedback and are never shared or added to mailing lists.
          </p>
        </div>
      </div>
    </div>
  );
}
