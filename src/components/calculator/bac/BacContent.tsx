"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  BookOpen,
  HelpCircle,
  Link2,
  Search,
} from "lucide-react";
import { bacEducationalContent } from "@/app/calculators/bac-calculator/content";
import { bacFaqs } from "@/app/calculators/bac-calculator/faq";

export function BacContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const categories = [
    "All",
    "Fundamentals",
    "Metabolism",
    "Formulas",
    "Driving & Law",
    "Health & Safety",
  ];

  const filteredFaqs = bacFaqs.filter((faq) => {
    const matchesCategory =
      faqCategoryFilter === "All" || faq.category === faqCategoryFilter;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const relatedCalculators = [
    {
      name: "Calorie Calculator",
      slug: "/calculators/calorie-calculator",
      description: "Daily caloric needs, macronutrient split, and metabolism.",
    },
    {
      name: "TDEE Calculator",
      slug: "/calculators/tdee-calculator",
      description: "Total Daily Energy Expenditure and BMR metabolic rate suite.",
    },
    {
      name: "BMI Calculator",
      slug: "/calculators/bmi-calculator",
      description: "Body Mass Index evaluation and clinical obesity categories.",
    },
    {
      name: "Body Surface Area Calculator",
      slug: "/calculators/body-surface-area-calculator",
      description: "Clinical BSA formulas for medical dosing & hemodynamics.",
    },
    {
      name: "Pregnancy Weight Gain Calculator",
      slug: "/calculators/pregnancy-weight-gain-calculator",
      description: "Trimester-by-trimester healthy pregnancy weight tracking.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 mt-12 print:hidden font-sans">
      {/* Educational Guide Section */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3  pb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Clinical Guide to Blood Alcohol Concentration (BAC) & Sobriety Analytics
            </h2>
            <p className="text-xs text-slate-900 mt-0.5">
              Comprehensive medical guide on Widmark vs Seidl vs Watson equations, ADH hepatic kinetics, and DUI driving limits.
            </p>
          </div>
        </div>

        {/* Clean Formatted Educational Sections */}
        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-5">
          {bacEducationalContent.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("# ")) {
              return (
                <h1 key={idx} className="text-2xl font-bold text-slate-900  pb-2 mt-6">
                  {trimmed.replace("# ", "")}
                </h1>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-lg font-bold text-slate-900 mt-6 text-rose-800 border-l-4 border-rose-500 pl-3">
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              const lines = trimmed.split("\n");
              const title = lines[0].replace("### ", "");
              const rest = lines.slice(1).join("\n");
              return (
                <div key={idx} className="space-y-2 mt-4">
                  <h3 className="text-base font-bold text-slate-900 text-blue-600">
                    {title}
                  </h3>
                  {rest && <p className="text-slate-700 leading-relaxed">{rest}</p>}
                </div>
              );
            }
            if (trimmed.includes("BAC (%) =") || trimmed.includes("r =")) {
              return (
                <div key={idx} className="bg-slate-50 border border-rose-200 p-3.5 rounded-xl font-sans tabular-nums text-rose-900 font-bold text-xs sm:text-sm text-center my-3 shadow-xs">
                  {trimmed}
                </div>
              );
            }
            if (trimmed.startsWith("|")) {
              return (
                <div key={idx} className="overflow-x-auto my-4">
                  <table className="w-full text-xs border-collapse border border-slate-200 text-left">
                    {trimmed
                      .split("\n")
                      .filter((row) => row.trim() && !row.includes(":---"))
                      .map((row, rIdx) => {
                        const cells = row.split("|").filter((c) => c.trim() !== "");
                        if (rIdx === 0) {
                          return (
                            <thead key={rIdx} className="bg-slate-100 font-bold text-slate-900">
                              <tr>
                                {cells.map((cell, cIdx) => (
                                  <th key={cIdx} className="border border-slate-200 p-2.5">
                                    {cell.trim()}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          );
                        }
                        return (
                          <tbody key={rIdx}>
                            <tr className=" hover:bg-slate-50">
                              {cells.map((cell, cIdx) => (
                                <td key={cIdx} className="border border-slate-200 p-2.5">
                                  {cell.trim()}
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              );
            }
            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4  pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions ({bacFaqs.length}+ FAQs)
              </h2>
              <p className="text-xs text-slate-900 mt-0.5">
                Clinical answers on BAC elimination, legal limits, DUI enforcement, and toxicity thresholds.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFaqCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                faqCategoryFilter === cat
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions Grid */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 bg-slate-50/50 hover:bg-slate-50"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-slate-900 leading-relaxed /60 bg-white">
                      {faq.answer}
                      <div className="mt-2 text-[10px] text-blue-600 font-semibold uppercase tracking-wider">
                        Category: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">No matching FAQs found for "{searchQuery}".</div>
          )}
        </div>
      </section>

      {/* Related Calculators Navigation */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-2xl text-white space-y-6">
        <div className="flex items-center gap-3  pb-4">
          <div className="p-2.5 bg-rose-500/20 text-blue-400 rounded-xl">
            <Link2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Related Health & Fitness Calculators</h2>
            <p className="text-xs text-slate-400 mt-0.5">Explore our clinical health, metabolic, and body composition suite.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.slug}
              className="p-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 rounded-xl transition-all space-y-1.5 group"
            >
              <div className="font-bold text-white group-hover:text-blue-400 text-sm flex items-center justify-between">
                {calc.name}
                <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BacContent;
