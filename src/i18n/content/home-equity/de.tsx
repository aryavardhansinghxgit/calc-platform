"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Was ist ein Eigenheimkredit (Home Equity Loan) und wie funktioniert er?",
    "answer": "Ein Eigenheimkredit ist eine festverzinsliche Zweithypothek, bei der Sie einen Pauschalbetrag leihen und das in Ihrer Immobilie gebundene Eigenkapital als Sicherheit hinterlegen."
  },
  {
    "question": "Wie viel kann ich über mein Eigenheimkapital beleihen?",
    "answer": "Die meisten Kreditinstitute erlauben einen kombinierten Beleihungsauslauf (CLTV) von 80 % bis 85 % des Immobilienwerts abzüglich der bestehenden Restschuld der Ersthypothek."
  },
  {
    "question": "Was ist der CLTV und wie wird er berechnet?",
    "answer": "Der CLTV (Combined Loan-to-Value) setzt die Summe aller auf der Immobilie lastenden Grundschulden ins Verhältnis zum aktuellen Verkehrswert der Immobilie."
  },
  {
    "question": "Wie wird die monatliche Rate eines Eigenheimkredits berechnet?",
    "answer": "Sie wird über die klassische Annuitätenformel anhand von Kreditsumme, Monatszinssatz und Gesamtlaufzeit in Monaten ermittelt."
  },
  {
    "question": "Welche Bonität (Credit Score) wird vorausgesetzt?",
    "answer": "In der Regel ist ein Bonitätswert von mindestens 620 erforderlich, wobei für Bestkonditionen Werte ab 700 verlangt werden."
  },
  {
    "question": "Was unterscheidet den Eigenheimkredit von einer HELOC-Kreditlinie?",
    "answer": "Der Eigenheimkredit bietet eine feste Kreditsumme mit festem Zinssatz und gleichbleibender Rate, während eine HELOC ein revolvierender Rahmenkredit mit variablem Zins ist."
  },
  {
    "question": "Wie unterscheidet er sich von einer Cash-Out-Umschuldung?",
    "answer": "Eine Umschuldung ersetzt Ihre gesamte bestehende Ersthypothek, während der Eigenheimkredit Ihre Erstfinanzierung unberührt lässt."
  },
  {
    "question": "Sind die Zinsen für einen Eigenheimkredit steuerlich absetzbar?",
    "answer": "Nach aktuellen steuerlichen Richtlinien sind Schuldzinsen nur dann absetzbar, wenn die Mittel nachweislich zur Anschaffung, Herstellung oder substanziellen Sanierung der Immobilie verwendet werden."
  },
  {
    "question": "Kann ich den Eigenheimkredit vorzeitig tilgen?",
    "answer": "Ja, die meisten Verträge gestatten Sondertilgungen oder eine vorzeitige Gesamttilgung ohne Vorfälligkeitsentschädigung."
  },
  {
    "question": "Welche Abschlusskosten fallen bei einer Zweithypothek an?",
    "answer": "Sie betragen üblicherweise 2 % bis 5 % des Darlehensbetrags (Wertermittlung, Bearbeitungsgebühren, Grundbucheintragung und Notargebühren)."
  },
  {
    "question": "Was passiert bei fallenden Immobilienpreisen (Unterdeckung/Negativ-Eigenkapital)?",
    "answer": "Bei einer Unterdeckung bleibt Ihre Ratenverpflichtung bestehen, ein Verkauf oder eine Umschuldung erfordert jedoch das Einbringen von zusätzlichem Eigenkapital."
  },
  {
    "question": "Wie lange dauert die Kreditprüfung und Auszahlung?",
    "answer": "Die Bearbeitung dauert in der Regel 2 bis 6 Wochen für Bonitätsprüfung, Wertermittlung und notarielle Grundschuldbestellung."
  }
];

export const seo = {
  title: "Eigenheimkredit-Rechner (Home Equity Loan) — Maximal zulässige Gesamtschuld",
  description: "Berechnen Sie feste Monatsraten für Eigenheimkredite, Beleihungsauslauf (CLTV), effektiven Jahreszins, Tilgungspläne und maximale Kreditsummen.",
  keywords: ["eigenheimkredit rechner","zweithypothek","cltv rechner","immobilienkredit eigenkapital"]
};

export const ContentComponent = function HomeEquityContentDE() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Eigenheimkredit-Rechner (Home Equity Loan)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Berechnen Sie feste monatliche Raten für Eigenheimkredite, maximalen Beleihungsrahmen, kombinierten Beleihungsauslauf (CLTV), effektiven Jahreszins, Tilgungsverlauf, Zinsersparnis durch Sondertilgungen und Schuldendienstquote (DTI).
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Was ist ein Eigenheimkredit-Rechner?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ein Eigenheimkredit-Rechner ermittelt, wie viel Kapital Sie auf Basis Ihres gebundenen Immobilienvermögens aufnehmen können, und simuliert den festen Zahlungsplan einer Zweithypothek. Die Berechnung verknüpft Marktwert, bestehende Restschuld, CLTV-Beleihungsgrenze, Zinssatz, Laufzeit und Abschlusskosten.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Er unterscheidet sich grundlegend von einem HELOC-Rahmenkredit. Der Eigenheimkredit ist ein Ratenkredit mit fester Zinsbindung und kalkulierbaren Raten, während ein HELOC variabel verzinst wird.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Hinweis zum Berechnungsmodell</span>
          </div>
          <p>
            Die Berechnungsergebnisse sind mathematische Modellrechnungen und stellen keine verbindliche Darlehenszusage dar.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Bedienungsanleitung für den Eigenheimkredit-Rechner
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Befolgen Sie diese Schritte zur präzisen Modellierung Ihrer Finanzierung :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Geben Sie den geschätzten Marktwert Ihrer Immobilie ein.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Tragen Sie die verbleibende Restschuld der Ersthypothek ein.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Wählen Sie die maximale CLTV-Beleihungsgrenze (80 % Standard, 85 % oder 90 %).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Wählen Sie Modus A (Wunschbetrag) oder Modus B (Maximaler Kreditrahmen).</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Geben Sie den festen Sollzinssatz und die Laufzeit in Jahren (15 oder 30 Jahre) ein.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Tragen Sie die geschätzten Abschlussnebenkosten ein.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Wählen Sie die Kostenbehandlung (Barzahlung, Einbehalt oder Mitfinanzierung).</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Überprüfen Sie die errechnete feste monatliche Rate.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Kontrollieren Sie den maximalen Kreditrahmen, den neuen CLTV und den Effektivzins.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Prüfen Sie den vollständigen Tilgungsplan und exportieren Sie ihn als CSV.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simulieren Sie monatliche Sondertilgungen zur Zinsersparnis.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Vergleichen Sie die Ergebnisse mit HELOC- und Umschuldungsszenarien.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Prüfen Sie die Tragfähigkeit anhand der Schuldendienstquote (DTI).</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Speichern Sie Ihre Berechnung im lokalen Verlauf ab.</span>
            </div>
        </div>
      </section>

      {/* 3. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Immobilien-Eigenkapital und Beleihungsauslauf (CLTV)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die maximale Kreditkapazität berechnet sich nach der maximal zulässigen Gesamtverschuldung :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Maximal zulässige Gesamtschuld = Immobilienwert × CLTV-Grenze"}</div>
          <div>{"Maximaler Zweitkredit = Maximal zulässige Gesamtschuld - Restschuld Ersthypothek"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Beispiel : Bei einer Immobilie im Wert von 500.000 $ mit 275.000 $ Ersthypothek und 80 % CLTV-Grenze beträgt die maximale Gesamtverschuldung 400.000 $. Nach Abzug der 275.000 $ verbleibt ein maximaler Zweitkredit von 125.000 $ mit einem resultierenden CLTV von 80,0 % und 20,0 % (100.000 $) geschütztem Eigenkapital.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Dies gewährleistet einen soliden Risikopuffer bei Marktschwankungen.
        </p>
      </section>

      {/* 4. MODE A VS B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Modus A vs. Modus B: Wunschbetrag oder Höchstgrenze
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Rechner unterstützt zwei komplementäre Berechnungsansätze :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Modus A — Fester Wunschbetrag</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Ermöglicht die Eingabe eines exakten Finanzierungsbedarfs (z. B. 125.000 $) für Sanierungen oder Umschuldungen zur Ratenberechnung.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Modus B — Maximaler Beleihungsrahmen nach CLTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Ermittelt die maximale Kreditsumme bis zum Erreichen der gewählten Beleihungsgrenze.</p>
          </div>
        </div>
      </section>

      {/* 5. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Formel der festen Monatsrate (Annuität)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die monatliche Rate (M) folgt der finanzmathematischen Standardformel :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          M = P × [r(1+r)^n] / [(1+r)^n - 1], wobei P die Kreditsumme, r der Monatszinssatz und n die Laufzeit in Monaten ist. Für 125.000 $ zu 8,50 % auf 15 Jahre (180 Monate) beträgt die feste Rate exakt 1.230,94 $.
        </p>
      </section>

      {/* 6. ZERO INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Nullzins-Berechnungsmodus
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei zinsfreien Angeboten (0 % Sollzins) berechnet das System die Rate rein linear : M = P / n.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei 125.000 $ über 15 Jahre zu 0 % Zinsen ergibt sich eine monatliche Tilgungsrate von 694,44 $ ohne Zinskosten.
        </p>
      </section>

      {/* 7. AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Tilgungsplan der Zweithypothek
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Tilgungsplan schlüsselt Monat für Monat Zins- und Tilgungsanteile auf.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Beginning Balance / Saldo Inicial"}: $125,000</div>
          <div>• {"Annual Payment / Pago Anual"}: $14,335</div>
          <div>• {"Principal Paid / Capital"}: $4,497</div>
          <div>• {"Interest Paid / Intereses"}: $9,837</div>
          <div>• {"Ending Balance / Saldo Final"}: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Im ersten Monat eines Darlehens über 125.000 $ zu 8,50 % entfallen von der Rate (1.230,94 $) 885,42 $ auf Zinsen und 345,52 $ auf die Tilgung, wodurch die Restschuld auf 124.654,48 $ sinkt.
        </p>
      </section>

      {/* 8. APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Effektiver Jahreszins und Abschlusskosten
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der effektive Jahreszins (Effektivzins) berücksichtigt alle anfallenden Nebenkosten (Wertermittlung, Notar, Bearbeitungsgebühren).
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Financed Loan"}: $125,000 | {"Nominal Rate"}: 8.0% | {"Term"}: 15 Years</div>
          <div>• {"Closing Costs"}: $2,500</div>
          <div>• {"Displayed True APR"}: <strong>8.10% / 8.82%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei 125.000 $ Sollzins von 8,50 % und 2.500 $ bar bezahlten Nebenkosten beträgt der Effektivzins 8,82 %.
        </p>
      </section>

      {/* 9. CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Varianten zur Behandlung von Abschlusskosten
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Drei Optionen zur Begleichung der Nebenkosten stehen zur Verfügung :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Paid Upfront in Cash"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Barzahlung : Zahlung bei Abschluss ohne Erhöhung der Darlehenssumme. 2. Einbehalt : Kreditsumme beträgt 125.000 $, Auszahlungsbetrag 122.500 $. 3. Mitfinanzierung : Kreditsumme steigt auf 127.500 $, Monatsrate auf 1.255,56 $.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Deducted from Proceeds"}</div>
            <p className="text-slate-600 dark:text-slate-400">Vergleichen Sie diese Optionen zur optimalen Liquiditätssteuerung.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Financed into Loan"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Barzahlung : Zahlung bei Abschluss ohne Erhöhung der Darlehenssumme. 2. Einbehalt : Kreditsumme beträgt 125.000 $, Auszahlungsbetrag 122.500 $. 3. Mitfinanzierung : Kreditsumme steigt auf 127.500 $, Monatsrate auf 1.255,56 $.</p>
          </div>
        </div>
      </section>

      {/* 10. DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Schuldendienstquote (DTI) und Bonitätsprüfung
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Kreditgeber prüfen die Gesamt-Schuldendienstquote (DTI) zur Bonitätsbeurteilung :
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"DTI % = [(Housing Payments + Other Debts) / Gross Income] × 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Gesamt-DTI = (Wohnkosten gesamt + sonstige Monatsraten) / Brutto-Monatseinkommen. Werte bis 36 % gelten als erstklassig, zwischen 43 % und 50 % sind Ausnahmekriterien erforderlich.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei 8.500 $ Monatseinkommen, 1.850 $ Ersthypothek und 500 $ Ratenverpflichtungen führt die neue Rate von 1.230,94 $ zu einem DTI von 42,1 %, was im regulären Genehmigungsrahmen liegt.
        </p>
      </section>

      {/* 11. CREDIT TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Bonitätsstufen und Beleihungsgrenzen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Bonitätsscore bestimmt den maximalen Beleihungsauslauf und den Zinssatz :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Scores ab 740 ermöglichen CLTV-Werte bis 85 %–90 % zu Spitzenkonditionen, 680–739 erlauben 80 %–85 %, und 620–679 sind meist auf 80 % CLTV beschränkt.
        </p>
      </section>

      {/* 12. HELOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Eigenheimkredit im Vergleich zu HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Eigenheimkredit bietet Zinssicherheit und feste Raten über die gesamte Vertragslaufzeit.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage: $717 - $1,231/mo</div>
          <div>• HELOC (Interest-Only Draw): $578/mo</div>
          <div>• Cash-Out Refinance: $2,296/mo</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ein HELOC bietet flexible Abrufmöglichkeiten mit variablen Zinsen, birgt jedoch Zinsänderungsrisiken und Ratenanstiege bei Tilgungsbeginn.
        </p>
      </section>

      {/* 13. HELOAN VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Eigenheimkredit im Vergleich zur Cash-Out-Umschuldung
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Eigenheimkredit sichert Ihnen den günstigen Zinssatz Ihrer bestehenden Erstfinanzierung.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Eine Gesamtumschuldung (Cash-Out Refinance) ersetzt die gesamte Hypothek zu aktuellen Marktkonditionen, was bei ehemals günstigen Zinsen unwirtschaftlich sein kann.
        </p>
      </section>

      {/* 14. EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Sondertilgungen und Zinsersparnis
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Regelmäßige Sondertilgungen verkürzen die Laufzeit und senken die Zinslast spürbar.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $100 - $150/month</div>
          <div>• Accelerated Term: 146 - 156 months</div>
          <div>• Time Saved: 24 - 34 months shaved off</div>
          <div>• Lifetime Interest Saved: $16,400 - $19,341</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei einem Darlehen von 125.000 $ zu 8,50 % verkürzt eine monatliche Sondertilgung von 100 $ die Laufzeit um 24 Monate und spart über 16.400 $ an Zinsen ein.
        </p>
      </section>

      {/* 15. IRS TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Steuerliche Absetzbarkeit von Schuldzinsen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Zinsen sind steuerlich nur abzugsfähig, wenn das Darlehen nachweislich zur Anschaffung, zum Bau oder zur substanziellen Modernisierung der Immobilie verwendet wird.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Tax Savings = Deductible Interest × Marginal Tax Rate"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei Verwendung für Konsumausgaben oder Umschuldungen entfällt die steuerliche Abzugsfähigkeit.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bei einem Grenzsteuersatz von 24 % und 9.800 $ abzugsfähigen Zinsen im ersten Jahr ergibt sich eine Steuerersparnis von ca. 2.352 $.
        </p>
      </section>

      {/* 16. RENOVATION ROI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Wertsteigerung durch Modernisierungsmaßnahmen
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Gezielte Modernisierungen steigern den Verkehrswert der Immobilie und erhöhen Ihr Nettovermögen.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: $535,000</div>
          <div>• Resulting Net Home Equity: $210,000</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Eine Sanierung mit 50.000 $ Investition und 70 % Werterhaltungsfaktor steigert den Immobilienwert um 35.000 $.
        </p>
      </section>

      {/* 17. RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Risiken einer Zweithypothek
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Security Warning & Foreclosure Risk</span>
          </div>
          <p>Da die Immobilie als Kreditsicherheit dient, kann Zahlungsverzug zur Zwangsvollstreckung führen.</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Kalkulieren Sie Ihr Haushaltsbudget vorausschauend für Erst- und Zweithypothek sowie Instandhaltungsrücklagen.
        </p>
      </section>

      {/* 18. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Negativ-Eigenkapital (Unterdeckung)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Sinken die Immobilienpreise unter die Summe der bestehenden Grundschulden, entsteht eine Unterdeckung. Die monatlichen Raten bleiben unverändert, ein Verkauf erfordert jedoch Eigenkapitalzuschüsse.
        </p>
      </section>

      {/* 19. PREPAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Vorfälligkeitsentschädigung
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Viele moderne Zweithypotheken verzichten auf Vorfälligkeitsentschädigungen bei vorzeitiger Tilgung. Prüfen Sie dennoch stets die individuellen Vertragsbedingungen.
        </p>
      </section>

      {/* 20. TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Abschlusskosten und Bearbeitungszeiten
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die Nebenkosten betragen typischerweise 2 % bis 5 % des Darlehensbetrags (1.500 $ bis 4.000 $). Die Bearbeitungszeit bis zur Valutierung liegt meist zwischen 2 und 6 Wochen.
        </p>
      </section>

      {/* 21. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Häufige Fehler bei Eigenheimkrediten vermeiden
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Gesamtes Eigenkapital mit maximalem Kreditrahmen verwechseln (Banken verlangen 15 %–20 % Sicherheitspuffer).</li>
            <li>Vergessen, die Restschuld der Ersthypothek beim maximalen Beleihungsauslauf abzuziehen.</li>
            <li>Annehmen, dass 80 % CLTV bei allen Kreditinstituten eine einheitliche Obergrenze darstellt.</li>
            <li>Gute Bonität mit automatischer Kreditgenehmigung ohne Prüfung der DTI-Quote gleichsetzen.</li>
            <li>Zweithypothek mit Gesamtumschuldung vergleichen, ohne Zinsverluste bei der Ersthypothek zu berücksichtigen.</li>
            <li>Abschlusskosten bei der Ermittlung des Effektivzinses unberücksichtigt lassen.</li>
            <li>Steuerliche Abzugsfähigkeit ohne Zweckbindung für Sanierungsmaßnahmen voraussetzen.</li>
            <li>Glauben, dass jeder Modernisierungs-Euro zu 100 % in den Verkehrswert einfließt.</li>
            <li>Kreditaufnahme ohne Liquiditätsreserve für unvorhergesehene Lebensereignisse.</li>
            <li>Finanzierungsentscheidungen ohne mathematisch fundierte Vergleichsrechnung treffen.</li>
          </ul>
        </div>
      </section>

      {/* 22. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Übersicht der Kernformeln
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Maximal zulässige Gesamtschuld:</strong>  Immobilienwert × CLTV-Grenze</div>
          <div>• <strong>Maximaler Beleihungsrahmen:</strong>  max(0, Gesamtschuld - Restschuld Ersthypothek)</div>
          <div>• <strong>CLTV nach Darlehen:</strong>  (Restschuld 1 + Restschuld 2) / Immobilienwert × 100</div>
          <div>• <strong>Geschütztes Eigenkapital:</strong>  100 % - CLTV nach Darlehen</div>
          <div>• <strong>Monatliche Annuität:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Schuldendienstquote (DTI):</strong>  Gesamte monatliche Raten / Bruttoeinkommen × 100</div>
          <div>• <strong>Geschätzte Steuerersparnis:</strong>  Abzugsfähige Jahreszinsen × Grenzsteuersatz</div>
        </div>
      </section>

      {/* 23. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Pädagogischer Hinweis und Rechtlicher Rahmen</span>
        </div>
        <p>
          Eigenheimkredite unterliegen gesetzlichen Informationspflichten (z. B. TILA/RESPA) und steuerrechtlichen Bestimmungen. Dieser Rechner stellt unverbindliche Modellrechnungen zu Informationszwecken bereit.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "de",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
