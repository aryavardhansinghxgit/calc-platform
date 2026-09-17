import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const DE_CONCRETE_SEO = {
  title: "Betonrechner | Betonvolumen in Kubikmeter & Kubik-Yards berechnen",
  description: "Berechnen Sie den genauen Betonbedarf für Bodenplatten, Fundamente, Säulen und Treppen. Ermitteln Sie Kubikmeter, benötigte Betonsäcke und Verschnitt.",
  keywords: ["betonrechner", "beton berechnen kubikmeter", "fundament beton berechnen", "betonmenge rechner", "fertigbeton säcke"],
};

export const DE_CONCRETE_FAQS: CalculatorFAQ[] = [
  {
    question: "Wie berechnet man den Betonbedarf für eine Bodenplatte?",
    answer:
      "Multiplizieren Sie Länge, Breite und Dicke in Metern: Länge (m) × Breite (m) × Dicke (m) = Volumen in m³.",
  },
  {
    question: "Wie viel Verschnitt sollte man beim Betonieren einplanen?",
    answer:
      "Üblicherweise plant man einen Sicherheitsaufschlag von 5 bis 10 % für Unebenheiten und Verformungen der Schalung ein.",
  },
];

export function DeConcreteContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Einführung in die Betonmengenberechnung
        </h2>
        <p>
          Eine präzise Mengenermittlung von Beton verhindert teure Nachbestellungen und Festigkeitsverluste durch Arbeitsfugen bei Fundamenten und Platten.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Geometrische Formeln
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Rechteckiges Bauteil:</strong> V = Länge × Breite × Höhe</p>
          <p><strong>Rundsäule:</strong> V = π × (Radius)² × Höhe</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Zusammenfassung
        </h2>
        <p>
          Messen Sie alle Schalungsmaße exakt ein und kalkulieren Sie 10 % Reserve für Schalungsdruck und unebene Baugrubensohlen ein.
        </p>
      </section>
    </article>
  );
}
