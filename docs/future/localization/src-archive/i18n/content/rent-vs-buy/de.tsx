"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Ist Mieten oder Kaufen wirtschaftlich vorteilhafter?",
    "answer": "Das hängt von Haltedauer, Kaufpreis, Mietniveau, Kaufnebenkosten und alternativen Renditen ab."
  },
  {
    "question": "Was bedeutet der Breakeven-Horizont?",
    "answer": "Die Anzahl der Jahre, nach denen der Kauf finanziell vorteilhafter wird als das Mieten."
  },
  {
    "question": "Was besagt die 5%-Regel beim Immobilienvergleich?",
    "answer": "Sie summiert die unwiederbringlichen Kosten des Eigentums: Hypothekenzinsen, Grundsteuer und Instandhaltung."
  },
  {
    "question": "Welche Rolle spielt die Wertsteigerung der Immobilie?",
    "answer": "Sie steigert das Nettovermögen des Eigentümers über die Zeit, ist jedoch marktabhängig."
  },
  {
    "question": "Wie wirken sich Mieterhöhungen aus?",
    "answer": "Steigende Mieten verteuern das Wohnen zur Miete und machen die feste Monatsrate des Eigentümers attraktiver."
  },
  {
    "question": "Was versteht man unter den Opportunitätskosten des Eigenkapitals?",
    "answer": "Die entgangenen Anlageerträge, wenn das Eigenkapital in die Immobilie statt in den Kapitalmarkt fließt."
  },
  {
    "question": "Welche Nebenkosten fallen beim Eigentum an?",
    "answer": "Kaufnebenkosten (2 %–5 %), Grundsteuer, Wohngebäudeversicherung, Instandhaltungsrücklagen und Maklerkosten beim Verkauf."
  },
  {
    "question": "Was ist das Kaufpreis-Miete-Verhältnis (Price-to-Rent)?",
    "answer": "Kaufpreis geteilt durch die Jahreskaltmiete; Werte unter 15 sprechen für Kaufen, über 20 für Mieten."
  },
  {
    "question": "Werden steuerliche Abzugsmöglichkeiten berücksichtigt?",
    "answer": "Abzugsfähige Schuldzinsen und Aufwendungen können die Steuerlast mindern."
  },
  {
    "question": "Warum ist die geplante Wohndauer entscheidend?",
    "answer": "Hohe Kaufnebenkosten amortisieren sich erst über mehrere Jahre des Schuldenabbaus und der Wertsteigerung."
  },
  {
    "question": "Wie entwickelt sich das Nettovermögen nach 30 Jahren?",
    "answer": "Der Käufer besitzt eine schuldenfreie Immobilie, während der Mieter auf sein angespartes Wertpapierdepot setzt."
  },
  {
    "question": "Wie führt man eine Sensitivitätsanalyse durch?",
    "answer": "Vergleichen Sie Szenarien mit variierenden Mietsteigerungen, Wertentwicklungen und Anlagezinsen."
  }
];

export const seo = {
  title: "Mieten oder Kaufen Rechner (Rent vs Buy) — Verhältnis = Kaufpreis / Jahreskaltmiete (Basis",
  description: "Vergleichen Sie Mieten und Kaufen: Hypothekenzinsen, Wertsteigerung, Mieterhöhungen, Opportunitätskosten und Amortisationszeit.",
  keywords: ["mieten oder kaufen rechner","rent vs buy rechner","immobilienkauf vergleich","lohnt sich kaufen oder mieten"]
};

export const ContentComponent = function RentVsBuyContentDE() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Mieten oder Kaufen Rechner (Rent vs Buy)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Umfassender Vergleich zwischen Mieten und Kaufen unter Berücksichtigung von Tilgung, Mieterhöhung, Wertsteigerung, Instandhaltung, Steuern und Opportunitätskosten.
        </p>
      </div>

      {/* 2. What Does it Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. Was leistet ein Mieten-oder-Kaufen-Rechner?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Die Entscheidung für Miete oder Eigentum ist weit mehr als der Vergleich zwischen Monatsmiete und Kreditrate. Eine fundierte Analyse berücksichtigt Eigenkapital, Zinsen, Tilgung, Grundsteuer, Gebäudeversicherung, Instandhaltung, Kaufnebenkosten, Verkaufskosten, Wertsteigerung, Mietsteigerung und entgangene Kapitalmarktrenditen.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Dieser Rechner ist ein finanzmathematisches Modellierungswerkzeug. Im validierten Basisszenario liegt der Breakeven-Horizont bei etwa 4,8 Jahren zugunsten des Immobilienkaufs.
        </p>
      </section>

      {/* 3. Total Economics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Gesamtwirtschaftlichen Vergleich anstellen, nicht nur Monatsraten
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Eine Kreditrate besteht aus Zinsaufwand und Tilgung (Vermögensaufbau). Mieter tragen keine Instandhaltungskosten, unterliegen jedoch Mietsteigerungen und können ihr freies Kapital am Kapitalmarkt anlegen.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Unser Modell vergleicht daher Cashflows, unwiederbringliche Kosten, Eigenkapitalaufbau und Nettovermögensentwicklung über 30 Jahre.
        </p>
      </section>

      {/* 4. How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. Bedienungsanleitung für den Rechner
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Geben Sie Kaufpreis und Eigenkapitalquote ein.</li>
          <li>Tragen Sie Sollzins und Darlehenslaufzeit ein.</li>
          <li>Erfassen Sie Grundsteuer, Versicherung und Instandhaltungsrücklage.</li>
          <li>Geben Sie Kaufnebenkosten und erwartete Verkaufskosten an.</li>
          <li>Tragen Sie die aktuelle Monatsmiete und die jährliche Mietsteigerungsrate ein.</li>
          <li>Ergänzen Sie Hausratversicherung und sonstige Mietnebenkosten.</li>
          <li>Wählen Sie die Renditeerwartung für alternative Geldanlagen.</li>
          <li>Überprüfen Sie die Gesamtkostenaufstellung beider Optionen.</li>
          <li>Prüfen Sie den Breakeven-Horizont und die Wohndauertabelle.</li>
          <li>Beurteilen Sie das Kaufpreis-Miete-Verhältnis und die 5%-Regel.</li>
          <li>Vergleichen Sie die Nettovermögenskurven über 10, 20 und 30 Jahre.</li>
          <li>Speichern Sie Szenarien zum systematischen Vergleich.</li>
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Eingabeparameter im Detail
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.1 Kaufpreis und Eigenkapital</h3>
            <p className="mt-1 leading-relaxed">Bestimmen das Darlehensvolumen. Bei 500.000 $ mit 20 % Anzahlung werden 100.000 $ Eigenkapital gebunden und 400.000 $ finanziert.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.2 Sollzins und Laufzeit</h3>
            <p className="mt-1 leading-relaxed">Definieren den Annuitätentilgungsplan. Höhere Zinsen steigern den unwiederbringlichen Finanzierungsaufwand.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.3 Grundsteuer, Versicherung und Instandhaltung</h3>
            <p className="mt-1 leading-relaxed">Stellen die laufenden, nicht vermögensbildenden Eigentümerkosten dar, die dynamisch mit der Inflation wachsen.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.4 Monatsmiete und Mietsteigerungsrate</h3>
            <p className="mt-1 leading-relaxed">Die Miete wächst jährlich mit der gewählten Rate und verteuert das Wohnen zur Miete kumulativ.</p>
          </div>
        </div>
      </section>

      {/* 6. How Mortgage Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Funktionsweise des Hypothekenteils
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Die Monatsrate teilt sich in degressive Zinsen und progressive Tilgung auf.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Im Zeitverlauf sinkt der Zinsanteil, während die Tilgung den Vermögensaufbau beschleunigt.
        </p>
      </section>

      {/* 7. Buying Costs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Eigentumskosten jenseits der Kreditrate
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Eigentum beinhaltet verfallene Kosten: Grundsteuer, Gebäudeinstandhaltung und Maklerkosten beim späteren Verkauf (5 %–6 %).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Diese machen kurze Haltedauern unrentabel: Es braucht mehrere Jahre Tilgung und Wertsteigerung zur Kompensation.
        </p>
      </section>

      {/* 8. Stay Length */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Warum die Haltedauer entscheidend ist
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Transaktionskosten fallen punktuell an, während Tilgung und Wertsteigerung kontinuierlich wirken.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Im Basisszenario liegt der Breakeven bei 4,8 Jahren. Bei Haltedauern unter 3 Jahren ist Mieten meist wirtschaftlicher.
        </p>
      </section>

      {/* 9. Breakeven Point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Der Breakeven-Punkt (Amortisationszeit)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Der Zeitpunkt, an dem die kumulierten Nettokosten des Kaufs günstiger werden als die der Miete.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Nach 30 Jahren betragen die Nettokosten 726.761 $ beim Kauf gegenüber 1.721.379 $ bei der Miete im Referenzmodell.
        </p>
      </section>

      {/* 10. Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          10. Immobilien-Wertsteigerung
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Die jährliche Wertsteigerung erhöht das Sachwertvermögen des Eigentümers.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Bei 3 % p.a. steigt der Wert einer 500.000 $-Immobilie nach 30 Jahren auf über 1.200.000 $.
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          11. Mietpreisinflation
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Eine Miete von 3.000 $ steigt bei 3 % jährlicher Erhöhung nach 30 Jahren auf 7.280 $/Monat an.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Dies verdeutlicht den Vorteil einer festen Darlehensrate gegenüber steigenden Mietkosten.
        </p>
      </section>

      {/* 12. Opportunity Cost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Opportunitätskosten des Eigenkapitals
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Das in die Anzahlung gesteckte Geld hätte am Kapitalmarkt Erträge erwirtschaften können.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Bei 5 % Jahresrendite wachsen 100.000 $ Eigenkapital über 30 Jahre auf über 432.000 $ an.
        </p>
      </section>

      {/* 13. Price-to-Rent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Kaufpreis-Miete-Verhältnis (Price-to-Rent)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Kaufpreis geteilt durch die Jahresmiete (500.000 $ / 36.000 $ = 13,9).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Werte unter 15 deuten auf einen kauffreundlichen Markt hin.
        </p>
      </section>

      {/* 14. 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          14. Die 5%-Regel für verfallene Kosten
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Addiert Zinsen, Grundsteuer und Instandhaltung.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Bei 500.000 $ betragen die verfallenen Kosten 4.013 $/Monat gegenüber der Miete.
        </p>
      </section>

      {/* 15. Tax Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          15. Steuerliche Aspekte und Zinsabzug
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Schuldzinsen und lokale Abgaben können steuermindernd geltend gemacht werden.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Das Modell errechnet im ersten Jahr eine beispielhafte Steuerersparnis von ca. 1.007 $.
        </p>
      </section>

      {/* 16. Net Worth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          16. Nettovermögen: Immobilienwert vs Wertpapierdepot
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Der finale Vergleich misst das kumulierte Gesamtvermögen.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Nach 10 Jahren steht ein Immobilien-Nettovermögen von 359.958 $ einem Mieterdepot von 162.889 $ gegenüber.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Nach 30 Jahren stellt die schuldenfreie Immobilie einen wesentlichen Vermögenswert dar.
        </p>
      </section>

      {/* 17. Scenario Drivers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          17. Warum Kaufen in einem Fall gewinnt und Mieten in einem anderen
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Lange Wohndauer, solide Wertsteigerung und steigende Mieten begünstigen das Kaufen.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Kurze Aufenthalte und starke Wertpapierrenditen sprechen für das Mieten.
        </p>
      </section>

      {/* 18. Short vs Long */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          18. Kurzfristige vs langfristige Wohnentscheidungen
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Mieten bietet maximale Flexibilität bei unklarer Lebensplanung.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Kaufen stabilisiert die Wohnkosten und baut langfristig Altersvorsorge auf.
        </p>
      </section>

      {/* 19. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          19. Typische Fehler vermeiden
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Nur Monatsmiete mit der Darlehensrate vergleichen.</li>
          <li>Die gesamte Kreditrate als verlorenes Geld betrachten.</li>
          <li>Grundsteuer, Gebäudeversicherung und Instandhaltungsrücklagen übersehen.</li>
          <li>Kaufnebenkosten und spätere Verkaufskosten ignorieren.</li>
          <li>Wertsteigerungen als garantiert ansehen.</li>
          <li>Wertpapierrenditen ohne Kursschwankungen kalkulieren.</li>
          <li>Nur das Kaufpreis-Miete-Verhältnis als Entscheidungskriterium nutzen.</li>
          <li>Die langfristige Mietpreisinflation unterschätzen.</li>
          <li>Keine Sensitivitätsprüfung für unterschiedliche Haltedauern vornehmen.</li>
        </ul>
      </section>

      {/* 20. Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          20. Szenario-Analyse als beste Entscheidungshilfe
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Erstellen Sie ein Basisszenario sowie konservative Varianten für Miete und Kauf.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Verändern Sie gezielt einzelne Annahmen, um die Robustheit Ihrer Entscheidung zu prüfen.
        </p>
      </section>

      {/* 21. Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          21. Methodik und Kernformeln
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.1 Monatliche Darlehensrate</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              M = P × [r(1+r)^n] / [(1+r)^n - 1]
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.2 Zukünftiger Immobilienwert</h3>
            <p className="mt-0.5 leading-relaxed">Wert(t) = Wert(0) × (1 + r_wertsteigerung)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.3 Zukünftige Miete</h3>
            <p className="mt-0.5 leading-relaxed">Miete(t) = Miete(0) × (1 + r_mietsteigerung)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.4 Kaufpreis-Miete-Verhältnis</h3>
            <p className="mt-0.5 leading-relaxed">Verhältnis = Kaufpreis / Jahreskaltmiete (Basis: 13.9)</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.5 Opportunitätskosten</h3>
            <p className="mt-0.5 leading-relaxed">Depot(t) = Eigenkapital × (1 + r_rendite)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.6 Steuerlicher Vorteil</h3>
            <p className="mt-0.5 leading-relaxed">Ersparnis = max(0, Abzugsfähige Kosten - Pauschale) × Grenzsteuersatz</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "de",
  calculatorSlug: "rent-vs-buy-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
