import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const DE_DATE_SEO = {
  title: "Datumsrechner | Tage zwischen Daten, Tage addieren & Arbeitstage",
  description: "Berechnen Sie exakt die Tage zwischen zwei Daten, addieren oder subtrahieren Sie Tage, Wochen, Monate und Jahre, und ermitteln Sie Arbeitstage ohne Wochenenden und Feiertage.",
  keywords: ["datumsrechner", "tage zwischen zwei daten", "arbeitstage berechnen", "tage addieren", "kalenderrechner"],
};

export const DE_DATE_FAQS: CalculatorFAQ[] = [
  {
    question: "Wie berechnet man die genaue Anzahl an Tagen zwischen zwei Daten?",
    answer:
      "Geben Sie Start- und Enddatum ein. Der Rechner ermittelt die Anzahl der Kalendertage nach den Regeln des gregorianischen Kalenders, wahlweise inklusive oder exklusive des Endtages.",
  },
  {
    question: "Wie berücksichtigt der Rechner Schaltjahre?",
    answer:
      "Er nutzt die offizielle gregorianische Schaltjahrregel: Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist, außer bei Jahrhunderten, die nicht durch 400 teilbar sind.",
  },
  {
    question: "Was geschieht beim Addieren eines Monats zum 31. Januar?",
    answer:
      "Der Rechner wendet die Monatsende-Kappung an: 31. Januar plus 1 Monat ergibt den 28. Februar (oder 29. Februar in Schaltjahren).",
  },
  {
    question: "Wie werden Arbeitstage ermittelt?",
    answer:
      "Der Rechner zählt alle Tage im Intervall und zieht Wochenendtage sowie gesetzliche Feiertage automatisch ab.",
  },
];

export function DeDateContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Einführung in die Datums- und Fristenberechnung
        </h2>
        <p>
          Die präzise Frist- und Datumsberechnung ist in Recht, Projektmanagement, Personalwesen und Logistik unerlässlich. Aufgrund ungleicher Monatslängen und Schaltjahre sind verlässliche mathematische Algorithmen erforderlich.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Mathematische Grundlagen des Gregorianischen Kalenders
        </h2>
        <p>
          Der gregorianische Kalender synchronisiert das Kalenderjahr mit dem Sonnenjahr:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Gemeinjahr:</strong> 365 Tage verteilt auf 12 Monate.</li>
          <li><strong>Schaltjahrregel:</strong> Alle 4 Jahre ein Schalttag, mit Ausnahme von Säkularjahren ohne 400er-Teilbarkeit.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Rechenformeln
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Kalendertage:</strong> Δt = Enddatum − Startdatum</p>
          <p><strong>Arbeitstage:</strong> Werktage = Gesamttage − Wochenenden − Feiertage</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Typische Fehlerquellen
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Die Annahme, dass jeder Monat pauschal 30 Tage hat.</li>
          <li>Verwechslung von Kalendertagen und Arbeitstagen bei Fristen.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Zusammenfassung
        </h2>
        <p>
          Verwenden Sie für verbindliche Fristen stets kalenderkonforme Berechnungen inklusive präziser Feiertags- und Wochenendregeln.
        </p>
      </section>
    </article>
  );
}
