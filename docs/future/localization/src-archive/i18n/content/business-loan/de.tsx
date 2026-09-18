"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Scale,
  Calculator,
} from "lucide-react";
import { CalculatorLocalizedContent, FAQItem } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Was ist ein Geschäftskredit-Rechner?",
    "answer": "Ein Geschäftskredit-Rechner ermittelt die Gesamtkosten einer gewerblichen Finanzierung anhand von Darlehenssumme, Zinssatz, Laufzeit und anfallenden Nebenkosten."
  },
  {
    "question": "Wie wird die monatliche Rate eines Firmenkredits berechnet?",
    "answer": "Bei Annuitätendarlehen gilt die finanzmathematische Formel: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], wobei r der Monatszinssatz und n die Gesamtzahl der Raten ist."
  },
  {
    "question": "Wie viel Zinsen zahle ich für einen Geschäftskredit?",
    "answer": "Die Zinsgesamtkosten entsprechen der Summe aller planmäßigen Ratenzahlungen abzüglich des ursprünglichen Nettodarlehensbetrags."
  },
  {
    "question": "Spielen Bearbeitungs- und Bereitstellungsgebühren eine Rolle?",
    "answer": "Ja, Nebenkosten wie Abschlussgebühren reduzieren den Auszahlungsbetrag und erhöhen den effektiven Jahreszins der Finanzierung spürbar."
  },
  {
    "question": "Was unterscheidet den Sollzins vom gewerblichen Effektivzins?",
    "answer": "Der Sollzins wird auf die verbleibende Restschuld angewendet, während der Effektivzins über die interne Zinsfuß-Methode (IRR) sämtliche Nebenkosten einbezieht."
  },
  {
    "question": "Gilt für Firmenkredite derselbe Effektivzins wie für Verbraucherdarlehen?",
    "answer": "Nicht zwingend. Gewerbliche Finanzierungen fallen oft nicht unter das Verbraucherkreditgesetz; der Effektivzins dient hier dem wirtschaftlichen Renditevergleich."
  },
  {
    "question": "Was bedeutet die Kennzahl DSCR bei einem Firmenkredit?",
    "answer": "Die Debt Service Coverage Ratio (DSCR) misst das Verhältnis zwischen dem operativen Betriebsergebnis (NOI) und dem jährlichen Schuldendienst: DSCR = NOI / Schuldendienst."
  },
  {
    "question": "Wird für jeden Geschäftskredit ein DSCR von mindestens 1,25x verlangt?",
    "answer": "Nein. 1,25x ist ein gängiger banküblicher Richtwert, die konkreten Bonitätsanforderungen variieren jedoch je nach Kreditinstitut und Branche."
  },
  {
    "question": "Was ist ein SBA 7(a)-Förderdarlehen?",
    "answer": "Das Hauptförderprogramm der US-SBA (bis zu 5 Mio. $) für Betriebsmittel, Anlagegüter, Unternehmenskäufe und Umschuldungen."
  },
  {
    "question": "Was ist ein SBA 504-Darlehen?",
    "answer": "Eine langfristige Festzinsfinanzierung (bis 5,5 Mio. $) für Gewerbeimmobilien und schwere Maschinen über zertifizierte Entwicklungsgesellschaften (CDCs)."
  },
  {
    "question": "Was ist ein SBA-Mikrokredit?",
    "answer": "Kleinkredite bis zu 50.000 $ über gemeinnützige Partner für kleinere Anschaffungen, Warenlager und Startkapital."
  },
  {
    "question": "Garantiert die SBA den Kredit zu 100 %?",
    "answer": "Nein. Die staatliche Bürgschaft deckt in der Regel 75 % bis 85 % des Kreditbetrags ab, das Restrisiko verbleibt bei der finanzierenden Bank."
  },
  {
    "question": "Kann ein Geschäftskredit als Betriebsmittelkredit genutzt werden?",
    "answer": "Ja, Betriebsmittelfinanzierungen für Wareneinkäufe, Personal und laufende Betriebskosten sind eine der häufigsten Verwendungsformen."
  },
  {
    "question": "Senkt eine längere Laufzeit die Zinslast?",
    "answer": "Nein. Eine längere Laufzeit verringert zwar die Monatsrate, erhöht jedoch die kumulierte Gesamtzinsbelastung über die Darlehenslaufzeit."
  },
  {
    "question": "Sind Zinsen für Firmenkredite steuerlich absetzbar?",
    "answer": "Zinsen für betriebliche Darlehen können in der Regel als Betriebsausgaben geltend gemacht werden, vorbehaltlich geltender steuerlicher Obergrenzen."
  }
];

export const seo = {
  title: "Geschäftskredit-Rechner — Raten, Zinsen, Gebühren, Effektivzins & Gewerbliche Finanzierungsanalyse",
  description: "Berechnen Sie monatliche Raten für Firmenkredite, Gesamtzinsen, Bearbeitungsgebühren, versicherungsmathematischen Effektivzins, SBA-Kredite und DSCR-Deckung.",
  keywords: ["geschaeftskredit rechner","firmenkredit berechnen","sba darlehen","effektiver jahreszins firmenkredit","dscr rechner"]
};

export const ContentComponent: React.FC = () => {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: faqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Was ist ein Geschäftskredit-Rechner?
          </h2>
          <p>
            Ein Firmenkredit kann auf den ersten Blick günstig erscheinen, wenn man nur den reinen Sollzinssatz betrachtet. Die tatsächlichen Gesamtkosten hängen jedoch maßgeblich von Laufzeit, Bearbeitungsgebühren und Nebenkosten ab.
          </p>
          <p>
            Dieser Rechner führt alle Finanzierungsparameter zusammen: Ratenermittlung, Gesamtzinsen, Nebenkosten, Tilgungspläne, SBA-Förderkonditionen und die DSCR-Tragfähigkeitsprüfung.
          </p>
          <p>
            Die Ergebnisse stellen mathematische Modellrechnungen für die betriebliche Planung dar. Verbindliche Konditionen hängen von der Risikoprüfung der Bank ab.
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Was ist ein gewerblicher Firmenkredit?
          </h2>
          <p>
            Ein Geschäftskredit dient der Finanzierung gewerblicher Vorhaben wie Betriebsmittel, Maschinen, Fuhrpark, Immobilien, Unternehmensnachfolgen oder Umschuldungen.
          </p>
          <p>
            Es gibt verschiedene Finanzierungsformen: klassische Annuitätendarlehen, revolvierende Kontokorrentlinien sowie staatlich verbürgte Förderkredite (wie SBA-Darlehen).
          </p>
          <p>
            Die Wahl der Struktur ist entscheidend, da zwei Darlehen mit identischem Sollzins je nach Gebührenstruktur sehr unterschiedliche Effektivkosten aufweisen.
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Wie wird die monatliche Firmenkreditrate berechnet?
          </h2>
          <p>
            Bei ratierlicher Tilgung mit gleichbleibenden Zahlungen gilt die klassische Annuitätenformel :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Wobei : P = Darlehensbetrag, r = Monatszins (Jahreszins / 12), n = Laufzeit in Monaten, PMT = feste Monatsrate.
          </p>
          <p>
            Die Laufzeit beeinflusst das Ergebnis spürbar: Längere Laufzeiten schonen die Liquidität, treiben aber die Gesamtzinskosten in die Höhe.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              Beispielrechnung : 10.000 $ Firmenkredit zu 10 % über 5 Jahre (60 Monate)
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              <li>Feste monatliche Rate (PMT) : 212,47 $ pro Monat</li>
              <li>Summe aller Raten (60 Monate) : 60 × 212,47 $ = 12.748,23 $</li>
              <li>Getilgter Darlehensbetrag : 10.000,00 $</li>
              <li>Gezahlte Gesamtzinsen : 2.748,23 $</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Gesamtkostenanalyse : Mehr als reine Zinsen
          </h2>
          <p>
            Im gewerblichen Kreditgeschäft muss klar zwischen reinen Zinskosten und den Gesamtkosten der Finanzierung (inkl. Abschluss- und Verwaltungsgebühren) unterschieden werden.
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Kostenkomponente"}</th>
                  <th className="p-2.5 border-b text-right">{"Betrag ($)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 ">{"Kreditbetrag (Nettodarlehen)"}</td>
                  <td className="p-2.5 text-right ">{"10.000,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Gezahlte Gesamtzinsen"}</td>
                  <td className="p-2.5 text-right text-rose-600">{"2.748,23 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Abschlussgebühr / Origination Fee (5,0 %)"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"500,00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Dokumentations- und Bearbeitungsgebühr"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"750,00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Sonstige Gebühren"}</td>
                  <td className="p-2.5 text-right ">{"0,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Summe aller Nebenkosten :"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"1.250,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Gesamte Finanzierungskosten (Zinsen + Gebühren) :"}</td>
                  <td className="p-2.5 text-right text-indigo-600">{"3.998,23 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Bei 10 % Sollzins entstehen somit 3.998,23 $ Gesamtkosten, was die Notwendigkeit einer umfassenden Wirtschaftlichkeitsprüfung unterstreicht.
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Effektiver Jahreszins : Sollzins vs. versicherungsmathematischer Effektivzins
          </h2>
          <p>
            Bei gewerblichen Krediten unterscheidet das Modell :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Nominaler Sollzinssatz (10,00 %)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Vertraglicher Sollzinssatz, der auf die verbleibende Restschuld angewandt wird.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Effektiver Jahreszins / IRR (15,933 %)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Interne Zinsfußrendite basierend auf dem tatsächlichen Nettoauszahlungsbetrag (8.750 $) und den 60 Monatsraten zu 212,47 $.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Dieser Wert unterscheidet sich von linearen Näherungsrechnungen (12,50 %), da er den Zeitwert des Geldes exakt berücksichtigt.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Gewerbekunden sollten diesen Wert als objektiven Vergleichsmaßstab für Bankangebote heranziehen.
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Tilgungsverlauf im gewerblichen Kredit
          </h2>
          <p>
            Der Tilgungsplan zeigt Monat für Monat die Aufteilung der Rate in Zins- und Tilgungsanteile :
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Periode"}</th>
                  <th className="p-2.5 border-b">{"Anfangsbestand"}</th>
                  <th className="p-2.5 border-b text-rose-600">{"Zinsanteil"}</th>
                  <th className="p-2.5 border-b text-emerald-600">{"Tilgungsanteil"}</th>
                  <th className="p-2.5 border-b">{"Endbestand"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 font-bold">{"Monat 1"}</td>
                  <td className="p-2.5">{"10.000,00 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"83,33 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"129,14 $"}</td>
                  <td className="p-2.5 font-bold ">{"9.870,86 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Monat 2"}</td>
                  <td className="p-2.5">{"9.870,86 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"82,26 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"130,21 $"}</td>
                  <td className="p-2.5 font-bold ">{"9.740,65 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Monat 3"}</td>
                  <td className="p-2.5">{"9.740,65 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"81,17 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"131,30 $"}</td>
                  <td className="p-2.5 font-bold ">{"9.609,35 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Monat 60 (Ende)"}</td>
                  <td className="p-2.5">{"210,71 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"1,76 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"210,71 $"}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{"0,00 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Nach 60 Monaten ist das Darlehen vollständig auf 0,00 $ getilgt.
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Kurze vs. lange Laufzeiten bei Firmenkrediten
          </h2>
          <p>
            Die Laufzeit bestimmt maßgeblich Liquidität und Zinskosten :
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Kürzere Laufzeit : Höhere Monatsrate + minimale Gesamtzinsbelastung.</li>
            <li>Längere Laufzeit : Niedrigere Monatsrate + höhere Gesamtzinskosten.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Wählen Sie die Laufzeit passend zum Cashflow und zur Amortisationszeit der finanzierten Investition.
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Schuldendienst-Deckungsquote (DSCR)
          </h2>
          <p>
            Die DSCR misst die Fähigkeit des operativen Betriebsergebnisses zur Deckung des Schuldendienstes :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            DSCR = Operatives Betriebsergebnis (NOI) / Jährlicher Schuldendienst
          </div>
          <p>
            Beispiel : Bei 150.000 $ NOI, 30.000 $ Altschulden und 25.000 $ Neuschulden :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            <p>Gesamter jährlicher Schuldendienst : 30.000 $ + 25.000 $ = 55.000,00 $/Jahr</p>
            <p>Errechneter DSCR : 150.000 $ / 55.000 $ = 2,73x (Sehr solide Tragfähigkeit)</p>
            <p>Maximaler Schuldendienst (bei 1,25x Grenze) : 150.000 $ / 1,25 = 120.000,00 $/Jahr</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ein DSCR ab 1,25x gilt bei Kreditprüfungen allgemein als stabiler Richtwert.
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Besonderheiten bei SBA-Förderkrediten (7(a), CDC/504 & Mikrokredite)
          </h2>
          <p>
            Die Small Business Administration bietet staatliche Bürgschaften zur Erleichterung der Kreditaufnahme :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 7(a)-Programm"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Hauptprogramm bis 5 Mio. $ für Betriebsmittel, Maschinen, Zukäufe und Umschuldungen."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 504 Immobilien"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Langfristige Festzinsdarlehen bis 5,5 Mio. $ für Immobilien und schwere Anlagen."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA-Mikrokredite"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Finanzierungen bis 50.000 $ für Kleinunternehmen über gemeinnützige Träger."}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Staatliche Bürgschaften erfordern spezielle Garantiegebühren, die im Budget zu berücksichtigen sind.
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Typische Fehler bei der Firmenkredit-Kalkulation
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Nur den Sollzins vergleichen und Abschlussgebühren unberücksichtigt lassen.</li>
            <li>Laufzeiten künstlich strecken, ohne die Zinsmehrkosten zu berechnen.</li>
            <li>Verbraucherkredit-Maßstäbe eins zu eins auf Gewerbekredite übertragen.</li>
            <li>Den DSCR von 1,25x als automatische Kreditzusage missverstehen.</li>
            <li>Steuerliche Grenzen der Zinsabzugsfähigkeit für Unternehmen ignorieren.</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Verwandte Finanzierungs- und Unternehmensrechner
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Nutzen Sie unsere weiteren Rechenwerkzeuge für die betriebliche Finanzplanung :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Kreditrechner"}</span>
              <span className="text-slate-500 text-[11px]">{"Allgemeine Annuitätentilgung berechnen."}</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Privatkredit"}</span>
              <span className="text-slate-500 text-[11px]">{"Vergleich mit Konsumentenkrediten."}</span>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Hypothekenrechner"}</span>
              <span className="text-slate-500 text-[11px]">{"Finanzierung gewerblicher Immobilien."}</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"ROI-Rechner"}</span>
              <span className="text-slate-500 text-[11px]">{"Kapitalrendite betrieblicher Investitionen."}</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Amortisationszeit"}</span>
              <span className="text-slate-500 text-[11px]">{"Payback-Dauer von Projekten ermitteln."}</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Margenrechner"}</span>
              <span className="text-slate-500 text-[11px]">{"Deckungsbeiträge und Margen kalkulieren."}</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Zinseszinsrechner"}</span>
              <span className="text-slate-500 text-[11px]">{"Liquiditätsanlagen und Zinseszins."}</span>
            </Link>
            <Link
              href="/calculators/auto-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Autokredit"}</span>
              <span className="text-slate-500 text-[11px]">{"Fuhrpark- und Nutzfahrzeugfinanzierung."}</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "de",
  calculatorSlug: "business-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
