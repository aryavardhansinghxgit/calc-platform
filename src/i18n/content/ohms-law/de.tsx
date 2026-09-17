import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const DE_OHMS_LAW_SEO = {
  title: "Ohmsches Gesetz Rechner | Spannung, Strom, Widerstand & Leistung",
  description: "Berechnen Sie elektrische Spannung (U), Stromstärke (I), Widerstand (R) und Leistung (P) mit dem Ohmschen Gesetz und der Joule-Formel.",
  keywords: ["ohmsches gesetz rechner", "spannung strom widerstand berechnen", "ohmsche formel", "leistung watt berechnen"],
};

export const DE_OHMS_LAW_FAQS: CalculatorFAQ[] = [
  {
    question: "Was besagt das Ohmsche Gesetz?",
    answer:
      "Das Ohmsche Gesetz beschreibt den proportionalen Zusammenhang zwischen Spannung (U), Stromstärke (I) und Widerstand (R): U = R × I.",
  },
  {
    question: "Wie berechnet man die elektrische Leistung?",
    answer:
      "Die Leistung in Watt berechnet sich mit P = U × I = I² × R = U² / R.",
  },
];

export function DeOhmsLawContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Einführung in das Ohmsche Gesetz
        </h2>
        <p>
          Das Ohmsche Gesetz ist das grundlegende Gesetz der Elektrotechnik für lineare elektrische Stromkreise.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Formelrad der Elektrotechnik
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Spannung (U):</strong> U = R × I</p>
          <p><strong>Strom (I):</strong> I = U / R</p>
          <p><strong>Widerstand (R):</strong> R = U / I</p>
          <p><strong>Leistung (P):</strong> P = U × I</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Zusammenfassung
        </h2>
        <p>
          Aus zwei bekannten elektrischen Größen lassen sich stets die beiden verbleibenden Werte eindeutig ermitteln.
        </p>
      </section>
    </article>
  );
}
