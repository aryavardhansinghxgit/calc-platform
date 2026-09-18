import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const DE_CURRENCY_SEO = {
  title: "Währungsrechner | Echtzeit-Wechselkurse & Bankgebühren-Vergleich",
  description: "Rechnen Sie über 160 weltweite Währungen mit echten Devisenkursen um. Erkennen Sie versteckte Bankgebühren und Wechselkursaufschläge.",
  keywords: ["währungsrechner", "wechselkurs euro dollar", "devisenrechner", "währung umrechnen"],
};

export const DE_CURRENCY_FAQS: CalculatorFAQ[] = [
  {
    question: "Was ist der Devisenmittelkurs (Mid-Market Rate)?",
    answer:
      "Der Mittelkurs ist der faire Referenzkurs ohne Handelsaufschläge, der im globalen Interbankenmarkt zwischen Großbanken gehandelt wird.",
  },
  {
    question: "Wie berechnen Banken Wechselkursgebühren?",
    answer:
      "Banken schlagen oft eine Marge von 1 bis 3 % auf den Devisenmittelkurs auf, die als indirekte Gebühr vom umgerechneten Betrag abgezogen wird.",
  },
];

export function DeCurrencyContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Einführung in den Devisenmarkt
        </h2>
        <p>
          Der Devisenmarkt (Forex) regelt den Wert internationaler Währungen zueinander. Für Auslandsüberweisungen und Reisen ist der Vergleich mit dem echten Marktkurs unerlässlich.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Umrechnungsformeln
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Umrechnung:</strong> Zielbetrag = Ausgangsbetrag × Wechselkurs</p>
          <p><strong>Inverser Kurs:</strong> Inverser_Kurs = 1 / Wechselkurs</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Zusammenfassung
        </h2>
        <p>
          Achten Sie auf transparente Gebührenmodelle, die auf dem offiziellen Mittelkurs basieren.
        </p>
      </section>
    </article>
  );
}
