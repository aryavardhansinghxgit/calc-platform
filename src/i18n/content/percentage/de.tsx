import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const GERMAN_PERCENTAGE_SEO = {
  title: "Prozentrechner",
  description:
    "Berechnen Sie Prozentwerte, 3-Variablen-Gleichungen, prozentuale Änderungen, Erhöhungen, Rabatte und mathematische Verhältnisse.",
  category: "Mathematik",
  keywords: [
    "prozentrechner",
    "prozentrechnung",
    "prozent berechnen",
    "prozentuale differenz",
    "prozentuale änderung",
    "rabatt berechnen",
  ],
};

export const GERMAN_PERCENTAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "Was ist ein Prozent und wie wird es berechnet?",
    answer:
      "Ein Prozent ist ein dimensionsloses Verhältnis, ausgedrückt als Bruchteil von 100. Es wird berechnet, indem der Anteil durch das Ganze geteilt und mit 100 multipliziert wird: Prozent = (Anteil / Grundwert) × 100.",
  },
  {
    question: "Wie berechne ich, wie viel Prozent eine Zahl von einer anderen ist?",
    answer:
      "Um zu ermitteln, wie viel Prozent A von B ist, dividieren Sie A durch B und multiplizieren mit 100: P = (A / B) × 100. Zum Beispiel ist 8 von 2 gleich 400%. Wenn B gleich 0 ist, ist die Rechnung mathematisch undefiniert.",
  },
  {
    question: "Was ist der Unterschied zwischen prozentualer Änderung und prozentualer Differenz?",
    answer:
      "Die prozentuale Änderung ist gerichtet und vergleicht einen Endwert mit einem Anfangswert: ((V2 - V1) / V1) × 100. Die prozentuale Differenz ist symmetrisch und vergleicht zwei Zahlen bezogen auf ihren arithmetischen Mittelwert.",
  },
  {
    question: "Wie berechnet man eine prozentuale Erhöhung oder Senkung?",
    answer:
      "Für eine Erhöhung um P% multiplizieren Sie den Anfangswert mit (1 + P / 100). Für eine Verringerung mit (1 - P / 100). Beispielsweise ergibt 100 mit 10% Rabatt: 100 × 0,90 = 90.",
  },
  {
    question: "Warum ist eine Prozentrechnung bei einem Grundwert von Null undefiniert?",
    answer:
      "In der Mathematik ist eine Division durch Null nicht definiert. Da der Grundwert als Nenner in der Prozentformel steht, existiert kein endliches Ergebnis.",
  },
];

export function GermanPercentageContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Was ist ein Prozent?
        </h2>
        <p>
          In der Mathematik ist ein Prozent ein dimensionsloses Verhältnis, das als Bruchteil von 100 dargestellt wird. Es dient als standardisierte Methode, um proportionale Anteile bezogen auf einen festen Grundwert zu vergleichen. Abgeleitet vom lateinischen <em>per centum</em> (&quot;vom Hundert&quot;), sind Prozente in Wirtschaft, Statistik und Wissenschaft unverzichtbar.
        </p>
        <p>
          Jeder Prozentsatz lässt sich durch Division durch 100 in eine Dezimalzahl oder in einen gekürzten Bruch umwandeln. So entspricht 35% dem Dezimalwert 0,35 und dem Bruch 7/20.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Grundformel der Prozentrechnung
        </h2>
        <p>
          Die grundlegende algebraische Gleichung verknüpft drei Kernvariablen:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>Berechnung des Prozentwerts (V<sub>2</sub>):</strong> V<sub>2</sub> = (P / 100) × V<sub>1</sub></li>
          <li><strong>Berechnung des Prozentsatzes (P%):</strong> P = (V<sub>2</sub> / V<sub>1</sub>) × 100%</li>
          <li><strong>Berechnung des Grundwerts (V<sub>1</sub>):</strong> V<sub>1</sub> = V<sub>2</sub> / (P / 100)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Prozentuale Differenz vs. Prozentuale Änderung
        </h2>
        <p>
          Die <strong>prozentuale Differenz</strong> bewertet den symmetrischen Abstand zweier Werte relativ zu ihrem Mittelwert:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Differenz = (|V<sub>1</sub> - V<sub>2</sub>| / ((V<sub>1</sub> + V<sub>2</sub>) / 2)) × 100%
        </div>
        <p>
          Die <strong>prozentuale Änderung</strong> bewertet das gerichtete Wachstum von einem Ausgangswert V<sub>1</sub> zu einem Endwert V<sub>2</sub>:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Änderung = ((V<sub>2</sub> - V<sub>1</sub>) / V<sub>1</sub>) × 100%
        </div>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Referenztabelle für häufige Prozentumrechnungen
        </h2>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded max-w-xl">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Bruch</th>
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Dezimal</th>
                <th className="p-2">Prozentsatz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/2</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,5</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,25</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/5</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,2</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/10</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,1</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">3/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,75</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Didaktische Zusammenfassung</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Prozente sind fundamentale Vergleichsmaßstäbe für proportionale Verhältnisse, Wachstumsraten, Rabatte und mathematische Differenzen.
        </p>
      </section>
    </article>
  );
}
