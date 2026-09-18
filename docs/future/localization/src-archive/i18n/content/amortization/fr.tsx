"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const FRENCH_AMORTIZATION_SEO = {
  title: "Calculateur d'Amortissement — Tableau et Échéancier de Prêt Immobilier",
  description:
    "Calculez vos mensualités, la répartition capital/intérêts, le tableau d'amortissement complet, la date de remboursement et les économies d'intérêts avec versements anticipés.",
  category: "Finance",
  keywords: [
    "calculateur d amortissement",
    "tableau d amortissement",
    "simulateur echeancier pret",
    "mensualite pret immobilier",
    "remboursement anticipe pret",
    "repartition capital interet",
    "duree remboursement pret",
    "economie interets pret",
  ],
};

export const FRENCH_AMORTIZATION_FAQS: CalculatorFAQ[] = [
  {
    question: "Qu'est-ce qu'un calculateur d'amortissement ?",
    answer:
      "Un calculateur d'amortissement modélise la façon dont le solde d'un prêt est progressivement remboursé au fil du temps. Il affiche la mensualité, la part allouée au capital et aux intérêts, le capital restant dû après chaque échéance, le total des intérêts et la date d'extinction du prêt selon les paramètres saisis.",
  },
  {
    question: "Comment est calculée une mensualité d'amortissement ?",
    answer:
      "Pour un emprunt à taux fixe, la mensualité constante est calculée à partir du capital emprunté, du taux d'intérêt périodique mensuel et du nombre total d'échéances en utilisant la formule classique des annuités constantes. Le calculateur convertit le taux nominal annuel et la durée en valeurs mensuelles avant de générer l'échéancier.",
  },
  {
    question: "Qu'est-ce qu'un tableau ou échéancier d'amortissement ?",
    answer:
      "Un tableau d'amortissement est une grille détaillée période par période indiquant la mensualité, les intérêts échus, le capital remboursé, le solde initial et le solde restant dû. Il permet de suivre l'évolution précise de la dette au lieu de se limiter à une seule valeur mensuelle globale.",
  },
  {
    question: "Pourquoi paie-t-on plus d'intérêts au début du prêt ?",
    answer:
      "Les intérêts sont calculés sur le capital restant dû. Au début du crédit, la dette est à son niveau maximal, ce qui génère une part d'intérêts prépondérante dans la mensualité. Au fur et à mesure que le capital est amorti, le solde diminue et le montant des intérêts mensuels décroît proportionnellement.",
  },
  {
    question: "Combien d'intérêts vais-je payer sur la durée totale du prêt ?",
    answer:
      "Saisissez le montant emprunté, le taux d'intérêt et la durée. Le calculateur totalise les intérêts de chaque période. Pour le cas validé de 200 000 $ à 6 % sur 15 ans, le total des intérêts modélisés s'élève à 103 788,46 $.",
  },
  {
    question: "Que se passe-t-il si je verse 100 $ supplémentaires chaque mois ?",
    answer:
      "L'impact dépend du montant, du taux, de la durée et du solde résiduel. Dans l'exemple vérifié, un versement mensuel additionnel de 100 $ réduit sensiblement la durée du prêt et génère d'importantes économies d'intérêts. Le calculateur fournit le résultat exact du scénario sans approximation.",
  },
  {
    question: "Les remboursements anticipés réduisent-ils le coût des intérêts ?",
    answer:
      "Les versements supplémentaires imputés au capital réduisent directement le solde débiteur, ce qui diminue la base de calcul des intérêts pour toutes les échéances futures. L'effet contractuel dépend des clauses du contrat et des règles de l'organisme prêteur. Dans ce modèle, les versements extras réduisent directement le principal.",
  },
  {
    question: "Quelle est la différence entre un versement extra mensuel et un versement ponctuel ?",
    answer:
      "Un versement mensuel supplémentaire crée un désendettement récurrent et progressif, tandis qu'un versement ponctuel opère une réduction de capital immédiate et unique. Les amortissements anticipés réalisés tôt ont un impact cumulé supérieur car ils réduisent les intérêts sur un plus grand nombre de périodes futures.",
  },
  {
    question: "Une durée d'emprunt plus longue diminue-t-elle la mensualité ?",
    answer:
      "Généralement oui, à montant et taux constants, car le remboursement est réparti sur davantage d'échéances. En contrepartie, le coût total des intérêts augmente considérablement sur la durée globale. Le calculateur permet de comparer la mensualité et le coût total du crédit.",
  },
  {
    question: "Le calculateur d'amortissement inclut-il les taxes et assurances ?",
    answer:
      "Le calcul fondamental d'amortissement se concentre sur le capital et les intérêts (P&I). Une mensualité immobilière réelle peut inclure les taxes foncières, l'assurance habitation, l'assurance emprunteur (PMI) et d'autres frais annexes. Ces éléments ne font pas partie de l'amortissement mathématique pur à moins d'être modélisés spécifiquement.",
  },
  {
    question: "Ce calculateur peut-il gérer un prêt à taux révisable (ARM) ?",
    answer:
      "Non. Cet outil modélise un échéancier à taux fixe standard en considérant le taux saisi comme constant sur toute la durée. Les prêts à taux variable nécessitent une modélisation distincte des indices de référence, des marges, des périodes d'ajustement et des plafonds contractuels.",
  },
  {
    question: "Le résultat constitue-t-il une garantie contractuelle du montant de clôture ?",
    answer:
      "Non. Il s'agit d'une estimation mathématique fondée sur les hypothèses saisies. Les montants réels peuvent différer en raison des dates de valeur, des frais de dossier, des comptes séquestres (escrow) et des conditions particulières de votre contrat. Vérifiez toujours auprès de votre établissement financier.",
  },
];

export function FrenchAmortizationContent() {
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
      {/* 1. CALCULATEURS FINANCIERS CONNEXES */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Calculateurs Financiers Connexes
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur Hypothécaire
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur de Prêt
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur Prêt Auto
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur Prêt Personnel
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur Taux d'Intérêt
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur EMI
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculateur de Rachat de Crédit
          </Link>
        </div>
      </div>

      {/* 2. CONTENU ÉDUCATIF COMPLET (17 SECTIONS) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Qu'est-ce qu'un Calculateur d'Amortissement ?
          </h2>
          <p>
            Un calculateur d'amortissement illustre la manière dont le capital d'un prêt est progressivement remboursé au fur et à mesure des versements périodiques. Pour un emprunt standard à taux fixe, chaque échéance comprend une composante d'intérêts et une composante de capital. Au début de l'échéancier, le capital restant dû étant élevé, la part d'intérêts est prépondérante ; à mesure que le capital est remboursé, la dette diminue et les intérêts générés chaque mois baissent. Une part croissante de la mensualité constante peut alors être consacrée au désendettement direct. C'est le principe fondamental de l'amortissement bancaire, expliquant pourquoi deux emprunts de même montant initial mais à durées ou taux différents affichent des coûts d'intérêts totaux très contrastés. Les organismes de protection financière (tels que le CFPB) rappellent cette même dynamique : les premières mensualités d'un prêt immobilier sont majoritairement composées d'intérêts, tandis que les dernières remboursent quasi exclusivement le capital.
          </p>
          <p>
            L'outil est précieux car il rend l'ensemble du calendrier visible au lieu de masquer les mécanismes financiers derrière un simple chiffre mensuel. L'emprunteur peut examiner la mensualité, le solde initial, l'amortissement du principal, les intérêts facturés, le solde final et les cumuls pour chaque période. La vue annuelle agrège ces données mensuelles pour offrir une perspective globale par année. Cet outil est idéal pour comparer des offres de crédit, vérifier l'échéancier fourni par une banque, simuler des remboursements anticipés avec notre{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculateur Hypothécaire
            </Link>
            , et estimer la rapidité avec laquelle la dette s'éteint.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Comment sont Calculées les Mensualités d'Amortissement
          </h2>
          <p>
            Pour le modèle à taux fixe appliqué ici, la mensualité constante de remboursement (capital et intérêts) suit la formule actuarielle classique de l'annuité constante. Si <em>P</em> représente le capital initial emprunté, <em>r</em> le taux d'intérêt périodique mensuel (taux annuel / 12) et <em>n</em> le nombre total d'échéances mensuelles, la formule s'énonce :
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            PMT = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ &minus; 1 ]
          </div>
          <p>
            Pour un taux nominal annuel saisi à 6 %, le taux périodique mensuel est égal à 0,06 / 12 = 0,005. La mensualité est ensuite calculée sur l'intégralité du terme en mois. Le moteur mathématique conserve la pleine précision de calcul en mémoire et n'applique les arrondis qu'au moment de l'affichage à l'écran, évitant ainsi les erreurs cumulées sur 180 ou 360 mensualités.
          </p>
          <p>
            Pour le scénario de référence validé, un prêt de 200 000 $ à 6 % sur 15 ans (180 mois) génère une mensualité théorique de 1 687,71365 $, affichée sous la forme 1 687,71 $. Sur l'ensemble des 180 échéances, le modèle amortit exactement 200 000,00 $ de capital et totalise 103 788,46 $ d'intérêts, soit 303 788,46 $ de décaissement total de capital et intérêts.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Capital vs. Intérêts : Pourquoi la Répartition Évolue avec le Temps
          </h2>
          <p>
            Au démarrage du crédit, les intérêts sont calculés sur la totalité du montant emprunté. En conséquence, la part d'intérêts prélevée sur chaque mensualité est très importante, et le remboursement net du capital est modéré. Dès lors qu'une mensualité amortit une fraction du capital, le calcul d'intérêts du mois suivant s'applique sur une base plus faible.
          </p>
          <p>
            Pour notre exemple de 200 000 $ à 6 % sur 15 ans, le premier mois comprend 1 000,00 $ d'intérêts et 687,71 $ de capital ; au 12e mois, les intérêts tombent à 961,19 $ tandis que le capital remboursé monte à 726,52 $. La synthèse annuelle met en évidence cette même évolution : au cours de l'année 1, 8 483,33 $ de capital et 11 769,23 $ d'intérêts sont réglés, alors qu'à l'année 12, le capital remboursé s'élève à 16 386,52 $ pour seulement 3 866,04 $ d'intérêts.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Que Contient un Tableau d'Amortissement ?
          </h2>
          <p>
            Un tableau d'amortissement mensuel retrace la trajectoire complète du crédit jusqu'à l'extinction totale de la dette. Chaque ligne contient le numéro ou la date de l'échéance, le solde initial, la mensualité due, la part de capital, la part d'intérêts, les versements anticipés éventuels, le solde résiduel et les totaux cumulés. Le tableau annuel constitue une agrégation exacte des mois correspondants.
          </p>
          <p>
            Dans notre cas type, le mois 1 débute avec 200 000,00 $, génère 1 000,00 $ d'intérêts, affecte 687,71 $ au capital et se termine à 199 312,29 $. Le mois 2 démarre sur cette nouvelle base, produisant 996,56 $ d'intérêts et 691,15 $ d'amortissement. À la fin de la 15e année, le solde final atteint rigoureusement 0,00 $ avec 200 000,00 $ de capital remboursé.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Total des Intérêts et Décaissement Cumulé
          </h2>
          <p>
            Le total des intérêts correspond à la somme arithmétique de tous les intérêts échus sur la durée du crédit. Le capital total équivaut au montant initialement prêté sous condition d'un respect scrupuleux de l'échéancier. Le décaissement total de base est la somme exacte du capital et des intérêts.
          </p>
          <p>
            Dans les offres de prêt réelles, les mensualités effectives peuvent inclure l'assurance emprunteur, les taxes foncières en séquestre et divers frais annexes. La valeur de 1 687,71 $ issue de notre exemple modélise le service de la dette (P&amp;I), socle financier auquel s'ajoutent les charges accessoires de l'opération immobilière.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Impact de la Durée sur la Mensualité et le Coût Global
          </h2>
          <p>
            La durée est l'un des paramètres les plus déterminants d'un crédit. À capital et taux constants, allonger la durée réduit la mensualité exigée car le remboursement est réparti sur un plus grand nombre de mois. En contrepartie, le capital restant dû génère des intérêts pendant plus longtemps, ce qui accroît très nettement le coût total du crédit. À l'inverse, raccourcir la durée augmente la mensualité mais permet de solder la dette bien plus vite en réalisant des économies massives d'intérêts.
          </p>
          <p>
            En comparant les options avec notre{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculateur de Prêt
            </Link>
            , il convient de trouver l'équilibre adapté entre confort budgétaire mensuel et coût financier global sur le long terme.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Que se Passe-t-il lors de Versements Mensuels Supplémentaires ?
          </h2>
          <p>
            Un versement mensuel supplémentaire réduit le capital restant dû plus rapidement que prévu dans l'échéancier de base. Le capital diminuant plus vite, les intérêts des mois suivants sont calculés sur une base réduite, ce qui permet d'éteindre le prêt plus tôt et d'économiser sur le coût total. Dans notre modèle, le montant extra est affecté à 100 % au désendettement direct.
          </p>
          <p>
            Dans le cas vérifié, ajouter 100 $ par mois raccourcit significativement le terme et génère des économies d'intérêts substantielles. Vous pouvez aussi étudier des stratégies d'optimisation sur notre{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculateur de Rachat de Crédit
            </Link>
            .
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Versements Annuels Extraordinaires et Remboursements Ponctuels
          </h2>
          <p>
            Un emprunteur peut accélérer son remboursement au moyen de versements supplémentaires récurrents ou ponctuels. Un versement annuel représente une injection de capital à un mois fixe de chaque année, tandis qu'un versement ponctuel constitue un apport unique à une date choisie.
          </p>
          <p>
            Le facteur temps est déterminant : un apport de 5 000 $ réalisé au premier mois a un impact supérieur au même montant versé à la 10e année, car le capital remboursé cesse de produire des intérêts pendant un nombre beaucoup plus grand d'échéances. Dans l'exemple type, un apport annuel de 1 200 $ dès la première année permet d'économiser environ 10 131,78 $ d'intérêts et de solder l'emprunt en 164 mois au lieu de 180.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Versements Extras à Démarrage Différé et Importance du Calendrier
          </h2>
          <p>
            Le simulateur permet de définir le mois et l'année de début des versements supplémentaires, offrant la possibilité de modéliser des stratégies débutant dans le futur (par exemple après la fin d'un autre crédit ou suite à une progression de revenus).
          </p>
          <p>
            Le modèle conserve le rythme standard sur les périodes initiales et active le remboursement accéléré précisément à la date stipulée, illustrant avec rigueur l'impact d'un démarrage immédiat ou différé.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Prêts à Taux Zéro (0 % APR) et Cas Particuliers
          </h2>
          <p>
            La formule classique d'annuité comportant une division par le taux d'intérêt périodique, un taux de 0 % provoquerait une indétermination mathématique. L'algorithme détecte automatiquement le cas à taux zéro et calcule la mensualité en divisant simplement le capital par le nombre total d'échéances (ex. 120 000 $ sur 120 mois = 1 000,00 $ / mois et 0 $ d'intérêts).
          </p>
          <p>
            De plus, le moteur gère avec rigueur les cas de figures limites (montants fractionnaires, durées longues, taux élevés, versements extras supérieurs au solde restant), garantissant que le solde final atteigne 0,00 $ sans jamais devenir négatif.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Amortissement Classique vs. In Fine, Amortissement Négatif et Taux Révisable
          </h2>
          <p>
            Cet outil modélise un prêt amortissable classique à taux fixe. Dans un crédit « in fine » (interest-only), les mensualités ne couvrent que les intérêts et le capital est remboursé en une fois à l'échéance finale ; dans un schéma d'amortissement négatif, les mensualités sont inférieures aux intérêts échus, ce qui augmente le solde de la dette au lieu de le réduire.
          </p>
          <p>
            Les prêts à taux révisable obéissent à des règles de révision périodique basées sur des indices de marché et des marges bancaires. Pour analyser un prêt à taux variable, il convient d'utiliser un outil modélisant spécifiquement les réajustements de taux et les plafonds contractuels.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Ce qui Compose une Mensualité Immobilière Réelle
          </h2>
          <p>
            Un calculateur d'amortissement isole le capital et les intérêts. Une mensualité bancaire réelle peut intégrer les taxes foncières, l'assurance habitation, l'assurance emprunteur (PMI) et les charges de copropriété.
          </p>
          <p>
            Pour évaluer les taux effectifs globaux et les montants d'échéance, vous pouvez également consulter notre{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculateur de Taux d'Intérêt
            </Link>{" "}
            et notre{" "}
            <Link href="/calculators/emi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculateur EMI
            </Link>
            .
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Comment est Déterminée la Date de Fin du Prêt
          </h2>
          <p>
            La date d'extinction du crédit découle du mois et de l'année de départ combinés au nombre total de mensualités nécessaires pour ramener le solde à zéro. Dans l'exemple de base débutant en août 2026 avec 180 mensualités, la dette s'éteint en juillet 2041.
          </p>
          <p>
            L'ajout de versements anticipés réduit le nombre d'échéances et avance la date de clôture, matérialisant immédiatement le gain de temps obtenu grâce aux remboursements supplémentaires.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Lecture des Graphiques et de la Synthèse Annuelle
          </h2>
          <p>
            Les graphiques interactifs offrent une représentation visuelle immédiate de l'équilibre entre capital et intérêts. Dans notre cas de référence, 65,8 % des montants versés correspondent au remboursement du capital et 34,2 % aux intérêts cumulés.
          </p>
          <p>
            Le tableau annuel synthétise les 180 mensualités en 15 lignes claires, permettant de suivre l'évolution annuelle du désendettement sans devoir faire défiler des centaines de lignes mensuelles.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Exportation et Audit du Tableau d'Amortissement
          </h2>
          <p>
            La plateforme intègre des fonctions de recherche, de tri et d'exportation vers les formats CSV, Excel, PDF ou impression papier. L'exportation conserve rigoureusement les valeurs calculées sans recourir à des formules approchées.
          </p>
          <p>
            Pour auditer l'échéancier, vérifiez que chaque ligne respecte la relation mensualité = capital + intérêts, que le solde initial correspond au solde final précédent et que la dernière échéance clôture le prêt à 0,00 $.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Utilisation du Simulateur Avant de Souscrire un Prêt
          </h2>
          <p>
            Utilisez ce calculateur comme un outil d'analyse prospective avant toute décision financière. Saisissez les données de l'offre de votre banque, testez des durées alternatives et mesurez la faisabilité de versements anticipés.
          </p>
          <p>
            Pour évaluer des financements à la consommation non immobiliers, vous pouvez également utiliser notre{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculateur de Prêt Personnel
            </Link>
            .
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Méthodologie de Calcul et Avertissement Légal
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Méthodologie et Hypothèses du Modèle
              </div>
              <p>
                Méthodologie fondamentale : conversion du taux nominal annuel en taux mensuel (r = APR / 1200), calcul de la durée en mois (n = années &times; 12 + mois), détermination de l'annuité constante et génération itérative de l'échéancier avec calcul des intérêts sur le capital restant dû. Les remboursements anticipés sont imputés au capital selon les dates définies et le dernier terme est ajusté pour solder exactement la dette.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Avertissement Légal et Confidentialité
              </div>
              <p>
                Cet outil est proposé à des fins purement informatives et pédagogiques. Il ne constitue ni une offre de crédit contractuelle, ni un conseil juridique, fiscal ou financier. Vérifiez systématiquement les conditions générales et particulières auprès de votre banque ou de votre conseiller financier qualifié.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. FOIRE AUX QUESTIONS (12 QUESTIONS) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Foire Aux Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FRENCH_AMORTIZATION_FAQS.map((faq, idx) => {
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
}

export default FrenchAmortizationContent;
