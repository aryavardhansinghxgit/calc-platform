"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Qu'est-ce qu'un prêt hypothécaire VA et qui est admissible ?",
    "answer": "C'est un prêt garanti par le Département des Anciens Combattants destiné aux militaires en service actif, vétérans et conjoints survivants."
  },
  {
    "question": "Une mise de fonds est-elle exigée ?",
    "answer": "Non, les prêts VA permettent de financer jusqu'à 100 % de la valeur du bien sans aucune mise de fonds (0 % down) et sans assurance PMI."
  },
  {
    "question": "Qu'est-ce que la taxe de financement VA (Funding Fee) ?",
    "answer": "Une taxe gouvernementale unique (1.25 % à 3.30 %) qui remplace l'assurance hypothécaire et finance le fonds de garantie."
  },
  {
    "question": "Qui est exonéré de la taxe de financement VA ?",
    "answer": "Les vétérans bénéficiant d'une pension d'invalidité liée au service (10 %+), les récipiendaires de la Purple Heart et certains conjoints survivants."
  },
  {
    "question": "Vaut-il mieux financer la taxe ou la payer comptant ?",
    "answer": "Financer la taxe réduit le besoin de liquidités à la clôture mais majore le montant emprunté et les intérêts sur 30 ans."
  },
  {
    "question": "Quelle différence entre première utilisation et utilisation ultérieure ?",
    "answer": "Sans apport, le premier usage est tarifé à 2.15 % et les usages ultérieurs à 3.30 %. Dès 5 % d'apport, le taux baisse à 1.50 %."
  },
  {
    "question": "Un prêt VA comporte-t-il une assurance PMI mensuelle ?",
    "answer": "Non, aucun prêt VA n'impose de prime d'assurance PMI mensuelle, générant des économies significatives."
  },
  {
    "question": "Qu'est-ce que le refinancement IRRRL ?",
    "answer": "Une procédure simplifiée permettant de réduire son taux d'intérêt sans expertise immobilière et avec une taxe réduite à 0.50 %."
  },
  {
    "question": "Comment fonctionne le droit de garantie (Entitlement) ?",
    "answer": "Il représente la garantie accordée par l'État; avec un droit complet, il n'existe pas de plafond d'emprunt à 0 % d'apport."
  },
  {
    "question": "Quels sont les états de service minimums ?",
    "answer": "En général, 90 jours en temps de guerre, 181 jours en temps de paix ou 6 ans dans la Réserve/Garde Nationale."
  },
  {
    "question": "Comment le prêt VA se compare-t-il aux prêts FHA et conventionnels ?",
    "answer": "Le prêt VA surpasse le FHA par l'absence d'assurance mensuelle permanente et évite les 5 % à 20 % d'apport du prêt conventionnel."
  },
  {
    "question": "Comment accélérer le remboursement d'un prêt VA ?",
    "answer": "En adoptant des versements bihebdomadaires ou en ajoutant des remboursements de capital réguliers."
  }
];

export const seo = {
  title: "Calculateur de Prêt Hypothécaire VA (Militaires) — Prêt VA",
  description: "Calculez les mensualités d'un prêt VA sans apport (0% down), les droits de financement (Funding Fee), le PITI et les exonérations pour invalidité.",
  keywords: ["calculateur pret va","hypotheque militaire va","funding fee va","pret veterant sans apport"]
};

export const ContentComponent = function VAMortgageContentFR() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculateur de Prêt Hypothécaire VA (Militaires)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calculez vos mensualités de prêt VA, vos droits de financement (Funding Fee), votre mensualité globale PITI, vos exonérations d'invalidité et vos économies de refinancement IRRRL.
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. Qu'est-ce qu'un Calculateur d'Hypothèque VA ?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ce calculateur évalue le coût global et mensuel d'un prêt immobilier garanti par le Département des Anciens Combattants (VA). Il intègre les droits de financement légaux, les taxes foncières, les assurances habitation, l'amortissement et les comparatifs de marché.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Avis sur le Modèle Financier</span>
          </div>
          <p>
            Cet outil est un modèle d'aide à la décision et ne remplace pas un Certificat d'Admissibilité officiel (COE).
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Comment Utiliser le Calculateur d'Hypothèque VA
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Suivez ces étapes pour simuler votre financement militaire :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Saisissez le prix d'achat de la propriété.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Indiquez le pourcentage d'apport prévu (0 % à 100 %).</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Choisissez votre statut militaire (Actif/Vétéran, Réserve ou Conjoint).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Précisez s'il s'agit d'une première utilisation ou d'une utilisation ultérieure.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Entrez le taux d'intérêt fixe et la durée du prêt en années.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Choisissez si vous financez la taxe VA ou la réglez au comptant.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Activez l'exonération pour invalidité liée au service si applicable.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Vérifiez le capital financé, la mensualité P&I et le montant global PITI.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Consultez le tableau d'amortissement complet.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Comparez avec les options FHA et conventionnelles.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Évaluez vos droits de garantie pour un achat à 0 % d'apport.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Testez l'impact des versements bihebdomadaires.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Simulez des remboursements de capital accélérés.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Évaluez le refinancement simplifié IRRRL.</span>
            </div>
        </div>
      </section>

      {/* 4. CORE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Formule d'Amortissement et Calcul du PITI
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La mensualité fixe de principal et d'intérêts (P&I) est déterminée par la formule standard :
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Équation de la Mensualité (Capital + Intérêts)</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"M = P × [r(1+r)^n] / [(1+r)^n - 1]"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            <div>• <strong>M :</strong>  Mensualité de Principal et Intérêts.</div>
            <div>• <strong>P :</strong>  Capital total financé (Prêt de base + Taxe VA financée).</div>
            <div>• <strong>r :</strong>  Taux périodique mensuel (Taux annuel / 12 / 100).</div>
            <div>• <strong>n :</strong>  Nombre total de mensualités prévues (Durée × 12).</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          La mensualité globale du logement (PITI) regroupe l'amortissement et les charges périodiques :
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"PITI Mensuel Global = P&I + (Taxes Foncières / 12) + (Assurance / 12) + Charges de Copropriété"}
        </div>
      </section>

      {/* 5. FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Taxe de Financement VA (Funding Fee)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La taxe de financement VA est une contribution légale obligatoire (38 U.S.C. § 3729) qui pérennise le fonds de garantie de l'État.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Elle compense l'absence de mise de fonds et d'assurance PMI mensuelle. Elle peut être intégrée au capital emprunté ou réglée à la signature.
        </p>
      </section>

      {/* 6. FIRST VS SUBSEQUENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Première Utilisation vs Utilisation Ultérieure
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          L'historique d'utilisation de vos droits VA modifie le barème applicable sans apport :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Première Utilisation (0 % d'Apport)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Pour 500 000 $ d'achat, le taux légal est de 2.15 % (10 750 $). Le capital financé passe à 510 750 $, avec une mensualité P&I de 3 228,29 $ et un PITI de 3 936,62 $/mois.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Utilisation Ultérieure (0 % d'Apport)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Pour un emprunteur récurrent sans apport, le taux passe à 3.30 % (16 500 $). Le prêt financé s'élève à 516 500 $ pour un PITI de 3 973,13 $/mois.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Remarque : Dès 5 % d'apport, le taux pour usage ultérieur retombe à 1.50 % (identique au premier usage).
        </p>
      </section>

      {/* 7. STATUTORY MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Barème Officiel des Taxes de Financement VA
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Tranche d'Apport</th>
                <th className="p-3">Première Utilisation</th>
                <th className="p-3">Utilisation Ultérieure</th>
                <th className="p-3 rounded-tr-xl">Taux Exonéré</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"< 5 % d'Apport (0 % Down)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"2.15%"}</td>
                <td className="p-3 font-mono font-bold text-red-500">{"3.30%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Exonéré)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"5 % – 9.99 % d'Apport"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Exonéré)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"≥ 10 % d'Apport"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Exonéré)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Exonérations Légales de Taxe de Financement (0 % de Taxe)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En vertu de la loi fédérale, certains bénéficiaires sont intégralement dispensés de cette taxe :
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">Critères d'Exonération :</span>
          <ul className="space-y-1 list-disc list-inside">
            <li>Vétérans percevant une indemnité d'invalidité liée au service militaire (10 % ou plus).</li>
            <li>Vétérans admissibles à l'indemnité d'invalidité qui perçoivent une pension de retraite militaire.</li>
            <li>Militaires d'active décorés de la Purple Heart.</li>
            <li>Conjoints survivants de militaires décédés en service ou des suites d'une blessure de service.</li>
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Comparatif : Financer la Taxe vs Paiement Comptant
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ce choix arbitre entre la préservation de vos liquidités et le coût cumulé des intérêts :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Financée dans le Prêt</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Sur 500 000 $ avec 3.30 % de taxe (16 500 $), le prêt atteint 516 500 $ et la mensualité 3 264,80 $. Vos liquidités requises restent de 12 500 $.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Payée Comptant à la Clôture</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Régler les 16 500 $ à la signature maintient le prêt à 500 000 $, réduisant la mensualité à 3 160,34 $ mais portant l'apport initial à 29 000 $.
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Comparatif 3-Voies : Prêt VA vs FHA vs Conventionnel
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programme</th>
                <th className="p-3">Apport Minimum</th>
                <th className="p-3">Assurance Mensuelle</th>
                <th className="p-3">Frais Initiaux</th>
                <th className="p-3 rounded-tr-xl">Coût Total sur 30 Ans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Prêt VA"}</td>
                <td className="p-3 font-bold ">{"0 % (0 $)"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ (Sans PMI)"}</td>
                <td className="p-3">{"2.15 % Financé (10 750 $)"}</td>
                <td className="p-3 font-mono font-bold text-blue-600">{"1 357 200 $ (3 770 $/mois)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"Prêt FHA"}</td>
                <td className="p-3 font-bold ">{"3.5 % (17 500 $)"}</td>
                <td className="p-3 ">{"0.55 % MIP Permanente"}</td>
                <td className="p-3">{"1.75 % UFMIP (8 444 $)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1 421 640 $ (3 949 $/mois)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Conventionnel"}</td>
                <td className="p-3 font-bold ">{"5.0 % (25 000 $)"}</td>
                <td className="p-3 ">{"0.60 % PMI (Années 1-8)"}</td>
                <td className="p-3">{"0 $ Frais Initiaux"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1 356 903 $ (3 943 $/mois)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Le prêt VA fait économiser 64 440 $ face au FHA et égale le coût total du prêt conventionnel tout en dispensant de 25 000 $ d'apport en espèces.
        </p>
      </section>

      {/* 11. ENTITLEMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Droits de Garantie (Entitlement) et Pouvoir d'Achat à 0 % d'Apport
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          L'Entitlement détermine le plafond de financement garanti sans apport :
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Droit Complet (Sans Prêt VA Actif)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Depuis la loi Blue Water Navy de 2019, les vétérans à droit plein ne sont soumis à aucun plafond d'emprunt à 0 % d'apport.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Droit Partiel (Prêt VA Antérieur en Cours)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Si une hypothèque VA reste active, les plafonds de comté s'appliquent pour calculer le droit secondaire restant :
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div>{"Garantie Restante = max(0, Plafond Comté × 25 % - Droit Utilisé)"}</div>
              <div>{"Prix Maximal à 0 % Apport = Garantie Restante × 4"}</div>
              <div>{"Apport Requis = max(0, (Prix Cible - Prix Maximal 0 %) × 25 %)"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Remboursement Accéléré : Versements Bihebdomadaires et Extras
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Paiement Bihebdomadaire</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Payer la moitié de la mensualité toutes les 2 semaines (26 fois/an) équivaut à 13 mensualités annuelles, économisant 150 027 $ d'intérêts et 5,8 ans.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Versements Extra Mensuels de Capital</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Ajouter 200 $/mois de capital permet d'économiser 118 241 $ d'intérêts et de raccourcir le prêt de 55 mois (4,6 ans).
            </p>
          </div>
        </div>
      </section>

      {/* 13. IRRRL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Refinancement Simplifié VA IRRRL
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Le programme IRRRL permet d'abaisser votre taux sans expertise avec une taxe réduite à 0.50 % :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">Exemple IRRRL (Solde 350 000 $, passage de 7.25 % à 6.00 %) :</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Économie Mensuelle</span>
              <span className="text-emerald-600 font-extrabold">279 $ / mois</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Période d'Amortissement</span>
              <span className="text-emerald-600 font-extrabold">17 Mois</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Gain Net sur 5 Ans</span>
              <span className="text-emerald-600 font-extrabold">11 990 $</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            *Remarque : Réinitialiser la durée à 30 ans peut allonger le cumul des intérêts si votre prêt d'origine était déjà bien avancé.
          </p>
        </div>
      </section>

      {/* 14. SERVICE ELIGIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Conditions d'Admissibilité et États de Service
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Service en Temps de Guerre</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Au moins 90 jours consécutifs de service actif lors des conflits reconnus.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Service en Temps de Paix</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Au moins 181 jours consécutifs de service actif en période de paix.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Garde Nationale et Réserve</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Au moins 6 années de service validées ou 90 jours sous statut fédéral Title 10/32.</p>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Erreurs Fréquentes à Éviter
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Sélectionner incorrectement le statut de première utilisation vs utilisation ultérieure.</li>
            <li>Penser que tous les emprunteurs paient la même taxe sans vérifier le montant d'apport.</li>
            <li>Oublier que financer la taxe augmente le capital emprunté et les intérêts sur 30 ans.</li>
            <li>Comparer uniquement le capital et intérêts de la VA au PITI complet d'autres prêts.</li>
            <li>Considérer les plafonds de comté comme permanents sans vérifier les ajustements annuels.</li>
            <li>Prendre la simulation en ligne pour un Certificat d'Admissibilité officiel (COE).</li>
            <li>Supposer que toutes les banques traitent automatiquement les versements bihebdomadaires.</li>
            <li>Négliger le rallongement de durée lors d'un refinancement IRRRL.</li>
            <li>Ne pas justifier formellement l'exonération pour invalidité militaire.</li>
            <li>Croire que le prêt VA est le plus compétitif si vous disposez de plus de 20 % d'apport.</li>
          </ul>
        </div>
      </section>

      {/* 16. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Avis Pédagogique et Cadre Réglementaire</span>
        </div>
        <p>
          Les prêts hypothécaires VA sont régis par le Titre 38 du Code des États-Unis et le manuel des prêteurs de la VA. Cet outil fournit des simulations financières indicatives.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "fr",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
