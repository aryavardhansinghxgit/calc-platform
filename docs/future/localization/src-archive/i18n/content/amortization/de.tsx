"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const GERMAN_AMORTIZATION_SEO = {
  title: "Tilgungsrechner — Tilgungsplan & Darlehensberechnung für Kredite",
  description:
    "Berechnen Sie Monatsraten, Aufteilung in Zins und Tilgung, vollständigen Tilgungsplan, Restschuld, Rückzahlungsdatum und Zinsersparnis durch Sondertilgungen.",
  category: "Finanzen",
  keywords: [
    "tilgungsrechner",
    "tilgungsplan rechner",
    "annuitatendarlehen rechner",
    "kredit tilgungsplan",
    "sondertilgung rechner",
    "zins und tilgung aufteilung",
    "baufinanzierung tilgungsplan",
    "restschuld berechnen",
  ],
};

export const GERMAN_AMORTIZATION_FAQS: CalculatorFAQ[] = [
  {
    question: "Was ist ein Tilgungsrechner?",
    answer:
      "Ein Tilgungsrechner ermittelt, wie ein Darlehensbetrag im Laufe der Zeit durch regelmäßige Raten abbezahlt wird. Er zeigt die monatliche Rate (Annuität), die Aufteilung in Zins- und Tilgungsanteil, die verbleibende Restschuld nach jeder Rate, die Gesamtzinsen und das genaue Rückzahlungsdatum.",
  },
  {
    question: "Wie wird eine Tilgungsrate (Annuität) berechnet?",
    answer:
      "Bei einem Festzinsdarlehen (Annuitätendarlehen) wird die gleichbleibende Rate aus dem Darlehensbetrag, dem monatlichen Periodenzinssatz und der Gesamtzahl der Raten anhand der finanzmathematischen Annuitätenformel berechnet. Der Rechner rechnet den Sollzinssatz p.a. und die Laufzeit in Monatswerte um.",
  },
  {
    question: "Was ist ein Tilgungsplan?",
    answer:
      "Ein Tilgungsplan ist eine detaillierte Tabelle, die für jede Periode Ratenbetrag, Zinsanteil, Tilgungsanteil, Anfangssaldo und Restschuld ausweist. Er ermöglicht die lückenlose Nachverfolgung des Schuldenabbaus über die gesamte Vertragslaufzeit.",
  },
  {
    question: "Warum zahlt man zu Beginn des Kredits mehr Zinsen?",
    answer:
      "Zinsen werden stets auf die verbleibende Restschuld berechnet. Zu Beginn des Darlehens ist die Schuld am höchsten, weshalb der Zinsanteil innerhalb der festen Rate überwiegt. Durch jede Tilgung sinkt die Restschuld, sodass der Zinsbetrag kontinuierlich abnimmt und der Tilgungsanteil entsprechend ansteigt.",
  },
  {
    question: "Wie viel Zinsen zahle ich über die gesamte Laufzeit?",
    answer:
      "Geben Sie Darlehensbetrag, Sollzins und Laufzeit ein. Der Rechner summiert die Zinszahlungen aller Perioden. Für das validierte Beispiel von 200.000 $ zu 6 % über 15 Jahre belaufen sich die Gesamtzinsen auf 103.788,46 $.",
  },
  {
    question: "Was bewirkt eine monatliche Sondertilgung von 100 $?",
    answer:
      "Der Effekt hängt von Kredithöhe, Zinssatz, Laufzeit und Restschuld ab. Im geprüften Beispielszenario verkürzt eine zusätzliche monatliche Tilgung von 100 $ die Gesamtlaufzeit spürbar und spart erhebliche Zinskosten ein. Der Rechner liefert das exakte mathematische Szenarioergebnis.",
  },
  {
    question: "Reduzieren Sondertilgungen die Zinskosten?",
    answer:
      "Ja. Sondertilgungen fließen zu 100 % in die Reduzierung der Restschuld. Da künftige Zinsen auf der verringerten Restschuld basieren, sinkt die künftige Zinslast dauerhaft. Dies führt bei gleichbleibender Rate zu einer schnelleren vollständigen Entschuldung.",
  },
  {
    question: "Was ist der Unterschied zwischen monatlichen und einmaligen Sondertilgungen?",
    answer:
      "Eine monatliche Sondertilgung bewirkt einen stetigen, wiederkehrenden Schuldenabbau, während eine Einmalzahlung die Restschuld zu einem bestimmten Stichtag schlagartig senkt. Frühe Sondertilgungen entfalten einen größeren Zinseszinseffekt, da der Zinsvorteil über mehr Perioden wirkt.",
  },
  {
    question: "Senkt eine längere Laufzeit die monatliche Rate?",
    answer:
      "Ja, bei unverändertem Darlehensbetrag und Zinssatz sinkt die Monatsrate, weil sich die Rückzahlung auf mehr Raten verteilt. Im Gegenzug steigen die Gesamtzinskosten über die Gesamtlaufzeit drastisch an. Der Rechner stellt Rate und Gesamtkosten transparent gegenüber.",
  },
  {
    question: "Berücksichtigt der Tilgungsrechner Steuern und Versicherungen?",
    answer:
      "Die mathematische Kernberechnung konzentriert sich rein auf Zins und Tilgung (Kapitaldienst). Eine reale Baufinanzierungsrate kann Nebenkosten wie Grundsteuern, Gebäudeversicherung oder Kreditausfallversicherungen enthalten, die zusätzlich zum reinen Zins- und Tilgungsdienst anfallen.",
  },
  {
    question: "Kann dieser Rechner variable Darlehen (ARM) berechnen?",
    answer:
      "Nein. Dieser Rechner modelliert einen klassischen Festzins-Tilgungsplan unter der Annahme eines über die gewählte Laufzeit konstanten Sollzinses. Variable Kredite erfordern gesonderte Modelle mit Referenzzinsen, Anpassungsintervallen und Zinsobergrenzen (Caps).",
  },
  {
    question: "Ist der Tilgungsplan eine verbindliche Garantie für den Ablösebetrag?",
    answer:
      "Nein. Es handelt sich um eine finanzmathematische Modellrechnung basierend auf den eingegebenen Parametern. Reale Bankabrechnungen können durch untermonatliche Zinsläufe, Bearbeitungsentgelte, Treuhandkonten und Sondertilgungsfristen geringfügig abweichen. Maßgeblich ist stets Ihr Darlehensvertrag.",
  },
];

export function GermanAmortizationContent() {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
      {/* 1. VERWANDTE FINANZRECHNER */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Verwandte Finanzrechner
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Hypothekenrechner
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Kreditrechner
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Autokreditrechner
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Ratenkreditrechner
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Zinssatzrechner
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            EMI-Rechner
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Umschuldungsrechner
          </Link>
        </div>
      </div>

      {/* 2. VOLLSTÄNDIGER BILDUNGSINHALT (17 ABSCHNITTE) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Abschnitt 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Was ist ein Tilgungsrechner?
          </h2>
          <p>
            Ein Tilgungsrechner veranschaulicht, wie ein Darlehensbetrag durch planmäßige Ratenzahlungen über die Zeit vollständig getilgt wird. Bei einem klassischen Annuitätendarlehen mit festem Sollzinssatz besteht jede periodische Rate aus einem Zinsanteil und einem Tilgungsanteil. Zu Beginn der Laufzeit ist die Restschuld am höchsten, weshalb der Zinsanteil überwiegt; mit fortschreitender Tilgung verringert sich die Restschuld und der monatliche Zinsaufwand sinkt kontinuierlich. Der freiwerdende Betrag innerhalb der gleichbleibenden Rate fließt automatisch in eine höhere Tilgung. Dies ist das finanzmathematische Grundprinzip der Annuitätentilgung und erklärt, warum Kredite mit gleicher Kreditsumme, aber unterschiedlichen Zinssätzen oder Laufzeiten völlig andere Zinskosten verursachen. Auch Verbraucherschutzbehörden wie das CFPB betonen diese Dynamik: frühe Raten bestehen überwiegend aus Zinsen, während spätere Raten fast vollständig der Kredittilgung dienen.
          </p>
          <p>
            Der Rechner macht die gesamte Entwicklung transparent, anstatt die Mechanik hinter einer einzelnen monatlichen Zahl zu verbergen. Kreditnehmer sehen für jede Periode Ratenbetrag, Anfangssaldo, Tilgungsbetrag, Zinsbetrag, Restschuld und kumulierte Summen. Die jährliche Übersicht fasst diese Monatsdaten strukturiert zusammen. Dadurch eignet sich das Tool hervorragend zum Vergleichen von Kreditangeboten, zur Überprüfung von Bank-Tilgungsplänen, zur Berechnung von Sondertilgungen in Verbindung mit unserem{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Hypothekenrechner
            </Link>
            , und zur Einschätzung der realen Entschuldungsgeschwindigkeit.
          </p>
        </section>

        {/* Abschnitt 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Wie monatliche Tilgungsraten (Annuitäten) berechnet werden
          </h2>
          <p>
            Für das hier zugrunde gelegte Festzinsmodell folgt die monatliche Rate der klassischen mathematischen Annuitätenformel. Wenn <em>P</em> den Darlehensursprungsbetrag darstellt, <em>r</em> den monatlichen Periodenzinssatz (Sollzins p.a. / 12) und <em>n</em> die Gesamtzahl der Monatsraten, lautet die Formel:
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            PMT = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ &minus; 1 ]
          </div>
          <p>
            Bei einem Sollzinssatz von 6,0 % beträgt der monatliche Zinssatz 0,06 / 12 = 0,005. Die Rate wird über die Gesamtmonatszahl berechnet. Der Rechner behält intern die volle Fließkommapräzision bei und rundet Centbeträge ausschließlich für die visuelle Darstellung auf dem Bildschirm. Dies verhindert Rundungsfehler über lange Laufzeiten von 180 oder 360 Monaten.
          </p>
          <p>
            Für den validierten Referenzfall (200.000 $ Darlehen, 6,0 % Sollzins, 15 Jahre Laufzeit) ergibt sich eine monatliche Rate von exakt 1.687,71365 $ (angezeigt als 1.687,71 $). Über 180 Monatsraten summiert das Modell genau 200.000,00 $ Tilgung und 103.788,46 $ Zinsen, was einem Gesamtaufwand von 303.788,46 $ entspricht.
          </p>
        </section>

        {/* Abschnitt 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Tilgung vs. Zins: Warum sich die Verteilung im Zeitverlauf ändert
          </h2>
          <p>
            Zu Beginn eines Annuitätendarlehens wird der Zinsanteil auf den vollen Anfangskreditbetrag berechnet. Infolgedessen ist der Zinsanteil der Rate anfangs maximal und der Tilgungsanteil verhältnismäßig gering. Sobald eine Monatsrate den Darlehensbetrag reduziert, basiert die Zinsberechnung des Folgemonats auf einem kleineren Restbetrag.
          </p>
          <p>
            Im validierten 200.000-$-Beispiel entfallen im 1. Monat 1.000,00 $ auf Zinsen und 687,71 $ auf die Tilgung; im 12. Monat sinkt der Zinsanteil bereits auf 961,19 $, während die Tilgung auf 726,52 $ ansteigt. In der Jahresübersicht zeigt sich dasselbe Bild: Im 1. Jahr werden 8.483,33 $ getilgt und 11.769,23 $ Zinsen bezahlt; im 12. Jahr beträgt die jährliche Tilgung bereits 16.386,52 $ bei nur noch 3.866,04 $ Zinsen.
          </p>
        </section>

        {/* Abschnitt 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Was ein vollständiger Tilgungsplan enthält
          </h2>
          <p>
            Ein monatlicher Tilgungsplan dokumentiert den lückenlosen Pfad vom ursprünglichen Darlehensbetrag bis zur vollständigen Entschuldung (0,00 $). Jede Tabellenzeile weist Ratennummer, Fälligkeitsdatum, Anfangssaldo, Ratenbetrag, Tilgungsanteil, Zinsanteil, etwaige Sondertilgungen, Restschuld und kumulierte Summen aus. Der Jahresplan ist eine exakte Aggregation der Monatsdaten.
          </p>
          <p>
            Monat 1 startet mit 200.000,00 $, verbucht 1.000,00 $ Zinsen, tilgt 687,71 $ und endet bei 199.312,29 $. Monat 2 setzt auf dieser reduzierten Basis auf. Nach genau 180 Monaten schließt der Tilgungsplan punktgenau bei einer Restschuld von 0,00 $ und 200.000,00 $ Gesamttilgung ab.
          </p>
        </section>

        {/* Abschnitt 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Gesamtzinsen und Gesamtrückzahlung
          </h2>
          <p>
            Die Gesamtzinsen stellen die Summe aller Zinsbelastungen über die Vertragslaufzeit dar. Die Gesamttilgung entspricht bei planmäßigem Verlauf exakt dem aufgenommenen Nettodarlehensbetrag. Die Gesamtrückzahlung ist die Summe aus Darlehensbetrag und Zinsen.
          </p>
          <p>
            Bei realen Baufinanzierungen können Gesamtzahlungen zusätzliche Posten wie Gebäudeversicherungen, Notarkosten, Grundsteuern oder Kontoführungsgebühren enthalten. Der Wert von 1.687,71 $ im Beispiel modelliert den reinen Kapitaldienst (Zins und Tilgung) als verlässliche mathematische Basis.
          </p>
        </section>

        {/* Abschnitt 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Wie die Laufzeit Rate und Zinskosten beeinflusst
          </h2>
          <p>
            Die Darlehenslaufzeit ist einer der mächtigsten Hebel der Finanzierungsplanung. Eine Verlängerung der Laufzeit senkt die Monatsrate, weil sich die Rückzahlung auf mehr Raten verteilt. Der Nachteil ist eine deutlich höhere Gesamtzinslast, da die Restschuld über einen längeren Zeitraum Zinsen generiert. Eine kürzere Laufzeit erhöht die Monatsrate, führt jedoch zu massiven Zinseinsparungen.
          </p>
          <p>
            Vergleichen Sie verschiedene Laufzeiten mit unserem{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Kreditrechner
            </Link>
            , um die optimale Balance zwischen monatlicher Liquidität und Gesamtkosten zu ermitteln.
          </p>
        </section>

        {/* Abschnitt 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Was bewirken monatliche Sondertilgungen?
          </h2>
          <p>
            Eine monatliche Sondertilgung tilgt den Darlehensbetrag schneller als im regulären Plan vorgesehen. Durch die verringerte Restschuld fallen künftige Zinsen geringer aus, was die Rückzahlung beschleunigt und Gesamtzinsen einspart. Im Modell fließt der Extrabetrag zu 100 % in die Restschuldreduzierung.
          </p>
          <p>
            Im Referenzfall verkürzt ein monatlicher Extrabetrag von 100 $ die Laufzeit merklich. Berechnen Sie Umschuldungsszenarien auch mit unserem{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Umschuldungsrechner
            </Link>
            . Vor Sondertilgungen sollten Notfallreserven und höher verzinste Verbindlichkeiten berücksichtigt werden.
          </p>
        </section>

        {/* Abschnitt 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Jährliche Sondertilgungen und Einmalzahlungen
          </h2>
          <p>
            Darlehensnehmer können die Tilgung durch periodische jährliche Zahlungen oder einmalige Sonderzahlungen beschleunigen. Eine jährliche Zahlung erfolgt wiederkehrend in einem festen Monat, eine Einmalzahlung zu einem gewählten Stichtag.
          </p>
          <p>
            Der Zinseszinseffekt macht den Zeitpunkt entscheidend: Eine Einmalzahlung von 5.000 $ im 1. Monat spart wesentlich mehr Zinsen als derselbe Betrag im 10. Jahr. Eine jährliche Sondertilgung von 1.200 $ ab Jahr 1 spart im Beispiel ca. 10.131,78 $ Zinsen und verkürzt die Laufzeit von 180 auf 164 Monate.
          </p>
        </section>

        {/* Abschnitt 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Zeitverzögerte Sondertilgungen und Relevanz des Startzeitpunkts
          </h2>
          <p>
            Der Rechner erlaubt die freie Wahl von Startmonat und Startjahr für Sondertilgungen. So lassen sich Strategien modellieren, die erst in der Zukunft beginnen (z. B. nach Gehaltssprüngen oder Ablauf anderer Verpflichtungen).
          </p>
          <p>
            Das Modell behält vor dem Startzeitpunkt den regulären Verlauf bei und aktiviert die beschleunigte Tilgung exakt zum gewählten Termin, was präzise Szenariovergleiche ermöglicht.
          </p>
        </section>

        {/* Abschnitt 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Null-Prozent-Darlehen (0 % Sollzins) und Randfälle
          </h2>
          <p>
            Da die Standard-Annuitätenformel durch den Zinssatz teilt, würde ein Zinssatz von 0 % mathematisch zu einer Division durch Null führen. Der Algorithmus fängt diesen Fall explizit ab und berechnet die Rate als Kreditsumme geteilt durch die Monatsanzahl (z. B. 120.000 $ über 120 Monate = 1.000,00 $/Monat bei 0 $ Zinsen).
          </p>
          <p>
            Ebenso werden ungerade Beträge, lange Laufzeiten, hohe Zinssätze und Sondertilgungen, die den Restbetrag übersteigen, präzise verarbeitet, sodass die Abschlussrate exakt auf 0,00 $ ausgleicht.
          </p>
        </section>

        {/* Abschnitt 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Annuitätendarlehen vs. Endfällige Darlehen, Negative Amortisation & Variable Kredite
          </h2>
          <p>
            Dieses Tool modelliert klassische Annuitätendarlehen mit Festzins. Bei endfälligen Krediten (Zinszahler-Darlehen) wird während der Laufzeit nur Zins gezahlt und der Darlehensbetrag am Ende auf einen Schlag getilgt; bei negativer Amortisation reichen die Raten nicht für die Zinsen, wodurch die Schuld wächst.
          </p>
          <p>
            Variable Kredite unterliegen regelmäßigen Zinsanpassungen anhand von Referenzzinsen. Zur Analyse variabler Darlehen sollten spezialisierte Rechner mit Zinsgleitklauseln genutzt werden.
          </p>
        </section>

        {/* Abschnitt 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Bestandteile einer realen Baufinanzierungsrate
          </h2>
          <p>
            Ein Tilgungsrechner isoliert Zins und Tilgung. Eine reale monatliche Gesamtbelastung kann zusätzlich Grundsteuern, Gebäudeversicherungen, Restschuldversicherungen und Instandhaltungsrücklagen umfassen.
          </p>
          <p>
            Prüfen Sie Zinskonditionen und Ratenhöhen auch mit unserem{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Zinssatzrechner
            </Link>{" "}
            und dem{" "}
            <Link href="/calculators/emi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              EMI-Rechner
            </Link>
            .
          </p>
        </section>

        {/* Abschnitt 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Wie das Tilgungsdatum (Schuldenfreiheit) ermittelt wird
          </h2>
          <p>
            Das Datum der vollständigen Tilgung errechnet sich aus Startmonat und Startjahr sowie der Anzahl der Raten bis zur Restschuld von null. Im Beispielfall mit Beginn im August 2026 und 180 Raten endet das Darlehen im Juli 2041.
          </p>
          <p>
            Sondertilgungen verringern die Ratenanzahl und ziehen das Tilgungsdatum nach vorne, was den zeitlichen Nutzen des beschleunigten Schuldenabbaus unmittelbar verdeutlicht.
          </p>
        </section>

        {/* Abschnitt 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Diagramme und Jahresübersicht richtig interpretieren
          </h2>
          <p>
            Die Diagramme visualisieren das Verhältnis von Tilgung und Zinsen. Im Referenzfall entfallen 65,8 % der Gesamtrückzahlung auf die Kredittilgung und 34,2 % auf die Zinsen.
          </p>
          <p>
            Die Jahrestabelle bündelt 180 Monatszeilen in 15 übersichtliche Jahreszeilen, was eine schnelle Prüfung der jährlichen Zins- und Tilgungsentwicklung ermöglicht.
          </p>
        </section>

        {/* Abschnitt 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Export und Prüfung des Tilgungsplans
          </h2>
          <p>
            Der Tilgungsplan kann durchsucht, sortiert und direkt nach CSV, Excel, PDF oder Druck exportiert werden. Die Exportdaten stimmen exakt mit den Bildschirmergebnissen überein.
          </p>
          <p>
            Zur Prüfung gilt: In jeder Zeile muss Rate = Tilgung + Zins sein, der Anfangssaldo muss dem vorherigen Restsaldo entsprechen und die letzte Zeile muss exakt 0,00 $ Restschuld ausweisen.
          </p>
        </section>

        {/* Abschnitt 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Rechnernutzung vor der Darlehensaufnahme
          </h2>
          <p>
            Nutzen Sie den Rechner für Szenarioanalysen vor Vertragsabschluss. Tragen Sie die Konditionen Ihres Kreditangebots ein, testen Sie verschiedene Laufzeiten und prüfen Sie realistische Sondertilgungsmöglichkeiten.
          </p>
          <p>
            Für Konsumentenkredite steht Ihnen unser{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Ratenkreditrechner
            </Link>{" "}
            zur Verfügung.
          </p>
        </section>

        {/* Abschnitt 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Berechnungsmethodik und Rechtshinweis
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Methodik und Modellannahmen
              </div>
              <p>
                Kernmethodik: Umrechnung des Sollzinses p.a. in Monatszins (r = Sollzins / 1200), Berechnung der Monatsanzahl (n = Jahre &times; 12 + Monate), Ermittlung der Annuität und zeilenweise Generierung des Tilgungsplans mit Zinsberechnung auf die jeweilige Restschuld. Sondertilgungen werden termingerecht verrechnet und die Schlussrate glättet die Restschuld exakt auf null.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Haftungsausschluss &amp; Datenschutz
              </div>
              <p>
                Dieses Tool dient ausschließlich Informations- und Planungszwecken. Es stellt kein verbindliches Darlehensangebot und keine Anlage-, Steuer- oder Rechtsberatung dar. Maßgeblich sind stets die verbindlichen Vertragsunterlagen Ihrer finanzierenden Bank.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. HÄUFIG GESTELLTE FRAGEN (12 FRAGEN) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Häufig Gestellte Fragen (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {GERMAN_AMORTIZATION_FAQS.map((faq, idx) => {
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
                      F{idx + 1}.
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
}

export default GermanAmortizationContent;
