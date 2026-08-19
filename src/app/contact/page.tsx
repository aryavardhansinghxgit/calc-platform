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
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "calculation-feedback",
    subject: "",
    message: "",
    honeypot: "", // Anti-spam field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setLoading(true);
    setErrorMessage("");

    try {
      // 1. Try our internal API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // 2. Direct fallback to FormSubmit service if API route fails
        const directRes = await fetch("https://formsubmit.co/ajax/xasvmax@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `[CalcPlatform] ${formData.subject || formData.topic}`,
            name: formData.name || "Anonymous User",
            email: formData.email,
            topic: formData.topic,
            message: formData.message,
          }),
        });

        if (directRes.ok) {
          setSubmitted(true);
        } else {
          setErrorMessage(
            "There was an issue delivering the message. You can email us directly at xasvmax@gmail.com"
          );
        }
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      // Fallback
      setErrorMessage(
        "Network connection issue. Please send an email directly to xasvmax@gmail.com"
      );
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    {
      icon: Bug,
      title: "Formula & Math Review",
      email: "xasvmax@gmail.com",
      desc: "Report a formula discrepancy, edge-case rounding anomaly, or calculation suggestion.",
    },
    {
      icon: Lightbulb,
      title: "New Calculator Requests",
      email: "xasvmax@gmail.com",
      desc: "Suggest a new financial, scientific, mathematical, or engineering calculator.",
    },
    {
      icon: Mail,
      title: "Direct Support & Inquiries",
      email: "xasvmax@gmail.com",
      desc: "For general inquiries, UI feedback, browser compatibility issues, or partnerships.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-700">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/40 text-blue-200 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="h-3.5 w-3.5" /> Get in Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Contact & Support
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Have feedback on a calculation, found a bug, or want to suggest a new tool? All inquiries are delivered directly to our support inbox.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
                    href={`mailto:${dept.email}`}
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline break-all"
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
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Message Sent Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Your message has been sent to <strong>xasvmax@gmail.com</strong>. We will review and respond promptly.
              </p>
              <div className="pt-3">
                <button
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
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  Send Us a Message
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Fill out the form below. Messages are delivered directly to <span className="font-semibold text-blue-600 dark:text-blue-400">xasvmax@gmail.com</span>.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Hidden spam honeypot */}
              <input
                type="text"
                name="_honey"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Topic / Category
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="calculation-feedback">Calculation / Math Feedback</option>
                    <option value="bug-report">Bug Report / Technical Issue</option>
                    <option value="calculator-request">Request a New Calculator</option>
                    <option value="partnership">Partnership or Editorial Inquiry</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Question on Compound Interest Formula"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your calculation scenario, bug details, or feature suggestion..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                  <Clock className="h-3.5 w-3.5" />
                  Direct response to xasvmax@gmail.com.
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
