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
    "question": "Qu'est-ce qu'un calculateur de prêt professionnel ?",
    "answer": "Un calculateur de prêt commercial évalue le coût de remboursement d'un financement d'entreprise en intégrant le capital, le taux d'intérêt, la durée et les frais annexes."
  },
  {
    "question": "Comment calcule-t-on la mensualité d'un prêt d'entreprise ?",
    "answer": "Pour un prêt amortissable à annuités constantes, on applique la formule : PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], avec r le taux mensuel et n le nombre de mensualités."
  },
  {
    "question": "Combien d'intérêts vais-je payer sur mon prêt commercial ?",
    "answer": "Le coût total des intérêts correspond à la somme de toutes les échéances prévues moins le capital emprunté initialement."
  },
  {
    "question": "Les frais d'origination et de dossier ont-ils un impact majeur ?",
    "answer": "Oui. Ces frais réduisent le montant net disponible et augmentent significativement le coût effectif global (TAEG réel)."
  },
  {
    "question": "Quelle est la différence entre taux nominal et TAEG commercial ?",
    "answer": "Le taux nominal s'applique sur le capital restant dû, alors que le TAEG actuariel intègre l'ensemble des frais initiaux selon la méthode du taux de rendement interne (TRI)."
  },
  {
    "question": "Le TAEG d'un prêt professionnel est-il identique à celui d'un crédit à la consommation ?",
    "answer": "Pas nécessairement. Les crédits commerciaux sont souvent exemptés des règles de protection des consommateurs ; le TAEG du calculateur constitue une mesure actuarielle comparative."
  },
  {
    "question": "Qu'est-ce que le ratio DSCR pour un prêt d'entreprise ?",
    "answer": "Le DSCR (Debt Service Coverage Ratio) mesure la capacité du résultat d'exploitation net à couvrir le service annuel de la dette : DSCR = Revenu Net d'Exploitation (NOI) / Service Annuel de la Dette."
  },
  {
    "question": "Un DSCR de 1,25x est-il obligatoire pour tout emprunt commercial ?",
    "answer": "Non. Bien que 1,25x soit un seuil d'analyse classique en banque, chaque établissement fixe ses propres critères de risque."
  },
  {
    "question": "Qu'est-ce qu'un prêt garanti SBA 7(a) ?",
    "answer": "C'est le principal programme de financement de la SBA (jusqu'à 5 M$) pour le fonds de roulement, l'achat d'équipements, l'immobilier et le rachat d'entreprises."
  },
  {
    "question": "Qu'est-ce qu'un prêt SBA 504 ?",
    "answer": "C'est un financement à long terme à taux fixe (jusqu'à 5,5 M$) dédié aux immobilisations lourdes et bâtiments commerciaux via des CDC agréées."
  },
  {
    "question": "Qu'est-ce qu'un microcrédit SBA ?",
    "answer": "Il s'agit de prêts d'un montant maximal de 50 000 $ accordés par des organismes intermédiaires pour les petites entreprises et indépendants."
  },
  {
    "question": "La SBA garantit-elle 100 % du montant emprunté ?",
    "answer": "Non. La SBA garantit une fraction du prêt (souvent entre 75 % et 85 %), la banque conservant le risque sur le solde restant."
  },
  {
    "question": "Puis-je utiliser un prêt commercial pour financer le fonds de roulement ?",
    "answer": "Oui, la majorité des financements professionnels et lignes de trésorerie autorisent le financement des stocks et des dépenses d'exploitation courantes."
  },
  {
    "question": "Une durée de prêt plus longue réduit-elle le coût total des intérêts ?",
    "answer": "Non. Une durée plus longue réduit la mensualité mais augmente le montant global des intérêts versés sur la durée totale du crédit."
  },
  {
    "question": "Les intérêts d'un prêt commercial sont-ils déductibles fiscalement ?",
    "answer": "En règle générale, les intérêts d'emprunt d'une entreprise sont déductibles de son résultat imposable, sous réserve des plafonds fiscaux applicables."
  }
];

export const seo = {
  title: "Calculateur de Prêt Professionnel — Mensualités, Intérêts, Frais, TAEG et Analyse Commerciale",
  description: "Calculez les mensualités de prêts commerciaux, les intérêts totaux, les frais d'origination, le TAEG réel, les options SBA et le ratio de couverture DSCR.",
  keywords: ["calculateur de pret professionnel","pret commercial","calculateur pret sba","taeg pret entreprise","ratio dscr"]
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
            1. Qu'est-ce qu'un Calculateur de Prêt Professionnel ?
          </h2>
          <p>
            Un crédit d'entreprise peut sembler avantageux à première vue si l'on ne regarde que son taux d'intérêt facial. Cependant, le coût réel dépend grandement de la durée de remboursement, des frais d'origination et des frais de dossier.
          </p>
          <p>
            Ce calculateur rassemble toutes ces données : calcul de la mensualité, total des intérêts, coût global de financement, tableau d'amortissement, options SBA et ratio de couverture de flux de trésorerie DSCR.
          </p>
          <p>
            Ces résultats sont fournis à titre de simulation financière prévisionnelle. Les conditions définitives dépendent des critères de souscription de chaque organisme prêteur.
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Qu'est-ce qu'un Financement Commercial ou Professionnel ?
          </h2>
          <p>
            Un prêt d'entreprise est un crédit destiné à couvrir des besoins commerciaux : fonds de roulement, acquisition d'équipements, stocks, travaux, expansion ou rachat de société.
          </p>
          <p>
            Il existe plusieurs formats : prêts à terme amortissables, marges de crédit renouvelables ou prêts avec garantie publique tels que le programme SBA 7(a).
          </p>
          <p>
            La structure du financement est primordiale, car deux prêts avec le même taux facial peuvent avoir des coûts économiques très différents selon les frais et échéances retenus.
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Calcul de la Mensualité d'un Prêt Professionnel
          </h2>
          <p>
            Pour un prêt amortissable à échéances constantes, la formule mathématique des annuités s'applique :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Où : P = principal emprunté, r = taux mensuel (taux annuel / 12), n = nombre total d'échéances mensuelles, PMT = mensualité constante.
          </p>
          <p>
            La durée du prêt joue un rôle déterminant : allonger la durée allège la trésorerie mensuelle mais augmente le coût total des intérêts.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              Exemple Pratique : Prêt de 10 000 $ à 10 % sur 5 Ans (60 Mois)
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              <li>Mensualité Constante (PMT) : 212,47 $ par mois</li>
              <li>Total des Versements (60 mois) : 60 × 212,47 $ = 12 748,23 $</li>
              <li>Capital Remboursé : 10 000,00 $</li>
              <li>Total des Intérêts Payés : 2 748,23 $</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Le Coût Global : Au-delà des Intérêts et Frais Annexes
          </h2>
          <p>
            Dans un prêt professionnel, il convient de distinguer la dépense d'intérêts et le coût global de financement (frais d'origination, frais de dossier, enregistrement).
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Composante du Coût"}</th>
                  <th className="p-2.5 border-b text-right">{"Montant ($)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 ">{"Capital Principal Emprunté"}</td>
                  <td className="p-2.5 text-right ">{"10 000,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Total des Intérêts Payés"}</td>
                  <td className="p-2.5 text-right text-rose-600">{"2 748,23 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Frais d'Origination (5,0 %)"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"500,00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Frais de Dossier et Documentation"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"750,00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Autres Frais Initiaux"}</td>
                  <td className="p-2.5 text-right ">{"0,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Total des Frais Bancaires :"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"1 250,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Coût Global du Financement (Intérêts + Frais) :"}</td>
                  <td className="p-2.5 text-right text-indigo-600">{"3 998,23 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ainsi, pour un taux facial de 10 %, le coût total s'élève à 3 998,23 $, démontrant la nécessité d'une analyse globale.
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. TAEG Réel : Taux Nominal vs Coût Actuariel Effectif
          </h2>
          <p>
            L'analyse comparative du crédit commercial nécessite de distinguer :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Taux d'Intérêt Nominal (10,00 %)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Taux annuel contractuel appliqué sur le solde restant dû à chaque échéance.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                TAEG Actuariel Réel / TRI (15,933 %)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Taux de rendement interne calculé d'après les fonds nets reçus (8 750 $) et les 60 mensualités de 212,47 $.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ce taux diffère du calcul linéaire simplifié des frais (12,50 %) car il intègre la valeur temporelle de l'argent.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ce calcul est essentiel pour arbitrer entre plusieurs propositions de financement bancaire.
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Fonctionnement du Tableau d'Amortissement Commercial
          </h2>
          <p>
            L'amortissement détaille mois par mois la part du paiement allouée aux intérêts et au remboursement du capital :
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Période"}</th>
                  <th className="p-2.5 border-b">{"Solde Initial"}</th>
                  <th className="p-2.5 border-b text-rose-600">{"Intérêts"}</th>
                  <th className="p-2.5 border-b text-emerald-600">{"Amortissement Capital"}</th>
                  <th className="p-2.5 border-b">{"Solde Final"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mois 1"}</td>
                  <td className="p-2.5">{"10 000,00 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"83,33 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"129,14 $"}</td>
                  <td className="p-2.5 font-bold ">{"9 870,86 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mois 2"}</td>
                  <td className="p-2.5">{"9 870,86 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"82,26 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"130,21 $"}</td>
                  <td className="p-2.5 font-bold ">{"9 740,65 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mois 3"}</td>
                  <td className="p-2.5">{"9 740,65 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"81,17 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"131,30 $"}</td>
                  <td className="p-2.5 font-bold ">{"9 609,35 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Mois 60 (Final)"}</td>
                  <td className="p-2.5">{"210,71 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"1,76 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"210,71 $"}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{"0,00 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Au terme des 60 mensualités, le solde de la dette atteint exactement 0,00 $.
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Durée Courte vs Longue Durée pour un Prêt Commercial
          </h2>
          <p>
            La durée du prêt conditionne directement la trésorerie et la rentabilité :
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Durée plus courte : Mensualités plus lourdes + coût total des intérêts minimisé.</li>
            <li>Durée plus longue : Mensualités allégées + intérêts totaux cumulés plus importants.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Le choix optimal dépend de la capacité d'autofinancement et du retour sur investissement du projet.
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Ratio de Couverture du Service de la Dette (DSCR)
          </h2>
          <p>
            Le ratio DSCR mesure la capacité de votre résultat d'exploitation à honorer les échéances d'emprunt :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            DSCR = Résultat Net d'Exploitation (NOI) / Service Annuel de la Dette
          </div>
          <p>
            Exemple : Avec 150 000 $ de résultat d'exploitation, 30 000 $ de dette existante et 25 000 $ de nouvelle dette :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            <p>Service Total de Dette Annuelle : 30 000 $ + 25 000 $ = 55 000,00 $/an</p>
            <p>DSCR Calculé : 150 000 $ / 55 000 $ = 2,73x (Couverture Solide)</p>
            <p>Capacité Maximale d'Endettement (seuil 1,25x) : 150 000 $ / 1,25 = 120 000,00 $/an</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Un ratio supérieur à 1,25x constitue un critère bancaire rassurant.
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Spécificités des Prêts SBA (7(a), CDC/504 et Microcrédits)
          </h2>
          <p>
            La Small Business Administration apporte des garanties d'État pour faciliter l'accès au crédit :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"Programme SBA 7(a)"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Financement principal jusqu'à 5 M$ pour le fonds de roulement, le matériel et les acquisitions."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 504 Immobilier"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Prêts à taux fixe à long terme jusqu'à 5,5 M$ pour les actifs immobiliers et machines lourdes."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"Microcrédits SBA"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Financements d'appoint jusqu'à 50 000 $ pour les microentreprises via des intermédiaires agréés."}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Les garanties SBA s'accompagnent de frais spécifiques à intégrer dans votre budget.
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Erreurs Fréquentes dans le Calcul d'un Prêt Professionnel
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Se concentrer sur le taux nominal sans comptabiliser les frais d'origination et de dossier.</li>
            <li>Allonger la durée uniquement pour abaisser l'échéance sans mesurer le surcoût d'intérêts.</li>
            <li>Confondre le taux annuel d'un crédit particulier avec la TAEG d'un prêt commercial.</li>
            <li>Considérer le ratio DSCR de 1,25x comme une condition automatique d'approbation.</li>
            <li>Négliger les règles fiscales locales sur la déductibilité des intérêts d'emprunt d'entreprise.</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Calculateurs Financiers et Professionnels Associés
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Explorez nos autres outils d'analyse financière d'entreprise :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculateur de Prêt"}</span>
              <span className="text-slate-500 text-[11px]">{"Simulation d'amortissement standard."}</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Prêt Personnel"}</span>
              <span className="text-slate-500 text-[11px]">{"Comparatif avec les crédits aux particuliers."}</span>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculateur Hypothécaire"}</span>
              <span className="text-slate-500 text-[11px]">{"Financement immobilier d'entreprise."}</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculateur de ROI"}</span>
              <span className="text-slate-500 text-[11px]">{"Rentabilité des investissements en capital."}</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Délai de Récupération"}</span>
              <span className="text-slate-500 text-[11px]">{"Temps de retour sur investissement."}</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculateur de Marge"}</span>
              <span className="text-slate-500 text-[11px]">{"Calcul de marge brute et nette."}</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Intérêts Composés"}</span>
              <span className="text-slate-500 text-[11px]">{"Modélisation des placements de trésorerie."}</span>
            </Link>
            <Link
              href="/calculators/auto-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Prêt Auto"}</span>
              <span className="text-slate-500 text-[11px]">{"Financement de flotte de véhicules."}</span>
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
  locale: "fr",
  calculatorSlug: "business-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
