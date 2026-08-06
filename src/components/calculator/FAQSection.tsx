"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
    <Card className="bg-slate-900/60 border-slate-800/80 rounded-[12px] p-6 space-y-4">
      <CardHeader className="p-0 pb-2 border-b border-slate-800">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-sky-400" /> Frequently Asked Questions
        </CardTitle>
        <CardDescription className="text-xs text-slate-400">
          Answers to common questions regarding calculation formulas and rules.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-slate-800">
              <AccordionTrigger className="text-sm font-semibold text-slate-200 hover:text-sky-400 py-3">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs text-slate-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default FAQSection;
