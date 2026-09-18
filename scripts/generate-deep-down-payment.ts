import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface DownPaymentTexts {
  title: string;
  metaDesc: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  pIntro: string;
  sec1_h2: string;
  sec1_p: string;
  sec1_boxTitle: string;
  sec1_f1_title: string;
  sec1_f1: string;
  sec1_f2_title: string;
  sec1_f2: string;
  sec1_f3_title: string;
  sec1_f3: string;
  sec2_h2: string;
  sec2_p: string;
  sec2_card1_h3: string;
  sec2_card1_p: string;
  sec2_card2_h3: string;
  sec2_card2_p: string;
  sec2_card3_h3: string;
  sec2_card3_p: string;
  sec3_h2: string;
  sec3_p: string;
  sec3_pros_h3: string;
  sec3_pros: string[];
  sec3_cons_h3: string;
  sec3_cons: string[];
  sec4_h2: string;
  sec4_tableHeaders: string[];
  sec4_tableRows: { prog: string; minDown: string; minScore: string; pmi: string; fee: string }[];
  sec5_h2: string;
  sec5_p: string;
  sec5_card1_h3: string;
  sec5_card1_p: string;
  sec5_card2_h3: string;
  sec5_card2_p: string;
  sec6_h2: string;
  sec6_p: string;
  sec6_items: string[];
  sec7_h2: string;
  sec7_p: string;
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const DP_DATA: Record<typeof LOCALES[number], DownPaymentTexts> = {
  es: {
    title: "Calculadora de Pago Inicial (Entrada Hipotecaria)",
    metaDesc: "Calcule la entrada requerida para comprar vivienda, comparativa de cuotas con 3%, 5%, 10% y 20%, eliminación del seguro PMI y costes de cierre.",
    keywords: ["calculadora de pago inicial", "entrada hipoteca", "calculadora pmi", "cuanto pagar de entrada"],
    faqs: [
      { question: "¿Cuánto debería aportar de entrada para comprar una casa?", answer: "Depende de sus ahorros y del tipo de préstamo; la mayoría de los compradores aportan entre el 3% y el 20% del precio de compra." },
      { question: "¿Es obligatorio aportar el 20% de entrada para comprar una vivienda?", answer: "No, la mayoría de los préstamos convencionales y respaldados por el gobierno permiten entradas de entre el 0% y el 5%." },
      { question: "¿Cómo influye el pago inicial en la cuota mensual de la hipoteca?", answer: "Una mayor entrada reduce el principal del préstamo, el interés acumulado y elimina o reduce la prima del seguro PMI." },
      { question: "¿Cómo afecta la entrada al seguro hipotecario privado (PMI)?", answer: "Con una entrada inferior al 20%, se requiere PMI hasta que el capital acumulado alcance al menos el 20% del valor de la vivienda." },
      { question: "¿Cuánto dinero en efectivo necesito al cierre además de la entrada?", answer: "Debe prever entre un 2% y un 5% adicional sobre el precio del inmueble para cubrir los costes de cierre e impuestos." },
      { question: "¿Es posible comprar una casa con un 0% de entrada?", answer: "Sí, mediante programas especializados como los préstamos VA (para veteranos) o préstamos USDA (para zonas rurales elegibles)." },
      { question: "¿Cuál es la diferencia entre dar un 3%, 5%, 10% o 20% de entrada?", answer: "A menor entrada, mayor es el préstamo mensual y el coste de PMI, pero se preserva liquidez para emergencias e inversiones." },
      { question: "¿Conviene dar más entrada o invertir el dinero extra?", answer: "Depende de la comparación entre el tipo de interés hipotecario neto y el rendimiento esperado de sus inversiones alternativas." },
      { question: "¿Cómo se calcula el PMI y cuándo puede eliminarse?", answer: "Cuesta entre el 0.3% y el 1.5% anual del préstamo y puede solicitarse su cancelación al 80% de LTV o automáticamente al 78% de LTV." },
      { question: "¿Qué es el ratio préstamo-valor (LTV)?", answer: "Es el importe total del préstamo dividido entre el valor tasado de la propiedad expresado en porcentaje." },
      { question: "¿Se pueden utilizar donaciones o ayudas familiares para el pago inicial?", answer: "Sí, la mayoría de los programas admiten fondos donados siempre que se documenten con una carta de donación formal." },
      { question: "¿Cuánto tiempo me llevará ahorrar para el pago inicial?", answer: "El tiempo depende de sus ingresos netos, tasa de ahorro mensual y el precio objetivo de la vivienda." }
    ],
    pIntro: "Guía completa para calcular la entrada de su vivienda, requisitos mínimos por programa hipotecario, eliminación de PMI al 78% de LTV y desglose de costes de cierre.",
    sec1_h2: "1. ¿Qué es el Pago Inicial y Cómo Funciona?",
    sec1_p: "El pago inicial (o entrada) es la aportación en efectivo que realiza el comprador al adquirir un inmueble. La cantidad restante se financia mediante un préstamo hipotecario garantizado por la propiedad. La entrada determina directamente el ratio préstamo-valor (LTV) y la cuantía de las cuotas mensuales.",
    sec1_boxTitle: "Fórmulas Principales del Pago Inicial Hipotecario",
    sec1_f1_title: "1. Importe del Pago Inicial ($):",
    sec1_f1: "Pago Inicial = Precio de Compra (P) × (% Entrada / 100)",
    sec1_f2_title: "2. Capital del Préstamo Financiado ($):",
    sec1_f2: "Importe del Préstamo = Precio de Compra - Pago Inicial",
    sec1_f3_title: "3. Total Efectivo Necesario al Cierre ($):",
    sec1_f3: "Efectivo al Cierre = Pago Inicial + Costes de Cierre (2% - 5%)",
    sec2_h2: "2. ¿Cuánto Pago Inicial Necesita Realmente?",
    sec2_p: "El porcentaje exigido varía según el tipo de programa de préstamo hipotecario y su perfil financiero :",
    sec2_card1_h3: "0% de Entrada",
    sec2_card1_p: "Disponible mediante programas respaldados por el gobierno como los préstamos VA (veteranos y militares) y préstamos USDA (zonas rurales elegibles).",
    sec2_card2_h3: "3% – 3.5% de Entrada",
    sec2_card2_p: "Los programas Convencionales 97 exigen un 3% para primeros compradores con score 620+. Los préstamos FHA requieren un 3.5% con score 580+.",
    sec2_card3_h3: "20% de Entrada",
    sec2_card3_p: "El umbral estándar para eliminar el seguro hipotecario privado (PMI) en préstamos convencionales y reducir al mínimo el gasto en intereses.",
    sec3_h2: "3. El Mito del 20% de Entrada frente a la Realidad",
    sec3_p: "Aportar el 20% elimina el PMI, pero esperar años para ahorrar esa cantidad puede implicar costes de oportunidad respecto a la evolución del mercado :",
    sec3_pros_h3: "Ventajas de Aportar el 20% de Entrada",
    sec3_pros: [
      "Ahorro inmediato de 100 $ a 300 $/mes al no pagar seguro PMI.",
      "Cuota mensual de capital e intereses sustancialmente más baja.",
      "Menor coste total de intereses a lo largo de toda la vida del préstamo.",
      "Oferta de compra más competitiva y atractiva para los vendedores."
    ],
    sec3_cons_h3: "Inconvenientes y Costes de Oportunidad",
    sec3_cons: [
      "Agotamiento de las reservas de efectivo y del fondo de emergencia familiar.",
      "Retrasar la compra mientras se ahorra expone a subidas de precios en el mercado.",
      "Coste de oportunidad de inmovilizar capital en lugar de diversificarlo en inversiones."
    ],
    sec4_h2: "4. Programas Hipotecarios y Requisitos Mínimos de Entrada",
    sec4_tableHeaders: ["Programa de Préstamo", "Entrada Mínima %", "Score Mínimo", "Reglas del Seguro PMI", "Comisión Inicial"],
    sec4_tableRows: [
      { prog: "Convencional 97", minDown: "3.0%", minScore: "620", pmi: "Se cancela al 78%–80% LTV", fee: "0 $" },
      { prog: "Préstamo FHA", minDown: "3.5%", minScore: "580", pmi: "Durante toda la vida (<10% entrada)", fee: "1.75% UFMIP" },
      { prog: "Préstamo VA (Veteranos)", minDown: "0.0%", minScore: "580+", pmi: "0 $ PMI Mensual", fee: "1.4%–2.15% Tasa de Financiación" },
      { prog: "USDA Rural", minDown: "0.0%", minScore: "640", pmi: "0.35% Garantía Anual", fee: "1.0% Comisión Inicial" }
    ],
    sec5_h2: "5. Seguro Hipotecario Privado (PMI) y Cómo Eliminarlo (80% vs. 78% LTV)",
    sec5_p: "La Ley Federal de Protección de Propietarios de Vivienda (HPA de 1998) regula la cancelación del seguro PMI en préstamos convencionales :",
    sec5_card1_h3: "Cancelación a Petición del Prestatario al 80% LTV",
    sec5_card1_p: "Cuando el saldo del préstamo baje al 80% del valor de compra original, tiene derecho a solicitar la cancelación del PMI por escrito.",
    sec5_card2_h3: "Terminación Automática Obligatoria al 78% LTV",
    sec5_card2_p: "Los prestamistas están obligados por ley a cancelar el PMI de forma automática una vez que el saldo alcance el 78% del valor original según el cuadro de amortización.",
    sec6_h2: "6. Programas de Asistencia para el Pago Inicial (DPA)",
    sec6_p: "Existen múltiples programas estatales, del condado y municipales para apoyar a compradores calificados :",
    sec6_items: [
      "Subvenciones a Fondo Perdido (Grants): Fondos que no requieren devolución.",
      "Segundas Hipotecas Condonables: Préstamos al 0% perdonados tras residir en la vivienda de 3 a 5 años.",
      "Préstamos de Pago Diferido: Créditos secundarios con 0% de interés a pagar al vender o refinanciar."
    ],
    sec7_h2: "7. Resumen Educativo",
    sec7_p: "Comprender los requisitos de entrada, los umbrales de eliminación del PMI, los costes de cierre y los costes de oportunidad permite a los compradores diseñar una estrategia equilibrada y ajustada a sus objetivos financieros.",
    overlayInputs: {
      homePrice: "Precio de Compra de la Vivienda",
      downPaymentPercent: "Porcentaje de Pago Inicial (%)",
      downPaymentAmount: "Importe del Pago Inicial ($)",
      interestRate: "Tipo de Interés Anual (%)",
      loanTermYears: "Plazo del Préstamo (Años)",
      propertyTaxRate: "Impuesto sobre Bienes Inmuebles (%)",
      homeInsuranceAnnual: "Seguro de Hogar Anual ($)",
      pmiRate: "Tasa de Seguro PMI (%)",
      closingCostPercent: "Costes de Cierre Estimados (%)"
    },
    overlayOutputs: {
      loanAmount: "Importe Total del Préstamo",
      monthlyPrincipalInterest: "Cuota Mensual (Capital + Interés)",
      monthlyPmi: "Cuota Mensual de PMI",
      totalMonthlyPayment: "Pago Mensual Total Estimado",
      cashToClose: "Total Efectivo Necesario al Cierre",
      pmiDropOffMonth: "Mes de Cancelación del PMI",
      totalLifetimeInterest: "Intereses Totales Financiados"
    }
  },
  fr: {
    title: "Calculateur de Mise de Fonds (Apport Personnel)",
    metaDesc: "Calculez la mise de fonds requise, comparez les mensualités avec 3%, 5%, 10% et 20%, l'annulation de l'assurance PMI et les frais de clôture.",
    keywords: ["calculateur mise de fonds", "apport personnel hypotheque", "calcul assurance pmi", "montant apport immobilier"],
    faqs: [
      { question: "Combien devrais-je verser comme mise de fonds ?", answer: "Cela dépend de votre épargne et du type de prêt; la majorité des acheteurs versent entre 3 % et 20 % du prix d'achat." },
      { question: "La mise de fonds de 20 % est-elle obligatoire ?", answer: "Non, la plupart des programmes conventionnels et gouvernementaux autorisent des apports dès 0 % à 5 %." },
      { question: "Comment la mise de fonds influence-t-elle la mensualité ?", answer: "Un apport supérieur réduit le capital emprunté, les intérêts totaux et supprime l'assurance hypothécaire (PMI)." },
      { question: "Qu'est-ce que l'assurance hypothécaire privée (PMI) ?", answer: "Avec un apport inférieur à 20 %, une prime d'assurance est exigée pour protéger le prêteur en cas de défaut." },
      { question: "Quels liquidités faut-il prévoir pour les frais de clôture ?", answer: "Il faut prévoir entre 2 % et 5 % supplémentaires du prix du bien pour les frais de notaire et d'enregistrement." },
      { question: "Peut-on acheter sans mise de fonds (0 %) ?", answer: "Oui, grâce à des programmes spécifiques comme les prêts VA (militaires/vétérans) ou USDA (zones rurales)." },
      { question: "Quelle différence entre 3 %, 5 %, 10 % ou 20 % d'apport ?", answer: "Moins d'apport signifie des mensualités plus élevées, mais préserve des liquidités pour d'autres investissements." },
      { question: "Vaut-il mieux augmenter l'apport ou investir son épargne ?", answer: "Comparez le taux hypothécaire net au rendement espéré sur vos placements diversifiés." },
      { question: "Comment est calculée l'assurance PMI et quand s'annule-t-elle ?", answer: "Elle coûte 0.3 % à 1.5 % par an et s'annule sur demande à 80 % de LTV ou automatiquement à 78 % de LTV." },
      { question: "Qu'est-ce que le ratio prêt-valeur (LTV) ?", answer: "C'est le montant emprunté divisé par la valeur marchande du bien exprimé en pourcentage." },
      { question: "Peut-on utiliser des dons familiaux pour la mise de fonds ?", answer: "Oui, la majorité des programmes acceptent les dons familiaux accompagnés d'une attestation formelle." },
      { question: "Combien de temps faut-il pour épargner la mise de fonds ?", answer: "Cela dépend de vos revenus nets, de votre taux d'épargne mensuel et du prix cible de la propriété." }
    ],
    pIntro: "Guide exhaustif pour calculer votre mise de fonds immobilière, les exigences minimales par programme, la suppression du PMI à 78 % de LTV et les liquidités requises.",
    sec1_h2: "1. Qu'est-ce qu'une Mise de Fonds et Comment Fonctionne-t-elle ?",
    sec1_p: "La mise de fonds (apport personnel) est la somme en espèces versée par l'acheteur lors de l'acquisition d'un bien immobilier. Le solde restant est financé par un prêt hypothécaire garanti par le bien. L'apport détermine directement le ratio prêt-valeur (LTV) et le coût des mensualités.",
    sec1_boxTitle: "Formules Fondamentales de la Mise de Fonds",
    sec1_f1_title: "1. Montant de la Mise de Fonds ($) :",
    sec1_f1: "Mise de Fonds = Prix d'Achat (P) × (% Apport / 100)",
    sec1_f2_title: "2. Capital Emprunté Financé ($) :",
    sec1_f2: "Montant du Prêt = Prix d'Achat - Mise de Fonds",
    sec1_f3_title: "3. Liquidités Totales Nécessaires à la Clôture ($) :",
    sec1_f3: "Liquidités Requises = Mise de Fonds + Frais de Clôture (2 % - 5 %)",
    sec2_h2: "2. Quelle Mise de Fonds Vous Faut-il Réellement ?",
    sec2_p: "Le pourcentage minimum requis dépend du programme de crédit hypothécaire sélectionné :",
    sec2_card1_h3: "0 % de Mise de Fonds",
    sec2_card1_p: "Accessible via les programmes garantis par l'État tels que les prêts VA (vétérans et militaires) et les prêts USDA (zones rurales éligibles).",
    sec2_card2_h3: "3 % – 3.5 % de Mise de Fonds",
    sec2_card2_p: "Les programmes Conventionnels 97 requièrent 3 % pour les premiers acheteurs (score 620+). Les prêts FHA exigent 3.5 % (score 580+).",
    sec2_card3_h3: "20 % de Mise de Fonds",
    sec2_card3_p: "Le seuil standard permettant de supprimer l'assurance hypothécaire privée (PMI) et de minimiser le coût global des intérêts.",
    sec3_h2: "3. Le Mythe des 20 % d'Apport face à la Réalité",
    sec3_p: "Un apport de 20 % élimine le PMI, mais attendre plusieurs années pour l'épargner peut comporter des coûts d'opportunité majeurs :",
    sec3_pros_h3: "Avantages d'un Apport de 20 %",
    sec3_pros: [
      "Économie immédiate de 100 $ à 300 $/mois en supprimant l'assurance PMI.",
      "Mensualités de capital et d'intérêts nettement plus faibles.",
      "Coût cumulé d'intérêts réduit sur la durée totale du financement.",
      "Offre d'achat plus solide et attractive pour les vendeurs."
    ],
    sec3_cons_h3: "Inconvénients et Coûts d'Opportunité",
    sec3_cons: [
      "Épuisement des réserves de liquidités et du fonds de sécurité familiale.",
      "Retarder l'achat expose aux augmentations des prix immobiliers.",
      "Coût d'opportunité d'immobiliser un capital qui pourrait être investi sur d'autres marchés."
    ],
    sec4_h2: "4. Comparatif des Programmes Hypothécaires et Apports Minimaux",
    sec4_tableHeaders: ["Programme de Prêt", "Mise de Fonds Min %", "Score Min", "Règles d'Assurance PMI", "Frais Initiaux"],
    sec4_tableRows: [
      { prog: "Conventionnel 97", minDown: "3.0%", minScore: "620", pmi: "S'annule à 78 %–80 % LTV", fee: "0 $" },
      { prog: "Prêt FHA", minDown: "3.5%", minScore: "580", pmi: "Durée totale du prêt (<10 % apport)", fee: "1.75 % UFMIP" },
      { prog: "Prêt VA (Militaires)", minDown: "0.0%", minScore: "580+", pmi: "0 $ de PMI Mensuel", fee: "1.4 %–2.15 % Droits de Financement" },
      { prog: "USDA Rural", minDown: "0.0%", minScore: "640", pmi: "0.35 % Garantie Annuelle", fee: "1.0 % Frais de Garantie" }
    ],
    sec5_h2: "5. Assurance Hypothécaire Privée (PMI) et Suppression (80 % vs 78 % LTV)",
    sec5_p: "La loi fédérale (Homeowners Protection Act de 1998) encadre la résiliation obligatoire du PMI :",
    sec5_card1_h3: "Annulation sur Demande à 80 % LTV",
    sec5_card1_p: "Dès que le solde de votre prêt atteint 80 % du prix d'achat initial, vous avez le droit légal de demander la résiliation écrite du PMI.",
    sec5_card2_h3: "Résiliation Automatique Obligatoire à 78 % LTV",
    sec5_card2_p: "Le prêteur est légalement tenu d'annuler automatiquement le PMI dès que le solde atteint 78 % de la valeur initiale selon le tableau d'amortissement.",
    sec6_h2: "6. Programmes d'Aide à la Mise de Fonds (DPA)",
    sec6_p: "De nombreuses aides publiques soutiennent les acheteurs qualifiés :",
    sec6_items: [
      "Subventions directes (Grants) : Fonds sans obligation de remboursement.",
      "Prêts secondaires remboursables sous conditions : Prêts à 0 % annulés après 3 à 5 ans de résidence.",
      "Prêts à remboursement différé : Prêts à 0 % remboursés lors de la revente du bien."
    ],
    sec7_h2: "7. Synthèse Pédagogique",
    sec7_p: "Maîtriser les critères d'apport, les seuils de fin de PMI et les frais annexes permet de définir une stratégie d'achat performante et équilibrée.",
    overlayInputs: {
      homePrice: "Prix d'Achat du Bien Immobilier",
      downPaymentPercent: "Pourcentage de Mise de Fonds (%)",
      downPaymentAmount: "Montant de la Mise de Fonds ($)",
      interestRate: "Taux d'Intérêt Annuel (%)",
      loanTermYears: "Durée du Prêt (Années)",
      propertyTaxRate: "Taux de Taxe Foncière (%)",
      homeInsuranceAnnual: "Assurance Habitation Annuelle ($)",
      pmiRate: "Taux d'Assurance PMI (%)",
      closingCostPercent: "Frais de Clôture Estimés (%)"
    },
    overlayOutputs: {
      loanAmount: "Montant Total Emprunté",
      monthlyPrincipalInterest: "Mensualité (Capital + Intérêts)",
      monthlyPmi: "Assurance PMI Mensuelle",
      totalMonthlyPayment: "Paiement Mensuel Total Estimé",
      cashToClose: "Liquidités Requises à la Clôture",
      pmiDropOffMonth: "Mois de Suppression du PMI",
      totalLifetimeInterest: "Total des Intérêts Financés"
    }
  },
  de: {
    title: "Eigenkapital- und Anzahlungsrechner für Immobilien",
    metaDesc: "Berechnen Sie das benötigte Eigenkapital für den Immobilienkauf, Monatsraten bei 3%, 5%, 10% und 20% Anzahlung, PMI-Wegfall und Kaufnebenkosten.",
    keywords: ["anzahlung rechner immobilie", "eigenkapital rechner", "pmi versicherung rechner", "kaufnebenkosten immobilie"],
    faqs: [
      { question: "Wie viel Eigenkapital sollte man beim Hauskauf einbringen?", answer: "Üblicherweise zwischen 10 % und 20 % des Kaufpreises zuzüglich der anfallenden Kaufnebenkosten." },
      { question: "Sind 20 % Eigenkapital zwingend vorgeschrieben?", answer: "Nein, viele Förder- und Standardprogramme gestatten Eigenkapitalquoten ab 0 % bis 5 %." },
      { question: "Wie beeinflusst die Anzahlung die monatliche Rate?", answer: "Ein höherer Eigenkapitaleinsatz senkt das Darlehensvolumen, die Zinskosten und erspart teure Kreditversicherungen (PMI)." },
      { question: "Was ist eine Private Mortgage Insurance (PMI)?", answer: "Eine Restschuldversicherung, die bei weniger als 20 % Eigenkapital die Bank gegen Kreditausfall absichert." },
      { question: "Welche Kaufnebenkosten fallen zusätzlich an?", answer: "Rund 2 % bis 5 % des Kaufpreises für Notar, Grunderwerbsteuer, Grundbucheintrag und Wertermittlung." },
      { question: "Kann man eine Immobilie mit 0 % Anzahlung kaufen?", answer: "Ja, über staatliche Sonderprogramme wie VA-Darlehen (für Militärangehörige) oder USDA-Darlehen (ländlicher Raum)." },
      { question: "Welcher Unterschied besteht zwischen 3 %, 5 %, 10 % oder 20 % Anzahlung?", answer: "Weniger Eigenkapital bedeutet höhere Monatsraten, schont jedoch die Liquiditätsreserven für Notfälle." },
      { question: "Ist mehr Eigenkapital immer wirtschaftlich sinnvoll?", answer: "Vergleichen Sie den Kreditzins mit der erwarteten Rendite alternativer Kapitalanlagen." },
      { question: "Wann entfällt die PMI-Versicherung?", answer: "Auf Antrag bei 80 % Beleihungsauslauf (LTV) oder automatisch bei 78 % LTV laut Tilgungsplan." },
      { question: "Was bedeutet der Beleihungsauslauf (LTV)?", answer: "Das Verhältnis des Darlehensbetrags zum Verkehrswert der Immobilie in Prozent." },
      { question: "Dürfen Schenkungen als Eigenkapital eingesetzt werden?", answer: "Ja, sofern die Schenkung formell durch eine Schenkungsurkunde nachgewiesen wird." },
      { question: "Wie lange dauert das Ansparen des Eigenkapitals?", answer: "Abhängig von Nettoeinkommen, monatlicher Sparquote und Zielkaufpreis." }
    ],
    pIntro: "Umfassender Leitfaden zur Berechnung des Eigenkapitalbedarfs, Mindestanforderungen nach Kreditprogramm, automatischem PMI-Wegfall bei 78 % LTV und Kaufnebenkosten.",
    sec1_h2: "1. Was ist eine Anzahlung (Eigenkapital) und wie funktioniert sie?",
    sec1_p: "Die Anzahlung ist der Barbetrag, den der Käufer aus eigenen Mitteln zur Finanzierung des Immobilienkaufs beisteuert. Der Restbetrag wird über ein grundbuchlich besichertes Hypothekendarlehen finanziert. Die Anzahlung bestimmt maßgeblich den Beleihungsauslauf (LTV) und die Monatsrate.",
    sec1_boxTitle: "Zentrale Formeln für Eigenkapital und Anzahlung",
    sec1_f1_title: "1. Anzahlungsbetrag ($) :",
    sec1_f1: "Anzahlung = Kaufpreis (P) × (Anzahlung % / 100)",
    sec1_f2_title: "2. Finanziertes Darlehensvolumen ($) :",
    sec1_f2: "Darlehensbetrag = Kaufpreis - Anzahlung",
    sec1_f3_title: "3. Gesamter Liquiditätsbedarf bei Kaufabschluss ($) :",
    sec1_f3: "Barmittelbedarf = Anzahlung + Kaufnebenkosten (2 % - 5 %)",
    sec2_h2: "2. Wie viel Eigenkapital benötigen Sie wirklich?",
    sec2_p: "Die geforderte Mindesteigenkapitalquote richtet sich nach dem jeweiligen Darlehensprogramm :",
    sec2_card1_h3: "0 % Anzahlung",
    sec2_card1_p: "Möglich über staatliche Programme wie VA-Darlehen (Veteranen und Soldaten) oder USDA-Förderungen im ländlichen Raum.",
    sec2_card2_h3: "3 % – 3.5 % Anzahlung",
    sec2_card2_p: "Conventional-97-Programme fordern 3 % für Erstkäufer (Score 620+). FHA-Kredite verlangen 3.5 % (Score 580+).",
    sec2_card3_h3: "20 % Anzahlung",
    sec2_card3_p: "Die Standardgrenze zur vollständigen Vermeidung von PMI-Versicherungsprämien und zur Minimierung der Zinskosten.",
    sec3_h2: "3. Der 20 %-Eigenkapital-Mythos im Realitätscheck",
    sec3_p: "20 % Anzahlung erspart die PMI-Prämie, doch jahrelanges Ansparen birgt erhebliche Opportunitätskosten :",
    sec3_pros_h3: "Vorteile von 20 % Anzahlung",
    sec3_pros: [
      "Sofortige Ersparnis von 100 $ bis 300 $/Monat durch Wegfall der PMI.",
      "Spürbar niedrigere Monatsrate für Zins und Tilgung.",
      "Geringere Zinsgesamtkosten über die gesamte Vertragslaufzeit.",
      "Bessere Verhandlungsposition beim Immobilienverkäufer."
    ],
    sec3_cons_h3: "Nachteile und Opportunitätskosten",
    sec3_cons: [
      "Vollständiger Verzehr von Liquiditätsreserven und Notfallpuffern.",
      "Kaufverzögerungen setzen Käufer steigenden Immobilienpreisen aus.",
      "Opportunitätskosten durch Bindung von Kapital, das alternativ angelegt werden könnte."
    ],
    sec4_h2: "4. Kreditprogramme und Mindestanforderungen an das Eigenkapital",
    sec4_tableHeaders: ["Kreditprogramm", "Min. Anzahlung %", "Min. Score", "PMI-Regelungen", "Einmalige Gebühr"],
    sec4_tableRows: [
      { prog: "Conventional 97", minDown: "3.0%", minScore: "620", pmi: "Entfällt bei 78 %–80 % LTV", fee: "0 $" },
      { prog: "FHA-Darlehen", minDown: "3.5%", minScore: "580", pmi: "Gesamte Laufzeit (<10 % Anzahlung)", fee: "1.75 % UFMIP" },
      { prog: "VA-Darlehen (Militär)", minDown: "0.0%", minScore: "580+", pmi: "0 $ monatliche PMI", fee: "1.4 %–2.15 % Fördergebühr" },
      { prog: "USDA Rural", minDown: "0.0%", minScore: "640", pmi: "0.35 % Jahresgarantie", fee: "1.0 % Garantiegebühr" }
    ],
    sec5_h2: "5. Private Mortgage Insurance (PMI) und Kündigung (80 % vs. 78 % LTV)",
    sec5_p: "Gesetzliche Vorgaben regeln die Kündigung und den automatischen Wegfall der PMI-Versicherung :",
    sec5_card1_h3: "Kündigung auf Antrag bei 80 % LTV",
    sec5_card1_p: "Erreicht die Restschuld 80 % des ursprünglichen Kaufpreises, haben Sie das Recht auf schriftliche Kündigung der PMI.",
    sec5_card2_h3: "Automatischer Wegfall bei 78 % LTV",
    sec5_card2_p: "Kreditgeber sind gesetzlich verpflichtet, die PMI automatisch einzustellen, sobald die Restschuld 78 % des Ursprungswerts erreicht.",
    sec6_h2: "6. Förderprogramme zur Eigenkapitalunterstützung (DPA)",
    sec6_p: "Zahlreiche öffentliche Programme unterstützen qualifizierte Immobilienkäufer :",
    sec6_items: [
      "Zuschüsse (Grants) : Nicht rückzahlbare Förderbeträge.",
      "Verzinsliche Nachrangdarlehen mit Schuldenerlass nach 3 bis 5 Jahren Eigennutzung.",
      "Zinslose Stundungsdarlehen, die erst bei Wiederverkauf fällig werden."
    ],
    sec7_h2: "7. Pädagogische Zusammenfassung",
    sec7_p: "Die Abwägung zwischen Eigenkapitaleinsatz, PMI-Kosten und Liquiditätsreserve ermöglicht eine maßgeschneiderte Finanzierungsstrategie.",
    overlayInputs: {
      homePrice: "Kaufpreis der Immobilie",
      downPaymentPercent: "Anzahlungsquote in Prozent (%)",
      downPaymentAmount: "Anzahlungsbetrag ($)",
      interestRate: "Sollzinssatz p.a. (%)",
      loanTermYears: "Darlehenslaufzeit (Jahre)",
      propertyTaxRate: "Grundsteuersatz (%)",
      homeInsuranceAnnual: "Jährliche Wohngebäudeversicherung ($)",
      pmiRate: "PMI-Versicherungssatz (%)",
      closingCostPercent: "Geschätzte Kaufnebenkosten (%)"
    },
    overlayOutputs: {
      loanAmount: "Nettodarlehensbetrag",
      monthlyPrincipalInterest: "Monatsrate (Zins + Tilgung)",
      monthlyPmi: "Monatliche PMI-Prämie",
      totalMonthlyPayment: "Geschätzte monatliche Gesamtrate",
      cashToClose: "Gesamter Barmittelbedarf bei Kauf",
      pmiDropOffMonth: "Monat des PMI-Wegfalls",
      totalLifetimeInterest: "Gesamte Zinskosten"
    }
  },
  hi: {
    title: "डाउन पेमेंट कैलकुलेटर (Down Payment Calculator)",
    metaDesc: "घर खरीदने हेतु आवश्यक डाउन पेमेंट, 3%, 5%, 10% और 20% पर किस्तों की तुलना, PMI बीमा समाप्ति और क्लोजिंग लागत की गणना करें।",
    keywords: ["डाउन पेमेंट कैलकुलेटर", "गृह अग्रिम भुगतान", "पीएमआई कैलकुलेटर", "घर की शुरुआती किस्त"],
    faqs: [
      { question: "घर खरीदने के लिए कितना डाउन पेमेंट देना चाहिए?", answer: "यह आपकी बचत पर निर्भर करता है; अधिकांश खरीदार 3% से 20% तक डाउन पेमेंट देते हैं।" },
      { question: "क्या 20% डाउन पेमेंट देना अनिवार्य है?", answer: "नहीं, कई सरकारी और मानक योजनाएं 0% से 5% तक के डाउन पेमेंट की अनुमति देती हैं।" },
      { question: "डाउन पेमेंट से मासिक किस्त पर क्या असर पड़ता है?", answer: "अधिक डाउन पेमेंट से ऋण राशि और कुल ब्याज घटता है तथा PMI बीमा हट जाता है।" },
      { question: "प्राइवेट मॉर्गेज इंश्योरेंस (PMI) क्या है?", answer: "20% से कम डाउन पेमेंट पर बैंक की सुरक्षा के लिए यह बीमा अनिवार्य होता है।" },
      { question: "क्लोजिंग लागत के लिए कितनी अतिरिक्त नकदी चाहिए?", answer: "पंजीकरण और कानूनी शुल्कों के लिए 2% से 5% अतिरिक्त राशि रखनी चाहिए।" },
      { question: "क्या 0% डाउन पेमेंट पर घर खरीदा जा सकता है?", answer: "हाँ, VA और USDA जैसे विशेष सरकारी कार्यक्रमों के माध्यम से।" },
      { question: "3%, 5%, 10% या 20% में क्या अंतर है?", answer: "कम डाउन पेमेंट से मासिक किस्त बढ़ती है लेकिन आपातकालीन नकदी सुरक्षित रहती है।" },
      { question: "क्या अधिक डाउन पेमेंट देना बेहतर है या निवेश करना?", answer: "ऋण ब्याज दर की तुलना अपने निवेश पर मिलने वाले रिटर्न से करें।" },
      { question: "PMI कब समाप्त होता है?", answer: "80% LTV पर अनुरोध द्वारा या 78% LTV पर स्वचालित रूप से समाप्त होता है।" },
      { question: "ऋण-से-मूल्य (LTV) क्या है?", answer: "घर के मूल्य की तुलना में लिए गए ऋण का प्रतिशत।" },
      { question: "क्या उपहार राशि का उपयोग डाउन पेमेंट में हो सकता है?", answer: "हाँ, परिवार द्वारा दिए गए उपहार प्रमाण पत्र के साथ स्वीकार्य हैं।" },
      { question: "डाउन पेमेंट बचाने में कितना समय लगता है?", answer: "यह आपकी मासिक बचत और घर के लक्ष्य मूल्य पर निर्भर करता है।" }
    ],
    pIntro: "घर की खरीद हेतु आवश्यक अग्रिम भुगतान, विभिन्न ऋण कार्यक्रमों की न्यूनतम शर्तें, 78% LTV पर PMI समाप्ति और क्लोजिंग लागत का विस्तृत विश्लेषण।",
    sec1_h2: "1. डाउन पेमेंट क्या है और यह कैसे काम करता है?",
    sec1_p: "डाउन पेमेंट घर खरीदते समय खरीदार द्वारा नकद दी जाने वाली शुरुआती राशि है। शेष राशि को बैंक से मॉर्गेज लोन के रूप में लिया जाता है। डाउन पेमेंट आपकी इक्विटी और LTV अनुपात को निर्धारित करता है।",
    sec1_boxTitle: "डाउन पेमेंट के मुख्य गणितीय सूत्र",
    sec1_f1_title: "1. डाउन पेमेंट राशि ($) :",
    sec1_f1: "डाउन पेमेंट = खरीद मूल्य (P) × (डाउन % / 100)",
    sec1_f2_title: "2. वित्तपोषित ऋण राशि ($) :",
    sec1_f2: "ऋण राशि = खरीद मूल्य - डाउन पेमेंट",
    sec1_f3_title: "3. क्लोजिंग पर कुल आवश्यक नकदी ($) :",
    sec1_f3: "कुल नकदी = डाउन पेमेंट + क्लोजिंग लागत (2% - 5%)",
    sec2_h2: "2. आपको वास्तव में कितने डाउन पेमेंट की आवश्यकता है?",
    sec2_p: "न्यूनतम डाउन पेमेंट ऋण कार्यक्रम के नियमों पर निर्भर करता है :",
    sec2_card1_h3: "0% डाउन पेमेंट",
    sec2_card1_p: "सैन्य कर्मियों के लिए VA ऋण और ग्रामीण क्षेत्रों के लिए USDA ऋण में उपलब्ध।",
    sec2_card2_h3: "3% – 3.5% डाउन पेमेंट",
    sec2_card2_p: "कन्वेंशनल 97 में 3% (स्कोर 620+) और FHA ऋणों में 3.5% (स्कोर 580+) आवश्यक है।",
    sec2_card3_h3: "20% डाउन पेमेंट",
    sec2_card3_p: "PMI बीमा समाप्त करने और ब्याज लागत को न्यूनतम रखने का मानक स्तर।",
    sec3_h2: "3. 20% डाउन पेमेंट का मिथक बनाम वास्तविकता",
    sec3_p: "20% देने से PMI हटता है, लेकिन बचत करने में लगने वाले वर्षों में मकान की कीमतें बढ़ सकती हैं :",
    sec3_pros_h3: "20% डाउन पेमेंट के लाभ",
    sec3_pros: [
      "PMI हटने से प्रति माह 100 $ से 300 $ की तुरंत बचत।",
      "मासिक मूलधन और ब्याज की काफी कम किस्त।",
      "ऋण अवधि के दौरान कुल ब्याज में भारी कमी।",
      "विक्रेता के सामने मजबूत और प्रतिस्पर्धी खरीद प्रस्ताव।"
    ],
    sec3_cons_h3: "नुकसान और अवसर लागत",
    sec3_cons: [
      "आपातकालीन नकदी फंड का समाप्त हो जाना।",
      "बचत करने के दौरान घर की कीमतें बढ़ने का जोखिम।",
      "अन्य लाभदायक निवेशों में पूंजी न लगा पाने की अवसर लागत।"
    ],
    sec4_h2: "4. ऋण कार्यक्रम और न्यूनतम डाउन पेमेंट आवश्यकताएं",
    sec4_tableHeaders: ["ऋण कार्यक्रम", "न्यूनतम डाउन %", "न्यूनतम स्कोर", "PMI बीमा नियम", "अग्रिम शुल्क"],
    sec4_tableRows: [
      { prog: "कन्वेंशनल 97", minDown: "3.0%", minScore: "620", pmi: "78%–80% LTV पर समाप्त", fee: "0 $" },
      { prog: "FHA ऋण", minDown: "3.5%", minScore: "580", pmi: "संपूर्ण ऋण अवधि (<10% डाउन)", fee: "1.75% UFMIP" },
      { prog: "VA ऋण (सैनिक)", minDown: "0.0%", minScore: "580+", pmi: "0 $ मासिक PMI लाभ", fee: "1.4%–2.15% फंडिंग शुल्क" },
      { prog: "USDA ग्रामीण", minDown: "0.0%", minScore: "640", pmi: "0.35% वार्षिक गारंटी", fee: "1.0% गारंटी शुल्क" }
    ],
    sec5_h2: "5. प्राइवेट मॉर्गेज इंश्योरेंस (PMI) समाप्ति नियम (80% बनाम 78% LTV)",
    sec5_p: "गृहस्वामी संरक्षण कानून (HPA 1998) के अनुसार PMI समाप्ति के नियम :",
    sec5_card1_h3: "80% LTV पर खरीदार द्वारा रद्दीकरण अनुरोध",
    sec5_card1_p: "ऋण शेष मूल मूल्य के 80% पर आने पर आप लिखित अनुरोध करके PMI हटा सकते हैं।",
    sec5_card2_h3: "78% LTV पर बैंक द्वारा स्वचालित समाप्ति",
    sec5_card2_p: "परिशोधन तालिका अनुसार 78% पर पहुँचते ही बैंक द्वारा PMI हटाना कानूनी रूप से अनिवार्य है।",
    sec6_h2: "6. डाउन पेमेंट सहायता कार्यक्रम (DPA)",
    sec6_p: "पात्र खरीदारों के लिए विभिन्न सरकारी सहायता योजनाएं उपलब्ध हैं :",
    sec6_items: [
      "अनुदान (Grants) : गैर-वापसी योग्य सहायता राशि।",
      "माफ योग्य दूसरे ऋण : 3 से 5 वर्ष रहने पर माफ होने वाले 0% ऋण।",
      "आस्थगित भुगतान ऋण : घर बेचने पर चुकाए जाने वाले 0% ऋण।"
    ],
    sec7_h2: "7. शैक्षणिक सारांश",
    sec7_p: "डाउन पेमेंट, PMI और क्लोजिंग लागत के संतुलन को समझकर सही वित्तीय रणनीति अपनाएं।",
    overlayInputs: {
      homePrice: "घर का कुल खरीद मूल्य",
      downPaymentPercent: "डाउन पेमेंट प्रतिशत (%)",
      downPaymentAmount: "डाउन पेमेंट राशि ($)",
      interestRate: "वार्षिक ब्याज दर (%)",
      loanTermYears: "ऋण अवधि (वर्ष)",
      propertyTaxRate: "संपत्ति कर दर (%)",
      homeInsuranceAnnual: "वार्षिक गृह बीमा ($)",
      pmiRate: "PMI बीमा दर (%)",
      closingCostPercent: "अनुमानित क्लोजिंग लागत (%)"
    },
    overlayOutputs: {
      loanAmount: "कुल ऋण राशि",
      monthlyPrincipalInterest: "मासिक किस्त (मूलधन + ब्याज)",
      monthlyPmi: "मासिक PMI बीमा",
      totalMonthlyPayment: "कुल अनुमानित मासिक भुगतान",
      cashToClose: "क्लोजिंग पर कुल आवश्यक नकदी",
      pmiDropOffMonth: "PMI समाप्ति का महीना",
      totalLifetimeInterest: "कुल वित्तपोषित ब्याज"
    }
  },
  pt: {
    title: "Calculadora de Entrada Imobiliária (Down Payment)",
    metaDesc: "Calcule a entrada necessária para comprar imóvel, compare parcelas com 3%, 5%, 10% e 20%, eliminação de PMI e custos de fechamento.",
    keywords: ["calculadora de entrada imovel", "entrada financiamento", "calculadora pmi", "quanto dar de entrada"],
    faqs: [
      { question: "Quanto devo dar de entrada para comprar um imóvel?", answer: "Depende da sua reserva financeira; a maioria dos compradores dá entre 3% e 20% do valor do imóvel." },
      { question: "É obrigatório dar 20% de entrada?", answer: "Não, diversos programas convencionais e públicos admitem entradas a partir de 0% a 5%." },
      { question: "Como a entrada afeta o valor da prestação mensal?", answer: "Uma entrada maior reduz o saldo devedor, diminui os juros totais e elimina a taxa de seguro (PMI)." },
      { question: "O que é o Seguro Hipotecário Privado (PMI)?", answer: "Seguro obrigatório cobrado quando a entrada é inferior a 20% para proteger o credor contra inadimplência." },
      { question: "Quanto reservar para custos de fechamento e registro?", answer: "Recomenda-se reservar entre 2% e 5% do valor do bem para impostos (ITBI), escritura e custas." },
      { question: "É possível comprar um imóvel com 0% de entrada?", answer: "Sim, por meio de programas governamentais específicos como empréstimos VA ou USDA." },
      { question: "Qual a diferença entre dar 3%, 5%, 10% ou 20% de entrada?", answer: "Menor entrada significa parcelas maiores, mas preserva liquidez imediata para emergências." },
      { question: "Vale a pena dar mais entrada ou aplicar o dinheiro?", answer: "Compare o custo efetivo do financiamento com o retorno líquido dos seus investimentos." },
      { question: "Quando o seguro PMI pode ser cancelado?", answer: "A pedido ao atingir 80% de LTV ou automaticamente ao atingir 78% de LTV." },
      { question: "O que é a relação empréstimo-valor (LTV)?", answer: "É o percentual financiado em relação ao valor total de avaliação do imóvel." },
      { question: "Pode-se usar doações de familiares para a entrada?", answer: "Sim, desde que devidamente comprovadas por declaração de doação formal." },
      { question: "Quanto tempo leva para juntar a entrada?", answer: "Depende da sua renda líquida, da capacidade de poupança mensal e do valor do imóvel." }
    ],
    pIntro: "Guia completo sobre entrada imobiliária, requisitos mínimos por tipo de financiamento, cancelamento de seguro PMI a 78% de LTV e custos de fechamento.",
    sec1_h2: "1. O que é a Entrada Imobiliária e Como Funciona?",
    sec1_p: "A entrada é o montante em dinheiro pago pelo comprador com recursos próprios no ato da compra. O saldo remanescente é financiado por meio de crédito imobiliário com garantia do imóvel. A entrada define o índice empréstimo-valor (LTV) e o valor das parcelas mensais.",
    sec1_boxTitle: "Fórmulas Fundamentais da Entrada Imobiliária",
    sec1_f1_title: "1. Valor da Entrada ($) :",
    sec1_f1: "Entrada = Preço de Compra (P) × (% Entrada / 100)",
    sec1_f2_title: "2. Saldo Financiado ($) :",
    sec1_f2: "Valor Financiado = Preço de Compra - Entrada",
    sec1_f3_title: "3. Total Necessário no Fechamento ($) :",
    sec1_f3: "Recursos Necessários = Entrada + Custos de Fechamento (2% - 5%)",
    sec2_h2: "2. Quanta Entrada Você Realmente Precisa?",
    sec2_p: "O percentual exigido varia conforme as regras do programa de crédito contratado :",
    sec2_card1_h3: "0% de Entrada",
    sec2_card1_p: "Disponível em linhas públicas específicas como os empréstimos VA (militares) e USDA (zonas rurais elegíveis).",
    sec2_card2_h3: "3% – 3.5% de Entrada",
    sec2_card2_p: "Linhas Convencionais 97 exigem 3% para primeiro imóvel (score 620+). Financiamentos FHA exigem 3.5% (score 580+).",
    sec2_card3_h3: "20% de Entrada",
    sec2_card3_p: "O patamar padrão para eliminar o seguro obrigatório (PMI) e minimizar o gasto total com juros.",
    sec3_h2: "3. O Mito dos 20% de Entrada vs. Realidade",
    sec3_p: "Dar 20% elimina o PMI, mas aguardar anos para juntar essa quantia pode gerar custos de oportunidade relevantes :",
    sec3_pros_h3: "Vantagens de Dar 20% de Entrada",
    sec3_pros: [
      "Economia imediata de 100 $ a 300 $/mês pela isenção de seguro PMI.",
      "Parcelas mensais de amortização e juros significativamente menores.",
      "Menor custo total acumulado de juros ao longo do contrato.",
      "Proposta de compra mais competitiva junto aos vendedores."
    ],
    sec3_cons_h3: "Desvantagens e Custos de Oportunidade",
    sec3_cons: [
      "Esgotamento das reservas líquidas e do fundo de emergência.",
      "Adiar a compra expõe o comprador à valorização dos imóveis.",
      "Custo de oportunidade de imobilizar capital que poderia render em aplicações."
    ],
    sec4_h2: "4. Programas de Financiamento e Requisitos de Entrada",
    sec4_tableHeaders: ["Programa de Crédito", "Entrada Mínima %", "Score Mínimo", "Regras do Seguro PMI", "Taxa Inicial"],
    sec4_tableRows: [
      { prog: "Convencional 97", minDown: "3.0%", minScore: "620", pmi: "Cancela a 78%–80% LTV", fee: "0 $" },
      { prog: "Financiamento FHA", minDown: "3.5%", minScore: "580", pmi: "Durante todo o prazo (<10% entrada)", fee: "1.75% UFMIP" },
      { prog: "Empréstimo VA (Militar)", minDown: "0.0%", minScore: "580+", pmi: "0 $ de PMI Mensal", fee: "1.4%–2.15% Taxa de Financiamento" },
      { prog: "USDA Rural", minDown: "0.0%", minScore: "640", pmi: "0.35% Garantia Anual", fee: "1.0% Taxa de Garantia" }
    ],
    sec5_h2: "5. Seguro Hipotecário (PMI) e Cancelamento (80% vs. 78% LTV)",
    sec5_p: "A legislação estabelece critérios claros para o cancelamento do seguro :",
    sec5_card1_h3: "Cancelamento por Solicitação a 80% LTV",
    sec5_card1_p: "Quando o saldo atingir 80% do valor de avaliação original, o comprador pode solicitar o cancelamento por escrito.",
    sec5_card2_h3: "Cancelamento Automático Obrigatório a 78% LTV",
    sec5_card2_p: "A instituição financeira é obrigada por lei a cancelar o PMI assim que o saldo atingir 78% da amortização programada.",
    sec6_h2: "6. Programas de Assistência de Entrada (DPA)",
    sec6_p: "Diversos programas públicos auxiliam compradores no valor da entrada :",
    sec6_items: [
      "Subsídios Diretos (Grants) : Recursos a fundo perdido.",
      "Segundas Hipotecas com Perdão de Dívida após 3 a 5 anos de moradia.",
      "Empréstimos com Pagamento Diferido a 0% quitados na revenda do imóvel."
    ],
    sec7_h2: "7. Resumo Educacional",
    sec7_p: "Equilibrar a entrada, o custo do PMI e as reservas financeiras garante um planejamento imobiliário seguro e sustentável.",
    overlayInputs: {
      homePrice: "Preço de Compra do Imóvel",
      downPaymentPercent: "Percentual de Entrada (%)",
      downPaymentAmount: "Valor da Entrada ($)",
      interestRate: "Taxa de Juros Anual (%)",
      loanTermYears: "Prazo do Financiamento (Anos)",
      propertyTaxRate: "Imposto Predial / IPTU (%)",
      homeInsuranceAnnual: "Seguro Residencial Anual ($)",
      pmiRate: "Taxa de Seguro PMI (%)",
      closingCostPercent: "Custos de Fechamento (%)"
    },
    overlayOutputs: {
      loanAmount: "Valor Total Financiado",
      monthlyPrincipalInterest: "Parcela (Amortização + Juros)",
      monthlyPmi: "Seguro PMI Mensal",
      totalMonthlyPayment: "Pagamento Mensal Total",
      cashToClose: "Recursos Necessários no Fechamento",
      pmiDropOffMonth: "Mês de Cancelamento do PMI",
      totalLifetimeInterest: "Juros Totais Financiados"
    }
  }
};

for (const loc of LOCALES) {
  const d = DP_DATA[loc];
  const contentCode = `"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(d.faqs, null, 2)};

export const seo = {
  title: "${d.title} — ${d.sec4_tableRows[0].prog}",
  description: "${d.metaDesc}",
  keywords: ${JSON.stringify(d.keywords)}
};

export const ContentComponent = function DownPaymentContent${loc.toUpperCase()}() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          ${d.pIntro}
        </p>
      </div>

      {/* SECTION 1: WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec1_h2}
        </h2>
        <p className="text-sm leading-relaxed">
          ${d.sec1_p}
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">${d.sec1_boxTitle}</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>${d.sec1_f1_title}</strong></div>
            <div className="text-center font-mono">{"${d.sec1_f1}"}</div>
            
            <div className="pt-2"><strong>${d.sec1_f2_title}</strong></div>
            <div className="text-center font-mono">{"${d.sec1_f2}"}</div>

            <div className="pt-2"><strong>${d.sec1_f3_title}</strong></div>
            <div className="text-center font-mono">{"${d.sec1_f3}"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec2_h2}
        </h2>
        <p className="text-sm leading-relaxed">
          ${d.sec2_p}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">${d.sec2_card1_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              ${d.sec2_card1_p}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">${d.sec2_card2_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              ${d.sec2_card2_p}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">${d.sec2_card3_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              ${d.sec2_card3_p}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 20% MYTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec3_h2}
        </h2>
        <p className="text-sm leading-relaxed">
          ${d.sec3_p}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">${d.sec3_pros_h3}</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              ${d.sec3_pros.map(item => `<li>${item}</li>`).join("\n              ")}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">${d.sec3_cons_h3}</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              ${d.sec3_cons.map(item => `<li>${item}</li>`).join("\n              ")}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec4_h2}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">${d.sec4_tableHeaders[0]}</th>
                <th className="p-3">${d.sec4_tableHeaders[1]}</th>
                <th className="p-3">${d.sec4_tableHeaders[2]}</th>
                <th className="p-3">${d.sec4_tableHeaders[3]}</th>
                <th className="p-3 rounded-tr-xl">${d.sec4_tableHeaders[4]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              ${d.sec4_tableRows.map((r, idx) => `
              <tr className="${idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/40' : ''}">
                <td className="p-3 font-bold text-blue-600">{${JSON.stringify(r.prog)}}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{${JSON.stringify(r.minDown)}}</td>
                <td className="p-3">{${JSON.stringify(r.minScore)}}</td>
                <td className="p-3 text-emerald-600 font-bold">{${JSON.stringify(r.pmi)}}</td>
                <td className="p-3 text-amber-600">{${JSON.stringify(r.fee)}}</td>
              </tr>`).join("\n              ")}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec5_h2}
        </h2>
        <p className="text-sm leading-relaxed">
          ${d.sec5_p}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">${d.sec5_card1_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              ${d.sec5_card1_p}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">${d.sec5_card2_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              ${d.sec5_card2_p}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec6_h2}
        </h2>
        <p className="text-sm leading-relaxed">
          ${d.sec6_p}
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          ${d.sec6_items.map(item => `<li>${item}</li>`).join("\n          ")}
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          ${d.sec7_h2}
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          ${d.sec7_p}
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/down-payment/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_DOWN_PAYMENT_OVERLAY = {
  title: "${d.title}",
  description: "${d.metaDesc}",
  inputs: ${JSON.stringify(d.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(d.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_DOWN_PAYMENT_OVERLAY;
`;
  writeFile(`src/i18n/overlays/down-payment/${loc}.ts`, overlayCode);
}
console.log("✓ Deep Down Payment generation complete.");
