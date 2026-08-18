"use client";

import React from "react";

export function GDPContent() {
  const faqs = [
    {
      question: "1. What is Gross Domestic Product (GDP) and what does it measure?",
      answer:
        "Gross Domestic Product (GDP) is the total monetary value of all finished goods and services produced within a country's geographic borders over a specific period (typically quarterly or annually). It serves as the primary comprehensive scorecard of a country's economic health and aggregate output.",
    },
    {
      question: "2. What is the Expenditure Approach formula for calculating GDP?",
      answer:
        "The standard Keynesian expenditure formula is GDP = C + I + G + (X - M), where C = Personal Consumption Expenditures, I = Gross Private Domestic Investment, G = Government Consumption & Gross Investment, X = Gross Exports, and M = Gross Imports (with X - M representing Net Exports).",
    },
    {
      question: "3. What is the difference between Nominal GDP and Real GDP?",
      answer:
        "Nominal GDP evaluates economic output using current market prices without adjusting for inflation, which can overstate growth during inflationary periods. Real GDP adjusts nominal output using a GDP Price Deflator index (Real GDP = [Nominal GDP ÷ GDP Deflator] × 100), measuring constant-dollar volume changes.",
    },
    {
      question: "4. What is the Income Approach to measuring GDP?",
      answer:
        "The Income Approach calculates GDP by summing all resource earnings generated in the production process: Compensation of Employees (wages) + Proprietors' Income + Rental Income + Corporate Profits + Net Interest + Indirect Business Taxes + Depreciation (Consumption of Fixed Capital) + Net Foreign Factor Income.",
    },
    {
      question: "5. What is the Production (Value-Added) Approach (Gross Value Added - GVA)?",
      answer:
        "The Production Approach calculates GDP by taking the Gross Output value of every industry sector (agriculture, manufacturing, services) and subtracting Intermediate Consumption (raw materials and energy used up in production): GVA = Gross Output - Intermediate Inputs + Net Product Taxes.",
    },
    {
      question: "6. What is GDP Per Capita and why is it important?",
      answer:
        "GDP Per Capita divides total national GDP by total resident population (GDP Per Capita = GDP ÷ Population). It provides a per-person metric of average economic productivity and material living standards across nations with widely differing population sizes.",
    },
    {
      question: "7. What is Purchasing Power Parity (PPP) GDP?",
      answer:
        "GDP at Purchasing Power Parity (PPP) adjusts nominal GDP figures to account for relative local price levels and cost-of-living differences between countries using a standardized basket of goods, preventing currency exchange rate distortions.",
    },
    {
      question: "8. What is the GDP Deflator and how does it compare to the Consumer Price Index (CPI)?",
      answer:
        "The GDP Deflator measures price inflation across all domestically produced goods and services (including capital equipment and government purchases), whereas the Consumer Price Index (CPI) tracks only a fixed representative basket of consumer household purchases.",
    },
    {
      question: "9. What economic activities are excluded from official GDP calculations?",
      answer:
        "GDP excludes non-market home labor (childcare, housekeeping), underground shadow economies, transfer payments (Social Security, welfare benefits), purely financial asset transactions (stocks, bonds), and sales of used second-hand goods.",
    },
    {
      question: "10. What is Gross National Product (GNP) / Gross National Income (GNI)?",
      answer:
        "GNP/GNI measures the total market value produced by a nation's permanent citizens and corporate enterprises regardless of where production takes place globally: GNP = GDP + Net Primary Income from Abroad.",
    },
    {
      question: "11. What defines a technical economic recession?",
      answer:
        "A standard rule-of-thumb definition of a technical recession is two consecutive quarters of negative Real GDP growth. In the United States, the National Bureau of Economic Research (NBER) formally dates recessions based on broad declines in employment, personal income, and industrial production.",
    },
    {
      question: "12. What are the limitations of GDP as a measure of national well-being?",
      answer:
        "GDP measures aggregate transactional economic volume, not distribution of wealth, income inequality, environmental degradation, resource depletion, healthcare quality, or personal leisure and happiness. Natural disasters and cleanup efforts can ironically raise GDP despite destroying capital wealth.",
    },
  ];

  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. PRINCIPLES OF MACROECONOMIC ACCOUNTING */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Principles of Macroeconomic Accounting &amp; National Output
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          <strong>Gross Domestic Product (GDP)</strong> represents the aggregate market value of all finalized goods, structures, agricultural commodities, and services produced domestically within an economy during a defined time window.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Macroeconomists utilize three theoretically equivalent computational methodologies to measure GDP: the <strong>Expenditure Approach</strong> (what is purchased), the <strong>Income Approach</strong> (what is earned), and the <strong>Production / Value-Added Approach</strong> (what is produced).
        </p>
      </section>

      {/* 2. THE THREE COMPUTATIONAL METHODOLOGIES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. The Three GDP Methodologies Compared
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Expenditure Approach
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>GDP = C + I + G + (X - M)</strong>. Sums consumption, private investment, government purchases, and net foreign exports.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Income Approach
            </h3>
            <p className="text-black dark:text-slate-100">
              Sums wages, corporate profits, rental income, net interest, indirect taxes, and capital depreciation across all productive resources.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Production (GVA)
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>GVA = Gross Output - Intermediate Inputs</strong>. Calculates value-add across agriculture, industry, and service sectors.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 12 FAQS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5"
            >
              <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
                {faq.question}
              </h3>
              <p className="text-black dark:text-slate-100 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
