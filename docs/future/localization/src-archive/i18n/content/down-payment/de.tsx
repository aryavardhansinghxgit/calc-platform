"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Wie viel Eigenkapital sollte man beim Hauskauf einbringen?",
    "answer": "Üblicherweise zwischen 10 % und 20 % des Kaufpreises zuzüglich der anfallenden Kaufnebenkosten."
  },
  {
    "question": "Sind 20 % Eigenkapital zwingend vorgeschrieben?",
    "answer": "Nein, viele Förder- und Standardprogramme gestatten Eigenkapitalquoten ab 0 % bis 5 %."
  },
  {
    "question": "Wie beeinflusst die Anzahlung die monatliche Rate?",
    "answer": "Ein höherer Eigenkapitaleinsatz senkt das Darlehensvolumen, die Zinskosten und erspart teure Kreditversicherungen (PMI)."
  },
  {
    "question": "Was ist eine Private Mortgage Insurance (PMI)?",
    "answer": "Eine Restschuldversicherung, die bei weniger als 20 % Eigenkapital die Bank gegen Kreditausfall absichert."
  },
  {
    "question": "Welche Kaufnebenkosten fallen zusätzlich an?",
    "answer": "Rund 2 % bis 5 % des Kaufpreises für Notar, Grunderwerbsteuer, Grundbucheintrag und Wertermittlung."
  },
  {
    "question": "Kann man eine Immobilie mit 0 % Anzahlung kaufen?",
    "answer": "Ja, über staatliche Sonderprogramme wie VA-Darlehen (für Militärangehörige) oder USDA-Darlehen (ländlicher Raum)."
  },
  {
    "question": "Welcher Unterschied besteht zwischen 3 %, 5 %, 10 % oder 20 % Anzahlung?",
    "answer": "Weniger Eigenkapital bedeutet höhere Monatsraten, schont jedoch die Liquiditätsreserven für Notfälle."
  },
  {
    "question": "Ist mehr Eigenkapital immer wirtschaftlich sinnvoll?",
    "answer": "Vergleichen Sie den Kreditzins mit der erwarteten Rendite alternativer Kapitalanlagen."
  },
  {
    "question": "Wann entfällt die PMI-Versicherung?",
    "answer": "Auf Antrag bei 80 % Beleihungsauslauf (LTV) oder automatisch bei 78 % LTV laut Tilgungsplan."
  },
  {
    "question": "Was bedeutet der Beleihungsauslauf (LTV)?",
    "answer": "Das Verhältnis des Darlehensbetrags zum Verkehrswert der Immobilie in Prozent."
  },
  {
    "question": "Dürfen Schenkungen als Eigenkapital eingesetzt werden?",
    "answer": "Ja, sofern die Schenkung formell durch eine Schenkungsurkunde nachgewiesen wird."
  },
  {
    "question": "Wie lange dauert das Ansparen des Eigenkapitals?",
    "answer": "Abhängig von Nettoeinkommen, monatlicher Sparquote und Zielkaufpreis."
  }
];

export const seo = {
  title: "Eigenkapital- und Anzahlungsrechner für Immobilien — Conventional 97",
  description: "Berechnen Sie das benötigte Eigenkapital für den Immobilienkauf, Monatsraten bei 3%, 5%, 10% und 20% Anzahlung, PMI-Wegfall und Kaufnebenkosten.",
  keywords: ["anzahlung rechner immobilie","eigenkapital rechner","pmi versicherung rechner","kaufnebenkosten immobilie"]
};

export const ContentComponent = function DownPaymentContentDE() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Eigenkapital- und Anzahlungsrechner für Immobilien
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Umfassender Leitfaden zur Berechnung des Eigenkapitalbedarfs, Mindestanforderungen nach Kreditprogramm, automatischem PMI-Wegfall bei 78 % LTV und Kaufnebenkosten.
        </p>
      </div>

      {/* SECTION 1: WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Was ist eine Anzahlung (Eigenkapital) und wie funktioniert sie?
        </h2>
        <p className="text-sm leading-relaxed">
          Die Anzahlung ist der Barbetrag, den der Käufer aus eigenen Mitteln zur Finanzierung des Immobilienkaufs beisteuert. Der Restbetrag wird über ein grundbuchlich besichertes Hypothekendarlehen finanziert. Die Anzahlung bestimmt maßgeblich den Beleihungsauslauf (LTV) und die Monatsrate.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Zentrale Formeln für Eigenkapital und Anzahlung</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Anzahlungsbetrag ($) :</strong></div>
            <div className="text-center font-mono">{"Anzahlung = Kaufpreis (P) × (Anzahlung % / 100)"}</div>
            
            <div className="pt-2"><strong>2. Finanziertes Darlehensvolumen ($) :</strong></div>
            <div className="text-center font-mono">{"Darlehensbetrag = Kaufpreis - Anzahlung"}</div>

            <div className="pt-2"><strong>3. Gesamter Liquiditätsbedarf bei Kaufabschluss ($) :</strong></div>
            <div className="text-center font-mono">{"Barmittelbedarf = Anzahlung + Kaufnebenkosten (2 % - 5 %)"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Wie viel Eigenkapital benötigen Sie wirklich?
        </h2>
        <p className="text-sm leading-relaxed">
          Die geforderte Mindesteigenkapitalquote richtet sich nach dem jeweiligen Darlehensprogramm :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0 % Anzahlung</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Möglich über staatliche Programme wie VA-Darlehen (Veteranen und Soldaten) oder USDA-Förderungen im ländlichen Raum.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3 % – 3.5 % Anzahlung</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Conventional-97-Programme fordern 3 % für Erstkäufer (Score 620+). FHA-Kredite verlangen 3.5 % (Score 580+).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20 % Anzahlung</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Die Standardgrenze zur vollständigen Vermeidung von PMI-Versicherungsprämien und zur Minimierung der Zinskosten.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 20% MYTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Der 20 %-Eigenkapital-Mythos im Realitätscheck
        </h2>
        <p className="text-sm leading-relaxed">
          20 % Anzahlung erspart die PMI-Prämie, doch jahrelanges Ansparen birgt erhebliche Opportunitätskosten :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">Vorteile von 20 % Anzahlung</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Sofortige Ersparnis von 100 $ bis 300 $/Monat durch Wegfall der PMI.</li>
              <li>Spürbar niedrigere Monatsrate für Zins und Tilgung.</li>
              <li>Geringere Zinsgesamtkosten über die gesamte Vertragslaufzeit.</li>
              <li>Bessere Verhandlungsposition beim Immobilienverkäufer.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">Nachteile und Opportunitätskosten</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Vollständiger Verzehr von Liquiditätsreserven und Notfallpuffern.</li>
              <li>Kaufverzögerungen setzen Käufer steigenden Immobilienpreisen aus.</li>
              <li>Opportunitätskosten durch Bindung von Kapital, das alternativ angelegt werden könnte.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Kreditprogramme und Mindestanforderungen an das Eigenkapital
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Kreditprogramm</th>
                <th className="p-3">Min. Anzahlung %</th>
                <th className="p-3">Min. Score</th>
                <th className="p-3">PMI-Regelungen</th>
                <th className="p-3 rounded-tr-xl">Einmalige Gebühr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Conventional 97"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.0%"}</td>
                <td className="p-3">{"620"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Entfällt bei 78 %–80 % LTV"}</td>
                <td className="p-3 text-amber-600">{"0 $"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"FHA-Darlehen"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.5%"}</td>
                <td className="p-3">{"580"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Gesamte Laufzeit (<10 % Anzahlung)"}</td>
                <td className="p-3 text-amber-600">{"1.75 % UFMIP"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"VA-Darlehen (Militär)"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"580+"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ monatliche PMI"}</td>
                <td className="p-3 text-amber-600">{"1.4 %–2.15 % Fördergebühr"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"USDA Rural"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"640"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0.35 % Jahresgarantie"}</td>
                <td className="p-3 text-amber-600">{"1.0 % Garantiegebühr"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Private Mortgage Insurance (PMI) und Kündigung (80 % vs. 78 % LTV)
        </h2>
        <p className="text-sm leading-relaxed">
          Gesetzliche Vorgaben regeln die Kündigung und den automatischen Wegfall der PMI-Versicherung :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Kündigung auf Antrag bei 80 % LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Erreicht die Restschuld 80 % des ursprünglichen Kaufpreises, haben Sie das Recht auf schriftliche Kündigung der PMI.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Automatischer Wegfall bei 78 % LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Kreditgeber sind gesetzlich verpflichtet, die PMI automatisch einzustellen, sobald die Restschuld 78 % des Ursprungswerts erreicht.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Förderprogramme zur Eigenkapitalunterstützung (DPA)
        </h2>
        <p className="text-sm leading-relaxed">
          Zahlreiche öffentliche Programme unterstützen qualifizierte Immobilienkäufer :
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li>Zuschüsse (Grants) : Nicht rückzahlbare Förderbeträge.</li>
          <li>Verzinsliche Nachrangdarlehen mit Schuldenerlass nach 3 bis 5 Jahren Eigennutzung.</li>
          <li>Zinslose Stundungsdarlehen, die erst bei Wiederverkauf fällig werden.</li>
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          7. Pädagogische Zusammenfassung
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Die Abwägung zwischen Eigenkapitaleinsatz, PMI-Kosten und Liquiditätsreserve ermöglicht eine maßgeschneiderte Finanzierungsstrategie.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "de",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
