"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export interface FAQSectionProps {
  faqs?: CalculatorFAQ[];
}

const defaultFaqs: CalculatorFAQ[] = [
  {
    question: "How accurate are these online calculations?",
    answer:
      "All calculations utilize standardized financial and mathematical algorithms. Outputs are intended for planning and estimation purposes.",
  },
  {
    question: "Is my personal data saved or tracked?",
    answer:
      "No. All mathematical processing runs entirely within your local browser session. We do not store or transmit your numbers.",
  },
];

export function FAQSection({ faqs = defaultFaqs }: FAQSectionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-slate-300 dark:border-slate-700">
          <AccordionTrigger className="text-sm font-bold text-black dark:text-white hover:text-black dark:hover:text-white hover:no-underline py-2.5 text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-xs text-black dark:text-white leading-relaxed pb-2 font-medium">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQSection;
