import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const DE_AUTO_LOAN_SEO = {
  title: "Autokredit-Rechner | Monatsrate, Zinskosten & Tilgungsplan",
  description: "Berechnen Sie die Monatsrate für Ihren Autokredit, Gesamtzinsen und Tilgungsverlauf für Neu- und Gebrauchtwagen.",
  keywords: ["autokredit rechner", "kfz kredit berechnen", "autofinanzierung rechner", "monatsrate auto berechnen"],
};

export const DE_AUTO_LOAN_FAQS: CalculatorFAQ[] = [
  {
    question: "Wie wird die monatliche Rate beim Autokredit berechnet?",
    answer:
      "Die Monatsrate basiert auf dem Nettodarlehensbetrag, dem effektiven Jahreszins und der gewählten Kreditlaufzeit nach der Annuitätenformel.",
  },
  {
    question: "Wie viel Anzahlung sollte man bei einer Autofinanzierung leisten?",
    answer:
      "Eine Anzahlung von 15 bis 20 % des Kaufpreises schützt vor Wertverlust und senkt die Zinslast spürbar.",
  },
];

export function DeAutoLoanContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Grundlagen der Autofinanzierung
        </h2>
        <p>
          Ein Ratenkredit für den Fahrzeugkauf verteilt die Gesamtsumme auf feste monatliche Zahlungen bei verlässlicher Zinssicherheit.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Annuitätenformel
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Monatliche Rate:</strong> M = P × [r(1 + r)^n] / [(1 + r)^n − 1]</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Zusammenfassung
        </h2>
        <p>
          Wählen Sie eine Laufzeit, die der tatsächlichen Nutzungsdauer des Fahrzeugs entspricht, idealerweise bis zu 48 Monate.
        </p>
      </section>
    </article>
  );
}
