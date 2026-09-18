import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface VATexts {
  title: string;
  metaDesc: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  pIntro: string;
  sec1_h2: string;
  sec1_p: string;
  sec1_noticeTitle: string;
  sec1_noticeText: string;
  sec2_h2: string;
  sec2_p: string;
  sec2_steps: string[];
  sec3_h2: string;
  sec3_p1: string;
  sec3_boxTitle: string;
  sec3_f1: string;
  sec3_vars: string[];
  sec3_p2: string;
  sec3_f2: string;
  sec4_h2: string;
  sec4_p1: string;
  sec4_p2: string;
  sec5_h2: string;
  sec5_p: string;
  sec5_card1_h3: string;
  sec5_card1_p: string;
  sec5_card2_h3: string;
  sec5_card2_p: string;
  sec5_note: string;
  sec6_h2: string;
  sec6_headers: string[];
  sec6_rows: { tier: string; first: string; sub: string; exempt: string }[];
  sec7_h2: string;
  sec7_p: string;
  sec7_boxTitle: string;
  sec7_items: string[];
  sec8_h2: string;
  sec8_p: string;
  sec8_card1_h3: string;
  sec8_card1_p: string;
  sec8_card2_h3: string;
  sec8_card2_p: string;
  sec9_h2: string;
  sec9_headers: string[];
  sec9_rows: { prog: string; minDown: string; pmi: string; fee: string; total: string }[];
  sec9_expl: string;
  sec10_h2: string;
  sec10_p: string;
  sec10_card1_h3: string;
  sec10_card1_p: string;
  sec10_card2_h3: string;
  sec10_card2_p: string;
  sec10_formulas: string[];
  sec11_h2: string;
  sec11_card1_h3: string;
  sec11_card1_p: string;
  sec11_card2_h3: string;
  sec11_card2_p: string;
  sec12_h2: string;
  sec12_p: string;
  sec12_boxTitle: string;
  sec12_grid: { label: string; val: string }[];
  sec12_note: string;
  sec13_h2: string;
  sec13_cards: { title: string; desc: string }[];
  sec14_h2: string;
  sec14_mistakes: string[];
  sec15_noticeTitle: string;
  sec15_noticeText: string;
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const VA_DATA: Record<typeof LOCALES[number], VATexts> = {
  es: {
    title: "Calculadora de Hipoteca VA (Préstamos Militares)",
    metaDesc: "Calcule cuotas de hipotecas VA sin entrada (0% down), tasa de financiación (Funding Fee), desglose PITI, exenciones por discapacidad y comparativa 3-vías.",
    keywords: ["calculadora hipoteca va", "prestamo va militares", "cuota prestamo va", "funding fee va calculadora"],
    faqs: [
      { question: "¿Qué es un préstamo hipotecario VA y quién califica?", answer: "Es un préstamo respaldado por el Departamento de Asuntos de los Veteranos para militares en activo, veteranos y cónyuges supervivientes elegibles." },
      { question: "¿Es obligatorio dar una entrada en un préstamo VA?", answer: "No, los préstamos VA permiten financiar hasta el 100% del precio de compra con un 0% de entrada sin seguro de hipoteca privado (PMI)." },
      { question: "¿Qué es la tasa de financiación VA (Funding Fee)?", answer: "Es una comisión gubernamental obligatoria (1.25% a 3.30%) que sustituye al PMI y financia el programa de garantías de la VA." },
      { question: "¿Quién está exento de pagar la tasa de financiación VA?", answer: "Veteranos con una discapacidad reconocida relacionada con el servicio (10%+), condecorados con el Corazón Púrpura y cónyuges perceptores de DIC." },
      { question: "¿Conviene financiar la tasa VA o pagarla en efectivo?", answer: "Financiarla reduce el desembolso inicial al cierre, pero incrementa el saldo del préstamo y los intereses mensuales a 30 años." },
      { question: "¿En qué se diferencia el primer uso del uso posterior?", answer: "Con 0% de entrada, el primer uso tiene una tasa del 2.15% y los usos posteriores del 3.30%. Con 5%+ de entrada, ambas tasas se igualan al 1.50%." },
      { question: "¿Tiene un préstamo VA seguro hipotecario mensual (PMI)?", answer: "No, los préstamos VA nunca cobran seguro hipotecario mensual, lo que genera un ahorro de cientos de dólares al mes." },
      { question: "¿Qué es la refinanciación IRRRL (Streamline Refinance)?", answer: "Es un procedimiento simplificado que permite reducir el tipo de interés sin tasación y con una tasa de financiación reducida del 0.50%." },
      { question: "¿Qué es el derecho de garantía (Entitlement) de la VA?", answer: "Es el respaldo financiero que otorga el gobierno; con derecho pleno no hay límites máximos de préstamo para compras con 0% de entrada." },
      { question: "¿Cuáles son los requisitos mínimos de servicio militar?", answer: "Generalmente 90 días en periodo de guerra, 181 días en tiempo de paz o 6 años en la Guardia Nacional o Reserva." },
      { question: "¿Cómo se compara un préstamo VA con FHA y Convencional?", answer: "El préstamo VA supera a FHA al no tener prima mensual permanente y aventaja al convencional al no exigir el 5%–20% de entrada." },
      { question: "¿Cómo acelerar la amortización de un préstamo VA?", answer: "Realizando pagos quincenales (bi-weekly) o pagos mensuales adicionales de capital para ahorrar decenas de miles en intereses." }
    ],
    pIntro: "Calcule cuotas de préstamos VA, tasas de financiación (Funding Fee), PITI completo, poder adquisitivo con 0% de entrada, aceleración de pagos, refinanciación IRRRL y comparativa con FHA y convencional.",
    sec1_h2: "1. ¿Qué es una Calculadora de Hipoteca VA?",
    sec1_p: "Una calculadora de hipoteca VA estima la cuota mensual y el coste financiero global de un préstamo hipotecario respaldado por el Departamento de Asuntos de los Veteranos (VA). Modela con precisión la tasa de financiación obligatoria, impuestos prediales, seguro de hogar, cuotas comunitarias, planes de amortización y comparativas frente a préstamos convencionales y FHA.",
    sec1_noticeTitle: "Aviso del Modelo de Planificación",
    sec1_noticeText: "Esta herramienta es un modelo orientativo y no constituye un Certificado de Elegibilidad (COE) ni una preaprobación formal de préstamo.",
    sec2_h2: "2. Cómo Utilizar la Calculadora de Hipoteca VA",
    sec2_p: "Siga este flujo secuencial para evaluar su préstamo militar :",
    sec2_steps: [
      "1. Introduzca el precio objetivo de compra de la vivienda.",
      "2. Indique el porcentaje de entrada previsto (0% a 100%).",
      "3. Seleccione su categoría militar (Servicio Activo/Veterano, Guardia/Reserva o Cónyuge).",
      "4. Elija si es su primer uso o un uso posterior del beneficio VA.",
      "5. Introduzca el tipo de interés fijo y el plazo en años (15 o 30 años).",
      "6. Elija si financia la tasa VA en el préstamo o la paga en efectivo al cierre.",
      "7. Active la exención por discapacidad militar si reúne los requisitos.",
      "8. Revise el capital financiado, la cuota P&I y el pago total PITI mensual.",
      "9. Inspeccione la tabla de amortización completa y expórtela a CSV.",
      "10. Compare el préstamo VA frente a los escenarios FHA y Convencional.",
      "11. Utilice el módulo de Entitlement para evaluar su capacidad con 0% de entrada.",
      "12. Simule pagos quincenales para comprobar el ahorro en tiempo e intereses.",
      "13. Calcule pagos extraordinarios mensuales de capital.",
      "14. Evalúe el ahorro en refinanciación con el simulador IRRRL."
    ],
    sec3_h2: "3. Fórmula Fundamental de Amortización y Desglose PITI",
    sec3_p1: "La cuota mensual de principal e intereses (P&I) se calcula mediante la fórmula de anualidades a tipo fijo :",
    sec3_boxTitle: "Ecuación de Principal e Intereses Mensuales",
    sec3_f1: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec3_vars: [
      "M: Cuota mensual de Principal e Intereses.",
      "P: Importe total financiado (Préstamo Base + Tasa VA Financiada).",
      "r: Tipo de interés mensual (Tipo Anual / 12 / 100).",
      "n: Número total de mensualidades (Años × 12)."
    ],
    sec3_p2: "El pago mensual total del hogar (PITI) incorpora los gastos periódicos de custodia :",
    sec3_f2: "Total PITI Mensual = Cuota P&I + (Impuestos Anuales / 12) + (Seguro Anual / 12) + Comunidad Mensual",
    sec4_h2: "4. Tasa de Financiación VA (Funding Fee)",
    sec4_p1: "La tasa de financiación VA es una comisión gubernamental obligatoria por ley (38 U.S.C. § 3729) que financia el programa de garantías de la VA para los contribuyentes.",
    sec4_p2: "Al no requerir entrada ni seguro PMI mensual, esta tasa constituye la reserva central del programa. Puede financiarse dentro del préstamo o abonarse en efectivo al cierre.",
    sec5_h2: "5. Primer Uso frente a Uso Posterior",
    sec5_p: "El uso previo del beneficio hipotecario VA influye en el porcentaje aplicable con entradas inferiores al 5% :",
    sec5_card1_h3: "Primer Uso (0% de Entrada)",
    sec5_card1_p: "Para una compra de 500.000 $ con 0% de entrada, la tasa legal es del 2,15% (10.750 $). El saldo financiado es de 510.750 $, con una cuota P&I de 3.228,29 $ y un PITI total de 3.936,62 $/mes.",
    sec5_card2_h3: "Uso Posterior (0% de Entrada)",
    sec5_card2_p: "Para prestatarios recurrentes con 0% de entrada, la tasa asciende al 3,30% (16.500 $). El saldo financiado sube a 516.500 $, generando una cuota P&I de 3.264,80 $ y un PITI de 3.973,13 $/mes.",
    sec5_note: "*Nota: Con una entrada del 5% o superior, la tasa en usos posteriores se reduce automáticamente al 1,50% (igual que en primer uso).",
    sec6_h2: "6. Cuadro Legal de Tasas de Financiación VA (Matriz Estatutaria)",
    sec6_headers: ["Tramo de Entrada", "Primer Uso", "Uso Posterior", "Exención por Discapacidad"],
    sec6_rows: [
      { tier: "< 5% Entrada (0% Down)", first: "2.15%", sub: "3.30%", exempt: "0.00% (Exento)" },
      { tier: "5% – 9.99% Entrada", first: "1.50%", sub: "1.50%", exempt: "0.00% (Exento)" },
      { tier: "≥ 10% Entrada", first: "1.25%", sub: "1.25%", exempt: "0.00% (Exento)" }
    ],
    sec7_h2: "7. Exenciones Legales de la Tasa de Financiación (Tasa 0%)",
    sec7_p: "Bajo la legislación federal (38 U.S.C. § 3729(c)), los prestatarios que cumplan ciertos criterios están totalmente exentos de la tasa VA (0.00%) :",
    sec7_boxTitle: "Quién Califica para la Exención :",
    sec7_items: [
      "Veteranos que reciben compensación de la VA por discapacidad relacionada con el servicio (10% o superior).",
      "Veteranos con derecho a compensación por discapacidad que perciben pensión militar de jubilación.",
      "Militares en activo condecorados con el Corazón Púrpura.",
      "Cónyuges supervivientes de militares fallecidos en acto de servicio o por causas ligadas al servicio (perceptores de DIC)."
    ],
    sec8_h2: "8. Comparativa: Financiar la Tasa vs. Pago en Efectivo al Cierre",
    sec8_p: "Financiar la tasa frente a pagarla en efectivo plantea una disyuntiva entre liquidez inicial y coste total de intereses :",
    sec8_card1_h3: "Financiada en el Préstamo",
    sec8_card1_p: "En 500.000 $ con tasa del 3,30% (16.500 $), el saldo sube a 516.500 $ y la cuota P&I a 3.264,80 $/mes. Los fondos en efectivo al cierre se mantienen en 12.500 $ (costes de cierre ordinarios).",
    sec8_card2_h3: "Pagada en Efectivo al Cierre",
    sec8_card2_p: "Abonar los 16.500 $ al cierre mantiene el saldo en 500.000 $, reduciendo la cuota P&I a 3.160,34 $/mes (ahorro de ~104 $/mes) pero eleva el desembolso inicial a 29.000 $.",
    sec9_h2: "9. Comparativa 3-Vías: Préstamo VA vs. FHA vs. Convencional",
    sec9_headers: ["Programa", "Entrada Mínima", "Seguro Hipotecario Mensual", "Comisión Inicial", "Desembolso Total 30 Años"],
    sec9_rows: [
      { prog: "Préstamo VA", minDown: "0% (0 $)", pmi: "0 $ (Sin PMI)", fee: "2.15% Financiado (10.750 $)", total: "1.357.200 $ (3.770 $/mes)" },
      { prog: "Préstamo FHA", minDown: "3.5% (17.500 $)", pmi: "0.55% MIP Permanente", fee: "1.75% UFMIP (8.444 $)", total: "1.421.640 $ (3.949 $/mes)" },
      { prog: "Convencional", minDown: "5.0% (25.000 $)", pmi: "0.60% PMI (Años 1-8)", fee: "0 $ Comisión Inicial", total: "1.356.903 $ (3.943 $/mes Y1-8)" }
    ],
    sec9_expl: "El préstamo VA ahorra 64.440 $ frente a FHA por la ausencia de prima mensual permanente, e iguala prácticamente el coste global del préstamo convencional pero sin exigir 25.000 $ de entrada en efectivo.",
    sec10_h2: "10. Derecho de Garantía (Entitlement) y Capacidad de Compra con 0% Down",
    sec10_p: "El derecho de garantía determina la capacidad máxima de compra sin pago inicial :",
    sec10_card1_h3: "Entitlement Pleno (Sin Uso Previo Activo)",
    sec10_card1_p: "Bajo la ley Blue Water Navy de 2019, los veteranos con derecho pleno no tienen límite de cuantía máxima para comprar con 0% de entrada.",
    sec10_card2_h3: "Entitlement Parcial (Préstamo VA Previo Activo)",
    sec10_card2_p: "Si mantiene un préstamo VA anterior abierto, se aplican los límites del condado para calcular la garantía secundaria remanente :",
    sec10_formulas: [
      "Garantía Remanente = max(0, Límite del Condado × 25% - Entitlement Utilizado)",
      "Precio Máximo con 0% Entrada = Garantía Remanente × 4",
      "Entrada Requerida = max(0, (Precio Objetivo - Precio Máximo con 0%) × 25%)"
    ],
    sec11_h2: "11. Amortización Acelerada: Pagos Quincenales y Pagos Extra",
    sec11_card1_h3: "Pagos Quincenales (Bi-Weekly)",
    sec11_card1_p: "Abonar la mitad de la cuota cada 2 semanas (26 pagos/año) equivale a 13 cuotas completas anuales. En un saldo de 510.750 $ al 6,5%, ahorra 150.027 $ en intereses y acorta el plazo en 5,8 años.",
    sec11_card2_h3: "Pagos Extra Mensuales de Principal",
    sec11_card2_p: "Aportar 200 $/mes adicionales de capital ahorra 118.241 $ en intereses totales y reduce el préstamo en 55 meses (4,6 años).",
    sec12_h2: "12. Refinanciación Acelerada VA IRRRL (Streamline)",
    sec12_p: "El programa IRRRL permite reducir el tipo de interés sin tasación y con una tasa reducida de solo el 0,50% :",
    sec12_boxTitle: "Ejemplo IRRRL (Saldo 350.000 $, bajada de 7.25% a 6.00%) :",
    sec12_grid: [
      { label: "Ahorro Mensual", val: "279 $ / mes" },
      { label: "Plazo de Amortización Costes", val: "17 Meses" },
      { label: "Ahorro Neto en 5 Años", val: "11.990 $" }
    ],
    sec12_note: "*Nota: Al refinanciar, reiniciar el plazo a 30 años puede alargar el periodo de intereses si la hipoteca original estaba muy avanzada.",
    sec13_h2: "13. Requisitos Mínimos de Servicio Militar",
    sec13_cards: [
      { title: "Servicio en Tiempo de Guerra", desc: "Al menos 90 días consecutivos de servicio activo en periodos bélicos reconocidos." },
      { title: "Servicio en Tiempo de Paz", desc: "Al menos 181 días continuados de servicio militar activo en periodos de paz." },
      { title: "Guardia Nacional y Reserva", desc: "Al menos 6 años de servicio computable o 90 días de servicio activo bajo Título 10/32." }
    ],
    sec14_h2: "14. Errores Frecuentes al Calcular una Hipoteca VA",
    sec14_mistakes: [
      "No seleccionar correctamente si se trata del primer uso o de un uso posterior del crédito VA.",
      "Suponer que todos los solicitantes pagan la misma tasa de financiación sin considerar la entrada.",
      "Olvidar que financiar la tasa incrementa el capital deudor y los intereses mensuales a 30 años.",
      "Comparar solo la cuota P&I de la VA con el pago PITI completo de otros préstamos.",
      "Tratar los límites de condado como estáticos sin verificar la actualización anual del FHFA.",
      "Confundir la simulación del calculador con un Certificado de Elegibilidad oficial (COE).",
      "Asumir que todos los bancos procesan pagos quincenales sin acumularlos en cuentas puente.",
      "Pasar por alto el reinicio del plazo de 30 años en refinanciaciones IRRRL.",
      "No acreditar documentalmente la exención por discapacidad militar.",
      "Asumir que la VA siempre es la opción más barata si se dispone de más del 20% de entrada."
    ],
    sec15_noticeTitle: "Aviso Educativo y Marco Normativo",
    sec15_noticeText: "Los préstamos hipotecarios VA están regidos por el Título 38 del Código de los Estados Unidos y el Manual de Prestamistas de la VA. Esta herramienta ofrece simulaciones de planificación financiera.",
    overlayInputs: {
      homePrice: "Precio de Compra de la Vivienda",
      downPaymentPercent: "Porcentaje de Entrada (%)",
      interestRate: "Tipo de Interés Fijo (%)",
      loanTermYears: "Plazo del Préstamo (Años)",
      militaryCategory: "Categoría de Servicio Militar",
      vaUsageType: "Uso del Beneficio VA (1º / Posterior)",
      isDisabilityExempt: "Exención por Discapacidad (0% Tasa)",
      financeFundingFee: "Financiar Tasa en el Préstamo",
      propertyTaxRate: "Impuesto sobre Bienes Inmuebles (%)",
      homeInsuranceAnnual: "Seguro de Hogar Anual ($)",
      monthlyHoa: "Cuota de Comunidad / HOA ($)"
    },
    overlayOutputs: {
      baseLoanAmount: "Importe del Préstamo Base",
      fundingFeeAmount: "Tasa de Financiación VA ($)",
      totalFinancedLoan: "Total del Préstamo Financiado",
      monthlyPrincipalInterest: "Cuota Mensual (Principal e Interés)",
      totalMonthlyPiti: "Pago Mensual Total (PITI)",
      vaFundingFeePercent: "Porcentaje de Tasa Aplicable (%)",
      lifetimeSavingsVsFha: "Ahorro Total Estimado frente a FHA"
    }
  },
  fr: {
    title: "Calculateur de Prêt Hypothécaire VA (Militaires)",
    metaDesc: "Calculez les mensualités d'un prêt VA sans apport (0% down), les droits de financement (Funding Fee), le PITI et les exonérations pour invalidité.",
    keywords: ["calculateur pret va", "hypotheque militaire va", "funding fee va", "pret veterant sans apport"],
    faqs: [
      { question: "Qu'est-ce qu'un prêt hypothécaire VA et qui est admissible ?", answer: "C'est un prêt garanti par le Département des Anciens Combattants destiné aux militaires en service actif, vétérans et conjoints survivants." },
      { question: "Une mise de fonds est-elle exigée ?", answer: "Non, les prêts VA permettent de financer jusqu'à 100 % de la valeur du bien sans aucune mise de fonds (0 % down) et sans assurance PMI." },
      { question: "Qu'est-ce que la taxe de financement VA (Funding Fee) ?", answer: "Une taxe gouvernementale unique (1.25 % à 3.30 %) qui remplace l'assurance hypothécaire et finance le fonds de garantie." },
      { question: "Qui est exonéré de la taxe de financement VA ?", answer: "Les vétérans bénéficiant d'une pension d'invalidité liée au service (10 %+), les récipiendaires de la Purple Heart et certains conjoints survivants." },
      { question: "Vaut-il mieux financer la taxe ou la payer comptant ?", answer: "Financer la taxe réduit le besoin de liquidités à la clôture mais majore le montant emprunté et les intérêts sur 30 ans." },
      { question: "Quelle différence entre première utilisation et utilisation ultérieure ?", answer: "Sans apport, le premier usage est tarifé à 2.15 % et les usages ultérieurs à 3.30 %. Dès 5 % d'apport, le taux baisse à 1.50 %." },
      { question: "Un prêt VA comporte-t-il une assurance PMI mensuelle ?", answer: "Non, aucun prêt VA n'impose de prime d'assurance PMI mensuelle, générant des économies significatives." },
      { question: "Qu'est-ce que le refinancement IRRRL ?", answer: "Une procédure simplifiée permettant de réduire son taux d'intérêt sans expertise immobilière et avec une taxe réduite à 0.50 %." },
      { question: "Comment fonctionne le droit de garantie (Entitlement) ?", answer: "Il représente la garantie accordée par l'État; avec un droit complet, il n'existe pas de plafond d'emprunt à 0 % d'apport." },
      { question: "Quels sont les états de service minimums ?", answer: "En général, 90 jours en temps de guerre, 181 jours en temps de paix ou 6 ans dans la Réserve/Garde Nationale." },
      { question: "Comment le prêt VA se compare-t-il aux prêts FHA et conventionnels ?", answer: "Le prêt VA surpasse le FHA par l'absence d'assurance mensuelle permanente et évite les 5 % à 20 % d'apport du prêt conventionnel." },
      { question: "Comment accélérer le remboursement d'un prêt VA ?", answer: "En adoptant des versements bihebdomadaires ou en ajoutant des remboursements de capital réguliers." }
    ],
    pIntro: "Calculez vos mensualités de prêt VA, vos droits de financement (Funding Fee), votre mensualité globale PITI, vos exonérations d'invalidité et vos économies de refinancement IRRRL.",
    sec1_h2: "1. Qu'est-ce qu'un Calculateur d'Hypothèque VA ?",
    sec1_p: "Ce calculateur évalue le coût global et mensuel d'un prêt immobilier garanti par le Département des Anciens Combattants (VA). Il intègre les droits de financement légaux, les taxes foncières, les assurances habitation, l'amortissement et les comparatifs de marché.",
    sec1_noticeTitle: "Avis sur le Modèle Financier",
    sec1_noticeText: "Cet outil est un modèle d'aide à la décision et ne remplace pas un Certificat d'Admissibilité officiel (COE).",
    sec2_h2: "2. Comment Utiliser le Calculateur d'Hypothèque VA",
    sec2_p: "Suivez ces étapes pour simuler votre financement militaire :",
    sec2_steps: [
      "1. Saisissez le prix d'achat de la propriété.",
      "2. Indiquez le pourcentage d'apport prévu (0 % à 100 %).",
      "3. Choisissez votre statut militaire (Actif/Vétéran, Réserve ou Conjoint).",
      "4. Précisez s'il s'agit d'une première utilisation ou d'une utilisation ultérieure.",
      "5. Entrez le taux d'intérêt fixe et la durée du prêt en années.",
      "6. Choisissez si vous financez la taxe VA ou la réglez au comptant.",
      "7. Activez l'exonération pour invalidité liée au service si applicable.",
      "8. Vérifiez le capital financé, la mensualité P&I et le montant global PITI.",
      "9. Consultez le tableau d'amortissement complet.",
      "10. Comparez avec les options FHA et conventionnelles.",
      "11. Évaluez vos droits de garantie pour un achat à 0 % d'apport.",
      "12. Testez l'impact des versements bihebdomadaires.",
      "13. Simulez des remboursements de capital accélérés.",
      "14. Évaluez le refinancement simplifié IRRRL."
    ],
    sec3_h2: "3. Formule d'Amortissement et Calcul du PITI",
    sec3_p1: "La mensualité fixe de principal et d'intérêts (P&I) est déterminée par la formule standard :",
    sec3_boxTitle: "Équation de la Mensualité (Capital + Intérêts)",
    sec3_f1: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec3_vars: [
      "M : Mensualité de Principal et Intérêts.",
      "P : Capital total financé (Prêt de base + Taxe VA financée).",
      "r : Taux périodique mensuel (Taux annuel / 12 / 100).",
      "n : Nombre total de mensualités prévues (Durée × 12)."
    ],
    sec3_p2: "La mensualité globale du logement (PITI) regroupe l'amortissement et les charges périodiques :",
    sec3_f2: "PITI Mensuel Global = P&I + (Taxes Foncières / 12) + (Assurance / 12) + Charges de Copropriété",
    sec4_h2: "4. Taxe de Financement VA (Funding Fee)",
    sec4_p1: "La taxe de financement VA est une contribution légale obligatoire (38 U.S.C. § 3729) qui pérennise le fonds de garantie de l'État.",
    sec4_p2: "Elle compense l'absence de mise de fonds et d'assurance PMI mensuelle. Elle peut être intégrée au capital emprunté ou réglée à la signature.",
    sec5_h2: "5. Première Utilisation vs Utilisation Ultérieure",
    sec5_p: "L'historique d'utilisation de vos droits VA modifie le barème applicable sans apport :",
    sec5_card1_h3: "Première Utilisation (0 % d'Apport)",
    sec5_card1_p: "Pour 500 000 $ d'achat, le taux légal est de 2.15 % (10 750 $). Le capital financé passe à 510 750 $, avec une mensualité P&I de 3 228,29 $ et un PITI de 3 936,62 $/mois.",
    sec5_card2_h3: "Utilisation Ultérieure (0 % d'Apport)",
    sec5_card2_p: "Pour un emprunteur récurrent sans apport, le taux passe à 3.30 % (16 500 $). Le prêt financé s'élève à 516 500 $ pour un PITI de 3 973,13 $/mois.",
    sec5_note: "*Remarque : Dès 5 % d'apport, le taux pour usage ultérieur retombe à 1.50 % (identique au premier usage).",
    sec6_h2: "6. Barème Officiel des Taxes de Financement VA",
    sec6_headers: ["Tranche d'Apport", "Première Utilisation", "Utilisation Ultérieure", "Taux Exonéré"],
    sec6_rows: [
      { tier: "< 5 % d'Apport (0 % Down)", first: "2.15%", sub: "3.30%", exempt: "0.00% (Exonéré)" },
      { tier: "5 % – 9.99 % d'Apport", first: "1.50%", sub: "1.50%", exempt: "0.00% (Exonéré)" },
      { tier: "≥ 10 % d'Apport", first: "1.25%", sub: "1.25%", exempt: "0.00% (Exonéré)" }
    ],
    sec7_h2: "7. Exonérations Légales de Taxe de Financement (0 % de Taxe)",
    sec7_p: "En vertu de la loi fédérale, certains bénéficiaires sont intégralement dispensés de cette taxe :",
    sec7_boxTitle: "Critères d'Exonération :",
    sec7_items: [
      "Vétérans percevant une indemnité d'invalidité liée au service militaire (10 % ou plus).",
      "Vétérans admissibles à l'indemnité d'invalidité qui perçoivent une pension de retraite militaire.",
      "Militaires d'active décorés de la Purple Heart.",
      "Conjoints survivants de militaires décédés en service ou des suites d'une blessure de service."
    ],
    sec8_h2: "8. Comparatif : Financer la Taxe vs Paiement Comptant",
    sec8_p: "Ce choix arbitre entre la préservation de vos liquidités et le coût cumulé des intérêts :",
    sec8_card1_h3: "Financée dans le Prêt",
    sec8_card1_p: "Sur 500 000 $ avec 3.30 % de taxe (16 500 $), le prêt atteint 516 500 $ et la mensualité 3 264,80 $. Vos liquidités requises restent de 12 500 $.",
    sec8_card2_h3: "Payée Comptant à la Clôture",
    sec8_card2_p: "Régler les 16 500 $ à la signature maintient le prêt à 500 000 $, réduisant la mensualité à 3 160,34 $ mais portant l'apport initial à 29 000 $.",
    sec9_h2: "9. Comparatif 3-Voies : Prêt VA vs FHA vs Conventionnel",
    sec9_headers: ["Programme", "Apport Minimum", "Assurance Mensuelle", "Frais Initiaux", "Coût Total sur 30 Ans"],
    sec9_rows: [
      { prog: "Prêt VA", minDown: "0 % (0 $)", pmi: "0 $ (Sans PMI)", fee: "2.15 % Financé (10 750 $)", total: "1 357 200 $ (3 770 $/mois)" },
      { prog: "Prêt FHA", minDown: "3.5 % (17 500 $)", pmi: "0.55 % MIP Permanente", fee: "1.75 % UFMIP (8 444 $)", total: "1 421 640 $ (3 949 $/mois)" },
      { prog: "Conventionnel", minDown: "5.0 % (25 000 $)", pmi: "0.60 % PMI (Années 1-8)", fee: "0 $ Frais Initiaux", total: "1 356 903 $ (3 943 $/mois)" }
    ],
    sec9_expl: "Le prêt VA fait économiser 64 440 $ face au FHA et égale le coût total du prêt conventionnel tout en dispensant de 25 000 $ d'apport en espèces.",
    sec10_h2: "10. Droits de Garantie (Entitlement) et Pouvoir d'Achat à 0 % d'Apport",
    sec10_p: "L'Entitlement détermine le plafond de financement garanti sans apport :",
    sec10_card1_h3: "Droit Complet (Sans Prêt VA Actif)",
    sec10_card1_p: "Depuis la loi Blue Water Navy de 2019, les vétérans à droit plein ne sont soumis à aucun plafond d'emprunt à 0 % d'apport.",
    sec10_card2_h3: "Droit Partiel (Prêt VA Antérieur en Cours)",
    sec10_card2_p: "Si une hypothèque VA reste active, les plafonds de comté s'appliquent pour calculer le droit secondaire restant :",
    sec10_formulas: [
      "Garantie Restante = max(0, Plafond Comté × 25 % - Droit Utilisé)",
      "Prix Maximal à 0 % Apport = Garantie Restante × 4",
      "Apport Requis = max(0, (Prix Cible - Prix Maximal 0 %) × 25 %)"
    ],
    sec11_h2: "11. Remboursement Accéléré : Versements Bihebdomadaires et Extras",
    sec11_card1_h3: "Paiement Bihebdomadaire",
    sec11_card1_p: "Payer la moitié de la mensualité toutes les 2 semaines (26 fois/an) équivaut à 13 mensualités annuelles, économisant 150 027 $ d'intérêts et 5,8 ans.",
    sec11_card2_h3: "Versements Extra Mensuels de Capital",
    sec11_card2_p: "Ajouter 200 $/mois de capital permet d'économiser 118 241 $ d'intérêts et de raccourcir le prêt de 55 mois (4,6 ans).",
    sec12_h2: "12. Refinancement Simplifié VA IRRRL",
    sec12_p: "Le programme IRRRL permet d'abaisser votre taux sans expertise avec une taxe réduite à 0.50 % :",
    sec12_boxTitle: "Exemple IRRRL (Solde 350 000 $, passage de 7.25 % à 6.00 %) :",
    sec12_grid: [
      { label: "Économie Mensuelle", val: "279 $ / mois" },
      { label: "Période d'Amortissement", val: "17 Mois" },
      { label: "Gain Net sur 5 Ans", val: "11 990 $" }
    ],
    sec12_note: "*Remarque : Réinitialiser la durée à 30 ans peut allonger le cumul des intérêts si votre prêt d'origine était déjà bien avancé.",
    sec13_h2: "13. Conditions d'Admissibilité et États de Service",
    sec13_cards: [
      { title: "Service en Temps de Guerre", desc: "Au moins 90 jours consécutifs de service actif lors des conflits reconnus." },
      { title: "Service en Temps de Paix", desc: "Au moins 181 jours consécutifs de service actif en période de paix." },
      { title: "Garde Nationale et Réserve", desc: "Au moins 6 années de service validées ou 90 jours sous statut fédéral Title 10/32." }
    ],
    sec14_h2: "14. Erreurs Fréquentes à Éviter",
    sec14_mistakes: [
      "Sélectionner incorrectement le statut de première utilisation vs utilisation ultérieure.",
      "Penser que tous les emprunteurs paient la même taxe sans vérifier le montant d'apport.",
      "Oublier que financer la taxe augmente le capital emprunté et les intérêts sur 30 ans.",
      "Comparer uniquement le capital et intérêts de la VA au PITI complet d'autres prêts.",
      "Considérer les plafonds de comté comme permanents sans vérifier les ajustements annuels.",
      "Prendre la simulation en ligne pour un Certificat d'Admissibilité officiel (COE).",
      "Supposer que toutes les banques traitent automatiquement les versements bihebdomadaires.",
      "Négliger le rallongement de durée lors d'un refinancement IRRRL.",
      "Ne pas justifier formellement l'exonération pour invalidité militaire.",
      "Croire que le prêt VA est le plus compétitif si vous disposez de plus de 20 % d'apport."
    ],
    sec15_noticeTitle: "Avis Pédagogique et Cadre Réglementaire",
    sec15_noticeText: "Les prêts hypothécaires VA sont régis par le Titre 38 du Code des États-Unis et le manuel des prêteurs de la VA. Cet outil fournit des simulations financières indicatives.",
    overlayInputs: {
      homePrice: "Prix d'Achat du Logement",
      downPaymentPercent: "Pourcentage d'Apport (%)",
      interestRate: "Taux Fixe Annuel (%)",
      loanTermYears: "Durée du Prêt (Années)",
      militaryCategory: "Catégorie de Service Militaire",
      vaUsageType: "Usage des Droits VA (1er / Ultérieur)",
      isDisabilityExempt: "Exonération pour Invalidité (0 % Taxe)",
      financeFundingFee: "Financer la Taxe dans le Prêt",
      propertyTaxRate: "Taux de Taxe Foncière (%)",
      homeInsuranceAnnual: "Assurance Habitation Annuelle ($)",
      monthlyHoa: "Charges de Copropriété / HOA ($)"
    },
    overlayOutputs: {
      baseLoanAmount: "Montant du Prêt de Base",
      fundingFeeAmount: "Taxe de Financement VA ($)",
      totalFinancedLoan: "Total du Prêt Financé",
      monthlyPrincipalInterest: "Mensualité (Principal et Intérêts)",
      totalMonthlyPiti: "Mensualité Globale (PITI)",
      vaFundingFeePercent: "Pourcentage de Taxe Appliqué (%)",
      lifetimeSavingsVsFha: "Économie Totale Estimée vs FHA"
    }
  },
  de: {
    title: "VA-Hypothekenrechner (Militär- und Veteranendarlehen)",
    metaDesc: "Berechnen Sie VA-Darlehen ohne Anzahlung (0% Down), Fördergebühr (Funding Fee), monatliche PITI-Raten, Invaliditätsbefreiung und 3-Wege-Vergleich.",
    keywords: ["va darlehen rechner", "veteranen hypothek", "va funding fee rechner", "militaerkredit immobilie"],
    faqs: [
      { question: "Was ist ein VA-Darlehen und wer ist anspruchsberechtigt?", answer: "Ein staatlich garantiertes Hypothekendarlehen für aktive Militärangehörige, Veteranen und Hinterbliebene." },
      { question: "Ist eine Anzahlung zwingend erforderlich?", answer: "Nein, VA-Darlehen ermöglichen eine 100%-Finanzierung (0% Anzahlung) ohne monatliche PMI-Versicherung." },
      { question: "Was ist die VA-Fördergebühr (Funding Fee)?", answer: "Eine einmalige gesetzliche Abgabe (1.25 % bis 3.30 %), die das Bürgschaftsprogramm absichert." },
      { question: "Wer ist von der Fördergebühr befreit?", answer: "Veteranen mit anerkannter Dienstbeschädigung (10 %+), Träger des Purple Heart und anspruchsberechtigte Hinterbliebene." },
      { question: "Sollte man die Gebühr mitfinanzieren oder bar bezahlen?", answer: "Mitfinanzierung schont die Liquidität, erhöht jedoch die Darlehenssumme und die Zinskosten über 30 Jahre." },
      { question: "Was unterscheidet Erstnutzung von Folgeinanspruchnahme?", answer: "Ohne Anzahlung beträgt die Gebühr bei Erstnutzung 2.15 % und bei Folgeinanspruchnahme 3.30 %. Ab 5 % Anzahlung sinken beide auf 1.50 %." },
      { question: "Fällt bei einem VA-Darlehen eine monatliche PMI-Prämie an?", answer: "Nein, bei VA-Darlehen entfällt die monatliche PMI vollständig." },
      { question: "Was ist eine IRRRL-Umschuldung (Streamline)?", answer: "Ein vereinfachtes Umschuldungsverfahren zur Zinssenkung ohne Wertermittlung mit reduzierter Gebühr von 0.50 %." },
      { question: "Wie funktioniert der Garantieanspruch (Entitlement)?", answer: "Er bestimmt die maximale Kreditsumme ohne Eigenkapital; bei vollem Anspruch gibt es keine gesetzlichen Obergrenzen." },
      { question: "Welche Dienstzeitvoraussetzungen gelten?", answer: "Mindestens 90 Tage im Kriegseinsatz, 181 Tage in Friedenszeiten oder 6 Jahre in der Nationalgarde/Reserve." },
      { question: "Wie schlägt sich das VA-Darlehen im Vergleich zu FHA und konventionellen Krediten?", answer: "Es spart gegenüber FHA die dauerhafte Monatsprämie und erspart gegenüber konventionellen Krediten 5 % bis 20 % Eigenkapital." },
      { question: "Wie kann die Tilgung beschleunigt werden?", answer: "Durch zweiwöchentliche Zahlungen oder monatliche Sondertilgungen." }
    ],
    pIntro: "Ermitteln Sie Monatsraten für VA-Darlehen, Fördergebühren (Funding Fee), PITI-Gesamtkosten, Kaufkraft bei 0 % Anzahlung, IRRRL-Umschuldung und Zinsersparnisse.",
    sec1_h2: "1. Was ist ein VA-Hypothekenrechner?",
    sec1_p: "Dieser Rechner simuliert Monatsraten und Gesamtkosten für staatlich garantierte US-Militärhypotheken (VA Loans). Er modelliert gesetzliche Fördergebühren, Grundsteuern, Gebäudeversicherungen und Tilgungspläne.",
    sec1_noticeTitle: "Hinweis zum Modell",
    sec1_noticeText: "Diese Berechnung dient der Orientierung und ersetzt kein amtliches Certificate of Eligibility (COE).",
    sec2_h2: "2. Bedienung des VA-Rechners",
    sec2_p: "Folgen Sie diesen Schritten zur präzisen Modellierung :",
    sec2_steps: [
      "1. Geben Sie den Kaufpreis der Immobilie ein.",
      "2. Tragen Sie die geplante Anzahlungsquote (0 % bis 100 %) ein.",
      "3. Wählen Sie Ihren Militärstatus (Aktiv/Veteran, Reserve oder Hinterbliebene).",
      "4. Wählen Sie Erstnutzung oder Folgeinanspruchnahme.",
      "5. Geben Sie Sollzins und Laufzeit in Jahren ein.",
      "6. Wählen Sie Barzahlung oder Mitfinanzierung der Fördergebühr.",
      "7. Aktivieren Sie die Befreiung bei anerkannter Dienstbeschädigung.",
      "8. Prüfen Sie Darlehensbetrag, P&I-Rate und monatliche PITI-Gesamtrate.",
      "9. Kontrollieren Sie den vollständigen Tilgungsplan.",
      "10. Vergleichen Sie mit FHA und konventionellen Krediten.",
      "11. Berechnen Sie den verbleibenden Garantieanspruch (Entitlement).",
      "12. Testen Sie zweiwöchentliche Zahlungsintervalle.",
      "13. Simulieren Sie monatliche Sondertilgungen.",
      "14. Berechnen Sie die IRRRL-Zinssenkung."
    ],
    sec3_h2: "3. Annuitätenformel und PITI-Gesamtkosten",
    sec3_p1: "Die monatliche Rate für Zins und Tilgung (P&I) folgt der finanzmathematischen Standardformel :",
    sec3_boxTitle: "Formel der monatlichen Annuität",
    sec3_f1: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec3_vars: [
      "M : Monatliche Rate für Zins und Tilgung.",
      "P : Gesamter Darlehensbetrag (Basisdarlehen + mitfinanzierte Fördergebühr).",
      "r : Monatlicher Zinssatz (Jahreszins / 12 / 100).",
      "n : Anzahl der Monatsraten (Laufzeit × 12)."
    ],
    sec3_p2: "Die gesamte monatliche Wohnbelastung (PITI) summiert alle laufenden Kosten :",
    sec3_f2: "Monatliche PITI-Rate = P&I + (Grundsteuer / 12) + (Gebäudeversicherung / 12) + Hausgeld",
    sec4_h2: "4. Gesetzliche VA-Fördergebühr (Funding Fee)",
    sec4_p1: "Die Fördergebühr ist eine gesetzliche Einmalabgabe (38 U.S.C. § 3729) zur Finanzierung des staatlichen Bürgschaftsprogramms.",
    sec4_p2: "Sie ersetzt die monatliche Kreditausfallversicherung (PMI) und kann bar bezahlt oder mitfinanziert werden.",
    sec5_h2: "5. Erstnutzung im Vergleich zur Folgeinanspruchnahme",
    sec5_p: "Die bisherige Nutzung des VA-Darlehensanspruchs bestimmt den Gebührensatz bei 0 % Anzahlung :",
    sec5_card1_h3: "Erstnutzung (0 % Anzahlung)",
    sec5_card1_p: "Bei 500.000 $ Kaufpreis beträgt die Gebühr 2.15 % (10.750 $). Das Darlehen steigt auf 510.750 $ bei 3.228,29 $ P&I und 3.936,62 $ PITI monatlich.",
    sec5_card2_h3: "Folgenutzung (0 % Anzahlung)",
    sec5_card2_p: "Bei erneuter Nutzung ohne Anzahlung steigt die Gebühr auf 3.30 % (16.500 $). Das Darlehen wächst auf 516.500 $ bei 3.973,13 $ monatlicher PITI-Rate.",
    sec5_note: "*Hinweis : Ab 5 % Anzahlung sinkt die Gebühr bei Folgenutzung auf 1.50 % (identisch zur Erstnutzung).",
    sec6_h2: "6. Gesetzliche Gebührentabelle der VA-Förderabgabe",
    sec6_headers: ["Anzahlungsstufe", "Erstnutzung", "Folgenutzung", "Befreiter Satz"],
    sec6_rows: [
      { tier: "< 5 % Anzahlung (0 % Down)", first: "2.15%", sub: "3.30%", exempt: "0.00% (Befreit)" },
      { tier: "5 % – 9.99 % Anzahlung", first: "1.50%", sub: "1.50%", exempt: "0.00% (Befreit)" },
      { tier: "≥ 10 % Anzahlung", first: "1.25%", sub: "1.25%", exempt: "0.00% (Befreit)" }
    ],
    sec7_h2: "7. Gesetzliche Befreiung von der Fördergebühr (0 % Satz)",
    sec7_p: "Nach US-Bundesrecht sind bestimmte Personen vollständig von der Fördergebühr befreit :",
    sec7_boxTitle: "Voraussetzungen für die Gebührenbefreiung :",
    sec7_items: [
      "Veteranen mit anerkannter Minderung der Erwerbsfähigkeit (10 % oder höher).",
      "Veteranen mit Anspruch auf Dienstbeschädigungsrente, die Ruhegehalt beziehen.",
      "Aktive Soldaten mit Verleihung des Purple Heart.",
      "Anspruchsberechtigte Hinterbliebene verstorbener Soldaten (DIC-Empfänger)."
    ],
    sec8_h2: "8. Vergleich : Mitfinanzierung vs. Barzahlung der Gebühr",
    sec8_p: "Dieser Vergleich wiegt sofortigen Liquiditätsbedarf gegen langfristige Zinskosten ab :",
    sec8_card1_h3: "Mitfinanzierung im Darlehen",
    sec8_card1_p: "Bei 500.000 $ mit 3.30 % Gebühr (16.500 $) steigt das Darlehen auf 516.500 $ und die Rate auf 3.264,80 $. Der Barmittelbedarf bleibt bei 12.500 $.",
    sec8_card2_h3: "Barzahlung bei Abschluss",
    sec8_card2_p: "Zahlung der 16.500 $ bei Abschluss belässt das Darlehen bei 500.000 $ und senkt die Rate auf 3.160,34 $, erfordert aber 29.000 $ Eigenkapital.",
    sec9_h2: "9. 3-Wege-Vergleich : VA vs. FHA vs. Konventionell",
    sec9_headers: ["Programm", "Mindesteigenkapital", "Monatliche Versicherung", "Einmalige Gebühr", "Gesamtkosten 30 Jahre"],
    sec9_rows: [
      { prog: "VA-Darlehen", minDown: "0 % (0 $)", pmi: "0 $ (Keine PMI)", fee: "2.15 % Finanziert (10.750 $)", total: "1.357.200 $ (3.770 $/Monat)" },
      { prog: "FHA-Darlehen", minDown: "3.5 % (17.500 $)", pmi: "0.55 % Dauerhafte MIP", fee: "1.75 % UFMIP (8.444 $)", total: "1.421.640 $ (3.949 $/Monat)" },
      { prog: "Konventionell", minDown: "5.0 % (25.000 $)", pmi: "0.60 % PMI (Jahre 1-8)", fee: "0 $ Einmalgebühr", total: "1.356.903 $ (3.943 $/Monat)" }
    ],
    sec9_expl: "Das VA-Darlehen spart 64.440 $ gegenüber FHA durch Wegfall der laufenden Monatsprämie und erreicht die Gesamtkosten eines konventionellen Kredits ohne 25.000 $ Anzahlung.",
    sec10_h2: "10. Garantieanspruch (Entitlement) und Kaufkraft ohne Anzahlung",
    sec10_p: "Der Garantieanspruch bestimmt die Kreditsumme ohne Eigenkapital :",
    sec10_card1_h3: "Voller Garantieanspruch",
    sec10_card1_p: "Seit 2019 gibt es bei vollem Anspruch keine gesetzliche Darlehensobergrenze für 0%-Finanzierungen.",
    sec10_card2_h3: "Teilanspruch bei bestehendem VA-Kredit",
    sec10_card2_p: "Besteht bereits ein VA-Kredit, gelten die regionalen Obergrenzen für den Restanspruch :",
    sec10_formulas: [
      "Restgarantie = max(0, County-Grenze × 25 % - Verwendeter Anspruch)",
      "Maximaler Kaufpreis bei 0 % Anzahlung = Restgarantie × 4",
      "Erforderliche Anzahlung = max(0, (Kaufpreis - Maximaler Kaufpreis) × 25 %)"
    ],
    sec11_h2: "11. Tilgungsbeschleunigung : Zweiwöchentliche Zahlung und Sondertilgungen",
    sec11_card1_h3: "Zweiwöchentlicher Zahlungsrhythmus",
    sec11_card1_p: "Alle zwei Wochen die halbe Monatsrate zahlen spart bei 510.750 $ zu 6.5 % ca. 150.027 $ Zinsen und verkürzt die Laufzeit um 5,8 Jahre.",
    sec11_card2_h3: "Monatliche Sondertilgungen",
    sec11_card2_p: "Monatlich 200 $ zusätzlich tilgen spart 118.241 $ Zinsen und verkürzt die Laufzeit um 55 Monate (4,6 Jahre).",
    sec12_h2: "12. Vereinfachte Umschuldung (VA IRRRL Streamline)",
    sec12_p: "Das IRRRL-Programm senkt den Zinssatz ohne Wertermittlung mit reduzierter Gebühr von 0.50 % :",
    sec12_boxTitle: "Beispiel IRRRL (350.000 $ Restschuld, Zinssenkung von 7.25 % auf 6.00 %) :",
    sec12_grid: [
      { label: "Monatliche Ersparnis", val: "279 $ / Monat" },
      { label: "Amortisationszeit", val: "17 Monate" },
      { label: "5-Jahres-Nettoersparnis", val: "11.990 $" }
    ],
    sec12_note: "*Hinweis : Ein Neustart der 30-jährigen Laufzeit kann die Gesamtzinslast erhöhen, falls das Vordarlehen bereits weit getilgt war.",
    sec13_h2: "13. Dienstzeitvoraussetzungen",
    sec13_cards: [
      { title: "Kriegseinsatz", desc: "Mindestens 90 zusammenhängende Tage aktiver Dienst in anerkannten Kriegszeiten." },
      { title: "Friedenszeiten", desc: "Mindestens 181 zusammenhängende Tage aktiver Militärdienst in Friedenszeiten." },
      { title: "Nationalgarde / Reserve", desc: "Mindestens 6 anerkannte Dienstjahre oder 90 Tage Dienst nach Title 10/32." }
    ],
    sec14_h2: "14. Häufige Fehler bei VA-Darlehen",
    sec14_mistakes: [
      "Falsche Angabe von Erstnutzung oder Folgenutzung.",
      "Unterschätzen der Fördergebührenhöhe bei niedriger Anzahlung.",
      "Vergessen, dass Mitfinanzierung die Darlehenssumme und Monatszinsen erhöht.",
      "Nur die P&I-Rate mit der PITI-Gesamtrate anderer Kredite vergleichen.",
      "Regionale Obergrenzen ohne Prüfung jährlicher Anpassungen übernehmen.",
      "Die Onlinesimulation mit einem amtlichen Certificate of Eligibility verwechseln.",
      "Zweiwöchentliche Tilgungsverrechnung ungeprüft als garantiert ansehen.",
      "Laufzeitverlängerungen bei IRRRL-Umschuldungen ignorieren.",
      "Invaliditätsbefreiung ohne amtlichen Bescheid ansetzen.",
      "Annehmen, dass VA immer günstiger ist als 20 % Eigenkapital bei konventionellen Krediten."
    ],
    sec15_noticeTitle: "Rechtlicher Rahmen und Pädagogischer Hinweis",
    sec15_noticeText: "VA-Hypothekendarlehen unterliegen Title 38 des US Code und dem VA Lenders Handbook. Dieser Rechner stellt unverbindliche Modellrechnungen bereit.",
    overlayInputs: {
      homePrice: "Kaufpreis der Immobilie",
      downPaymentPercent: "Anzahlungsquote (%)",
      interestRate: "Fester Sollzinssatz (%)",
      loanTermYears: "Darlehenslaufzeit (Jahre)",
      militaryCategory: "Militärische Dienstkategorie",
      vaUsageType: "Nutzung des VA-Anspruchs (Erst / Folge)",
      isDisabilityExempt: "Befreiung bei Dienstbeschädigung (0 % Gebühr)",
      financeFundingFee: "Gebühr im Darlehen mitfinanzieren",
      propertyTaxRate: "Grundsteuersatz (%)",
      homeInsuranceAnnual: "Wohngebäudeversicherung p.a. ($)",
      monthlyHoa: "Monatliches Hausgeld ($)"
    },
    overlayOutputs: {
      baseLoanAmount: "Basisdarlehensbetrag",
      fundingFeeAmount: "VA-Fördergebühr ($)",
      totalFinancedLoan: "Gesamtes finanziertes Darlehen",
      monthlyPrincipalInterest: "Monatliche Rate (Zins + Tilgung)",
      totalMonthlyPiti: "Monatliche PITI-Gesamtrate",
      vaFundingFeePercent: "Angewendeter Gebührensatz (%)",
      lifetimeSavingsVsFha: "Geschätzte Gesamtersparnis vs. FHA"
    }
  },
  hi: {
    title: "वीए मॉर्गेज कैलकुलेटर (VA Mortgage Calculator)",
    metaDesc: "0% डाउन पेमेंट वाले वीए (VA) ऋण, फंडिंग शुल्क (Funding Fee), PITI मासिक किस्त, विकलांगता छूट और ऋण तुलना की गणना करें।",
    keywords: ["वीए मॉर्गेज कैलकुलेटर", "सैनिक गृह ऋण", "va funding fee calculator", "मिल्ट्री लोन"],
    faqs: [
      { question: "वीए (VA) मॉर्गेज क्या है और कौन पात्र है?", answer: "यह अमेरिकी सैन्य कर्मियों, दिग्गजों और पात्र जीवनसाथियों के लिए सरकार द्वारा समर्थित गृह ऋण है।" },
      { question: "क्या वीए ऋण में डाउन पेमेंट अनिवार्य है?", answer: "नहीं, वीए ऋण 0% डाउन पेमेंट (बिना किसी अग्रिम भुगतान) और बिना PMI बीमा के 100% वित्तपोषण की अनुमति देता है।" },
      { question: "वीए फंडिंग शुल्क क्या है?", answer: "यह एकमुश्त सरकारी शुल्क (1.25% से 3.30%) है जो मासिक बीमा की जगह लेता है।" },
      { question: "फंडिंग शुल्क से किसे छूट प्राप्त है?", answer: "सेवा-संबंधी विकलांगता वाले दिग्गजों (10%+), पर्पल हार्ट प्राप्तकर्ताओं और पात्र आश्रितों को।" },
      { question: "क्या शुल्क को ऋण में शामिल करना चाहिए या नकद देना चाहिए?", answer: "ऋण में शामिल करने से तुरंत नकद बचता है लेकिन मासिक ब्याज और ऋण राशि बढ़ जाती है।" },
      { question: "प्रथम उपयोग और पुन: उपयोग में क्या अंतर है?", answer: "0% डाउन पर प्रथम उपयोग में 2.15% और बाद के उपयोगों में 3.30% शुल्क लगता है। 5%+ डाउन पर दोनों 1.50% हो जाते हैं।" },
      { question: "क्या वीए ऋण में मासिक PMI बीमा लगता है?", answer: "नहीं, वीए ऋणों में कभी भी मासिक PMI बीमा नहीं लगता।" },
      { question: "IRRRL रीफाइनेंस क्या है?", answer: "बिना मूल्यांकन और मात्र 0.50% शुल्क पर ब्याज दर घटाने की सरल रीफाइनेंस प्रक्रिया।" },
      { question: "एंटाइटेलमेंट (Entitlement) क्या है?", answer: "यह सरकारी गारंटी है; पूर्ण अधिकार होने पर 0% डाउन पर कोई ऋण सीमा नहीं होती।" },
      { question: "न्यूनतम सेवा आवश्यकताएं क्या हैं?", answer: "युद्धकाल में 90 दिन, शांतिकाल में 181 दिन या रिजर्व में 6 वर्ष।" },
      { question: "FHA और कन्वेंशनल से यह कैसे बेहतर है?", answer: "FHA के स्थायी मासिक शुल्क से बचाता है और कन्वेंशनल के 5%–20% डाउन पेमेंट की आवश्यकता को समाप्त करता है।" },
      { question: "तेजी से ऋण कैसे चुकाएं?", answer: "पाक्षिक (bi-weekly) भुगतान या मासिक अतिरिक्त मूलधन भुगतान द्वारा।" }
    ],
    pIntro: "वीए मॉर्गेज किस्त, फंडिंग शुल्क, PITI मासिक खर्च, 0% डाउन क्रय क्षमता, भुगतान त्वरण और IRRRL रीफाइनेंस बचत का विस्तृत विश्लेषण।",
    sec1_h2: "1. वीए (VA) मॉर्गेज कैलकुलेटर क्या है?",
    sec1_p: "यह कैलकुलेटर अमेरिकी वेटरन्स अफेयर्स विभाग द्वारा समर्थित सैन्य गृह ऋण की मासिक और दीर्घकालिक लागत का आकलन करता है।",
    sec1_noticeTitle: "योजना मॉडल सूचना",
    sec1_noticeText: "यह एक गणितीय सिमुलेशन है और आधिकारिक पात्रता प्रमाण पत्र (COE) नहीं है।",
    sec2_h2: "2. वीए कैलकुलेटर का उपयोग कैसे करें",
    sec2_p: "अपने ऋण परिदृश्य का विश्लेषण करने के लिए इन चरणों का पालन करें :",
    sec2_steps: [
      "1. घर का खरीद मूल्य दर्ज करें।",
      "2. डाउन पेमेंट प्रतिशत (0% से 100%) चुनें।",
      "3. सैन्य श्रेणी चुनें (सक्रिय/वेटरन, रिजर्व या जीवनसाथी)।",
      "4. प्रथम उपयोग या पुन: उपयोग चुनें।",
      "5. निश्चित ब्याज दर और अवधि दर्ज करें।",
      "6. फंडिंग शुल्क का प्रकार चुनें (ऋण में वित्तपोषित या नकद भुगतान)।",
      "7. विकलांगता छूट विकल्प का चयन करें यदि लागू हो।",
      "8. कुल वित्तपोषित राशि और PITI मासिक किस्त की समीक्षा करें।",
      "9. संपूर्ण परिशोधन तालिका का निरीक्षण करें।",
      "10. FHA और कन्वेंशनल ऋणों से तुलना करें।",
      "11. 0% डाउन क्षमता के लिए एंटाइटेलमेंट की जांच करें।",
      "12. पाक्षिक भुगतानों से ब्याज बचत देखें।",
      "13. अतिरिक्त मूलधन भुगतानों का अनुकरण करें।",
      "14. IRRRL रीफाइनेंस बचत का मूल्यांकन करें।"
    ],
    sec3_h2: "3. मुख्य परिशोधन सूत्र एवं PITI गणना",
    sec3_p1: "मासिक मूलधन और ब्याज (P&I) की गणना का सूत्र :",
    sec3_boxTitle: "मासिक मूलधन एवं ब्याज समीकरण",
    sec3_f1: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec3_vars: [
      "M : मासिक मूलधन और ब्याज किस्त।",
      "P : कुल वित्तपोषित ऋण (मूल ऋण + फंडिंग शुल्क)।",
      "r : मासिक ब्याज दर (वार्षिक दर / 12 / 100)।",
      "n : कुल मासिक भुगतानों की संख्या (अवधि × 12)।"
    ],
    sec3_p2: "कुल मासिक आवास खर्च (PITI) सभी लागतों को जोड़ता है :",
    sec3_f2: "कुल PITI = P&I + (संपत्ति कर / 12) + (गृह बीमा / 12) + मासिक सोसाइटी शुल्क",
    sec4_h2: "4. वीए फंडिंग शुल्क (Funding Fee)",
    sec4_p1: "यह कानून द्वारा अनिवार्य एकमुश्त सरकारी शुल्क है जो ऋण गारंटी कार्यक्रम को निधि देता है।",
    sec4_p2: "यह मासिक PMI बीमा को समाप्त करता है और इसे ऋण में शामिल किया जा सकता है या नकद दिया जा सकता है।",
    sec5_h2: "5. प्रथम उपयोग बनाम पुन: उपयोग",
    sec5_p: "पूर्व उपयोग के आधार पर 0% डाउन पर शुल्क भिन्न होता है :",
    sec5_card1_h3: "प्रथम उपयोग (0% डाउन)",
    sec5_card1_p: "500,000 $ पर 2.15% (10,750 $) शुल्क लगता है। कुल ऋण 510,750 $ और मासिक PITI 3,936.62 $ होता है।",
    sec5_card2_h3: "पुन: उपयोग (0% डाउन)",
    sec5_card2_p: "दोबारा उपयोग पर 3.30% (16,500 $) शुल्क लगता है। कुल ऋण 516,500 $ और PITI 3,973.13 $ होता है।",
    sec5_note: "*नोट : 5%+ डाउन पेमेंट पर दोनों स्थितियों में शुल्क घटकर 1.50% हो जाता है।",
    sec6_h2: "6. वैधानिक वीए फंडिंग शुल्क तालिका",
    sec6_headers: ["डाउन पेमेंट श्रेणी", "प्रथम उपयोग", "पुन: उपयोग", "छूट प्राप्त दर"],
    sec6_rows: [
      { tier: "< 5% डाउन (0% Down)", first: "2.15%", sub: "3.30%", exempt: "0.00% (छूट)" },
      { tier: "5% – 9.99% डाउन", first: "1.50%", sub: "1.50%", exempt: "0.00% (छूट)" },
      { tier: "≥ 10% डाउन", first: "1.25%", sub: "1.25%", exempt: "0.00% (छूट)" }
    ],
    sec7_h2: "7. फंडिंग शुल्क से वैधानिक छूट (0% शुल्क)",
    sec7_p: "संघीय कानून के तहत निम्नलिखित श्रेणियां पूरी तरह से शुल्क-मुक्त हैं :",
    sec7_boxTitle: "छूट के पात्र :",
    sec7_items: [
      "सेवा-संबंधी विकलांगता (10%+) के लिए VA मुआवजा पाने वाले वेटरन्स।",
      "विकलांगता मुआवजे के पात्र सैन्य सेवानिवृत्त।",
      "पर्पल हार्ट प्राप्त सक्रिय सैनिक।",
      "शहीद सैनिकों के पात्र जीवनसाथी (DIC प्राप्तकर्ता)।"
    ],
    sec8_h2: "8. तुलना : शुल्क का वित्तपोषण बनाम नकद भुगतान",
    sec8_p: "प्रारंभिक नकदी और दीर्घकालिक ब्याज का संतुलन :",
    sec8_card1_h3: "ऋण में वित्तपोषित",
    sec8_card1_p: "500,000 $ पर 3.30% (16,500 $) जोड़ने से ऋण 516,500 $ और किस्त 3,264.80 $ हो जाती है। क्लोजिंग पर नकद 12,500 $ रहता है।",
    sec8_card2_h3: "क्लोजिंग पर नकद भुगतान",
    sec8_card2_p: "16,500 $ नकद देने से ऋण 500,000 $ और किस्त 3,160.34 $ रहती है, लेकिन क्लोजिंग नकद बढ़कर 29,000 $ हो जाता है।",
    sec9_h2: "9. 3-तरफा तुलना : VA बनाम FHA बनाम कन्वेंशनल",
    sec9_headers: ["कार्यक्रम", "न्यूनतम डाउन", "मासिक बीमा", "अग्रिम शुल्क", "30 वर्षीय कुल खर्च"],
    sec9_rows: [
      { prog: "VA ऋण", minDown: "0% (0 $)", pmi: "0 $ (कोई PMI नहीं)", fee: "2.15% वित्तपोषित (10,750 $)", total: "1,357,200 $ (3,770 $/माह)" },
      { prog: "FHA ऋण", minDown: "3.5% (17,500 $)", pmi: "0.55% स्थायी MIP", fee: "1.75% UFMIP (8,444 $)", total: "1,421,640 $ (3,949 $/माह)" },
      { prog: "कन्वेंशनल", minDown: "5.0% (25,000 $)", pmi: "0.60% PMI (वर्ष 1-8)", fee: "0 $ अग्रिम शुल्क", total: "1,356,903 $ (3,943 $/माह)" }
    ],
    sec9_expl: "वीए ऋण स्थायी मासिक शुल्क न होने से FHA से 64,440 $ बचाता है और बिना 25,000 $ नकद दिए कन्वेंशनल ऋण के बराबर लागत देता है।",
    sec10_h2: "10. एंटाइटेलमेंट एवं 0% डाउन क्रय क्षमता",
    sec10_p: "एंटाइटेलमेंट 0% डाउन पर उपलब्ध अधिकतम गारंटी निर्धारित करता है :",
    sec10_card1_h3: "पूर्ण एंटाइटेलमेंट",
    sec10_card1_p: "2019 के कानून के बाद पूर्ण अधिकार वाले वेटरन्स के लिए कोई अधिकतम ऋण सीमा नहीं है।",
    sec10_card2_h3: "आंशिक एंटाइटेलमेंट",
    sec10_card2_p: "सक्रिय ऋण होने पर काउंटी सीमाएं लागू होती हैं :",
    sec10_formulas: [
      "शेष गारंटी = max(0, काउंटी सीमा × 25% - प्रयुक्त एंटाइटेलमेंट)",
      "0% डाउन पर अधिकतम खरीद मूल्य = शेष गारंटी × 4",
      "आवश्यक डाउन पेमेंट = max(0, (लक्ष्य मूल्य - अधिकतम 0% मूल्य) × 25%)"
    ],
    sec11_h2: "11. भुगतान त्वरण : पाक्षिक भुगतान और अतिरिक्त किस्तें",
    sec11_card1_h3: "पाक्षिक (Bi-Weekly) भुगतान",
    sec11_card1_p: "हर 2 सप्ताह में आधी किस्त देने से 510,750 $ पर 150,027 $ ब्याज बचता है और अवधि 5.8 वर्ष कम होती है।",
    sec11_card2_h3: "मासिक अतिरिक्त मूलधन भुगतान",
    sec11_card2_p: "200 $/माह अतिरिक्त देने से 118,241 $ ब्याज बचता है और अवधि 55 महीने (4.6 वर्ष) कम होती है।",
    sec12_h2: "12. वीए IRRRL स्ट्रीमलाइन रीफाइनेंस",
    sec12_p: "बिना मूल्यांकन और मात्र 0.50% शुल्क पर दर घटाने की सुविधा :",
    sec12_boxTitle: "IRRRL उदाहरण (350,000 $ शेष, दर 7.25% से 6.00%) :",
    sec12_grid: [
      { label: "मासिक बचत", val: "279 $ / माह" },
      { label: "लागत वसूली समय", val: "17 महीने" },
      { label: "5 वर्षीय शुद्ध बचत", val: "11,990 $" }
    ],
    sec12_note: "*नोट : अवधि को दोबारा 30 वर्ष करने से कुल ब्याज बढ़ सकता है।",
    sec13_h2: "13. पात्रता एवं सेवा मानक",
    sec13_cards: [
      { title: "युद्धकालीन सेवा", desc: "युद्ध काल में कम से कम 90 दिन की निरंतर सक्रिय सेवा।" },
      { title: "शांतिकालीन सेवा", desc: "शांतिकालीन अवधि में कम से कम 181 दिन की निरंतर सेवा।" },
      { title: "नेशनल गार्ड / रिजर्व", desc: "कम से कम 6 वर्ष की सेवा या 90 दिन की सक्रिय सेवा।" }
    ],
    sec14_h2: "14. सामान्य गलतियों से बचें",
    sec14_mistakes: [
      "प्रथम उपयोग या पुन: उपयोग का गलत चयन करना।",
      "सभी के लिए समान शुल्क मान लेना।",
      "यह भूल जाना कि शुल्क वित्तपोषण से मूलधन और ब्याज बढ़ता है।",
      "वीए की P&I की तुलना अन्य ऋणों के कुल PITI से करना।",
      "काउंटी सीमाओं को अपरिवर्तनीय मान लेना।",
      "सिमुलेशन को आधिकारिक पात्रता प्रमाण पत्र समझना।",
      "पाक्षिक भुगतानों को बिना बैंक पुष्टि के लागू मान लेना।",
      "IRRRL में अवधि विस्तार के प्रभाव को नजरअंदाज करना।",
      "विकलांगता छूट का दस्तावेजी प्रमाण न होना।",
      "20%+ डाउन पेमेंट होने पर भी अन्य विकल्पों की जांच न करना।"
    ],
    sec15_noticeTitle: "शैक्षणिक मार्गदर्शन एवं विनियामक सूचना",
    sec15_noticeText: "वीए ऋण अमेरिकी संहिता के शीर्षक 38 और वीए नियमों द्वारा शासित हैं। यह कैलकुलेटर केवल नियोजन सिमुलेशन प्रदान करता है।",
    overlayInputs: {
      homePrice: "घर का खरीद मूल्य",
      downPaymentPercent: "डाउन पेमेंट प्रतिशत (%)",
      interestRate: "निश्चित ब्याज दर (%)",
      loanTermYears: "ऋण अवधि (वर्ष)",
      militaryCategory: "सैन्य सेवा श्रेणी",
      vaUsageType: "वीए उपयोग प्रकार (प्रथम / पुन:)",
      isDisabilityExempt: "विकलांगता छूट (0% शुल्क)",
      financeFundingFee: "शुल्क को ऋण में शामिल करें",
      propertyTaxRate: "संपत्ति कर दर (%)",
      homeInsuranceAnnual: "वार्षिक गृह बीमा ($)",
      monthlyHoa: "मासिक सोसाइटी शुल्क ($)"
    },
    overlayOutputs: {
      baseLoanAmount: "मूल ऋण राशि",
      fundingFeeAmount: "वीए फंडिंग शुल्क ($)",
      totalFinancedLoan: "कुल वित्तपोषित ऋण",
      monthlyPrincipalInterest: "मासिक किस्त (मूलधन + ब्याज)",
      totalMonthlyPiti: "कुल मासिक खर्च (PITI)",
      vaFundingFeePercent: "लागू शुल्क प्रतिशत (%)",
      lifetimeSavingsVsFha: "FHA की तुलना में कुल बचत"
    }
  },
  pt: {
    title: "Calculadora de Financiamento VA (Militares)",
    metaDesc: "Calcule financiamentos VA com 0% de entrada, taxa de financiamento (Funding Fee), parcelas PITI, isenções por invalidez e comparativo triplo.",
    keywords: ["calculadora financiamento va", "emprestimo militar va", "taxa funding fee va", "financiamento imobiliario sem entrada"],
    faqs: [
      { question: "O que é um financiamento VA e quem tem direito?", answer: "É um crédito imobiliário garantido pelo Departamento de Assuntos de Veteranos para militares da ativa, veteranos e cônjuges qualificados." },
      { question: "É necessária entrada?", answer: "Não, os empréstimos VA permitem financiar até 100% do imóvel sem entrada (0% down) e sem cobrança de seguro PMI." },
      { question: "O que é a taxa de financiamento VA (Funding Fee)?", answer: "Taxa governamental única (1.25% a 3.30%) que substitui o seguro mensal e sustenta o fundo garantidor." },
      { question: "Quem tem isenção da taxa VA?", answer: "Veteranos com invalidez comprovada decorrente do serviço (10%+), condecorados com o Purple Heart e viúvos(as) qualificados." },
      { question: "Compensa financiar a taxa ou pagar à vista?", answer: "Financiar preserva liquidez imediata, mas aumenta o saldo devedor e os juros pagos ao longo de 30 anos." },
      { question: "Qual a diferença entre primeiro uso e uso subsequente?", answer: "Sem entrada, o primeiro uso cobra 2.15% e os usos posteriores 3.30%. A partir de 5% de entrada, ambas as taxas caem para 1.50%." },
      { question: "O empréstimo VA tem cobrança mensal de PMI?", answer: "Não, financiamentos VA são isentos de seguro mensal PMI." },
      { question: "O que é o refinanciamento IRRRL?", answer: "Processo simplificado para redução de juros sem necessidade de vistoria e com taxa reduzida de apenas 0.50%." },
      { question: "Como funciona a garantia (Entitlement)?", answer: "Representa a cobertura estatal; com direito pleno não há teto para compras com 0% de entrada." },
      { question: "Quais são os requisitos mínimos de serviço militar?", answer: "Geralmente 90 dias em tempo de guerra, 181 dias em tempo de paz ou 6 anos na Reserva/Guarda Nacional." },
      { question: "Como se compara aos financiamentos FHA e convencionais?", answer: "Supera o FHA pela isenção de seguro mensal e supera o convencional por dispensar a entrada de 5% a 20%." },
      { question: "Como acelerar a quitação do empréstimo VA?", answer: "Adotando pagamentos quinzenais ou aportes mensais extraordinários de amortização." }
    ],
    pIntro: "Calcule prestações de crédito VA, taxas de financiamento (Funding Fee), encargo total PITI, poder de compra com 0% de entrada, amortização acelerada e refinanciamento IRRRL.",
    sec1_h2: "1. O que é uma Calculadora de Hipoteca VA?",
    sec1_p: "Esta ferramenta projeta as parcelas e o custo total de financiamentos imobiliários garantidos pelo governo para militares e veteranos. Modela taxas legais de financiamento, IPTU, seguros e planos de amortização.",
    sec1_noticeTitle: "Aviso do Modelo Financeiro",
    sec1_noticeText: "Este simulador tem caráter educacional e não substitui o Certificado de Elegibilidade (COE).",
    sec2_h2: "2. Como Usar a Calculadora VA",
    sec2_p: "Siga este roteiro para avaliar seu financiamento :",
    sec2_steps: [
      "1. Informe o preço de compra do imóvel.",
      "2. Defina o percentual de entrada planejado (0% a 100%).",
      "3. Escolha sua categoria militar (Ativa/Veterano, Reserva ou Cônjuge).",
      "4. Indique se é o primeiro uso ou uso subsequente do benefício.",
      "5. Insira a taxa de juros fixa e o prazo do contrato em anos.",
      "6. Opte por financiar a taxa VA ou pagá-la à vista no fechamento.",
      "7. Ative a isenção por invalidez militar caso seja aplicável.",
      "8. Analise o capital financiado, a parcela P&I e o valor total PITI.",
      "9. Inspecione a tabela de amortização completa.",
      "10. Compare com as modalidades FHA e convencional.",
      "11. Calcule a capacidade com 0% de entrada pelo módulo de Entitlement.",
      "12. Simule a quitação acelerada com pagamentos quinzenais.",
      "13. Teste aportes extras de amortização mensal.",
      "14. Avalie a economia no refinanciamento IRRRL."
    ],
    sec3_h2: "3. Fórmula de Amortização e Composição PITI",
    sec3_p1: "A prestação mensal fixa de principal e juros (P&I) é calculada por :",
    sec3_boxTitle: "Fórmula da Parcela Mensal (Amortização + Juros)",
    sec3_f1: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec3_vars: [
      "M : Parcela mensal de amortização e juros.",
      "P : Valor total financiado (Financiamento Base + Taxa VA Financiada).",
      "r : Taxa de juros mensal (Taxa Anual / 12 / 100).",
      "n : Número de parcelas mensais (Prazo × 12)."
    ],
    sec3_p2: "O encargo mensal total habitacional (PITI) inclui os custos tributários e securitários :",
    sec3_f2: "Total PITI Mensual = P&I + (IPTU / 12) + (Seguro / 12) + Condomínio",
    sec4_h2: "4. Taxa de Financiamento VA (Funding Fee)",
    sec4_p1: "Taxa governamental única obrigatória por lei (38 U.S.C. § 3729) que mantém o fundo de garantia estatal.",
    sec4_p2: "Substitui a necessidade de entrada e seguro PMI mensal, podendo ser financiada ou paga no fechamento.",
    sec5_h2: "5. Primeiro Uso vs. Uso Subsequente",
    sec5_p: "O histórico de uso do benefício altera a alíquota aplicável sem entrada :",
    sec5_card1_h3: "Primeiro Uso (0% de Entrada)",
    sec5_card1_p: "Em 500.000 $, a taxa legal é de 2,15% (10.750 $). O saldo financiado fica em 510.750 $, gerando parcela P&I de 3.228,29 $ e PITI total de 3.936,62 $/mês.",
    sec5_card2_h3: "Uso Subsequente (0% de Entrada)",
    sec5_card2_p: "Em operações subsequentes sem entrada, a taxa sobe para 3,30% (16.500 $). O saldo sobe para 516.500 $ e o PITI para 3.973,13 $/mês.",
    sec5_note: "*Nota : Com 5% ou mais de entrada, a taxa de uso subsequente é reduzida para 1,50% (igual ao primeiro uso).",
    sec6_h2: "6. Tabela Legal de Alíquotas da Taxa VA",
    sec6_headers: ["Faixa de Entrada", "Primeiro Uso", "Uso Subsequente", "Alíquota Isenta"],
    sec6_rows: [
      { tier: "< 5% Entrada (0% Down)", first: "2.15%", sub: "3.30%", exempt: "0.00% (Isento)" },
      { tier: "5% – 9.99% Entrada", first: "1.50%", sub: "1.50%", exempt: "0.00% (Isento)" },
      { tier: "≥ 10% Entrada", first: "1.25%", sub: "1.25%", exempt: "0.00% (Isento)" }
    ],
    sec7_h2: "7. Isenções Legais da Taxa de Financiamento (Taxa 0%)",
    sec7_p: "Determinados beneficiários são isentos do pagamento desta taxa :",
    sec7_boxTitle: "Quem tem Direito à Isenção :",
    sec7_items: [
      "Veteranos com pensão por incapacidade ligada ao serviço militar (10%+).",
      "Veteranos aptos à indenização por invalidez que recebem proventos de reserva.",
      "Militares da ativa condecorados com o Purple Heart.",
      "Cônjuges sobreviventes de militares falecidos em serviço (recebedores de DIC)."
    ],
    sec8_h2: "8. Comparativo : Financiar a Taxa vs. Pagamento à Vista",
    sec8_p: "Pesar a liquidez imediata contra o custo acumulado de juros :",
    sec8_card1_h3: "Financiada no Contrato",
    sec8_card1_p: "Em 500.000 $ com 3,30% de taxa (16.500 $), o saldo financiado vai para 516.500 $ e a parcela para 3.264,80 $. O desembolso inicial fica em 12.500 $.",
    sec8_card2_h3: "Paga à Vista no Fechamento",
    sec8_card2_p: "Pagar os 16.500 $ à vista mantém a dívida em 500.000 $ e a parcela em 3.160,34 $, exigindo 29.000 $ de recursos iniciais.",
    sec9_h2: "9. Comparativo 3-Vias : Financiamento VA vs. FHA vs. Convencional",
    sec9_headers: ["Programa", "Entrada Mínima", "Seguro Mensal", "Taxa Inicial", "Gasto Total em 30 Anos"],
    sec9_rows: [
      { prog: "Financiamento VA", minDown: "0% (0 $)", pmi: "0 $ (Sem PMI)", fee: "2.15% Financiado (10.750 $)", total: "1.357.200 $ (3.770 $/mês)" },
      { prog: "Financiamento FHA", minDown: "3.5% (17.500 $)", pmi: "0.55% MIP Permanente", fee: "1.75% UFMIP (8.444 $)", total: "1.421.640 $ (3.949 $/mês)" },
      { prog: "Convencional", minDown: "5.0% (25.000 $)", pmi: "0.60% PMI (Anos 1-8)", fee: "0 $ Taxa Inicial", total: "1.356.903 $ (3.943 $/mês)" }
    ],
    sec9_expl: "O financiamento VA economiza 64.440 $ em relação ao FHA pela ausência de seguro mensal permanente e empata com o convencional sem exigir 25.000 $ de entrada.",
    sec10_h2: "10. Garantia (Entitlement) e Poder de Compra com 0% de Entrada",
    sec10_p: "O Entitlement define a capacidade de compra garantida sem entrada :",
    sec10_card1_h3: "Garantia Plena",
    sec10_card1_p: "Com garantia plena, não há limite máximo legal para financiamentos com 0% de entrada.",
    sec10_card2_h3: "Garantia Parcial",
    sec10_card2_p: "Havendo outro financiamento VA ativo, aplicam-se os limites regionais para calcular o saldo remanescente :",
    sec10_formulas: [
      "Garantia Remanescente = max(0, Teto Regional × 25% - Garantia Utilizada)",
      "Preço Máximo com 0% Entrada = Garantia Remanescente × 4",
      "Entrada Exigida = max(0, (Preço Alvo - Preço Máximo com 0%) × 25%)"
    ],
    sec11_h2: "11. Amortização Acelerada : Pagamentos Quinzenais e Aportes Extras",
    sec11_card1_h3: "Pagamento Quinzenal",
    sec11_card1_p: "Pagar metade da parcela a cada 2 semanas (26 pagamentos/ano) economiza 150.027 $ em juros e encurta o prazo em 5,8 anos.",
    sec11_card2_h3: "Aportes Extras Mensais de Amortização",
    sec11_card2_p: "Aportar 200 $/mês adicionais economiza 118.241 $ em juros e reduz o contrato em 55 meses (4,6 anos).",
    sec12_h2: "12. Refinanciamento Simplificado VA IRRRL",
    sec12_p: "O IRRRL permite reduzir juros sem vistoria com taxa reduzida de apenas 0,50% :",
    sec12_boxTitle: "Exemplo IRRRL (Saldo 350.000 $, redução de 7.25% para 6.00%) :",
    sec12_grid: [
      { label: "Economia Mensal", val: "279 $ / mês" },
      { label: "Prazo de Retorno", val: "17 Meses" },
      { label: "Ganho Líquido em 5 Anos", val: "11.990 $" }
    ],
    sec12_note: "*Nota : Reiniciar o prazo em 30 anos pode elevar os juros totais se o financiamento original já estiver avançado.",
    sec13_h2: "13. Requisitos Mínimos de Serviço",
    sec13_cards: [
      { title: "Serviço em Tempo de Guerra", desc: "Mínimo de 90 dias consecutivos de serviço ativo em períodos bélicos." },
      { title: "Serviço em Tempo de Paz", desc: "Mínimo de 181 dias contínuos de serviço militar ativo em tempos de paz." },
      { title: "Guarda Nacional e Reserva", desc: "Mínimo de 6 anos computáveis ou 90 dias de serviço ativo federal." }
    ],
    sec14_h2: "14. Erros Comuns a Evitar",
    sec14_mistakes: [
      "Informar incorretamente primeiro uso ou uso subsequente do crédito.",
      "Supor taxa idêntica para todos os solicitantes sem checar a entrada.",
      "Esquecer que financiar a taxa eleva o principal e os juros mensais.",
      "Comparar apenas a parcela P&I da VA com o PITI total de outros empréstimos.",
      "Considerar tetos regionais fixos sem acompanhar reajustes anuais.",
      "Confundir a simulação online com o Certificado de Elegibilidade oficial (COE).",
      "Presumir que todos os credores aceitam amortização quinzenal direta.",
      "Desconsiderar o impacto do reinício de prazo no refinanciamento IRRRL.",
      "Não apresentar laudo oficial para isenção por invalidez.",
      "Assumir que a VA é sempre a opção mais barata tendo mais de 20% de entrada."
    ],
    sec15_noticeTitle: "Orientação Educacional e Marco Regulatório",
    sec15_noticeText: "Os empréstimos VA são regulados pelo Título 38 do Código dos EUA. Esta ferramenta fornece simulações matemáticas para fins de planejamento.",
    overlayInputs: {
      homePrice: "Preço de Compra do Imóvel",
      downPaymentPercent: "Percentual de Entrada (%)",
      interestRate: "Taxa de Juros Fixa (%)",
      loanTermYears: "Prazo do Financiamento (Anos)",
      militaryCategory: "Categoria de Serviço Militar",
      vaUsageType: "Uso do Benefício VA (1º / Subsequente)",
      isDisabilityExempt: "Isenção por Invalidez (0% Taxa)",
      financeFundingFee: "Financiar Taxa no Contrato",
      propertyTaxRate: "Alíquota de IPTU (%)",
      homeInsuranceAnnual: "Seguro Habitacional Anual ($)",
      monthlyHoa: "Taxa de Condomínio ($)"
    },
    overlayOutputs: {
      baseLoanAmount: "Valor do Financiamento Base",
      fundingFeeAmount: "Taxa de Financiamento VA ($)",
      totalFinancedLoan: "Total do Financiamento",
      monthlyPrincipalInterest: "Parcela (Amortização + Juros)",
      totalMonthlyPiti: "Encargo Mensal Total (PITI)",
      vaFundingFeePercent: "Alíquota de Taxa Aplicada (%)",
      lifetimeSavingsVsFha: "Economia Total Estimada vs. FHA"
    }
  }
};

for (const loc of LOCALES) {
  const d = VA_DATA[loc];
  const contentCode = `"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(d.faqs, null, 2)};

export const seo = {
  title: "${d.title} — ${d.sec9_rows[0].prog}",
  description: "${d.metaDesc}",
  keywords: ${JSON.stringify(d.keywords)}
};

export const ContentComponent = function VAMortgageContent${loc.toUpperCase()}() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          ${d.pIntro}
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec1_h2}
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec1_p}
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>${d.sec1_noticeTitle}</span>
          </div>
          <p>
            ${d.sec1_noticeText}
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec2_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec2_p}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          ${d.sec2_steps.map((step, idx) => `
            <div key={${idx}} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">${step}</span>
            </div>`).join("")}
        </div>
      </section>

      {/* 4. CORE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec3_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec3_p1}
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">${d.sec3_boxTitle}</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"${d.sec3_f1}"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            ${d.sec3_vars.map(v => `<div>• <strong>${v.split(':')[0]}:</strong> ${v.split(':')[1] || ''}</div>`).join("\n            ")}
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec3_p2}
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"${d.sec3_f2}"}
        </div>
      </section>

      {/* 5. FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec4_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec4_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec4_p2}
        </p>
      </section>

      {/* 6. FIRST VS SUBSEQUENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec5_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec5_p}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">${d.sec5_card1_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec5_card1_p}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">${d.sec5_card2_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec5_card2_p}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          ${d.sec5_note}
        </p>
      </section>

      {/* 7. STATUTORY MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec6_h2}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">${d.sec6_headers[0]}</th>
                <th className="p-3">${d.sec6_headers[1]}</th>
                <th className="p-3">${d.sec6_headers[2]}</th>
                <th className="p-3 rounded-tr-xl">${d.sec6_headers[3]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              ${d.sec6_rows.map((r, idx) => `
              <tr className="${idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/40' : ''}">
                <td className="p-3 font-bold text-blue-600">{${JSON.stringify(r.tier)}}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{${JSON.stringify(r.first)}}</td>
                <td className="p-3 font-mono font-bold ${r.sub.includes('3.30') ? 'text-red-500' : 'text-slate-800 dark:text-slate-200'}">{${JSON.stringify(r.sub)}}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{${JSON.stringify(r.exempt)}}</td>
              </tr>`).join("\n              ")}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec7_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec7_p}
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">${d.sec7_boxTitle}</span>
          <ul className="space-y-1 list-disc list-inside">
            ${d.sec7_items.map(item => `<li>${item}</li>`).join("\n            ")}
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec8_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec8_p}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">${d.sec8_card1_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec8_card1_p}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">${d.sec8_card2_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec8_card2_p}
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec9_h2}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">${d.sec9_headers[0]}</th>
                <th className="p-3">${d.sec9_headers[1]}</th>
                <th className="p-3">${d.sec9_headers[2]}</th>
                <th className="p-3">${d.sec9_headers[3]}</th>
                <th className="p-3 rounded-tr-xl">${d.sec9_headers[4]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              ${d.sec9_rows.map((r, idx) => `
              <tr className="${idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/40' : ''}">
                <td className="p-3 font-bold text-blue-600">{${JSON.stringify(r.prog)}}</td>
                <td className="p-3 font-bold ${r.minDown.includes('0%') ? 'text-emerald-600' : ''}">{${JSON.stringify(r.minDown)}}</td>
                <td className="p-3 ${r.pmi.includes('0 $') ? 'text-emerald-600 font-bold' : r.pmi.includes('0.55%') ? 'text-red-500' : ''}">{${JSON.stringify(r.pmi)}}</td>
                <td className="p-3">{${JSON.stringify(r.fee)}}</td>
                <td className="p-3 font-mono font-bold ${r.prog.includes('VA') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200'}">{${JSON.stringify(r.total)}}</td>
              </tr>`).join("\n              ")}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          ${d.sec9_expl}
        </p>
      </section>

      {/* 11. ENTITLEMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec10_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec10_p}
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">${d.sec10_card1_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec10_card1_p}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">${d.sec10_card2_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec10_card2_p}
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              ${d.sec10_formulas.map(f => `<div>{"${f}"}</div>`).join("\n              ")}
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec11_h2}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">${d.sec11_card1_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec11_card1_p}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">${d.sec11_card2_h3}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              ${d.sec11_card2_p}
            </p>
          </div>
        </div>
      </section>

      {/* 13. IRRRL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec12_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec12_p}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">${d.sec12_boxTitle}</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            ${d.sec12_grid.map(g => `
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">${g.label}</span>
              <span className="text-emerald-600 font-extrabold">${g.val}</span>
            </div>`).join("\n            ")}
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            ${d.sec12_note}
          </p>
        </div>
      </section>

      {/* 14. SERVICE ELIGIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec13_h2}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          ${d.sec13_cards.map(c => `
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">${c.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">${c.desc}</p>
          </div>`).join("\n          ")}
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec14_h2}
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            ${d.sec14_mistakes.map(m => `<li>${m}</li>`).join("\n            ")}
          </ul>
        </div>
      </section>

      {/* 16. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>${d.sec15_noticeTitle}</span>
        </div>
        <p>
          ${d.sec15_noticeText}
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/va/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_VA_OVERLAY = {
  title: "${d.title}",
  description: "${d.metaDesc}",
  inputs: ${JSON.stringify(d.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(d.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_VA_OVERLAY;
`;
  writeFile(`src/i18n/overlays/va/${loc}.ts`, overlayCode);
}
console.log("✓ Deep VA Mortgage generation complete.");
