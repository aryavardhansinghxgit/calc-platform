"use client";

import React from "react";

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
  className?: string;
}

export function FAQSection({
  title = "Frequently Asked Questions",
  faqs,
  className = "",
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={`space-y-4 pt-2 ${className}`}>
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5"
          >
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {faq.question}
            </h4>
            <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
