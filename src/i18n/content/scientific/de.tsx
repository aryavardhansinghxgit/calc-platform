import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const GERMAN_SCIENTIFIC_SEO = {
  title: "Wissenschaftlicher Taschenrechner Online",
  description:
    "Erweiterter wissenschaftlicher Rechner für Trigonometrie, Logarithmen, Potenzen, Wurzeln, Kombinatorik und Statistik.",
  category: "Mathematik",
  keywords: [
    "wissenschaftlicher rechner",
    "trigonometrie",
    "logarithmus",
    "potenzen und wurzeln",
    "kombinatorik",
    "statistik",
  ],
};

export const GERMAN_SCIENTIFIC_FAQS: CalculatorFAQ[] = [
  {
    question: "Welche Funktionen bietet dieser wissenschaftliche Rechner?",
    answer:
      "Er umfasst Winkelfunktionen (sin, cos, tan), Logarithmen (ln, log₁₀, log₂), n-te Wurzeln, Potenzen, Fakultäten, nPr, nCr, ggT, kgV und statistische Auswertungen.",
  },
  {
    question: "Wie wird zwischen Grad und Bogenmaß gewechselt?",
    answer:
      "Wählen Sie im oberen Funktionsbereich die Optionen Deg (Grad), Rad (Bogenmaß) oder Grad (Neugrad).",
  },
  {
    question: "Welche numerische Genauigkeit wird verwendet?",
    answer:
      "Das System rechnet mit 64-Bit-IEEE-754-Gleitkommazahlen und dem Shunting-Yard-Algorithmus zur fehlerfreien Operatorenreihenfolge.",
  },
  {
    question: "Wie berechnet man Logarithmen beliebiger Basis?",
    answer:
      "Nutzen Sie die Formel log_b(a) = ln(a) / ln(b) oder die 2-Parameter-Funktion log(x, Basis).",
  },
  {
    question: "Wann tritt ein Definitionsbereichsfehler (Domain Error) auf?",
    answer:
      "Gerade Wurzeln aus negativen Zahlen und Logarithmen von Zahlen kleiner oder gleich Null sind im Reellen nicht definiert.",
  },
];

export function GermanScientificContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Was ist ein wissenschaftlicher Rechner?
        </h2>
        <p>
          Ein wissenschaftlicher Rechner ermöglicht die präzise Berechnung höherer mathematischer Operationen in Physik, Ingenieurwesen und Datenanalyse.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Winkelfunktionen und Winkelmaße
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Grad (Deg):</strong> Vollkreis = 360°.</li>
          <li><strong>Bogenmaß (Rad):</strong> Vollkreis = 2π Radiant (SI-Einheit).</li>
          <li><strong>Neugrad / Gon (Grad):</strong> Vollkreis = 400 Gon.</li>
        </ul>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Didaktische Zusammenfassung</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Wissenschaftliche Berechnungen bilden die Grundlage für mathematische Modellierung und technische Problemlösungen.
        </p>
      </section>
    </article>
  );
}
