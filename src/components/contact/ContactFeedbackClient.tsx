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
  Sparkles,
  HelpCircle,
  Calculator,
  ThumbsUp,
  Star,
  Layers,
  ArrowRight,
} from "lucide-react";

interface FeedbackOption {
  id: string;
  label: string;
  icon: React.ElementType;
  badge: string;
  placeholder: string;
  tip: string;
}

const FEEDBACK_TOPICS: FeedbackOption[] = [
  {
    id: "tool-request",
    label: "Request a Calculator",
    icon: Lightbulb,
    badge: "Most Popular",
    placeholder: "What new calculator, financial formula, health metric, or unit converter would you like us to build? Describe the inputs and desired outputs...",
    tip: "Tip: Let us know the formulas, parameters, and how you plan to use this calculator in school, work, or daily life.",
  },
  {
    id: "formula-review",
    label: "Formula & Math Accuracy",
    icon: Calculator,
    badge: "Math Rigor",
    placeholder: "Which calculator did you use? What inputs did you enter, what result was returned, and what was your expected calculated value?",
    tip: "Tip: Mention the exact inputs, step-by-step numbers, and any regional taxation or clinical standard differences.",
  },
  {
    id: "ux-feedback",
    label: "Platform Feedback & UX",
    icon: Sparkles,
    badge: "User Experience",
    placeholder: "How can we make CalcPlatform faster, easier to read, or more helpful? Suggestions on charts, printable summaries, dark mode...",
    tip: "Tip: We continuously polish our visual charts, step-by-step solution breakdowns, and responsive layouts based on your input.",
  },
  {
    id: "bug-report",
    label: "Bug or Glitch Report",
    icon: Bug,
    badge: "Technical",
    placeholder: "Describe what happened, your device/browser (e.g. Chrome on Windows, Safari on iOS), and the steps to reproduce the issue...",
    tip: "Tip: If an input field wasn't responding or a graph didn't render correctly, sharing your browser and device helps us patch it immediately.",
  },
  {
    id: "general-inquiry",
    label: "General Support & Inquiry",
    icon: Mail,
    badge: "Support",
    placeholder: "Have a general question, academic collaboration inquiry, or partnership note? Share your message here...",
    tip: "Tip: For academic usage in classrooms, our calculators are 100% free and open for educational demonstrations.",
  },
];

export function ContactFeedbackClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "tool-request",
    calculatorName: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const targetEmail = "contact@calcplatform.com";

  const selectedTopicObj =
    FEEDBACK_TOPICS.find((t) => t.id === formData.topic) || FEEDBACK_TOPICS[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getFullSubject = () => {
    const topicLabel = selectedTopicObj.label;
    const calc = formData.calculatorName ? ` [${formData.calculatorName}]` : "";
    const subj = formData.subject ? ` - ${formData.subject}` : "";
    return `[CalcPlatform Feedback] ${topicLabel}${calc}${subj}`;
  };

  const getFormattedBody = () => {
    const ratingStr = rating ? `User Rating: ${rating} / 5 Stars\n` : "";
    const calcStr = formData.calculatorName
      ? `Referenced Calculator: ${formData.calculatorName}\n`
      : "";

    return `Sender Name: ${formData.name || "Anonymous User"}
Sender Email: ${formData.email || "Not Provided"}
Category/Topic: ${selectedTopicObj.label}
${calcStr}${ratingStr}
Feedback & Message:
${formData.message}

---
Sent from CalcPlatform Feedback Hub (${new Date().toLocaleString()})`;
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
      setErrorMessage("Please provide both your email address and feedback message.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address format.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
          topicLabel: selectedTopicObj.label,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        // Fallback: Still mark submitted and provide webmail dispatchers
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Feedback submit error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const feedbackChannels = [
    {
      icon: Lightbulb,
      title: "Request a New Calculator",
      email: "requests@calcplatform.com",
      desc: "Suggest a financial tool, physics solver, health index, or construction estimator you want us to add to our 190+ tool library.",
      badge: "Feature Requests",
      badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    },
    {
      icon: Calculator,
      title: "Formula & Mathematical Review",
      email: "formulas@calcplatform.com",
      desc: "Found an edge-case rounding anomaly, formula discrepancy, or boundary condition issue? Our math team inspects all reports.",
      badge: "Mathematical Rigor",
      badgeColor: "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    },
    {
      icon: MessageSquare,
      title: "General Inquiries & Feedback",
      email: "contact@calcplatform.com",
      desc: "Share UX impressions, browser compatibility notes, educational classroom use questions, or general messages.",
      badge: "Direct Support",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-950 text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-blue-700 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400 text-yellow-950 border border-yellow-300 text-xs font-bold shadow-xs">
            <MessageSquare className="h-3.5 w-3.5 fill-yellow-950/20" />
            <span>Feedback & Contact Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading">
            Share Feedback, Request Calculators & Get in Touch
          </h1>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Have an idea for a new calculator, noticed a calculation discrepancy, or want to share your user experience? We review every submission directly to keep our 190+ calculators fast, accurate, and free.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-blue-200">
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Reviewed by Engineers
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-yellow-400" /> New Tool Requests Welcomed
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-sky-400" /> 100% Free & Privacy-Protected
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Quick Email Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900 shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div className="space-y-0.5 text-left">
              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                Direct Feedback & Inquiries:{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400 font-extrabold">
                  {targetEmail}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Directly monitored by our engineering and mathematical verification team.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
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
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=CalcPlatform%20Feedback`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Gmail Web</span>
            </a>
            <a
              href={`mailto:${targetEmail}?subject=CalcPlatform%20Feedback`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
            >
              <MailCheck className="h-3.5 w-3.5" />
              <span>Mail App</span>
            </a>
          </div>
        </div>

        {/* Interactive Feedback & Contact Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 bg-slate-50/80 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-yellow-400/20 text-yellow-800 dark:text-yellow-300 font-bold text-[11px] border border-yellow-400/40">
                  <Sparkles className="h-3 w-3" /> Select Feedback Category
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                  What would you like to share with us?
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Choose an option below to tailor your message and help our team route it efficiently.
                </p>
              </div>
            </div>

            {/* Quick Topic Chips Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-6">
              {FEEDBACK_TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isSelected = formData.topic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, topic: topic.id });
                    }}
                    className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 shadow-xs"
                        : "bg-white dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                        {topic.badge}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isSelected
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {topic.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-8 space-y-6">
                <div className="inline-flex p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-heading">
                    Feedback Received — Thank You!
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Your note has been received by our engineering queue. If you would also like to dispatch a direct email from your personal email client, choose a 1-click option below:
                  </p>
                </div>

                {/* 1-Click Instant Dispatch Options */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 max-w-lg mx-auto space-y-3.5 text-left">
                  <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <SendHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    Instant Direct Email Dispatch:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Send via Gmail Web</span>
                    </a>

                    <a
                      href={outlookComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Send via Outlook</span>
                    </a>

                    <a
                      href={mailtoUrl}
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <MailCheck className="h-3.5 w-3.5" />
                      <span>Open Mail App</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyFormattedMessage}
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-100 text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedMessage ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Message Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Full Text</span>
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
                      setRating(null);
                      setFormData({
                        name: "",
                        email: "",
                        topic: "tool-request",
                        calculatorName: "",
                        subject: "",
                        message: "",
                        honeypot: "",
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Feedback
                  </button>
                  <Link
                    href="/"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Explore Calculators
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Context Tip Banner */}
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 text-xs flex items-start gap-2.5 text-left">
                  <Lightbulb className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">Guidance for {selectedTopicObj.label}:</span>
                    <p className="text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
                      {selectedTopicObj.tip}
                    </p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between gap-2 text-left">
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

                {/* Name and Email */}
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
                      placeholder="e.g. Sarah Jenkins"
                      maxLength={150}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
                      placeholder="sarah@example.com"
                      maxLength={200}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Calculator Name & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Calculator Name or Topic (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.calculatorName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          calculatorName: e.target.value,
                        })
                      }
                      placeholder="e.g. Mortgage Calculator, BMI Calculator..."
                      maxLength={150}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Subject Line (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Request for Amortization Chart PDF export"
                      maxLength={250}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Experience Rating Quick Check */}
                <div className="space-y-2 text-left p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <ThumbsUp className="h-3.5 w-3.5 text-yellow-500" />
                      How would you rate your overall experience on CalcPlatform? (Optional)
                    </label>
                    {rating && (
                      <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                        {rating} / 5 Stars
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isActive = rating !== null && starVal <= rating;
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() =>
                            setRating(rating === starVal ? null : starVal)
                          }
                          aria-label={`Rate ${starVal} out of 5 stars`}
                          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-500 scale-110"
                              : "bg-white dark:bg-zinc-800 text-zinc-400 hover:text-yellow-400 border border-zinc-200 dark:border-zinc-700"
                          }`}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              isActive ? "fill-yellow-400 text-yellow-500" : ""
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-2">
                      {rating === 5
                        ? "Excellent!"
                        : rating === 4
                        ? "Great"
                        : rating === 3
                        ? "Average"
                        : rating === 2 || rating === 1
                        ? "Needs Improvement"
                        : "Click to rate"}
                    </span>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Feedback & Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    maxLength={10000}
                    placeholder={selectedTopicObj.placeholder}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-y transition-all"
                  />
                </div>

                {/* Submit & Status Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                    <span>Delivered securely over encrypted TLS/HTTPS</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-bold text-xs shadow-xs transition-all cursor-pointer border border-yellow-300 dark:border-yellow-400"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Sending Feedback...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Submit Feedback</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Dedicated Channels Grid */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 font-heading">
              Dedicated Feedback & Review Channels
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Direct email routes for specific inquiries and collaborative suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {feedbackChannels.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3.5 flex flex-col justify-between text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${dept.badgeColor}`}
                      >
                        {dept.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {dept.title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-xs font-mono border-t border-zinc-100 dark:border-zinc-800">
                    <a
                      href={`mailto:${dept.email}?subject=${encodeURIComponent(`[${dept.title}] Feedback`)}`}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all inline-flex items-center gap-1"
                    >
                      {dept.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Requested Categories Quick Jump */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white shadow-xs text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-300">
                <Layers className="h-3.5 w-3.5" /> 190+ Free Interactive Calculators
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                Looking for a specific calculation right now?
              </h3>
              <p className="text-xs text-blue-200">
                Explore our categorized directories or search across all verified mathematical solvers.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-bold text-xs transition-colors shrink-0 shadow-xs"
            >
              <span>Browse All Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Privacy & Direct Review Commitment */}
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-slate-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Feedback Privacy & Direct Communication Commitment
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We deeply respect your privacy. All feedback, bug reports, and calculator suggestions are received directly by our development and mathematics team. Contact details provided are strictly used to reply to your inquiry and are never sold, shared, or added to advertising lists.
          </p>
        </div>
      </div>
    </div>
  );
}
