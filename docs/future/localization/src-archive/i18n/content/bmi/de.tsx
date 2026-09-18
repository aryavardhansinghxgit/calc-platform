import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const GERMAN_BMI_SEO = {
  title: "BMI Rechner (Body-Mass-Index)",
  description:
    "Berechnen Sie Ihren Body-Mass-Index (BMI), Normalgewichtsbereich, Perzentilen für Kinder und Energiebedarf nach WHO- und CDC-Richtlinien.",
  category: "Gesundheit",
  keywords: [
    "bmi rechner",
    "body mass index",
    "normalgewicht",
    "bmi tabelle",
    "bmi kinder",
    "übergewicht",
    "adipositas",
  ],
};

export const GERMAN_BMI_FAQS: CalculatorFAQ[] = [
  {
    question: "Was ist der Body-Mass-Index (BMI) und wie wird er berechnet?",
    answer:
      "Der Body-Mass-Index (BMI) ist eine anthropometrische Kennzahl zur Beurteilung des Körpergewichts im Verhältnis zur Körpergröße: BMI = Gewicht (kg) / [Größe (m)]².",
  },
  {
    question: "Welche BMI-Kategorien gelten für Erwachsene laut WHO?",
    answer:
      "Für Erwachsene: Untergewicht (< 18,5), Normalgewicht (18,5 bis < 25,0), Übergewicht (25,0 bis < 30,0), Adipositas Grad 1 (30,0 bis < 35,0), Adipositas Grad 2 (35,0 bis < 40,0) und Adipositas Grad 3 (≥ 40,0 kg/m²).",
  },
  {
    question: "Warum werden bei Kindern und Jugendlichen BMI-Perzentilen verwendet?",
    answer:
      "Da sich der Körperfettanteil während des Wachstums dynamisch verändert, werden bei Kindern von 2 bis 19 Jahren alters- und geschlechtsspezifische Perzentilen herangezogen.",
  },
  {
    question: "Welche Grenzen hat der BMI in der Praxis?",
    answer:
      "Der BMI unterscheidet nicht zwischen Muskel- und Fettmasse. Kraftsportler können daher fälschlicherweise als übergewichtig eingestuft werden.",
  },
  {
    question: "Ist der BMI eine eigenständige medizinische Diagnose?",
    answer:
      "Nein, der BMI ist ein statistisches Screening-Instrument und ersetzt keine umfassende ärztliche Beurteilung.",
  },
];

export function GermanBmiContent() {
  return (
    <article className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          1. Was ist der Body-Mass-Index (BMI)?
        </h2>
        <p>
          Der Body-Mass-Index (BMI) ist ein standardisierter anthropometrischer Richtwert, der das Körpergewicht in Relation zur Körpergröße setzt.
        </p>
        <p>
          Er dient als grober Orientierungswert und nicht als definitive medizinische Diagnose.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          2. Berechnungsformel des BMI
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 max-w-md">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Metrische Standardformel</h3>
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded text-center font-bold text-blue-600 dark:text-blue-400 text-xs border border-slate-200 dark:border-slate-800">
            BMI = Gewicht (kg) / [Körpergröße (m)]²
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          3. BMI-Klassifikation für Erwachsene (WHO-Standard)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs my-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Kategorie</th>
                <th className="py-2.5 px-3">BMI-Bereich (kg/m²)</th>
                <th className="py-2.5 px-3">Bedeutung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="py-2.5 px-3 text-sky-700 dark:text-sky-400 font-bold">Untergewicht</td><td className="py-2.5 px-3 font-sans tabular-nums">&lt; 18,5</td><td className="py-2.5 px-3">Ernährungsberatung empfohlen.</td></tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20"><td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-bold">Normalgewicht</td><td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18,5 bis &lt; 25,0</td><td className="py-2.5 px-3">Standard-Referenzbereich.</td></tr>
              <tr><td className="py-2.5 px-3 text-yellow-700 dark:text-yellow-400 font-bold">Übergewicht</td><td className="py-2.5 px-3 font-sans tabular-nums">25,0 bis &lt; 30,0</td><td className="py-2.5 px-3">Erhöhte Aufmerksamkeit ratsam.</td></tr>
              <tr><td className="py-2.5 px-3 text-orange-700 dark:text-orange-400 font-bold">Adipositas (Grad 1)</td><td className="py-2.5 px-3 font-sans tabular-nums">30,0 bis &lt; 35,0</td><td className="py-2.5 px-3">Mäßiges Risiko.</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-700 dark:text-rose-400 font-bold">Adipositas (Grad 2)</td><td className="py-2.5 px-3 font-sans tabular-nums">35,0 bis &lt; 40,0</td><td className="py-2.5 px-3">Deutlich erhöhtes Risiko.</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-900 dark:text-rose-300 font-bold">Adipositas (Grad 3)</td><td className="py-2.5 px-3 font-sans tabular-nums">&ge; 40,0</td><td className="py-2.5 px-3">Schwere Adipositas.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Gesundheitshinweis</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Dieser Rechner dient ausschließlich Bildungs- und Informationszwecken und ersetzt keine ärztliche Untersuchung.
        </p>
      </section>
    </article>
  );
}
