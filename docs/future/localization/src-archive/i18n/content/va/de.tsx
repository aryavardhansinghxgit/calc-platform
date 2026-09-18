"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Was ist ein VA-Darlehen und wer ist anspruchsberechtigt?",
    "answer": "Ein staatlich garantiertes Hypothekendarlehen für aktive Militärangehörige, Veteranen und Hinterbliebene."
  },
  {
    "question": "Ist eine Anzahlung zwingend erforderlich?",
    "answer": "Nein, VA-Darlehen ermöglichen eine 100%-Finanzierung (0% Anzahlung) ohne monatliche PMI-Versicherung."
  },
  {
    "question": "Was ist die VA-Fördergebühr (Funding Fee)?",
    "answer": "Eine einmalige gesetzliche Abgabe (1.25 % bis 3.30 %), die das Bürgschaftsprogramm absichert."
  },
  {
    "question": "Wer ist von der Fördergebühr befreit?",
    "answer": "Veteranen mit anerkannter Dienstbeschädigung (10 %+), Träger des Purple Heart und anspruchsberechtigte Hinterbliebene."
  },
  {
    "question": "Sollte man die Gebühr mitfinanzieren oder bar bezahlen?",
    "answer": "Mitfinanzierung schont die Liquidität, erhöht jedoch die Darlehenssumme und die Zinskosten über 30 Jahre."
  },
  {
    "question": "Was unterscheidet Erstnutzung von Folgeinanspruchnahme?",
    "answer": "Ohne Anzahlung beträgt die Gebühr bei Erstnutzung 2.15 % und bei Folgeinanspruchnahme 3.30 %. Ab 5 % Anzahlung sinken beide auf 1.50 %."
  },
  {
    "question": "Fällt bei einem VA-Darlehen eine monatliche PMI-Prämie an?",
    "answer": "Nein, bei VA-Darlehen entfällt die monatliche PMI vollständig."
  },
  {
    "question": "Was ist eine IRRRL-Umschuldung (Streamline)?",
    "answer": "Ein vereinfachtes Umschuldungsverfahren zur Zinssenkung ohne Wertermittlung mit reduzierter Gebühr von 0.50 %."
  },
  {
    "question": "Wie funktioniert der Garantieanspruch (Entitlement)?",
    "answer": "Er bestimmt die maximale Kreditsumme ohne Eigenkapital; bei vollem Anspruch gibt es keine gesetzlichen Obergrenzen."
  },
  {
    "question": "Welche Dienstzeitvoraussetzungen gelten?",
    "answer": "Mindestens 90 Tage im Kriegseinsatz, 181 Tage in Friedenszeiten oder 6 Jahre in der Nationalgarde/Reserve."
  },
  {
    "question": "Wie schlägt sich das VA-Darlehen im Vergleich zu FHA und konventionellen Krediten?",
    "answer": "Es spart gegenüber FHA die dauerhafte Monatsprämie und erspart gegenüber konventionellen Krediten 5 % bis 20 % Eigenkapital."
  },
  {
    "question": "Wie kann die Tilgung beschleunigt werden?",
    "answer": "Durch zweiwöchentliche Zahlungen oder monatliche Sondertilgungen."
  }
];

export const seo = {
  title: "VA-Hypothekenrechner (Militär- und Veteranendarlehen) — VA-Darlehen",
  description: "Berechnen Sie VA-Darlehen ohne Anzahlung (0% Down), Fördergebühr (Funding Fee), monatliche PITI-Raten, Invaliditätsbefreiung und 3-Wege-Vergleich.",
  keywords: ["va darlehen rechner","veteranen hypothek","va funding fee rechner","militaerkredit immobilie"]
};

export const ContentComponent = function VAMortgageContentDE() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          VA-Hypothekenrechner (Militär- und Veteranendarlehen)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Ermitteln Sie Monatsraten für VA-Darlehen, Fördergebühren (Funding Fee), PITI-Gesamtkosten, Kaufkraft bei 0 % Anzahlung, IRRRL-Umschuldung und Zinsersparnisse.
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Was ist ein VA-Hypothekenrechner?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Dieser Rechner simuliert Monatsraten und Gesamtkosten für staatlich garantierte US-Militärhypotheken (VA Loans). Er modelliert gesetzliche Fördergebühren, Grundsteuern, Gebäudeversicherungen und Tilgungspläne.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Hinweis zum Modell</span>
          </div>
          <p>
            Diese Berechnung dient der Orientierung und ersetzt kein amtliches Certificate of Eligibility (COE).
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Bedienung des VA-Rechners
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Folgen Sie diesen Schritten zur präzisen Modellierung :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Geben Sie den Kaufpreis der Immobilie ein.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Tragen Sie die geplante Anzahlungsquote (0 % bis 100 %) ein.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Wählen Sie Ihren Militärstatus (Aktiv/Veteran, Reserve oder Hinterbliebene).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Wählen Sie Erstnutzung oder Folgeinanspruchnahme.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Geben Sie Sollzins und Laufzeit in Jahren ein.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Wählen Sie Barzahlung oder Mitfinanzierung der Fördergebühr.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Aktivieren Sie die Befreiung bei anerkannter Dienstbeschädigung.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Prüfen Sie Darlehensbetrag, P&I-Rate und monatliche PITI-Gesamtrate.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Kontrollieren Sie den vollständigen Tilgungsplan.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Vergleichen Sie mit FHA und konventionellen Krediten.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Berechnen Sie den verbleibenden Garantieanspruch (Entitlement).</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Testen Sie zweiwöchentliche Zahlungsintervalle.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Simulieren Sie monatliche Sondertilgungen.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Berechnen Sie die IRRRL-Zinssenkung.</span>
            </div>
        </div>
      </section>

      {/* 4. CORE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Annuitätenformel und PITI-Gesamtkosten
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die monatliche Rate für Zins und Tilgung (P&I) folgt der finanzmathematischen Standardformel :
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Formel der monatlichen Annuität</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"M = P × [r(1+r)^n] / [(1+r)^n - 1]"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            <div>• <strong>M :</strong>  Monatliche Rate für Zins und Tilgung.</div>
            <div>• <strong>P :</strong>  Gesamter Darlehensbetrag (Basisdarlehen + mitfinanzierte Fördergebühr).</div>
            <div>• <strong>r :</strong>  Monatlicher Zinssatz (Jahreszins / 12 / 100).</div>
            <div>• <strong>n :</strong>  Anzahl der Monatsraten (Laufzeit × 12).</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die gesamte monatliche Wohnbelastung (PITI) summiert alle laufenden Kosten :
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Monatliche PITI-Rate = P&I + (Grundsteuer / 12) + (Gebäudeversicherung / 12) + Hausgeld"}
        </div>
      </section>

      {/* 5. FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Gesetzliche VA-Fördergebühr (Funding Fee)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die Fördergebühr ist eine gesetzliche Einmalabgabe (38 U.S.C. § 3729) zur Finanzierung des staatlichen Bürgschaftsprogramms.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Sie ersetzt die monatliche Kreditausfallversicherung (PMI) und kann bar bezahlt oder mitfinanziert werden.
        </p>
      </section>

      {/* 6. FIRST VS SUBSEQUENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Erstnutzung im Vergleich zur Folgeinanspruchnahme
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Die bisherige Nutzung des VA-Darlehensanspruchs bestimmt den Gebührensatz bei 0 % Anzahlung :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Erstnutzung (0 % Anzahlung)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bei 500.000 $ Kaufpreis beträgt die Gebühr 2.15 % (10.750 $). Das Darlehen steigt auf 510.750 $ bei 3.228,29 $ P&I und 3.936,62 $ PITI monatlich.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Folgenutzung (0 % Anzahlung)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bei erneuter Nutzung ohne Anzahlung steigt die Gebühr auf 3.30 % (16.500 $). Das Darlehen wächst auf 516.500 $ bei 3.973,13 $ monatlicher PITI-Rate.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Hinweis : Ab 5 % Anzahlung sinkt die Gebühr bei Folgenutzung auf 1.50 % (identisch zur Erstnutzung).
        </p>
      </section>

      {/* 7. STATUTORY MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Gesetzliche Gebührentabelle der VA-Förderabgabe
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Anzahlungsstufe</th>
                <th className="p-3">Erstnutzung</th>
                <th className="p-3">Folgenutzung</th>
                <th className="p-3 rounded-tr-xl">Befreiter Satz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"< 5 % Anzahlung (0 % Down)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"2.15%"}</td>
                <td className="p-3 font-mono font-bold text-red-500">{"3.30%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Befreit)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"5 % – 9.99 % Anzahlung"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Befreit)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"≥ 10 % Anzahlung"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Befreit)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Gesetzliche Befreiung von der Fördergebühr (0 % Satz)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Nach US-Bundesrecht sind bestimmte Personen vollständig von der Fördergebühr befreit :
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">Voraussetzungen für die Gebührenbefreiung :</span>
          <ul className="space-y-1 list-disc list-inside">
            <li>Veteranen mit anerkannter Minderung der Erwerbsfähigkeit (10 % oder höher).</li>
            <li>Veteranen mit Anspruch auf Dienstbeschädigungsrente, die Ruhegehalt beziehen.</li>
            <li>Aktive Soldaten mit Verleihung des Purple Heart.</li>
            <li>Anspruchsberechtigte Hinterbliebene verstorbener Soldaten (DIC-Empfänger).</li>
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Vergleich : Mitfinanzierung vs. Barzahlung der Gebühr
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Dieser Vergleich wiegt sofortigen Liquiditätsbedarf gegen langfristige Zinskosten ab :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Mitfinanzierung im Darlehen</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bei 500.000 $ mit 3.30 % Gebühr (16.500 $) steigt das Darlehen auf 516.500 $ und die Rate auf 3.264,80 $. Der Barmittelbedarf bleibt bei 12.500 $.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Barzahlung bei Abschluss</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Zahlung der 16.500 $ bei Abschluss belässt das Darlehen bei 500.000 $ und senkt die Rate auf 3.160,34 $, erfordert aber 29.000 $ Eigenkapital.
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. 3-Wege-Vergleich : VA vs. FHA vs. Konventionell
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programm</th>
                <th className="p-3">Mindesteigenkapital</th>
                <th className="p-3">Monatliche Versicherung</th>
                <th className="p-3">Einmalige Gebühr</th>
                <th className="p-3 rounded-tr-xl">Gesamtkosten 30 Jahre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"VA-Darlehen"}</td>
                <td className="p-3 font-bold ">{"0 % (0 $)"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ (Keine PMI)"}</td>
                <td className="p-3">{"2.15 % Finanziert (10.750 $)"}</td>
                <td className="p-3 font-mono font-bold text-blue-600">{"1.357.200 $ (3.770 $/Monat)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"FHA-Darlehen"}</td>
                <td className="p-3 font-bold ">{"3.5 % (17.500 $)"}</td>
                <td className="p-3 ">{"0.55 % Dauerhafte MIP"}</td>
                <td className="p-3">{"1.75 % UFMIP (8.444 $)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.421.640 $ (3.949 $/Monat)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Konventionell"}</td>
                <td className="p-3 font-bold ">{"5.0 % (25.000 $)"}</td>
                <td className="p-3 ">{"0.60 % PMI (Jahre 1-8)"}</td>
                <td className="p-3">{"0 $ Einmalgebühr"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.356.903 $ (3.943 $/Monat)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Das VA-Darlehen spart 64.440 $ gegenüber FHA durch Wegfall der laufenden Monatsprämie und erreicht die Gesamtkosten eines konventionellen Kredits ohne 25.000 $ Anzahlung.
        </p>
      </section>

      {/* 11. ENTITLEMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Garantieanspruch (Entitlement) und Kaufkraft ohne Anzahlung
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Der Garantieanspruch bestimmt die Kreditsumme ohne Eigenkapital :
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Voller Garantieanspruch</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Seit 2019 gibt es bei vollem Anspruch keine gesetzliche Darlehensobergrenze für 0%-Finanzierungen.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Teilanspruch bei bestehendem VA-Kredit</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Besteht bereits ein VA-Kredit, gelten die regionalen Obergrenzen für den Restanspruch :
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div>{"Restgarantie = max(0, County-Grenze × 25 % - Verwendeter Anspruch)"}</div>
              <div>{"Maximaler Kaufpreis bei 0 % Anzahlung = Restgarantie × 4"}</div>
              <div>{"Erforderliche Anzahlung = max(0, (Kaufpreis - Maximaler Kaufpreis) × 25 %)"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Tilgungsbeschleunigung : Zweiwöchentliche Zahlung und Sondertilgungen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Zweiwöchentlicher Zahlungsrhythmus</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Alle zwei Wochen die halbe Monatsrate zahlen spart bei 510.750 $ zu 6.5 % ca. 150.027 $ Zinsen und verkürzt die Laufzeit um 5,8 Jahre.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Monatliche Sondertilgungen</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Monatlich 200 $ zusätzlich tilgen spart 118.241 $ Zinsen und verkürzt die Laufzeit um 55 Monate (4,6 Jahre).
            </p>
          </div>
        </div>
      </section>

      {/* 13. IRRRL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Vereinfachte Umschuldung (VA IRRRL Streamline)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Das IRRRL-Programm senkt den Zinssatz ohne Wertermittlung mit reduzierter Gebühr von 0.50 % :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">Beispiel IRRRL (350.000 $ Restschuld, Zinssenkung von 7.25 % auf 6.00 %) :</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Monatliche Ersparnis</span>
              <span className="text-emerald-600 font-extrabold">279 $ / Monat</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Amortisationszeit</span>
              <span className="text-emerald-600 font-extrabold">17 Monate</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">5-Jahres-Nettoersparnis</span>
              <span className="text-emerald-600 font-extrabold">11.990 $</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            *Hinweis : Ein Neustart der 30-jährigen Laufzeit kann die Gesamtzinslast erhöhen, falls das Vordarlehen bereits weit getilgt war.
          </p>
        </div>
      </section>

      {/* 14. SERVICE ELIGIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Dienstzeitvoraussetzungen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Kriegseinsatz</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Mindestens 90 zusammenhängende Tage aktiver Dienst in anerkannten Kriegszeiten.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Friedenszeiten</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Mindestens 181 zusammenhängende Tage aktiver Militärdienst in Friedenszeiten.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Nationalgarde / Reserve</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Mindestens 6 anerkannte Dienstjahre oder 90 Tage Dienst nach Title 10/32.</p>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Häufige Fehler bei VA-Darlehen
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Falsche Angabe von Erstnutzung oder Folgenutzung.</li>
            <li>Unterschätzen der Fördergebührenhöhe bei niedriger Anzahlung.</li>
            <li>Vergessen, dass Mitfinanzierung die Darlehenssumme und Monatszinsen erhöht.</li>
            <li>Nur die P&I-Rate mit der PITI-Gesamtrate anderer Kredite vergleichen.</li>
            <li>Regionale Obergrenzen ohne Prüfung jährlicher Anpassungen übernehmen.</li>
            <li>Die Onlinesimulation mit einem amtlichen Certificate of Eligibility verwechseln.</li>
            <li>Zweiwöchentliche Tilgungsverrechnung ungeprüft als garantiert ansehen.</li>
            <li>Laufzeitverlängerungen bei IRRRL-Umschuldungen ignorieren.</li>
            <li>Invaliditätsbefreiung ohne amtlichen Bescheid ansetzen.</li>
            <li>Annehmen, dass VA immer günstiger ist als 20 % Eigenkapital bei konventionellen Krediten.</li>
          </ul>
        </div>
      </section>

      {/* 16. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Rechtlicher Rahmen und Pädagogischer Hinweis</span>
        </div>
        <p>
          VA-Hypothekendarlehen unterliegen Title 38 des US Code und dem VA Lenders Handbook. Dieser Rechner stellt unverbindliche Modellrechnungen bereit.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "de",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
