"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const GERMAN_MORTGAGE_SEO = {
  title: "Baufinanzierungsrechner",
  description:
    "Berechnen Sie Ihre monatliche Baufinanzierungsrate (Tilgung und Zinsen), Grundsteuer, Wohngebäudeversicherung, Restschuldversicherung und Hausgeld. Simulieren Sie Sondertilgungen, zweiwöchentliche Zahlungen und Tilgungspläne.",
  category: "Finanzen",
  keywords: [
    "baufinanzierungsrechner",
    "immobilienkredit rechner",
    "monatsrate baufinanzierung",
    "tilgungsplan",
    "sollzins",
    "grundsteuer",
    "wohngebäudeversicherung",
    "hausgeld",
    "sondertilgung",
    "volltilgung",
  ],
};

export const GERMAN_MORTGAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "Wie wird die monatliche Rate aus Zins und Tilgung berechnet?",
    answer:
      "Ihre monatliche Basis-Annuitätenrate wird anhand der Standardformel für Festzinsdarlehen berechnet: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], wobei P der Nettodarlehensbetrag ist, r der monatliche Sollzinssatz (gebundener Sollzinssatz p.a. geteilt durch 12) und n die Gesamtzahl der monatlichen Raten (z.B. 360 Monate bei 30 Jahren Laufzeit).",
  },
  {
    question: "Was ist der Unterschied zwischen PITI und den Gesamten Monatlichen Wohnkosten?",
    answer:
      "PITI ist der klassische Bankstandard, der Tilgung (Principal), Zinsen (Interest), Grundsteuer (Taxes) und Gebäudeversicherung (Insurance) umfasst. Die Gesamtwohnkosten stellen ein umfassendes Haushaltsbudget dar, das zusätzlich Hausgeld (HOA), Instandhaltungsrücklagen, Restschuldversicherungen (PMI) und freiwillige Sondertilgungen berücksichtigt.",
  },
  {
    question: "Was unterscheidet den gebundenen Sollzinssatz vom effektiven Jahreszins (APR)?",
    answer:
      "Der Sollzinssatz ist der reine Zinssatz, der auf die verbleibende Restschuld berechnet wird. Der effektive Jahreszins (APR) beziffert die Gesamtkosten des Kredits pro Jahr einschließlich Bearbeitungsgebühren, Disagio, Vermittlungskosten und verpflichtenden Nebenkosten.",
  },
  {
    question: "Wann kann eine Restschuldversicherung bzw. PMI gekündigt werden?",
    answer:
      "Nach regulatorischen Standards (wie dem US-amerikanischen Homeowners Protection Act von 1998) haben Kreditnehmer das Recht, eine Kündigung zu beantragen, sobald die Restschuld auf 80% des ursprünglichen Kaufpreises (80% LTV) gesunken ist. Bei planmäßigem Erreichen von 78% LTV entfällt die Versicherung gesetzlich automatisch, sofern alle Raten fristgerecht bezahlt wurden.",
  },
  {
    question: "Wie verkürzen Sondertilgungen die Darlehenslaufzeit?",
    answer:
      "Sondertilgungen fließen zu 100% direkt in die Reduzierung der verbleibenden Restschuld. Da künftige Zinsen immer auf diese verringerte Restschuld berechnet werden, sinkt der Zinsanteil sofort, sodass bei gleichbleibender Annuitätenrate der Tilgungsanteil sprunghaft steigt und das Darlehen Jahre früher schuldenfrei ist.",
  },
  {
    question: "Wie spart ein zweiwöchentlicher Zahlungsrhythmus Zinskosten?",
    answer:
      "Bei einem zweiwöchentlichen Zahlungsplan wird alle zwei Wochen die halbe Monatsrate (M / 2) fällig. Da das Kalenderjahr 52 Wochen hat, leisten Sie 26 Halbmonatsraten, was exakt 13 vollen Monatsraten pro Jahr entspricht. Diese zusätzliche Monatsrate pro Jahr reduziert die Laufzeit eines 30-jährigen Darlehens um mehrere Jahre und spart erhebliche Zinsbeträge.",
  },
];

export function GermanMortgageContent() {
  return (
    <div className="space-y-10 py-4 text-slate-900 dark:text-slate-100">
      {/* SECTION 1: Einführung */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Ihre Baufinanzierung und die Gesamtwohnkosten Verstehen
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ein Immobilienkredit ist eine der bedeutendsten finanziellen Verpflichtungen im Leben eines Haushalts.
          Während Kaufinteressenten Immobilien häufig allein anhand des notariellen Kaufpreises und des Sollzinssatzes bewerten,
          setzen sich die tatsächlichen monatlichen Gesamtkosten aus dem Kapitaldienst (Zins und Tilgung), kommunaler Grundsteuer,
          Wohngebäudeversicherung, Hausgeld bei Wohnungseigentümergemeinschaften und eventuellen Kreditabsicherungen zusammen.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Dieser <strong>Baufinanzierungsrechner</strong> bietet Ihnen eine transparente und lückenlose Aufschlüsselung
          Ihrer Wohnkosten. Über reine Standardberechnungen hinaus simuliert er Treuhandausgaben (Escrow), prognostizierte
          Kosteninflation bei Nebenkosten, zweiwöchentliche Tilgungsmodelle sowie maßgeschneiderte Sondertilgungsstrategien zur
          Zinsersparnis über die gesamte Laufzeit.
        </p>
      </section>

      {/* SECTION 2: Bedienung des Rechners */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          So Bedienen Sie den Baufinanzierungsrechner
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Der Rechner ist in interaktive Module unterteilt, die Monatsraten, Diagramme und Tilgungspläne in Echtzeit aktualisieren:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Kaufpreis und Eigenkapital</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Geben Sie den Kaufpreis der Immobilie und Ihr eingebrachtes Eigenkapital ein. Das Tool berechnet automatisch den Nettodarlehensbetrag und den Beleihungsauslauf (LTV).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Laufzeit und Sollzinssatz</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Legen Sie Ihre gewünschte Laufzeit bzw. Zinsbindung (z.B. 15 oder 30 Jahre) und den festen jährlichen Sollzinssatz auf die Restschuld fest.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Steuern, Versicherung und PMI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Erfassen Sie die jährliche Grundsteuer, Wohngebäudeversicherungsprämien und eventuelle Absicherungsgebühren (PMI) bei geringem Eigenkapitalanteil.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Hausgeld und Instandhaltung</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Geben Sie monatliche Hausgeldzahlungen und jährliche Instandhaltungsrücklagen ein (die der Rechner durch 12 teilt, um eine monatliche Rücklage anzusetzen).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Jährliche Teuerungsrate (Inflation)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modellieren Sie die langfristige Inflation durch projektierte prozentuale Steigerungsraten für Steuern, Versicherungen, Hausgeld und Instandhaltungskosten.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Sondertilgung und Zweiwöchentliche Rate</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simulieren Sie monatliche oder jährliche Sondertilgungen, bis zu 8 einmalige Einzahlungen oder aktivieren Sie den zweiwöchentlichen Zahlungsrhythmus mit 26 Perioden pro Jahr.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: Was der Rechner Ermittelt */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Was der Baufinanzierungsrechner Ermittelt
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Das Tool liefert ein detailliertes Profil Ihrer anfänglichen monatlichen Zahlungsverpflichtungen sowie der Gesamtaufwendungen über 30 Jahre:
        </p>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Zins und Tilgung (Basis-Annuität) :</strong> Der vertragliche monatliche Kapitaldienst zur vollständigen Tilgung des Darlehens.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monatliche Grundsteuer-Rücklage :</strong> Exakt 1/12 der geschätzten jährlichen kommunalen Grundsteuerabgabe.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monatliche Gebäudeversicherung :</strong> Exakt 1/12 der jährlichen Wohngebäudeversicherungsprämie.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Monatliche Absicherung (PMI) :</strong> Temporäre monatliche Prämie bei einem Eigenkapitalanteil unter 20% (LTV &gt; 80%).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Hausgeld und Instandhaltung :</strong> Monatliche WEG-Umlagen plus 1/12 der jährlichen privaten Instandhaltungsrücklage.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Geschätzte Gesamte Monatsbelastung :</strong> Das reale Monatsbudget im ersten Jahr (Annuität + Steuern + Versicherung + PMI + Hausgeld + Instandhaltung + Sondertilgung).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Gesamtzinsen und Gesamtaufwand :</strong> Die kumulierten Zinskosten über die gesamte Darlehenslaufzeit und der gesamte geleistete Eigenaufwand.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Datum der Volltilgung :</strong> Der genaue Monat und das Jahr, in dem die Restschuld exakt auf 0,00 $ sinkt.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 4: Berechnung der Monatsrate */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mathematische Berechnung der Monatsrate (Annuität)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Festzinsdarlehen basieren auf der finanzmathematischen Annuitätenformel. Bei gleichbleibender Monatsrate verschiebt sich das Verhältnis zwischen Zinsanteil und Tilgungsanteil im Zeitverlauf kontinuierlich.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Formel für das Annuitätendarlehen :
          </span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
            M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <div><strong>M :</strong> Monatliche Annuitätenrate (Zins &amp; Tilgung)</div>
            <div><strong>P :</strong> Nettodarlehensbetrag (Kaufpreis - Eigenkapital)</div>
            <div><strong>r :</strong> Monatlicher Sollzins (Sollzinssatz p.a. / 12 / 100)</div>
            <div><strong>n :</strong> Gesamtzahl der Monatsraten (Laufzeit in Jahren × 12)</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Sonderfall 0% Zins :</strong> Bei einem theoretischen zinsfreien Darlehen (r = 0) vereinfacht sich die Formel zur linearen Tilgung : <code>M = P / n</code>. Die Gesamtzinsen betragen 0,00 $, und jeder gezahlte Betrag reduziert unmittelbar die Restschuld.
        </p>
      </section>

      {/* SECTION 5: Vollständiges Rechenbeispiel */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Schritt-für-Schritt Rechenbeispiel
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Zur Veranschaulichung der Zusammensetzung der monatlichen Gesamtbelastung dient das folgende Referenzszenario :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div><span className="text-slate-500 block">Kaufpreis :</span><strong>400.000,00 $</strong></div>
            <div><span className="text-slate-500 block">Eigenkapital (20%) :</span><strong>80.000,00 $</strong></div>
            <div><span className="text-slate-500 block">Darlehen (P) :</span><strong>320.000,00 $</strong></div>
            <div><span className="text-slate-500 block">Sollzinssatz :</span><strong>6,706%</strong></div>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. Monatlicher Zinssatz (r) = 0,06706 / 12 = 0,0055883333...</p>
            <p>2. Anzahl Zahlungsperioden (n) = 30 Jahre × 12 = 360 Monate</p>
            <p>3. Zinseszinsfaktor (1 + r)^360 = (1,0055883333)^360 ≈ 7,464627</p>
            <p>4. Annuitätenrate = 320.000 $ × [ 0,0055883333 × 7,464627 ] / [ 7,464627 - 1 ] = <strong>2.066,16 $</strong></p>
            <p>5. Monatliche Grundsteuer (1,2% auf 400k $) = 4.800,00 $ / 12 = <strong>400,00 $</strong></p>
            <p>6. Monatliche Gebäudeversicherung = 1.500,00 $ / 12 = <strong>125,00 $</strong></p>
            <p>7. Monatliche PMI = 0,00 $ (Entfällt dank 20% Eigenkapital)</p>
            <p>8. Monatliches Hausgeld (HOA) = <strong>333,33 $</strong></p>
            <p>9. Monatliche Instandhaltungsrücklage = 4.000,00 $ / 12 = <strong>333,33 $</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              Monatliche Gesamtwohnkosten = 2.066,16 $ + 400,00 $ + 125,00 $ + 0,00 $ + 333,33 $ + 333,33 $ = 3.257,82 $ / Monat
            </div>
            <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400">
              Gesamtkosten über 30 Jahre = 320.000 $ (Tilgung) + 423.818,78 $ (Zinsen) + 144.000 $ (Steuern) + 45.000 $ (Versicherung) + 120.000 $ (Hausgeld) + 120.000 $ (Instandhaltung) = <strong>1.172.818,78 $</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Tilgungsmechanik */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mechanik der Darlehenstilgung
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Unter Tilgung versteht man die stetige Rückführung der Kreditschuld. Bei einem Annuitätendarlehen ändert sich die Zusammensetzung der Monatsrate dynamisch :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Frühe Darlehensjahre (Jahr 1–5)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Da die monatlichen Zinsen auf die noch hohe Restschuld berechnet werden (<code>Zinsen = Restschuld × r</code>), fließt der Großteil der Rate in die Zinszahlung. Im ersten Monat unseres Beispiels entfallen 1.788,27 $ auf Zinsen und nur 277,89 $ auf die eigentliche Tilgung.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Spätere Darlehensjahre (Jahr 20–30)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Durch die kontinuierliche Tilgung sinkt die Restschuld und damit die monatliche Zinslast. Da die Gesamtrate konstant bleibt, steigt der Tilgungsanteil rasant an, wodurch das Eigenkapital beschleunigt aufgebaut wird.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Für einen detaillierten Tilgungsplan zur Zinsabzugsberechnung nutzen Sie unseren spezialisierten{" "}
          <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Tilgungsrechner
          </Link>.
        </p>
      </section>

      {/* SECTION 7: Grundsteuer und Versicherung */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Grundsteuer, Gebäudeversicherung und Treuhandkonten (Escrow)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Kreditinstitute verlangen bei Baufinanzierungen häufig die Einrichtung von <strong>Treuhandkonten</strong>, um sicherzustellen, dass Grundabgaben und Gebäudeversicherungsbeiträge pünktlich entrichtet werden.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Der Darlehensverwalter zieht monatlich 1/12 der geschätzten Jahresbeträge ein. Eine jährliche Abrechnung gleicht Differenzen aus und passt die Raten an geänderte Hebesätze an. Mit der Angabe einer jährlichen Teuerungsrate modelliert dieser Rechner, wie die Inflation diese Nebenkosten über Jahrzehnte hinweg erhöht.
        </p>
      </section>

      {/* SECTION 8: Restschuldversicherung / PMI */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Kreditabsicherung (PMI) und Beleihungsgrenzen (LTV)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Wird ein Darlehen mit weniger als 20% Eigenkapital aufgenommen, übersteigt der Beleihungsauslauf (LTV) 80%. Kreditgeber fordern in diesem Fall eine zusätzliche Absicherung (Private Mortgage Insurance / PMI).
        </p>
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 dark:text-blue-200 block">
            Gesetzliche Kündigungsregeln für Kreditabsicherungen :
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Kündigung auf Antrag des Kreditnehmers (80% LTV) :</strong> Der Darlehensnehmer kann die Streichung der Versicherung schriftlich beantragen, sobald die Restschuld 80% des ursprünglichen Kaufpreises erreicht.</li>
            <li><strong>Automatische Beendigung durch den Darlehensgeber (78% LTV) :</strong> Das Kreditinstitut muss die Absicherung automatisch aufheben, sobald der planmäßige Tilgungsstand 78% LTV erreicht hat.</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>Modellierungsannahme :</em> Der Rechner verwendet die <strong>80% LTV-Schwelle</strong>, um die Versicherungsbeiträge im Tilgungsplan entfallen zu lassen. Testen Sie Eigenkapitalszenarien mit unserem{" "}
          <Link href="/calculators/down-payment-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Eigenkapital-Rechner
          </Link>.
        </p>
      </section>

      {/* SECTION 9: Hausgeld und Instandhaltung */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Hausgeld und Zusätzliche Instandhaltungskosten
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ein häufiger Fehler bei der Budgetplanung ist die Gleichsetzung des reinen Kapitaldienstes mit den <strong>tatsächlichen Gesamtwohnkosten</strong>.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Hausgeld an die Hausverwaltung deckt Gemeinschaftsstrom, Müllabfuhr, Hausmeister und die gesetzliche Erhaltungsrücklage ab. Finanzexperten empfehlen darüber hinaus eine individuelle Instandhaltungsrücklage. Die Eingabe unter <code>Sonstige Kosten ($/Jahr)</code> teilt den Betrag durch 12 und integriert ihn realistisch in Ihr monatliches Wohnbudget.
        </p>
      </section>

      {/* SECTION 10: Sondertilgungen */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Sondertilgungen und Beschleunigte Entschuldung
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Freiwillige Sondertilgungen mindern die Zinslast und verkürzen die Gesamtlaufzeit des Kredits erheblich :
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5 font-bold">Tilgungsstrategie (320k $ Darlehen bei 6,706%)</th>
                <th className="p-2.5 font-bold">Neue Laufzeit</th>
                <th className="p-2.5 font-bold">Zeitersparnis</th>
                <th className="p-2.5 font-bold">Zinsersparnis Gesamt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Basis (Ohne Sondertilgungen)</td>
                <td className="p-2.5">360 Monate (30,0 Jahre)</td>
                <td className="p-2.5">0 Monate</td>
                <td className="p-2.5">0,00 $</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+200 $ / Monat Sondertilgung</td>
                <td className="p-2.5">295 Monate (~24,6 Jahre)</td>
                <td className="p-2.5">65 Monate (5,4 Jahre)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">90.073,60 $</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+2.000 $ / Jahr (Sonderzahlung)</td>
                <td className="p-2.5">289 Monate (~24,1 Jahre)</td>
                <td className="p-2.5">71 Monate (5,9 Jahre)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">97.337,83 $</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Einmalig 20.000 $ (Monat 12)</td>
                <td className="p-2.5">304 Monate (~25,3 Jahre)</td>
                <td className="p-2.5">56 Monate (4,7 Jahre)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">84.926,92 $</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Sind die Marktzinsen seit Abschluss gesunken, berechnen Sie Ihre Umschuldungsvorteile mit unserem{" "}
          <Link href="/calculators/refinance-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Umschuldungsrechner (Refinance)
          </Link>.
        </p>
      </section>

      {/* SECTION 11: Zweiwöchentliche Zahlungen */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Funktionsweise Zweiwöchentlicher Tilgungspläne
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ein Standardkredit verlangt 12 Monatsraten im Jahr. Bei einem zweiwöchentlichen Zahlungsplan zahlen Sie alle 14 Tage exakt die Hälfte der Monatsrate (<code>M / 2</code>).
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Da das Jahr 52 Wochen umfasst, leisten Sie <strong>26 Halbmonatsraten</strong>, was rechnerisch <strong>13 vollen Monatsraten pro Jahr</strong> entspricht (<code>26 × 0,5 = 13</code>). Diese zusätzliche Rate pro Jahr tilgt direkt die Restschuld und verkürzt die Darlehenszeit um mehrere Jahre.
        </p>
      </section>

      {/* SECTION 12: 15 vs. 30 Jahre */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          15 Jahre vs. 30 Jahre Festzinsdarlehen
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Die Wahl zwischen 15 und 30 Jahren Laufzeit ist eine direkte Abwägung zwischen monatlichem Liquiditätsspielraum und gesamten Zinskosten :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">30-jähriges Festzinsdarlehen</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Niedrigere verpflichtende Monatsrate.</li>
              <li>Höchste Budgetflexibilität bei unvorhergesehenen Einkommensschwankungen.</li>
              <li>Höhere Gesamtzinsbelastung über die gesamte Laufzeit.</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">15-jähriges Festzinsdarlehen</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Höhere Monatsrate (meist 35% bis 50% höher).</li>
              <li>Enorme Zinsersparnis (häufig über 50% weniger Gesamtzinsen).</li>
              <li>Sehr schneller Aufbau von schuldenfreiem Immobilienvermögen.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 13: Budget & DTI */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Wie Viel Immobilie Können Sie Sich Leisten?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Die Berechnung der Rate bei bekanntem Kaufpreis ist eine Vorwärtsrechnung. Zu Beginn der Immobiliensuche benötigen Sie jedoch eine Rückwärtsrechnung auf Basis Ihres Bruttoeinkommens und bestehender Verpflichtungen.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Banken bewerten Ihre Bonität über die <strong>Schuldendienstquote (Debt-to-Income / DTI)</strong> :
          die Wohnkostenquote (Wohnaufwand im Verhältnis zum Bruttoeinkommen, Richtwert ca. 28-33%) und die Gesamtschuldenquote (alle Verbindlichkeiten zusammen, Obergrenze meist 36-43%). Ermitteln Sie Ihr Maximalbudget mit unserem{" "}
          <Link href="/calculators/house-affordability-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Budget-Rechner (House Affordability)
          </Link>{" "}
          oder prüfen Sie Ihre Kennzahlen im{" "}
          <Link href="/calculators/dti-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            DTI-Rechner
          </Link>.
        </p>
      </section>

      {/* SECTION 14: Typische Fehler */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Typische Fehler bei der Baufinanzierungsberechnung
        </h3>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>1. Verwechslung von Sollzins und Effektivzins :</strong> Der Sollzins bestimmt den monatlichen Zinsbetrag. Der Effektivzins enthält alle Nebenkosten. Die Eingabe des Effektivzinses in die Tilgungsformel führt zu einer falschen Überhöhung der Annuitätenrate.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>2. Vernachlässigung von Nebenkosten und Hausgeld :</strong> Wer nur Zins und Tilgung einplant, riskiert eine Budgetunterdeckung von 20% bis 40% gegenüber den tatsächlichen Gesamtwohnkosten.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>3. Falsche Annahmen bei Förderdarlehen :</strong> Staatliche Förderdarlehen (wie FHA- oder VA-Darlehen) unterliegen spezifischen Versicherungsprämien. Nutzen Sie unseren{" "}
            <Link href="/calculators/fha-loan-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              FHA-Darlehensrechner
            </Link>{" "}
            oder{" "}
            <Link href="/calculators/va-mortgage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              VA-Darlehensrechner
            </Link>.
          </div>
        </div>
      </section>

      {/* SECTION 15: Verwandte Rechner */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Verwandte Finanzierungs- und Immobilienrechner
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/house-affordability-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Immobilien-Budgetrechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Maximalen Kaufpreis aus Einkommen ermitteln.</span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Tilgungsrechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Vollständige Jahres- und Monatstilgungspläne.</span>
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Eigenkapital-Rechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Eigenkapitalanteil optimieren und Kosten senken.</span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Umschuldungsrechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Zinsersparnis und Break-Even-Point berechnen.</span>
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Mieten oder Kaufen
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Langfristigen Vermögensaufbau vergleichen.</span>
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              DTI-Rechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Schuldendienstquote der Banken überprüfen.</span>
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              FHA-Darlehensrechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Finanzierungen mit 3,5% Eigenkapital und MIP.</span>
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              VA-Darlehensrechner
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Darlehenskonditionen ohne Eigenkapital.</span>
          </Link>
        </div>
      </section>

      {/* SECTION 16: Häufig Gestellte Fragen */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Häufig Gestellte Fragen (FAQ)
        </h3>
        <div className="space-y-3">
          {GERMAN_MORTGAGE_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GermanMortgageContent;
