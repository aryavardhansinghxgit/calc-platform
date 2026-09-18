"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Was ist ein HELOC-Rahmenkredit und wie funktioniert er?",
    "answer": "Ein HELOC ist ein revolvierender Rahmenkredit auf Basis Ihres gebundenen Immobilien-Eigenkapitals, bei dem Sie während der Abrufphase flexibel Geld abrufen können."
  },
  {
    "question": "Wie hoch ist der maximale HELOC-Kreditrahmen?",
    "answer": "Die meisten Banken erlauben einen Beleihungsauslauf (CLTV) von 80 % bis 85 % des Immobilienwerts abzüglich der Restschuld Ihrer Ersthypothek."
  },
  {
    "question": "Wie unterscheiden sich Zahlungen in der Abruf- und Rückzahlungsphase?",
    "answer": "In der Abrufphase zahlen Sie meist nur die anfallenden Zinsen auf den abgerufenen Betrag. In der Rückzahlungsphase zahlen Sie feste Tilgungs- und Zinsraten."
  },
  {
    "question": "Was versteht man unter dem Zahlungsschock (Payment Shock)?",
    "answer": "Der abrupte Anstieg der monatlichen Rate beim Übergang von der reinen Zinsphase zur verbindlichen Kapitaltilgung."
  },
  {
    "question": "Welche Zinsen fallen bei einem HELOC an?",
    "answer": "In der Regel gilt ein variabler Zinssatz, der an den Leitzins zuzüglich einer individuellen Bankmarge gekoppelt ist."
  },
  {
    "question": "Welche Nebenkosten entstehen bei einem HELOC?",
    "answer": "Mögliche Kosten umfassen Abschlussgebühren, jährliche Kontoführungsgebühren (50 $ bis 100 $) sowie Wertermittlungsgebühren."
  },
  {
    "question": "Sind HELOC-Zinsen steuerlich absetzbar?",
    "answer": "Zinsen sind nur absetzbar, wenn die Mittel nachweislich zur Modernisierung oder Instandhaltung der Immobilie eingesetzt werden."
  },
  {
    "question": "Kann die Bank den Kreditrahmen kürzen oder sperren?",
    "answer": "Ja, bei signifikantem Wertverlust der Immobilie oder Bonitätsverschlechterung kann der Kreditrahmen eingefroren werden."
  },
  {
    "question": "Was passiert, wenn ich den Kreditrahmen nicht in Anspruch nehme?",
    "answer": "Es fallen keine Zinsen an, solange kein Guthaben in Anspruch genommen wird."
  },
  {
    "question": "Kann ich während der Abrufphase Tilgungszahlungen leisten?",
    "answer": "Ja, freiwillige Tilgungen sind jederzeit möglich, um den verfügbaren Kreditrahmen wieder aufzufüllen."
  },
  {
    "question": "Welche Bonitätsanforderungen gelten?",
    "answer": "Üblich sind Bonitätswerte ab 660 bis 680, für Bestkonditionen ab 720."
  },
  {
    "question": "Wie wirken sich Zinserhöhungen aus?",
    "answer": "Aufgrund des variablen Zinses steigen die monatlichen Zinskosten direkt mit jeder Zinserhöhung der Notenbank."
  }
];

export const seo = {
  title: "HELOC-Rechner (Rahmenkredit auf Eigenheimkapital) — Maximal zulässige Gesamtschuld",
  description: "Berechnen Sie HELOC-Kreditrahmen, reine Zinszahlungen in der Abrufphase, Tilgungsraten in der Rückzahlungsphase und Zinserhöhungsszenarien.",
  keywords: ["heloc rechner","rahmenkredit eigenheim","immobilien rahmenkredit","abrufkredit immobilie"]
};

export const ContentComponent = function HELOCContentDE() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          HELOC-Rechner (Rahmenkredit auf Eigenheimkapital)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Ermitteln Sie den maximalen HELOC-Kreditrahmen, den Beleihungsauslauf (CLTV), Zinszahlungen in der Abrufphase, Raten in der Rückzahlungsphase, den Zahlungsschock und Zinsszenarien.
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Was ist ein HELOC-Rechner?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ein HELOC-Rechner simuliert das verfügbare revolvierende Kreditvolumen auf Basis Ihres Immobilienvermögens und modelliert Zahlungen über Abruf- und Rückzahlungsphasen hinweg.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Im Gegensatz zum festen Eigenheimkredit bietet der HELOC flexible Abrufmöglichkeiten mit variablen Zinsen während der Abrufphase (z. B. 10 Jahre).
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Hinweis zum Modell</span>
          </div>
          <p>
            Die Ergebnisse stellen unverbindliche finanzmathematische Berechnungen dar.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Bedienung des HELOC-Rechners
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Befolgen Sie diese Schritte zur Berechnung Ihres Kreditrahmens :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Tragen Sie den geschätzten Marktwert Ihrer Immobilie ein.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Geben Sie die Restschuld der Ersthypothek an.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Wählen Sie die maximale CLTV-Beleihungsgrenze (80 % Standard oder 85 %).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Geben Sie den gewünschten HELOC-Kreditrahmen ein.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Tragen Sie den variablen Einstiegszinssatz ein.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Wählen Sie die Dauer der Abruf- (5, 10, 15 Jahre) und Rückzahlungsphase (10, 15, 20 Jahre).</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Tragen Sie Abschlusskosten und Jahresgebühren ein.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Wählen Sie die Zahlungsart in der Abrufphase (nur Zinsen oder Zins + Tilgung).</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Überprüfen Sie Kreditrahmen, Abrufrate und Rückzahlungsrate.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Prüfen Sie den zweiphasigen Tilgungsplan.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simulieren Sie Zinsanstiege (+1 %, +2 %, +3 %).</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Testen Sie Sondertilgungen und spätere Abrufe.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Vergleichen Sie mit dem festverzinslichen Eigenheimkredit.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Prüfen Sie steuerliche Rahmenbedingungen.</span>
            </div>
        </div>
      </section>

      {/* 3. CAPACITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Berechnung der HELOC-Kreditkapazität
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der maximale Kreditrahmen basiert auf dem zulässigen CLTV-Beleihungsauslauf :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Maximal zulässige Gesamtschuld = Immobilienwert × CLTV-Grenze %"}</div>
          <div>{"Maximaler HELOC-Rahmen = max(0, Gesamtschuld - Restschuld Ersthypothek)"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Beispiel : Bei 500.000 $ Immobilienwert, 260.000 $ Ersthypothek und 80 % CLTV beträgt die Gesamtschuld 400.000 $. Nach Abzug von 260.000 $ verbleibt ein maximaler Rahmen von 140.000 $. Ein Rahmen von 50.000 $ führt zu einem CLTV von 62,0 %.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Dies sichert einen risikoadäquaten Eigenkapitalpuffer.
        </p>
      </section>

      {/* 4. DRAW VS REPAY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Abrufphase im Vergleich zur Rückzahlungsphase
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ein HELOC gliedert sich in zwei grundverschiedene Phasen :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In der Abrufphase (10 Jahre) können Sie flexibel Beträge abrufen und zahlen nur Zinsen. In der Rückzahlungsphase (20 Jahre) erfolgt die verbindliche Gesamttilgung in festen Raten.
        </p>
      </section>

      {/* 5. INTEREST ONLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Reine Zinszahlungen in der Abrufphase
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die monatliche Zinsrate (I) berechnet sich wie folgt :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          I = Abgerufener Betrag × (Jahreszins / 12). Bei 50.000 $ zu 8,50 % beträgt die Monatsrate 354,17 $.
        </p>
      </section>

      {/* 6. FULL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Gesamtraten in der Rückzahlungsphase
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          In der Tilgungsphase wird die Annuität über die Restlaufzeit berechnet :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Für 50.000 $ zu 8,50 % auf 20 Jahre (240 Monate) beträgt die Monatsrate 433,91 $.
        </p>
      </section>

      {/* 7. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Analyse des Zahlungsschocks (Payment Shock)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Zahlungsschock beschreibt den Ratenanstieg bei Beginn der Tilgungsphase.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die Rate steigt von 354,17 $ auf 433,91 $ (+22,5 %). Bei 10 Jahren Tilgungsdauer stiege sie auf 620,06 $ (+75,1 %).
        </p>
      </section>

      {/* 8. STRESS TEST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Zinsszenarien bei variablen Zinssätzen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Steigende Leitzinsen verteuern die Monatsraten :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ein Zinsanstieg um +2 % (auf 10,50 %) erhöht die Zinsrate auf 437,50 $ (+23,5 %) und die Tilgungsrate auf 498,98 $ (+15,0 %).
        </p>
      </section>

      {/* 9. ANNUAL FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Jahresgebühren und Gesamtkosten
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Laufende Jahresgebühren (50 $ bis 100 $) erhöhen die Gesamtkosten.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Über 30 Jahre summieren sich 75 $ Jahresgebühr auf 2.250 $.
        </p>
      </section>

      {/* 10. MULTI DRAW */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Mehrfache Abrufe und Sondertilgungen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Zusätzliche Tilgungen senken die Zinslast spürbar.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Eine monatliche Sondertilgung von 100 $ in der Tilgungsphase spart erhebliche Zinskosten ein.
        </p>
      </section>

      {/* 11. HELOC VS HELOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. HELOC im Vergleich zum festen Eigenheimkredit
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          HELOC bietet maximale Flexibilität für schrittweise Renovierungskosten.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der feste Eigenheimkredit bietet Zinssicherheit und feste Raten von Beginn an.
        </p>
      </section>

      {/* 12. HELOC VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. HELOC im Vergleich zur Cash-Out-Umschuldung
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          HELOC erhält die günstigen Zinskonditionen Ihrer Erstfinanzierung.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Eine Umschuldung ersetzt die Gesamthypothek zum aktuellen Marktzins.
        </p>
      </section>

      {/* 13. CREDIT QUAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Bonitätskriterien und Genehmigungsvoraussetzungen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ein DTI-Verhältnis unter 43 % und Bonitätswerte ab 680 sind ratsam.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Solide Wertermittlungen sind Basis für hohe CLTV-Grenzen.
        </p>
      </section>

      {/* 14. TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Steuerliche Absetzbarkeit von Zinsen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Zinsen sind steuerlich nur absetzbar bei werterhaltenden Modernisierungsmaßnahmen.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Konsumausgaben berechtigen nicht zum Schuldzinsenabzug.
        </p>
      </section>

      {/* 15. FREEZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Risiko von Kreditrahmensperrungen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Banken können den Verfügungsrahmen bei Markteinbrüchen einfrieren.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Eine unabhängige Liquiditätsreserve bleibt unverzichtbar.
        </p>
      </section>

      {/* 16. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Unterdeckungs-Szenarien
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei fallenden Immobilienpreisen wird der Abrufrahmen gesperrt.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die Rückzahlungsverpflichtungen bleiben unverändert bestehen.
        </p>
      </section>

      {/* 17. FIXED RATE LOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Zinsbindungsoptionen (Fixed-Rate Lock)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Einige Verträge gestatten die Umwandlung von Teilbeträgen in feste Zinstilgungstranchen.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Dies schützt vor Zinssteigerungen.
        </p>
      </section>

      {/* 18. CLOSING AND EARLY CLOSURE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Abschlusskosten und vorzeitige Schließung
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die Einrichtungskosten liegen meist bei 500 $ bis 2.500 $.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Eine vorzeitige Kündigung innerhalb der ersten Jahre kann Vorfälligkeitsgebühren auslösen.
        </p>
      </section>

      {/* 19. STRATEGIC USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Strategischer Krediteinsatz
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die Nutzung für wertsteigernde Investitionen maximiert den finanziellen Ertrag.
        </p>
      </section>

      {/* 20. TRANSITION PLANNING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Vorbereitung auf die Rückzahlungsphase
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Planen Sie die Ratenanhebung frühzeitig ein, um Liquiditätsengpässe zu vermeiden.
        </p>
      </section>

      {/* 21. OPTIMIZATION TIPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Optimierungstipps für Ihren HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Freiwillige Zwischentilgungen in der Abrufphase reduzieren Zinskosten und halten den Rahmen offen.
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Typische Fehler bei HELOC-Krediten
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>10 Jahre lang nur Zinsen zahlen, ohne die hohe Tilgungsrate einzuplanen.</li>
            <li>Den Rahmenkredit für kurzlebigen Konsum verwenden.</li>
            <li>Zinsänderungsrisiken bei variablen Zinssätzen unterschätzen.</li>
            <li>Annehmen, dass der Kreditrahmen garantiert unbegrenzt offen bleibt.</li>
            <li>Laufende Jahresgebühren bei der Gesamtrechnung übersehen.</li>
            <li>Steuerliche Abzugsfähigkeit ohne Nachweis voraussetzen.</li>
            <li>Den Vergleich mit festverzinslichen Alternativen versäumen.</li>
            <li>Den Rahmen zu 100 % ausschöpfen ohne Sicherheitsreserve.</li>
            <li>Vorzeitige Schließungsgebühren ignorieren.</li>
            <li>Keine Zinserhöhungsszenarien vor Vertragsschluss durchrechnen.</li>
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. Übersicht der HELOC-Kernformeln
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Maximal zulässige Gesamtschuld:</strong>  Immobilienwert × CLTV-Grenze %</div>
          <div>• <strong>Maximaler HELOC-Rahmen:</strong>  max(0, Gesamtschuld - Restschuld Ersthypothek)</div>
          <div>• <strong>Genutzter CLTV:</strong>  (Restschuld 1 + Abgerufener Betrag) / Immobilienwert × 100</div>
          <div>• <strong>Monatliche Zinsrate:</strong>  Abgerufener Betrag × (Jahreszins / 12)</div>
          <div>• <strong>Monatliche Tilgungsrate:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Zahlungsschock:</strong>  (Tilgungsrate - Zinsrate) / Zinsrate × 100</div>
          <div>• <strong>Geschätzte Steuerersparnis:</strong>  Abzugsfähige Jahreszinsen × Grenzsteuersatz</div>
        </div>
      </section>

      {/* 24. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Pädagogischer Hinweis und Rechtlicher Rahmen</span>
        </div>
        <p>
          HELOC-Rahmenkredite unterliegen gesetzlichen Informationspflichten und Bankenregularien. Dieser Rechner stellt unverbindliche Modellrechnungen bereit.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "de",
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
