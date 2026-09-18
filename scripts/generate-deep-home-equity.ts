import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface HomeEquityTexts {
  title: string;
  metaDesc: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  pIntro: string;
  sec1_h2: string;
  sec1_p1: string;
  sec1_p2: string;
  sec1_noticeTitle: string;
  sec1_noticeText: string;
  sec2_h2: string;
  sec2_p: string;
  sec2_steps: string[];
  sec3_h2: string;
  sec3_p1: string;
  sec3_f1: string;
  sec3_f2: string;
  sec3_p2: string;
  sec3_p3: string;
  sec4_h2: string;
  sec4_p: string;
  sec4_h3_1: string;
  sec4_p_1: string;
  sec4_h3_2: string;
  sec4_p_2: string;
  sec5_h2: string;
  sec5_p1: string;
  sec5_p2: string;
  sec6_h2: string;
  sec6_p1: string;
  sec6_p2: string;
  sec7_h2: string;
  sec7_p1: string;
  sec7_p2: string;
  sec8_h2: string;
  sec8_p1: string;
  sec8_p2: string;
  sec9_h2: string;
  sec9_p1: string;
  sec9_p2: string;
  sec9_p3: string;
  sec10_h2: string;
  sec10_p1: string;
  sec10_p2: string;
  sec10_p3: string;
  sec11_h2: string;
  sec11_p1: string;
  sec11_p2: string;
  sec12_h2: string;
  sec12_p1: string;
  sec12_p2: string;
  sec13_h2: string;
  sec13_p1: string;
  sec13_p2: string;
  sec14_h2: string;
  sec14_p1: string;
  sec14_p2: string;
  sec15_h2: string;
  sec15_p1: string;
  sec15_p2: string;
  sec15_p3: string;
  sec16_h2: string;
  sec16_p1: string;
  sec16_p2: string;
  sec17_h2: string;
  sec17_p1: string;
  sec17_p2: string;
  sec18_h2: string;
  sec18_p: string;
  sec19_h2: string;
  sec19_p: string;
  sec20_h2: string;
  sec20_p: string;
  sec21_h2: string;
  sec21_mistakes: string[];
  sec22_h2: string;
  sec22_formulas: string[];
  sec23_noticeTitle: string;
  sec23_noticeText: string;
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const DATA: Record<typeof LOCALES[number], HomeEquityTexts> = {
  es: {
    title: "Calculadora de Préstamo con Garantía Hipotecaria",
    metaDesc: "Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, CLTV, TAE real, amortización y capacidad de endeudamiento.",
    keywords: ["calculadora de prestamo con garantia hipotecaria", "segunda hipoteca", "calculadora cltv", "valor neto vivienda"],
    faqs: [
      { question: "¿Qué es un préstamo con garantía hipotecaria y cómo funciona?", answer: "Un préstamo con garantía hipotecaria es una segunda hipoteca a tipo fijo que permite obtener una suma global utilizando el valor neto acumulado de su vivienda como garantía." },
      { question: "¿Cuánto puedo solicitar con un préstamo sobre el valor neto de la vivienda?", answer: "La mayoría de las entidades financieras permiten un CLTV máximo del 80% al 85% del valor de tasación de la vivienda menos el saldo de su primera hipoteca." },
      { question: "¿Qué es el CLTV y cómo se calcula?", answer: "El CLTV (Combined Loan-to-Value) es la suma de todas las hipotecas sobre la propiedad dividida entre el valor de mercado tasado de la vivienda." },
      { question: "¿Cómo se calcula la cuota mensual de un préstamo con garantía hipotecaria?", answer: "Se calcula mediante la fórmula estándar de amortización fija basada en el capital prestado, el tipo de interés mensual y el plazo en meses." },
      { question: "¿Qué puntuación crediticia se requiere para calificar?", answer: "Generalmente se requiere una puntuación de crédito de 620 o superior, aunque los mejores tipos de interés exigen 700 o más." },
      { question: "¿En qué se diferencia un préstamo con garantía hipotecaria de una línea de crédito HELOC?", answer: "El préstamo entrega una suma fija con cuota y tipo de interés fijos, mientras que la HELOC es una línea de crédito renovable con tipo variable." },
      { question: "¿En qué se diferencia de una refinanciación con retiro de efectivo (cash-out)?", answer: "La refinanciación sustituye su primera hipoteca por una nueva de mayor importe, mientras que el préstamo con garantía hipotecaria deja intacta su primera hipoteca." },
      { question: "¿Son deducibles de impuestos los intereses del préstamo con garantía hipotecaria?", answer: "Según las normas actuales del IRS, los intereses solo son deducibles si los fondos se utilizan para comprar, construir o mejorar sustancialmente la vivienda que garantiza el préstamo." },
      { question: "¿Puedo amortizar un préstamo con garantía hipotecaria por anticipado?", answer: "Sí, la mayoría de los préstamos permiten amortizaciones anticipadas para reducir el plazo y el coste total de intereses sin penalización." },
      { question: "¿Cuáles son los costes de cierre típicos de una segunda hipoteca?", answer: "Suelen oscilar entre el 2% y el 5% del importe del préstamo e incluyen tasación, costes de originación, búsqueda de títulos y comisiones notariales." },
      { question: "¿Qué ocurre si los precios de la vivienda bajan y el saldo supera el valor del inmueble?", answer: "Entraría en patrimonio negativo (underwater). La obligación de pago mensual permanece intacta, pero no podrá refinanciar ni vender sin aportar capital." },
      { question: "¿Cuánto tiempo se tarda en aprobar y desembolsar el préstamo?", answer: "El proceso suele durar entre 2 y 6 semanas debido a los requisitos de tasación, verificación de ingresos y suscripción hipotecaria." }
    ],
    pIntro: "Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, capacidad máxima de endeudamiento, ratio préstamo-valor combinado (CLTV), TAE real, amortización en dos fases, ahorro por pagos extraordinarios, ratio deuda-ingresos (DTI) y previsiones de valor añadido por reformas.",
    sec1_h2: "1. ¿Qué es una Calculadora de Préstamo con Garantía Hipotecaria?",
    sec1_p1: "Una calculadora de préstamos con garantía hipotecaria estima cuánto puede pedir prestado contra el valor neto acumulado en su propiedad y modela la cuota mensual de una segunda hipoteca a tipo de interés fijo. El cálculo combina el valor de mercado de la vivienda, el saldo de la primera hipoteca, el límite de CLTV, el importe solicitado, el tipo de interés y los costes de cierre.",
    sec1_p2: "Se diferencia fundamentalmente de una línea de crédito con garantía hipotecaria (HELOC). Un préstamo sobre el valor líquido es un préstamo en suma única con pagos fijos y amortización estructurada, mientras que una HELOC es una línea de crédito renovable a tipo variable.",
    sec1_noticeTitle: "Aviso del Modelo de Suscripción",
    sec1_noticeText: "El resultado calculado es una simulación matemática y no un compromiso vinculante de préstamo. Los tipos de interés reales, comisiones y límites de crédito dependen de la evaluación del prestamista.",
    sec2_h2: "2. Cómo Utilizar la Calculadora de Préstamo con Garantía Hipotecaria",
    sec2_p: "Siga estos pasos sistemáticos para evaluar su capacidad de financiación:",
    sec2_steps: [
      "1. Introduzca el valor estimado de mercado de la vivienda.",
      "2. Introduzca el saldo actual de la primera hipoteca.",
      "3. Seleccione el límite máximo de CLTV (80% estándar, 85% o 90%).",
      "4. Elija el Modo A (importe deseado) o el Modo B (capacidad máxima de endeudamiento).",
      "5. Indique el tipo de interés fijo anual y el plazo en años (15 o 30 años).",
      "6. Introduzca los costes de cierre iniciales estimados.",
      "7. Seleccione el tratamiento de los costes de cierre (Efectivo, Deducido o Financiado).",
      "8. Revise la cuota mensual fija calculada.",
      "9. Verifique el capital máximo disponible, el CLTV posterior y la TAE real.",
      "10. Consulte la tabla de amortización completa y expórtela a CSV.",
      "11. Simule pagos extraordinarios para comprobar el ahorro en intereses.",
      "12. Compare el resultado con los escenarios de HELOC y refinanciación cash-out.",
      "13. Compruebe la preparación crediticia mediante el ratio DTI y deducciones fiscales.",
      "14. Guarde el escenario en su historial local antes de probar nuevas cifras."
    ],
    sec3_h2: "3. Valor Neto de la Vivienda y Ratio Préstamo-Valor Combinado (CLTV)",
    sec3_p1: "La fórmula central de capacidad de endeudamiento parte de la deuda total máxima permitida según el límite de CLTV:",
    sec3_f1: "Deuda Total Máxima = Valor de la Vivienda × Límite CLTV",
    sec3_f2: "Capital Máximo Prestado = Deuda Total Máxima - Saldo Primera Hipoteca",
    sec3_p2: "Ejemplo: Para una vivienda de 500.000 $ con una hipoteca existente de 275.000 $ y un límite de CLTV del 80%, la deuda máxima total admisible es de 400.000 $. Restando los 275.000 $ de la primera hipoteca, el capital disponible para la segunda hipoteca es de 125.000 $. El CLTV final resultante es del 80,0% con un 20,0% (100.000 $) de patrimonio protegido.",
    sec3_p3: "Esto permite calcular con precisión el margen de seguridad financiero sin poner en riesgo la vivienda ante variaciones del mercado.",
    sec4_h2: "4. Modo A frente a Modo B: Préstamo Específico frente a Capacidad Máxima",
    sec4_p: "La calculadora permite simular dos enfoques de endeudamiento complementarios:",
    sec4_h3_1: "Modo A — Importe de Préstamo Específico",
    sec4_p_1: "Permite fijar una cantidad exacta (por ejemplo, 125.000 $) para reformas o consolidación de deuda y calcular la cuota exacta requerida.",
    sec4_h3_2: "Modo B — Capacidad Máxima según LTV",
    sec4_p_2: "Calcula automáticamente el importe máximo financiable hasta alcanzar el techo de CLTV establecido (por ejemplo, 80% o 85%).",
    sec5_h2: "5. Fórmula de la Cuota Mensual Fija",
    sec5_p1: "La cuota mensual fija (M) se calcula mediante la fórmula estándar de anualidades financieras:",
    sec5_p2: "M = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el capital prestado, r es el tipo de interés mensual (tipo anual / 12) y n es el número total de pagos mensuales. Para 125.000 $ al 8,50% a 15 años (180 meses), la cuota mensual fija es exactamente 1.230,94 $.",
    sec6_h2: "6. Comportamiento del Motor con Interés Cero",
    sec6_p1: "En escenarios promocionales al 0% de interés, el motor aplica la división lineal directa: M = P / n.",
    sec6_p2: "Para un préstamo de 125.000 $ a 15 años con interés del 0%, la cuota resultante es de 694,44 $ al mes durante 180 meses sin coste por intereses.",
    sec7_h2: "7. Tabla de Amortización de la Segunda Hipoteca",
    sec7_p1: "La amortización se desglosa periodo a periodo calculando el interés devengado sobre el saldo insoluto.",
    sec7_p2: "En el primer mes de un préstamo de 125.000 $ al 8,50%, de la cuota de 1.230,94 $, 885,42 $ corresponden a intereses y 345,52 $ a amortización de principal, reduciendo el saldo a 124.654,48 $.",
    sec8_h2: "8. TAE Real y Costes de Cierre",
    sec8_p1: "La Tasa Anual Equivalente (TAE) refleja el coste financiero efectivo incorporando los costes de cierre iniciales (tasación, comisiones de originación, registro).",
    sec8_p2: "Para 125.000 $ con un tipo nominal del 8,50% y 2.500 $ en costes de cierre pagados en efectivo, la TAE real calculada es del 8,82%, reflejando el rendimiento financiero exacto.",
    sec9_h2: "9. Modos de Tratamiento de los Costes de Cierre",
    sec9_p1: "La calculadora evalúa tres modalidades de liquidación de gastos de cierre:",
    sec9_p2: "1. Pago en Efectivo: Se abonan al cierre sin alterar el principal financiado. 2. Deducido del Préstamo: El principal sigue siendo 125.000 $, pero usted recibe 122.500 $ netos. 3. Financiado: El saldo inicial aumenta a 127.500 $, incrementando la cuota mensual a 1.255,56 $.",
    sec9_p3: "Esta comparativa permite elegir la estructura más ventajosa para su liquidez inmediata.",
    sec10_h2: "10. Ratio Deuda-Ingresos (DTI) y Preparación Crediticia",
    sec10_p1: "Los prestamistas evalúan el ratio DTI posterior al préstamo para comprobar su solvencia:",
    sec10_p2: "DTI Posterior = (Cuota Hipotecaria Existente + Nueva Cuota 2ª Hipoteca + Otras Deudas) / Ingresos Brutos Mensuales. Un DTI del 36% o inferior es óptimo, mientras que entre el 43% y el 50% requiere compensaciones crediticias.",
    sec10_p3: "Para unos ingresos de 8.500 $ con una hipoteca de 1.850 $ y deudas de 500 $, la nueva cuota de 1.230,94 $ sitúa el DTI en el 42,1%, dentro del margen estándar de aprobación.",
    sec11_h2: "11. Puntuación Crediticia y Niveles de Calificación CLTV",
    sec11_p1: "La puntuación de crédito determina el CLTV máximo y el tipo de interés disponible:",
    sec11_p2: "Puntuaciones superiores a 740 acceden a CLTV de hasta el 85%–90% con tipos preferentes, entre 680 y 739 al 80%–85%, y entre 620 y 679 suelen limitarse al 80% de CLTV.",
    sec12_h2: "12. Préstamo con Garantía Hipotecaria frente a HELOC",
    sec12_p1: "El préstamo sobre el valor líquido ofrece tipo fijo y certidumbre en las cuotas desde el primer día.",
    sec12_p2: "La línea HELOC ofrece flexibilidad de disposición a tipo variable durante el periodo de disposición (draw), pero expone al prestatario a incrementos de tipo y al salto de cuota al iniciar el periodo de amortización.",
    sec13_h2: "13. Préstamo con Garantía frente a Refinanciación con Retiro de Efectivo",
    sec13_p1: "Un préstamo con garantía hipotecaria preserva el tipo de interés favorable de su primera hipoteca.",
    sec13_p2: "La refinanciación cash-out sustituye toda la deuda existente por un nuevo préstamo al tipo de mercado actual, lo que resulta desfavorable si su hipoteca actual tiene un tipo significativamente inferior.",
    sec14_h2: "14. Pagos Extra de Capital y Ahorro en Intereses",
    sec14_p1: "Añadir pagos mensuales extraordinarios acelera la amortización y reduce sustancialmente el coste total.",
    sec14_p2: "En el préstamo de 125.000 $ al 8,50%, un pago extra de 100 $ al mes acorta el plazo en 24 meses y ahorra más de 16.400 $ en intereses totales.",
    sec15_h2: "15. Estimación de Deducibilidad Fiscal (Normativa IRS)",
    sec15_p1: "Conforme a la normativa tributaria vigente (IRS Pub 936 / TCJA), los intereses hipotecarios solo son deducibles si el dinero se utiliza para comprar, construir o mejorar sustancialmente la vivienda habitual.",
    sec15_p2: "Si los fondos se destinan a consolidar deudas o gastos personales, los intereses no son deducibles a efectos del impuesto sobre la renta.",
    sec15_p3: "Para una persona en el tramo marginal del 24% con 9.800 $ de intereses deducibles en el primer año, el ahorro fiscal estimado es de 2.352 $.",
    sec16_h2: "16. Previsión de Valor Añadido por Reformas en el Hogar",
    sec16_p1: "Las mejoras estructurales en la vivienda pueden incrementar el valor de tasación y recuperar parte del capital invertido.",
    sec16_p2: "Una reforma de cocina o baño con un coste de 50.000 $ y un retorno de valor estimado del 70% añade 35.000 $ al valor del inmueble, aumentando el patrimonio neto final.",
    sec17_h2: "17. Riesgos de un Préstamo con Garantía Hipotecaria",
    sec17_p1: "Al tratarse de una segunda hipoteca garantizada por el inmueble, el impago prolongado puede derivar en ejecución hipotecaria.",
    sec17_p2: "Es fundamental planificar el flujo de caja para asumir la cuota de la segunda hipoteca junto con la hipoteca principal, los impuestos prediales y el seguro de hogar.",
    sec18_h2: "18. Escenarios de Patrimonio Negativo o Vivienda Bajo el Agua",
    sec18_p: "Si el valor del mercado inmobiliario cae y la suma de hipotecas supera el valor del inmueble, se produce patrimonio negativo. Las cuotas mensuales no cambian, pero no se podrá vender ni refinanciar sin aportar fondos propios.",
    sec19_h2: "19. Penalizaciones por Amortización Anticipada",
    sec19_p: "La gran mayoría de los préstamos hipotecarios actuales no imponen penalizaciones por pago anticipado, pero conviene revisar siempre el contrato de préstamo para confirmar la ausencia de cláusulas restrictivas.",
    sec20_h2: "20. Costes de Cierre y Plazos de Desembolso",
    sec20_p: "Los costes de formalización suelen situarse entre el 2% y el 5% del importe financiado (1.500 $ a 4.000 $). El plazo habitual desde la solicitud hasta el desembolso es de 2 a 6 semanas.",
    sec21_h2: "21. Errores Comunes que Deben Evitarse",
    sec21_mistakes: [
      "Confundir el patrimonio total con la capacidad máxima de endeudamiento (los prestamistas exigen un margen de seguridad del 15%–20%).",
      "Olvidar que el saldo de la primera hipoteca debe restarse al calcular el CLTV disponible.",
      "Asumir que el 80% de CLTV es un límite idéntico en todas las entidades financieras.",
      "Creer que una buena puntuación crediticia garantiza la aprobación sin evaluar el ratio DTI.",
      "Comparar la cuota de la segunda hipoteca con una refinanciación sin considerar el cambio de tipo en la hipoteca principal.",
      "Ignorar los costes de cierre al calcular el coste efectivo global (TAE).",
      "Suponer que todos los intereses son automáticamente deducibles sin cumplir los requisitos de mejora de la vivienda.",
      "Pensar que cada euro gastado en reformas aumenta en la misma proporción el valor de tasación.",
      "Aumentar el endeudamiento sin mantener un fondo de reserva ante fluctuaciones de ingresos.",
      "Tomar decisiones financieras complejas sin consultar simulaciones matemáticas contrastadas."
    ],
    sec22_h2: "22. Resumen de Fórmulas Fundamentales",
    sec22_formulas: [
      "Deuda Total Máxima: Valor de la Vivienda × Límite CLTV",
      "Capital Máximo Disponible: max(0, Deuda Total Máxima - Saldo Primera Hipoteca)",
      "CLTV Posterior: (Saldo 1ª Hipoteca + Saldo 2ª Hipoteca) / Valor de la Vivienda × 100",
      "Patrimonio Protegido: 100% - CLTV Posterior",
      "Cuota Mensual Fija: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Ratio DTI Posterior: (Gastos Vivienda + Deudas Mensuales) / Ingresos Brutos × 100",
      "Ahorro Fiscal Estimado: Intereses Deducibles Anuales × Tipo Impositivo Marginal"
    ],
    sec23_noticeTitle: "Orientación Educativa y Aviso Regulatorio",
    sec23_noticeText: "Los préstamos con garantía hipotecaria están sujetos a la Ley de Veracidad en el Préstamo (TILA), la Ley de Procedimientos de Liquidación de Bienes Raíces (RESPA) y las publicaciones del IRS. Esta herramienta proporciona cálculos orientativos con fines educativos.",
    overlayInputs: {
      homeValue: "Valor Estimado de la Vivienda",
      currentMortgageBalance: "Saldo de Hipoteca Existente",
      loanAmount: "Importe del Préstamo con Garantía",
      interestRate: "Tipo de Interés Fijo Anual",
      loanTerm: "Plazo del Préstamo (Años)",
      closingCosts: "Costes de Cierre Estimados",
      closingCostMode: "Tratamiento de Costes de Cierre",
      mode: "Modo de Cálculo (Importe / Capacidad)",
      cltvLimit: "Límite Máximo de CLTV",
      extraMonthlyPayment: "Pago Mensual Extra de Principal",
      grossMonthlyIncome: "Ingresos Brutos Mensuales",
      monthlyDebtPayments: "Otros Pagos Mensuales de Deuda"
    },
    overlayOutputs: {
      monthlyPayment: "Cuota Mensual Fija",
      totalInterest: "Total de Intereses a Pagar",
      totalCost: "Coste Total Financiado",
      maxLoanAmount: "Capacidad Máxima Disponible",
      postLoanCltv: "CLTV Resultante Posterior",
      trueApr: "TAE Real Efectiva",
      interestSavings: "Ahorro en Intereses por Pagos Extra"
    }
  },
  fr: {
    title: "Calculateur de Prêt sur Valeur Domiciliaire",
    metaDesc: "Calculez les mensualités fixes d'un prêt sur valeur nette immobilière, le CLTV, le TAEG réel, l'amortissement et la capacité d'emprunt.",
    keywords: ["calculateur de pret sur valeur domiciliaire", "seconde hypotheque", "calcul cltv", "pret valeur nette"],
    faqs: [
      { question: "Qu'est-ce qu'un prêt sur valeur nette immobilière et comment fonctionne-t-il ?", answer: "Un prêt sur valeur nette est une seconde hypothèque à taux fixe permettant d'obtenir un capital forfaitaire en utilisant l'équité accumulée dans votre propriété comme garantie." },
      { question: "Combien puis-je emprunter sur la valeur nette de mon logement ?", answer: "La plupart des prêteurs autorisent un ratio CLTV maximal de 80 % à 85 % de la valeur estimée du logement, déduction faite du solde de votre première hypothèque." },
      { question: "Qu'est-ce que le CLTV et comment se calcule-t-il ?", answer: "Le CLTV (Combined Loan-to-Value) représente le total cumulé des hypothèques grevant le bien divisé par la valeur marchande du bien immobilier." },
      { question: "Comment est calculée la mensualité d'un prêt sur valeur nette ?", answer: "Elle est calculée selon la formule standard d'amortissement à taux fixe basée sur le capital emprunté, le taux d'intérêt périodique et la durée en mois." },
      { question: "Quel score de crédit est requis pour être admissible ?", answer: "Un score de crédit de 620 ou plus est généralement exigé, bien que les meilleurs taux soient réservés aux scores supérieurs à 700." },
      { question: "Quelle est la différence entre un prêt sur valeur nette et une marge HELOC ?", answer: "Le prêt sur valeur nette octroie un montant forfaitaire avec un taux et des mensualités fixes, tandis que la HELOC est une marge de crédit renouvelable à taux variable." },
      { question: "Quelle est la différence avec un refinancement avec retrait d'équité ?", answer: "Le refinancement remplace votre première hypothèque par une nouvelle hypothèque globale, alors que le prêt sur valeur nette conserve votre premier prêt intact." },
      { question: "Les intérêts d'un prêt sur valeur domiciliaire sont-ils déductibles d'impôt ?", answer: "Selon les règles fiscales en vigueur, les intérêts ne sont déductibles que si les fonds servent à acheter, construire ou améliorer substantiellement le logement." },
      { question: "Puis-je rembourser un prêt sur valeur nette par anticipation ?", answer: "Oui, la plupart des prêts autorisent des remboursements anticipés pour réduire la durée et les intérêts totaux sans pénalité." },
      { question: "Quels sont les frais de clôture typiques d'une seconde hypothèque ?", answer: "Ils se situent généralement entre 2 % et 5 % du montant emprunté (frais d'évaluation, d'origination, de notaire et d'enregistrement de titre)." },
      { question: "Que se passe-t-il si la valeur marchande baisse et que le solde dépasse la valeur du bien ?", answer: "Vous entrez en situation d'équité négative. Les mensualités restent inchangées, mais la vente ou le refinancement exigera un apport en capital." },
      { question: "Combien de temps prend l'approbation et le versement des fonds ?", answer: "Le délai s'étend généralement de 2 à 6 semaines selon les exigences d'évaluation, de vérification des revenus et d'analyse du dossier." }
    ],
    pIntro: "Calculez les mensualités fixes d'un prêt sur valeur nette, la capacité maximale d'emprunt, le ratio prêt-valeur combiné (CLTV), le TAEG réel, l'amortissement, les économies sur versements anticipés et le ratio d'endettement (DTI).",
    sec1_h2: "1. Qu'est-ce qu'un Calculateur de Prêt sur Valeur Domiciliaire ?",
    sec1_p1: "Un calculateur de prêt sur valeur domiciliaire estime le montant empruntable sur l'équité de votre bien et modélise la mensualité fixe d'une seconde hypothèque. Le calcul intègre la valeur marchande du bien, le solde hypothécaire actuel, le plafond CLTV, le taux d'intérêt et les frais de clôture.",
    sec1_p2: "Il se distingue de la marge HELOC. Le prêt sur valeur nette est un crédit amortissable à taux fixe avec des paiements réguliers, tandis que la HELOC est une ligne renouvelable à taux variable.",
    sec1_noticeTitle: "Avis sur le Modèle d'Évaluation",
    sec1_noticeText: "Les résultats obtenus constituent des simulations financières mathématiques et ne représentent pas une offre de prêt contractuelle.",
    sec2_h2: "2. Comment Utiliser le Calculateur de Prêt sur Valeur Domiciliaire",
    sec2_p: "Suivez ces étapes pour évaluer précisément votre plan de financement :",
    sec2_steps: [
      "1. Saisissez la valeur marchande estimée de votre propriété.",
      "2. Indiquez le solde restant dû de votre première hypothèque.",
      "3. Choisissez le plafond de CLTV applicable (80 % standard, 85 % ou 90 %).",
      "4. Sélectionnez le Mode A (montant fixe) ou le Mode B (capacité maximale).",
      "5. Entrez le taux d'intérêt annuel fixe et la durée en années (15 ou 30 ans).",
      "6. Indiquez les frais de clôture initiaux estimés.",
      "7. Précisez le traitement des frais (Comptant, Déduit ou Financé).",
      "8. Examinez la mensualité fixe calculée.",
      "9. Vérifiez le capital disponible, le CLTV final et le TAEG réel.",
      "10. Consultez le tableau complet d'amortissement et exportez-le au format CSV.",
      "11. Simulez des versements supplémentaires de capital.",
      "12. Comparez les résultats avec les scénarios HELOC et refinancement.",
      "13. Évaluez le ratio d'endettement DTI et la déductibilité fiscale.",
      "14. Enregistrez votre scénario dans votre historique local."
    ],
    sec3_h2: "3. Valeur Nette Immobilière et Ratio Prêt-Valeur Combiné (CLTV)",
    sec3_p1: "La capacité d'emprunt maximale repose sur le ratio CLTV maximal admissible :",
    sec3_f1: "Dette Totale Maximale = Valeur du Bien × Plafond CLTV",
    sec3_f2: "Capital Empruntable = Dette Totale Maximale - Solde 1ère Hypothèque",
    sec3_p2: "Exemple : Pour un bien de 500 000 $ avec une hypothèque de 275 000 $ et un CLTV maximal de 80 %, la dette totale autorisée est de 400 000 $. En déduisant 275 000 $, le prêt maximal disponible est de 125 000 $ avec un CLTV post-prêt de 80,0 % et 20,0 % (100 000 $) d'équité protégée.",
    sec3_p3: "Ce calcul assure une marge de sécurité financière adéquate face aux évolutions du marché.",
    sec4_h2: "4. Mode A vs Mode B : Montant Déterminé ou Capacité Maximale",
    sec4_p: "Deux modes de calcul vous permettent d'analyser vos besoins :",
    sec4_h3_1: "Mode A — Montant Spécifique Souhaité",
    sec4_p_1: "Permet de spécifier un montant exact (ex. 125 000 $) pour des rénovations ou une consolidation de dettes et d'en déduire la mensualité exacte.",
    sec4_h3_2: "Mode B — Capacité Maximale selon CLTV",
    sec4_p_2: "Calcule le montant maximal finançable jusqu'à la limite de CLTV autorisée par le prêteur.",
    sec5_h2: "5. Formule de la Mensualité Fixe",
    sec5_p1: "La mensualité fixe (M) est déterminée par la formule mathématique des annuités constantes :",
    sec5_p2: "M = P × [r(1+r)^n] / [(1+r)^n - 1], où P est le principal, r le taux d'intérêt mensuel et n le nombre de mensualités. Pour 125 000 $ à 8,50 % sur 15 ans (180 mois), la mensualité s'établit exactement à 1 230,94 $.",
    sec6_h2: "6. Fonctionnement du Moteur à Taux Zéro",
    sec6_p1: "Lors d'offres promotionnelles à 0 % d'intérêt, le calcul s'effectue par division linéaire simple : M = P / n.",
    sec6_p2: "Pour 125 000 $ sur 15 ans à 0 %, la mensualité est de 694,44 $ par mois sans aucun frais d'intérêt.",
    sec7_h2: "7. Tableau d'Amortissement de la Seconde Hypothèque",
    sec7_p1: "L'amortissement détaille mois par mois la part du paiement allouée aux intérêts et au remboursement du capital.",
    sec7_p2: "Au premier mois d'un prêt de 125 000 $ à 8,50 %, sur la mensualité de 1 230,94 $, 885,42 $ couvrent les intérêts et 345,52 $ réduisent le capital à 124 654,48 $.",
    sec8_h2: "8. TAEG Réel et Frais de Clôture",
    sec8_p1: "Le Taux Annuel Effectif Global (TAEG) incorpore l'ensemble des frais de clôture initiaux pour refléter le coût financier réel.",
    sec8_p2: "Pour 125 000 $ à 8,50 % avec 2 500 $ de frais payés comptant, le TAEG réel s'établit à 8,82 %.",
    sec9_h2: "9. Modes de Traitement des Frais de Clôture",
    sec9_p1: "Le calculateur prend en charge trois modes de règlement des frais :",
    sec9_p2: "1. Payé Comptant : Réglé le jour de la signature sans impacter le montant emprunté. 2. Déduit du Montant : Le capital reste de 125 000 $ mais vous recevez 122 500 $ net. 3. Financé : Le solde emprunté augmente à 127 500 $, portant la mensualité à 1 255,56 $.",
    sec9_p3: "Ce comparatif facilite le choix de la solution la plus économique selon vos liquidités.",
    sec10_h2: "10. Ratio d'Endettement (DTI) et Éligibilité",
    sec10_p1: "Le ratio d'endettement global (DTI) mesure votre capacité à supporter les mensualités :",
    sec10_p2: "DTI Global = (Charges Hypothécaires Totales + Dettes Mensuelles) / Revenus Bruts Mensuels. Un ratio inférieur à 36 % est idéal, tandis qu'entre 43 % et 50 % nécessite des critères compensatoires.",
    sec10_p3: "Avec 8 500 $ de revenus, 1 850 $ de première hypothèque et 500 $ de dettes diverses, la nouvelle mensualité de 1 230,94 $ porte le DTI à 42,1 %, conforme aux critères de souscription habituels.",
    sec11_h2: "11. Score de Crédit et Paliers de CLTV",
    sec11_p1: "Votre cote de crédit conditionne le ratio CLTV maximal et les conditions tarifaires :",
    sec11_p2: "Un score supérieur à 740 permet un CLTV jusqu'à 85 %–90 % aux meilleurs taux, entre 680 et 739 autorise 80 %–85 %, et entre 620 et 679 plafonne généralement à 80 %.",
    sec12_h2: "12. Prêt sur Valeur Nette vs Marge HELOC",
    sec12_p1: "Le prêt sur valeur nette offre la sécurité d'un taux fixe et de mensualités constantes tout au long de la durée.",
    sec12_p2: "La HELOC permet des tirages échelonnés à taux variable mais expose l'emprunteur aux hausses de taux et au choc de paiement lors du passage en phase de remboursement.",
    sec13_h2: "13. Prêt sur Valeur Nette vs Refinancement avec Retrait d'Équité",
    sec13_p1: "Le prêt sur valeur nette permet de conserver intact le taux avantageux de votre première hypothèque.",
    sec13_p2: "Le refinancement global remplace la totalité de votre dette au taux actuel du marché, ce qui peut s'avérer très coûteux si votre taux d'origine était faible.",
    sec14_h2: "14. Versements Anticipés et Économies d'Intérêts",
    sec14_p1: "Effectuer des remboursements anticipés réguliers accélère le désendettement et génère des économies substantielles.",
    sec14_p2: "Sur un prêt de 125 000 $ à 8,50 %, un versement supplémentaire de 100 $ par mois réduit la durée de 24 mois et fait économiser plus de 16 400 $ d'intérêts.",
    sec15_h2: "15. Déductibilité Fiscale des Intérêts (Règles Fiscales)",
    sec15_p1: "Selon la réglementation fiscale en vigueur, les intérêts ne sont déductibles que si les fonds sont alloués à l'acquisition, la construction ou l'amélioration substantielle de la résidence principale.",
    sec15_p2: "Si les fonds servent à consolider des dettes de consommation ou financer des dépenses personnelles, les intérêts ne sont pas déductibles.",
    sec15_p3: "Pour un contribuable dans la tranche marginale de 24 % avec 9 800 $ d'intérêts déductibles en première année, l'économie fiscale estimée s'élève à 2 352 $.",
    sec16_h2: "16. Estimation de la Plus-Value Immobilière par Rénovation",
    sec16_p1: "Les travaux de rénovation bien ciblés augmentent la valeur vénale du bien et reconstituent votre patrimoine net.",
    sec16_p2: "Une rénovation de 50 000 $ offrant un retour sur investissement estimé à 70 % ajoute 35 000 $ à la valeur du logement.",
    sec17_h2: "17. Risques Associés au Prêt sur Valeur Nette",
    sec17_p1: "Le bien immobilier servant de garantie, un défaut de paiement prolongé peut mener à une saisie hypothécaire.",
    sec17_p2: "Il convient d'évaluer rigoureusement votre trésorerie pour honorer conjointement la première et la seconde hypothèque ainsi que les taxes foncières.",
    sec18_h2: "18. Scénarios d'Équité Négative",
    sec18_p: "En cas de repli du marché immobilier, si le cumul des dettes dépasse la valeur de la maison, le bien entre en équité négative. Les mensualités restent dues, mais toute vente exigera de combler la différence en liquidités.",
    sec19_h2: "19. Pénalités de Remboursement Anticipé",
    sec19_p: "La majorité des contrats de seconde hypothèque n'appliquent pas de pénalités pour remboursement anticipé, mais il est toujours recommandé de vérifier les clauses spécifiques de votre offre.",
    sec20_h2: "20. Frais de Clôture et Délais de Versement",
    sec20_p: "Les frais de clôture oscillent entre 2 % et 5 % du capital emprunté (1 500 $ à 4 000 $). Le délai moyen de traitement et de décaissement s'étend de 2 à 6 semaines.",
    sec21_h2: "21. Erreurs Fréquentes à Éviter",
    sec21_mistakes: [
      "Confondre la valeur nette totale et la capacité réelle d'emprunt (les prêteurs exigent une réserve d'équité de 15 % à 20 %).",
      "Oublier de déduire le solde de la première hypothèque lors de l'estimation de l'équité accessible.",
      "Supposer qu'un plafond de CLTV de 80 % est uniformément appliqué par tous les établissements.",
      "Penser qu'un bon score de crédit garantit l'approbation sans vérification du ratio DTI.",
      "Comparer les mensualités sans intégrer l'impact du changement de taux de la première hypothèque.",
      "Négliger les frais de clôture dans le calcul du coût effectif global (TAEG).",
      "Croire que tous les intérêts sont déductibles sans justificatif de rénovation immobilière.",
      "Supposer que chaque euro investi en travaux se traduit par un euro équivalent d'augmentation de valeur vénale.",
      "S'endetter sans conserver un fonds de prévoyance en cas de baisse de revenus.",
      "Prendre des engagements sans réaliser une simulation financière préalable."
    ],
    sec22_h2: "22. Synthèse des Formules Mathématiques",
    sec22_formulas: [
      "Dette Totale Maximale : Valeur du Bien × Plafond CLTV",
      "Capital Empruntable : max(0, Dette Totale Maximale - Solde 1ère Hypothèque)",
      "CLTV Post-Prêt : (Solde 1ère Hypothèque + Solde 2nde Hypothèque) / Valeur du Bien × 100",
      "Équité Protégée : 100 % - CLTV Post-Prêt",
      "Mensualité Fixe : P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Ratio DTI Post-Prêt : (Charges Logement + Dettes Mensuelles) / Revenus Bruts × 100",
      "Économie Fiscale Estimée : Intérêts Déductibles Annuels × Taux Marginal d'Imposition"
    ],
    sec23_noticeTitle: "Orientation Pédagogique et Avis Réglementaire",
    sec23_noticeText: "Les prêts sur valeur nette immobilière sont encadrés par les lois sur la transparence du crédit (TILA/RESPA) et les réglementations fiscales. Cette calculatrice fournit des simulations indicatives à visée éducative.",
    overlayInputs: {
      homeValue: "Valeur Estimée de la Propriété",
      currentMortgageBalance: "Solde Hypothécaire Actuel",
      loanAmount: "Montant du Prêt Souhaité",
      interestRate: "Taux d'Intérêt Fixe Annuel",
      loanTerm: "Durée du Prêt (Années)",
      closingCosts: "Frais de Clôture Estimés",
      closingCostMode: "Mode de Règlement des Frais",
      mode: "Mode de Calcul (Montant / Capacité)",
      cltvLimit: "Plafond CLTV Maximal",
      extraMonthlyPayment: "Paiement Mensuel Extra de Capital",
      grossMonthlyIncome: "Revenu Mensuel Brut",
      monthlyDebtPayments: "Autres Dettes Mensuelles"
    },
    overlayOutputs: {
      monthlyPayment: "Mensualité Fixe",
      totalInterest: "Total des Intérêts",
      totalCost: "Coût Total du Financement",
      maxLoanAmount: "Capacité d'Emprunt Maximale",
      postLoanCltv: "CLTV Résultant",
      trueApr: "TAEG Réel Effectif",
      interestSavings: "Économie d'Intérêts"
    }
  },
  de: {
    title: "Eigenheimkredit-Rechner (Home Equity Loan)",
    metaDesc: "Berechnen Sie feste Monatsraten für Eigenheimkredite, Beleihungsauslauf (CLTV), effektiven Jahreszins, Tilgungspläne und maximale Kreditsummen.",
    keywords: ["eigenheimkredit rechner", "zweithypothek", "cltv rechner", "immobilienkredit eigenkapital"],
    faqs: [
      { question: "Was ist ein Eigenheimkredit (Home Equity Loan) und wie funktioniert er?", answer: "Ein Eigenheimkredit ist eine festverzinsliche Zweithypothek, bei der Sie einen Pauschalbetrag leihen und das in Ihrer Immobilie gebundene Eigenkapital als Sicherheit hinterlegen." },
      { question: "Wie viel kann ich über mein Eigenheimkapital beleihen?", answer: "Die meisten Kreditinstitute erlauben einen kombinierten Beleihungsauslauf (CLTV) von 80 % bis 85 % des Immobilienwerts abzüglich der bestehenden Restschuld der Ersthypothek." },
      { question: "Was ist der CLTV und wie wird er berechnet?", answer: "Der CLTV (Combined Loan-to-Value) setzt die Summe aller auf der Immobilie lastenden Grundschulden ins Verhältnis zum aktuellen Verkehrswert der Immobilie." },
      { question: "Wie wird die monatliche Rate eines Eigenheimkredits berechnet?", answer: "Sie wird über die klassische Annuitätenformel anhand von Kreditsumme, Monatszinssatz und Gesamtlaufzeit in Monaten ermittelt." },
      { question: "Welche Bonität (Credit Score) wird vorausgesetzt?", answer: "In der Regel ist ein Bonitätswert von mindestens 620 erforderlich, wobei für Bestkonditionen Werte ab 700 verlangt werden." },
      { question: "Was unterscheidet den Eigenheimkredit von einer HELOC-Kreditlinie?", answer: "Der Eigenheimkredit bietet eine feste Kreditsumme mit festem Zinssatz und gleichbleibender Rate, während eine HELOC ein revolvierender Rahmenkredit mit variablem Zins ist." },
      { question: "Wie unterscheidet er sich von einer Cash-Out-Umschuldung?", answer: "Eine Umschuldung ersetzt Ihre gesamte bestehende Ersthypothek, während der Eigenheimkredit Ihre Erstfinanzierung unberührt lässt." },
      { question: "Sind die Zinsen für einen Eigenheimkredit steuerlich absetzbar?", answer: "Nach aktuellen steuerlichen Richtlinien sind Schuldzinsen nur dann absetzbar, wenn die Mittel nachweislich zur Anschaffung, Herstellung oder substanziellen Sanierung der Immobilie verwendet werden." },
      { question: "Kann ich den Eigenheimkredit vorzeitig tilgen?", answer: "Ja, die meisten Verträge gestatten Sondertilgungen oder eine vorzeitige Gesamttilgung ohne Vorfälligkeitsentschädigung." },
      { question: "Welche Abschlusskosten fallen bei einer Zweithypothek an?", answer: "Sie betragen üblicherweise 2 % bis 5 % des Darlehensbetrags (Wertermittlung, Bearbeitungsgebühren, Grundbucheintragung und Notargebühren)." },
      { question: "Was passiert bei fallenden Immobilienpreisen (Unterdeckung/Negativ-Eigenkapital)?", answer: "Bei einer Unterdeckung bleibt Ihre Ratenverpflichtung bestehen, ein Verkauf oder eine Umschuldung erfordert jedoch das Einbringen von zusätzlichem Eigenkapital." },
      { question: "Wie lange dauert die Kreditprüfung und Auszahlung?", answer: "Die Bearbeitung dauert in der Regel 2 bis 6 Wochen für Bonitätsprüfung, Wertermittlung und notarielle Grundschuldbestellung." }
    ],
    pIntro: "Berechnen Sie feste monatliche Raten für Eigenheimkredite, maximalen Beleihungsrahmen, kombinierten Beleihungsauslauf (CLTV), effektiven Jahreszins, Tilgungsverlauf, Zinsersparnis durch Sondertilgungen und Schuldendienstquote (DTI).",
    sec1_h2: "1. Was ist ein Eigenheimkredit-Rechner?",
    sec1_p1: "Ein Eigenheimkredit-Rechner ermittelt, wie viel Kapital Sie auf Basis Ihres gebundenen Immobilienvermögens aufnehmen können, und simuliert den festen Zahlungsplan einer Zweithypothek. Die Berechnung verknüpft Marktwert, bestehende Restschuld, CLTV-Beleihungsgrenze, Zinssatz, Laufzeit und Abschlusskosten.",
    sec1_p2: "Er unterscheidet sich grundlegend von einem HELOC-Rahmenkredit. Der Eigenheimkredit ist ein Ratenkredit mit fester Zinsbindung und kalkulierbaren Raten, während ein HELOC variabel verzinst wird.",
    sec1_noticeTitle: "Hinweis zum Berechnungsmodell",
    sec1_noticeText: "Die Berechnungsergebnisse sind mathematische Modellrechnungen und stellen keine verbindliche Darlehenszusage dar.",
    sec2_h2: "2. Bedienungsanleitung für den Eigenheimkredit-Rechner",
    sec2_p: "Befolgen Sie diese Schritte zur präzisen Modellierung Ihrer Finanzierung :",
    sec2_steps: [
      "1. Geben Sie den geschätzten Marktwert Ihrer Immobilie ein.",
      "2. Tragen Sie die verbleibende Restschuld der Ersthypothek ein.",
      "3. Wählen Sie die maximale CLTV-Beleihungsgrenze (80 % Standard, 85 % oder 90 %).",
      "4. Wählen Sie Modus A (Wunschbetrag) oder Modus B (Maximaler Kreditrahmen).",
      "5. Geben Sie den festen Sollzinssatz und die Laufzeit in Jahren (15 oder 30 Jahre) ein.",
      "6. Tragen Sie die geschätzten Abschlussnebenkosten ein.",
      "7. Wählen Sie die Kostenbehandlung (Barzahlung, Einbehalt oder Mitfinanzierung).",
      "8. Überprüfen Sie die errechnete feste monatliche Rate.",
      "9. Kontrollieren Sie den maximalen Kreditrahmen, den neuen CLTV und den Effektivzins.",
      "10. Prüfen Sie den vollständigen Tilgungsplan und exportieren Sie ihn als CSV.",
      "11. Simulieren Sie monatliche Sondertilgungen zur Zinsersparnis.",
      "12. Vergleichen Sie die Ergebnisse mit HELOC- und Umschuldungsszenarien.",
      "13. Prüfen Sie die Tragfähigkeit anhand der Schuldendienstquote (DTI).",
      "14. Speichern Sie Ihre Berechnung im lokalen Verlauf ab."
    ],
    sec3_h2: "3. Immobilien-Eigenkapital und Beleihungsauslauf (CLTV)",
    sec3_p1: "Die maximale Kreditkapazität berechnet sich nach der maximal zulässigen Gesamtverschuldung :",
    sec3_f1: "Maximal zulässige Gesamtschuld = Immobilienwert × CLTV-Grenze",
    sec3_f2: "Maximaler Zweitkredit = Maximal zulässige Gesamtschuld - Restschuld Ersthypothek",
    sec3_p2: "Beispiel : Bei einer Immobilie im Wert von 500.000 $ mit 275.000 $ Ersthypothek und 80 % CLTV-Grenze beträgt die maximale Gesamtverschuldung 400.000 $. Nach Abzug der 275.000 $ verbleibt ein maximaler Zweitkredit von 125.000 $ mit einem resultierenden CLTV von 80,0 % und 20,0 % (100.000 $) geschütztem Eigenkapital.",
    sec3_p3: "Dies gewährleistet einen soliden Risikopuffer bei Marktschwankungen.",
    sec4_h2: "4. Modus A vs. Modus B: Wunschbetrag oder Höchstgrenze",
    sec4_p: "Der Rechner unterstützt zwei komplementäre Berechnungsansätze :",
    sec4_h3_1: "Modus A — Fester Wunschbetrag",
    sec4_p_1: "Ermöglicht die Eingabe eines exakten Finanzierungsbedarfs (z. B. 125.000 $) für Sanierungen oder Umschuldungen zur Ratenberechnung.",
    sec4_h3_2: "Modus B — Maximaler Beleihungsrahmen nach CLTV",
    sec4_p_2: "Ermittelt die maximale Kreditsumme bis zum Erreichen der gewählten Beleihungsgrenze.",
    sec5_h2: "5. Formel der festen Monatsrate (Annuität)",
    sec5_p1: "Die monatliche Rate (M) folgt der finanzmathematischen Standardformel :",
    sec5_p2: "M = P × [r(1+r)^n] / [(1+r)^n - 1], wobei P die Kreditsumme, r der Monatszinssatz und n die Laufzeit in Monaten ist. Für 125.000 $ zu 8,50 % auf 15 Jahre (180 Monate) beträgt die feste Rate exakt 1.230,94 $.",
    sec6_h2: "6. Nullzins-Berechnungsmodus",
    sec6_p1: "Bei zinsfreien Angeboten (0 % Sollzins) berechnet das System die Rate rein linear : M = P / n.",
    sec6_p2: "Bei 125.000 $ über 15 Jahre zu 0 % Zinsen ergibt sich eine monatliche Tilgungsrate von 694,44 $ ohne Zinskosten.",
    sec7_h2: "7. Tilgungsplan der Zweithypothek",
    sec7_p1: "Der Tilgungsplan schlüsselt Monat für Monat Zins- und Tilgungsanteile auf.",
    sec7_p2: "Im ersten Monat eines Darlehens über 125.000 $ zu 8,50 % entfallen von der Rate (1.230,94 $) 885,42 $ auf Zinsen und 345,52 $ auf die Tilgung, wodurch die Restschuld auf 124.654,48 $ sinkt.",
    sec8_h2: "8. Effektiver Jahreszins und Abschlusskosten",
    sec8_p1: "Der effektive Jahreszins (Effektivzins) berücksichtigt alle anfallenden Nebenkosten (Wertermittlung, Notar, Bearbeitungsgebühren).",
    sec8_p2: "Bei 125.000 $ Sollzins von 8,50 % und 2.500 $ bar bezahlten Nebenkosten beträgt der Effektivzins 8,82 %.",
    sec9_h2: "9. Varianten zur Behandlung von Abschlusskosten",
    sec9_p1: "Drei Optionen zur Begleichung der Nebenkosten stehen zur Verfügung :",
    sec9_p2: "1. Barzahlung : Zahlung bei Abschluss ohne Erhöhung der Darlehenssumme. 2. Einbehalt : Kreditsumme beträgt 125.000 $, Auszahlungsbetrag 122.500 $. 3. Mitfinanzierung : Kreditsumme steigt auf 127.500 $, Monatsrate auf 1.255,56 $.",
    sec9_p3: "Vergleichen Sie diese Optionen zur optimalen Liquiditätssteuerung.",
    sec10_h2: "10. Schuldendienstquote (DTI) und Bonitätsprüfung",
    sec10_p1: "Kreditgeber prüfen die Gesamt-Schuldendienstquote (DTI) zur Bonitätsbeurteilung :",
    sec10_p2: "Gesamt-DTI = (Wohnkosten gesamt + sonstige Monatsraten) / Brutto-Monatseinkommen. Werte bis 36 % gelten als erstklassig, zwischen 43 % und 50 % sind Ausnahmekriterien erforderlich.",
    sec10_p3: "Bei 8.500 $ Monatseinkommen, 1.850 $ Ersthypothek und 500 $ Ratenverpflichtungen führt die neue Rate von 1.230,94 $ zu einem DTI von 42,1 %, was im regulären Genehmigungsrahmen liegt.",
    sec11_h2: "11. Bonitätsstufen und Beleihungsgrenzen",
    sec11_p1: "Der Bonitätsscore bestimmt den maximalen Beleihungsauslauf und den Zinssatz :",
    sec11_p2: "Scores ab 740 ermöglichen CLTV-Werte bis 85 %–90 % zu Spitzenkonditionen, 680–739 erlauben 80 %–85 %, und 620–679 sind meist auf 80 % CLTV beschränkt.",
    sec12_h2: "12. Eigenheimkredit im Vergleich zu HELOC",
    sec12_p1: "Der Eigenheimkredit bietet Zinssicherheit und feste Raten über die gesamte Vertragslaufzeit.",
    sec12_p2: "Ein HELOC bietet flexible Abrufmöglichkeiten mit variablen Zinsen, birgt jedoch Zinsänderungsrisiken und Ratenanstiege bei Tilgungsbeginn.",
    sec13_h2: "13. Eigenheimkredit im Vergleich zur Cash-Out-Umschuldung",
    sec13_p1: "Der Eigenheimkredit sichert Ihnen den günstigen Zinssatz Ihrer bestehenden Erstfinanzierung.",
    sec13_p2: "Eine Gesamtumschuldung (Cash-Out Refinance) ersetzt die gesamte Hypothek zu aktuellen Marktkonditionen, was bei ehemals günstigen Zinsen unwirtschaftlich sein kann.",
    sec14_h2: "14. Sondertilgungen und Zinsersparnis",
    sec14_p1: "Regelmäßige Sondertilgungen verkürzen die Laufzeit und senken die Zinslast spürbar.",
    sec14_p2: "Bei einem Darlehen von 125.000 $ zu 8,50 % verkürzt eine monatliche Sondertilgung von 100 $ die Laufzeit um 24 Monate und spart über 16.400 $ an Zinsen ein.",
    sec15_h2: "15. Steuerliche Absetzbarkeit von Schuldzinsen",
    sec15_p1: "Zinsen sind steuerlich nur abzugsfähig, wenn das Darlehen nachweislich zur Anschaffung, zum Bau oder zur substanziellen Modernisierung der Immobilie verwendet wird.",
    sec15_p2: "Bei Verwendung für Konsumausgaben oder Umschuldungen entfällt die steuerliche Abzugsfähigkeit.",
    sec15_p3: "Bei einem Grenzsteuersatz von 24 % und 9.800 $ abzugsfähigen Zinsen im ersten Jahr ergibt sich eine Steuerersparnis von ca. 2.352 $.",
    sec16_h2: "16. Wertsteigerung durch Modernisierungsmaßnahmen",
    sec16_p1: "Gezielte Modernisierungen steigern den Verkehrswert der Immobilie und erhöhen Ihr Nettovermögen.",
    sec16_p2: "Eine Sanierung mit 50.000 $ Investition und 70 % Werterhaltungsfaktor steigert den Immobilienwert um 35.000 $.",
    sec17_h2: "17. Risiken einer Zweithypothek",
    sec17_p1: "Da die Immobilie als Kreditsicherheit dient, kann Zahlungsverzug zur Zwangsvollstreckung führen.",
    sec17_p2: "Kalkulieren Sie Ihr Haushaltsbudget vorausschauend für Erst- und Zweithypothek sowie Instandhaltungsrücklagen.",
    sec18_h2: "18. Negativ-Eigenkapital (Unterdeckung)",
    sec18_p: "Sinken die Immobilienpreise unter die Summe der bestehenden Grundschulden, entsteht eine Unterdeckung. Die monatlichen Raten bleiben unverändert, ein Verkauf erfordert jedoch Eigenkapitalzuschüsse.",
    sec19_h2: "19. Vorfälligkeitsentschädigung",
    sec19_p: "Viele moderne Zweithypotheken verzichten auf Vorfälligkeitsentschädigungen bei vorzeitiger Tilgung. Prüfen Sie dennoch stets die individuellen Vertragsbedingungen.",
    sec20_h2: "20. Abschlusskosten und Bearbeitungszeiten",
    sec20_p: "Die Nebenkosten betragen typischerweise 2 % bis 5 % des Darlehensbetrags (1.500 $ bis 4.000 $). Die Bearbeitungszeit bis zur Valutierung liegt meist zwischen 2 und 6 Wochen.",
    sec21_h2: "21. Häufige Fehler bei Eigenheimkrediten vermeiden",
    sec21_mistakes: [
      "Gesamtes Eigenkapital mit maximalem Kreditrahmen verwechseln (Banken verlangen 15 %–20 % Sicherheitspuffer).",
      "Vergessen, die Restschuld der Ersthypothek beim maximalen Beleihungsauslauf abzuziehen.",
      "Annehmen, dass 80 % CLTV bei allen Kreditinstituten eine einheitliche Obergrenze darstellt.",
      "Gute Bonität mit automatischer Kreditgenehmigung ohne Prüfung der DTI-Quote gleichsetzen.",
      "Zweithypothek mit Gesamtumschuldung vergleichen, ohne Zinsverluste bei der Ersthypothek zu berücksichtigen.",
      "Abschlusskosten bei der Ermittlung des Effektivzinses unberücksichtigt lassen.",
      "Steuerliche Abzugsfähigkeit ohne Zweckbindung für Sanierungsmaßnahmen voraussetzen.",
      "Glauben, dass jeder Modernisierungs-Euro zu 100 % in den Verkehrswert einfließt.",
      "Kreditaufnahme ohne Liquiditätsreserve für unvorhergesehene Lebensereignisse.",
      "Finanzierungsentscheidungen ohne mathematisch fundierte Vergleichsrechnung treffen."
    ],
    sec22_h2: "22. Übersicht der Kernformeln",
    sec22_formulas: [
      "Maximal zulässige Gesamtschuld: Immobilienwert × CLTV-Grenze",
      "Maximaler Beleihungsrahmen: max(0, Gesamtschuld - Restschuld Ersthypothek)",
      "CLTV nach Darlehen: (Restschuld 1 + Restschuld 2) / Immobilienwert × 100",
      "Geschütztes Eigenkapital: 100 % - CLTV nach Darlehen",
      "Monatliche Annuität: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Schuldendienstquote (DTI): Gesamte monatliche Raten / Bruttoeinkommen × 100",
      "Geschätzte Steuerersparnis: Abzugsfähige Jahreszinsen × Grenzsteuersatz"
    ],
    sec23_noticeTitle: "Pädagogischer Hinweis und Rechtlicher Rahmen",
    sec23_noticeText: "Eigenheimkredite unterliegen gesetzlichen Informationspflichten (z. B. TILA/RESPA) und steuerrechtlichen Bestimmungen. Dieser Rechner stellt unverbindliche Modellrechnungen zu Informationszwecken bereit.",
    overlayInputs: {
      homeValue: "Geschätzter Marktwert der Immobilie",
      currentMortgageBalance: "Restschuld der Ersthypothek",
      loanAmount: "Gewünschte Kreditsumme",
      interestRate: "Fester Sollzinssatz p.a.",
      loanTerm: "Kreditlaufzeit (Jahre)",
      closingCosts: "Geschätzte Abschlusskosten",
      closingCostMode: "Behandlung der Abschlusskosten",
      mode: "Berechnungsmodus (Wunschbetrag / Höchstgrenze)",
      cltvLimit: "Maximale CLTV-Beleihungsgrenze",
      extraMonthlyPayment: "Monatliche Sondertilgung",
      grossMonthlyIncome: "Monatliches Bruttoeinkommen",
      monthlyDebtPayments: "Sonstige monatliche Ratenverpflichtungen"
    },
    overlayOutputs: {
      monthlyPayment: "Feste Monatsrate",
      totalInterest: "Gesamte Zinskosten",
      totalCost: "Gesamter Finanzierungsaufwand",
      maxLoanAmount: "Maximaler Kreditrahmen",
      postLoanCltv: "Resultierender CLTV",
      trueApr: "Effektiver Jahreszins",
      interestSavings: "Zinsersparnis durch Sondertilgung"
    }
  },
  hi: {
    title: "होम इक्विटी लोन कैलकुलेटर (Home Equity Loan Calculator)",
    metaDesc: "होम इक्विटी लोन की मासिक किस्त, संयुक्त ऋण-से-मूल्य (CLTV), वास्तविक APR, पुनर्भुगतान अनुसूची और अधिकतम ऋण सीमा की गणना करें।",
    keywords: ["होम इक्विटी लोन कैलकुलेटर", "दूसरी मॉर्गेज", "सीएलटीवी कैलकुलेटर", "गृह इक्विटी"],
    faqs: [
      { question: "होम इक्विटी लोन क्या है और यह कैसे काम करता है?", answer: "होम इक्विटी लोन एक निश्चित ब्याज दर वाला दूसरा मॉर्गेज है जिसमें आप अपने घर में बनी इक्विटी को गिरवी रखकर एकमुश्त ऋण राशि प्राप्त करते हैं।" },
      { question: "मैं अपनी होम इक्विटी पर कितना ऋण ले सकता हूँ?", answer: "अधिकांश ऋणदाता संपत्ति के बाजार मूल्य का 80% से 85% अधिकतम सीएलटीवी (CLTV) और पहली मॉर्गेज की शेष राशि घटाकर ऋण देते हैं।" },
      { question: "सीएलटीवी (CLTV) क्या है और इसकी गणना कैसे की जाती है?", answer: "सीएलटीवी संपत्ति पर सभी सक्रिय ऋणों के कुल योग को घर के मौजूदा बाजार मूल्य से विभाजित करके निकाला जाता है।" },
      { question: "होम इक्विटी लोन की मासिक किस्त कैसे निकाली जाती है?", answer: "यह मानक एन्युइटी फॉर्मूले से मूलधन, मासिक ब्याज दर और महीनों में कुल अवधि के आधार पर निकाली जाती है।" },
      { question: "इसके लिए किस क्रेडिट स्कोर की आवश्यकता होती है?", answer: "आमतौर पर 620 या उससे अधिक का क्रेडिट स्कोर आवश्यक होता है, जबकि सर्वोत्तम ब्याज दरों के लिए 700+ स्कोर की आवश्यकता होती है।" },
      { question: "होम इक्विटी लोन और हेलॉक (HELOC) में क्या अंतर है?", answer: "होम इक्विटी लोन निश्चित ब्याज दर और निश्चित मासिक किस्त के साथ एकमुश्त राशि देता है, जबकि हेलॉक एक परिवर्तनीय दर वाली क्रेडिट लाइन है।" },
      { question: "कैश-आउट रीफाइनेंस से यह कैसे अलग है?", answer: "रीफाइनेंस आपके पहले ऋण को पूरी तरह से नए ऋण से बदल देता है, जबकि होम इक्विटी लोन आपके मूल ऋण को बिना बदले अतिरिक्त ऋण देता है।" },
      { question: "क्या होम इक्विटी लोन का ब्याज कर-कटौती योग्य है?", answer: "वर्तमान कर नियमों के अनुसार, ब्याज पर कर छूट तभी मिलती है जब ऋण का उपयोग घर की मरम्मत, नवीनीकरण या खरीद के लिए किया गया हो।" },
      { question: "क्या मैं समय से पहले ऋण चुका सकता हूँ?", answer: "हाँ, अधिकांश बैंक बिना किसी पूर्व-भुगतान शुल्क के समय से पहले भुगतान करने की अनुमति देते हैं।" },
      { question: "क्लोजिंग लागत कितनी होती है?", answer: "यह आमतौर पर ऋण राशि का 2% से 5% होती है जिसमें मूल्यांकन, दस्तावेजीकरण और कानूनी शुल्क शामिल होते हैं।" },
      { question: "यदि घर का मूल्य गिर जाता है तो क्या होगा?", answer: "आप नकारात्मक इक्विटी स्थिति में आ सकते हैं। मासिक किस्तें जारी रहती हैं, लेकिन बिक्री या रीफाइनेंस के लिए आपको अतिरिक्त नकद देना होगा।" },
      { question: "ऋण स्वीकृति में कितना समय लगता है?", answer: "दस्तावेज़ सत्यापन और संपत्ति मूल्यांकन के आधार पर इसमें आमतौर पर 2 से 6 सप्ताह का समय लगता है।" }
    ],
    pIntro: "होम इक्विटी लोन की मासिक किस्त, अधिकतम उधार क्षमता, संयुक्त ऋण-से-मूल्य (CLTV), वास्तविक वार्षिक दर (APR), दो-चरणीय परिशोधन और अग्रिम भुगतान बचत की गणना करें।",
    sec1_h2: "1. होम इक्विटी लोन कैलकुलेटर क्या है?",
    sec1_p1: "होम इक्विटी लोन कैलकुलेटर यह अनुमान लगाता है कि आप अपनी संपत्ति की इक्विटी के विरुद्ध कितना ऋण ले सकते हैं और एक निश्चित दर वाली दूसरी मॉर्गेज की मासिक किस्त का मॉडल तैयार करता है।",
    sec1_p2: "यह हेलॉक (HELOC) से भिन्न है। होम इक्विटी लोन एकमुश्त राशि के साथ निश्चित मासिक किस्त प्रदान करता है।",
    sec1_noticeTitle: "ऋण मूल्यांकन मॉडल सूचना",
    sec1_noticeText: "यह परिणाम एक गणितीय सिमुलेशन है और किसी ऋणदाता की अंतिम प्रतिबद्धता नहीं है। वास्तविक ब्याज दरें आपकी साख पर निर्भर करती हैं।",
    sec2_h2: "2. होम इक्विटी लोन कैलकुलेटर का उपयोग कैसे करें",
    sec2_p: "अपने ऋण परिदृश्य का विश्लेषण करने के लिए इन चरणों का पालन करें :",
    sec2_steps: [
      "1. घर का अनुमानित बाजार मूल्य दर्ज करें।",
      "2. पहले मॉर्गेज की शेष राशि दर्ज करें।",
      "3. अधिकतम सीएलटीवी सीमा (80% मानक, 85% या 90%) चुनें।",
      "4. मोड A (इच्छित ऋण राशि) या मोड B (अधिकतम क्षमता) चुनें।",
      "5. निश्चित ब्याज दर और अवधि (15 या 30 वर्ष) दर्ज करें।",
      "6. अनुमानित क्लोजिंग लागत दर्ज करें।",
      "7. क्लोजिंग लागत का प्रकार चुनें (नकद, कटौती या वित्तपोषित)।",
      "8. गणना की गई मासिक किस्त की समीक्षा करें।",
      "9. अधिकतम उपलब्ध ऋण, नया सीएलटीवी और वास्तविक APR जांचें।",
      "10. संपूर्ण परिशोधन तालिका का निरीक्षण करें और CSV डाउनलोड करें।",
      "11. ब्याज बचत के लिए अतिरिक्त मासिक भुगतान जोड़ें।",
      "12. हेलॉक और कैश-आउट रीफाइनेंस परिदृश्यों से तुलना करें।",
      "13. आय-ऋण अनुपात (DTI) और कर लाभों का मूल्यांकन करें।",
      "14. अपने परिदृश्य को स्थानीय इतिहास में सुरक्षित करें।"
    ],
    sec3_h2: "3. होम इक्विटी और संयुक्त ऋण-से-मूल्य (CLTV)",
    sec3_p1: "उधार लेने की अधिकतम क्षमता सीएलटीवी सीमा के आधार पर तय की जाती है :",
    sec3_f1: "अधिकतम अनुमेय कुल ऋण = घर का मूल्य × सीएलटीवी सीमा",
    sec3_f2: "अधिकतम उपलब्ध इक्विटी = अधिकतम कुल ऋण - पहली मॉर्गेज का शेष",
    sec3_p2: "उदाहरण : 500,000 $ के मकान पर 275,000 $ की पहली मॉर्गेज और 80% सीएलटीवी सीमा होने पर कुल स्वीकार्य ऋण 400,000 $ बनता है। पहली मॉर्गेज घटाने के बाद अधिकतम 125,000 $ का दूसरा ऋण प्राप्त किया जा सकता है।",
    sec3_p3: "यह संपत्ति के बाजार उतार-चढ़ाव में सुरक्षित इक्विटी बनाए रखने में मदद करता है।",
    sec4_h2: "4. मोड A बनाम मोड B: विशिष्ट ऋण बनाम अधिकतम क्षमता",
    sec4_p: "कैलकुलेटर दो अलग-अलग गणना मोड प्रदान करता है :",
    sec4_h3_1: "मोड A — विशिष्ट ऋण राशि",
    sec4_p_1: "मरम्मत या अन्य आवश्यकताओं के लिए एक निश्चित राशि दर्ज करके सटीक किस्त निकालें।",
    sec4_h3_2: "मोड B — सीएलटीवी अनुसार अधिकतम क्षमता",
    sec4_p_2: "अधिकतम स्वीकृत सीएलटीवी सीमा तक उपलब्ध संपूर्ण ऋण क्षमता की गणना करें।",
    sec5_h2: "5. निश्चित मासिक किस्त का फॉर्मूला",
    sec5_p1: "मासिक किस्त (M) की गणना मानक एन्युइटी फॉर्मूले द्वारा की जाती है :",
    sec5_p2: "M = P × [r(1+r)^n] / [(1+r)^n - 1], जहाँ P मूलधन, r मासिक ब्याज दर और n महीनों की कुल संख्या है। 125,000 $ पर 8.50% की दर से 15 वर्षों के लिए मासिक किस्त 1,230.94 $ होती है।",
    sec6_h2: "6. शून्य ब्याज दर परिदृश्य",
    sec6_p1: "0% ब्याज दर वाले विशेष प्रस्तावों में सीधी रैखिक गणना लागू होती है : M = P / n.",
    sec6_p2: "125,000 $ पर 15 वर्षों के लिए 0% ब्याज पर मासिक किस्त 694.44 $ होगी।",
    sec7_h2: "7. दूसरी मॉर्गेज की परिशोधन अनुसूची",
    sec7_p1: "तालिका प्रत्येक महीने मूलधन और ब्याज के सटीक विभाजन को दर्शाती है।",
    sec7_p2: "पहले महीने 1,230.94 $ की किस्त में से 885.42 $ ब्याज में और 345.52 $ मूलधन में जाते हैं, जिससे शेष राशि घटकर 124,654.48 $ हो जाती है।",
    sec8_h2: "8. वास्तविक वार्षिक दर (APR) और क्लोजिंग लागत",
    sec8_p1: "वास्तविक APR सभी अग्रिम शुल्कों को शामिल करके ऋण की वास्तविक लागत प्रदर्शित करता है।",
    sec8_p2: "125,000 $ पर 8.50% ब्याज और 2,500 $ क्लोजिंग लागत के साथ वास्तविक APR 8.82% बनता है।",
    sec9_h2: "9. क्लोजिंग लागत भुगतान विकल्प",
    sec9_p1: "कैलकुलेटर लागत निपटान के तीन तरीके प्रदान करता है :",
    sec9_p2: "1. नकद भुगतान : ऋण राशि प्रभावित किए बिना अलग से भुगतान। 2. ऋण से कटौती : कुल ऋण 125,000 $ रहेगा लेकिन आपको 122,500 $ प्राप्त होंगे। 3. वित्तपोषित : कुल ऋण बढ़कर 127,500 $ और किस्त 1,255.56 $ हो जाएगी।",
    sec9_p3: "अपनी नकदी स्थिति के अनुसार सबसे उपयुक्त विकल्प चुनें।",
    sec10_h2: "10. आय-ऋण अनुपात (DTI) और ऋण पात्रता",
    sec10_p1: "ऋणदाता पात्रता जांचने के लिए DTI अनुपात का मूल्यांकन करते हैं :",
    sec10_p2: "DTI = (कुल आवास लागत + अन्य मासिक ऋण) / कुल मासिक आय। 36% या उससे कम DTI सर्वोत्तम माना जाता है।",
    sec10_p3: "8,500 $ मासिक आय पर 1,850 $ पहली मॉर्गेज और 500 $ अन्य ऋण होने पर नई किस्त (1,230.94 $) के साथ DTI 42.1% बनता है।",
    sec11_h2: "11. क्रेडिट स्कोर और सीएलटीवी श्रेणियां",
    sec11_p1: "क्रेडिट स्कोर आपकी ब्याज दर और सीएलटीवी सीमा निर्धारित करता है :",
    sec11_p2: "740+ स्कोर पर 85%–90% सीएलटीवी, 680–739 पर 80%–85%, और 620–679 पर अधिकतम 80% सीएलटीवी मिलता है।",
    sec12_h2: "12. होम इक्विटी लोन बनाम हेलॉक (HELOC)",
    sec12_p1: "होम इक्विटी लोन निश्चित ब्याज और स्थिर किस्तों की सुरक्षा देता है।",
    sec12_p2: "हेलॉक परिवर्तनीय ब्याज के साथ लचीली क्रेडिट लाइन देता है लेकिन ब्याज दर बढ़ने का जोखिम रहता है।",
    sec13_h2: "13. होम इक्विटी लोन बनाम कैश-आउट रीफाइनेंस",
    sec13_p1: "होम इक्विटी लोन आपके पहले ऋण की कम ब्याज दर को सुरक्षित रखता है।",
    sec13_p2: "रीफाइनेंस आपके पूरे ऋण को वर्तमान बाजार दर पर बदल देता है, जो ब्याज दरें बढ़ने पर महंगा साबित हो सकता है।",
    sec14_h2: "14. अतिरिक्त मूलधन भुगतान और ब्याज बचत",
    sec14_p1: "नियमित अतिरिक्त भुगतान करने से ऋण की अवधि और कुल ब्याज में भारी कमी आती है।",
    sec14_p2: "125,000 $ के ऋण पर प्रति माह 100 $ अतिरिक्त देने से ऋण 24 महीने पहले समाप्त होता है और 16,400 $ से अधिक ब्याज बचता है।",
    sec15_h2: "15. कर कटौती अनुमान (कर नियम)",
    sec15_p1: "कर नियमों के अनुसार, ब्याज पर छूट केवल तभी मिलती है जब राशि घर की मरम्मत या निर्माण में उपयोग की गई हो।",
    sec15_p2: "व्यक्तिगत खर्चों या अन्य ऋण चुकाने में उपयोग करने पर ब्याज कर-कटौती योग्य नहीं होता।",
    sec15_p3: "24% कर स्लैब में पहले वर्ष 9,800 $ ब्याज पर लगभग 2,352 $ की कर बचत हो सकती है।",
    sec16_h2: "16. घर के नवीनीकरण से मूल्य वृद्धि",
    sec16_p1: "घर के रणनीतिक सुधार संपत्ति के बाजार मूल्य को बढ़ाते हैं।",
    sec16_p2: "50,000 $ के सुधार पर 70% मूल्य वापसी से घर का मूल्य 35,000 $ बढ़ जाता है।",
    sec17_h2: "17. होम इक्विटी लोन के जोखिम",
    sec17_p1: "चूंकि घर जमानत के रूप में होता है, भुगतान में चूक होने पर घर की जब्ती का जोखिम रहता है।",
    sec17_p2: "मासिक बजट बनाते समय पहली और दूसरी मॉर्गेज दोनों को ध्यान में रखें।",
    sec18_h2: "18. नकारात्मक इक्विटी परिदृश्य",
    sec18_p: "यदि बाजार मूल्य गिर जाता है और कुल ऋण घर के मूल्य से अधिक हो जाता है, तो संपत्ति नकारात्मक इक्विटी में आ जाती है। किस्तें समान रहती हैं लेकिन बिक्री के लिए अतिरिक्त धन देना पड़ता है।",
    sec19_h2: "19. पूर्व-भुगतान शुल्क",
    sec19_p: "अधिकांश आधुनिक ऋणों में समय पूर्व भुगतान पर कोई जुर्माना नहीं होता, फिर भी अनुबंध की शर्तों की पुष्टि करें।",
    sec20_h2: "20. क्लोजिंग लागत और समय-सीमा",
    sec20_p: "लागत आमतौर पर 2% से 5% (1,500 $ से 4,000 $) होती है और स्वीकृति में 2 से 6 सप्ताह लगते हैं।",
    sec21_h2: "21. बचने योग्य सामान्य गलतियाँ",
    sec21_mistakes: [
      "कुल इक्विटी को उपलब्ध ऋण सीमा समझ लेना (बैंक 15%–20% सुरक्षा बफर रखते हैं)।",
      "सीएलटीवी निकालते समय पहले मॉर्गेज का शेष घटाना भूल जाना।",
      "यह मानना कि 80% सीएलटीवी सभी बैंकों में एक समान होता है।",
      "अच्छे क्रेडिट स्कोर पर DTI की जांच किए बिना ऋण स्वीकृति मान लेना।",
      "पहले ऋण के ब्याज दर अंतर को समझे बिना रीफाइनेंस से तुलना करना।",
      "वास्तविक APR की गणना में क्लोजिंग लागत को अनदेखा करना।",
      "बिना मरम्मत प्रमाण के सभी ब्याज को कर-मुक्त मान लेना।",
      "यह सोचना कि सुधार में लगा हर रुपया मकान का मूल्य 100% बढ़ाएगा।",
      "आपातकालीन कोष बनाए बिना अधिकतम ऋण ले लेना।",
      "बिना गणना किए वित्तीय निर्णय लेना।"
    ],
    sec22_h2: "22. मुख्य सूत्रों का सारांश",
    sec22_formulas: [
      "अधिकतम अनुमेय कुल ऋण: घर का मूल्य × सीएलटीवी सीमा",
      "अधिकतम उपलब्ध इक्विटी: max(0, कुल ऋण - पहली मॉर्गेज का शेष)",
      "ऋणोपरांत सीएलटीवी: (पहला ऋण + दूसरा ऋण) / घर का मूल्य × 100",
      "सुरक्षित इक्विटी: 100% - ऋणोपरांत सीएलटीवी",
      "मासिक किस्त: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "ऋण-से-आय अनुपात (DTI): कुल मासिक ऋण / कुल मासिक आय × 100",
      "अनुमानित कर बचत: कटौती योग्य वार्षिक ब्याज × सीमांत कर दर"
    ],
    sec23_noticeTitle: "शैक्षणिक मार्गदर्शन एवं विनियामक सूचना",
    sec23_noticeText: "होम इक्विटी ऋण उपभोक्ता संरक्षण कानूनों और कर नियमों के अधीन हैं। यह कैलकुलेटर केवल शैक्षणिक और योजना उद्देश्यों के लिए गणितीय सिमुलेशन प्रदान करता है।",
    overlayInputs: {
      homeValue: "घर का अनुमानित बाजार मूल्य",
      currentMortgageBalance: "पहले मॉर्गेज का वर्तमान शेष",
      loanAmount: "इच्छित ऋण राशि",
      interestRate: "वार्षिक निश्चित ब्याज दर",
      loanTerm: "ऋण की अवधि (वर्ष)",
      closingCosts: "अनुमानित क्लोजिंग लागत",
      closingCostMode: "क्लोजिंग लागत का प्रकार",
      mode: "गणना मोड (राशि / क्षमता)",
      cltvLimit: "अधिकतम सीएलटीवी सीमा",
      extraMonthlyPayment: "अतिरिक्त मासिक मूलधन भुगतान",
      grossMonthlyIncome: "सकल मासिक आय",
      monthlyDebtPayments: "अन्य मासिक ऋण भुगतान"
    },
    overlayOutputs: {
      monthlyPayment: "निश्चित मासिक किस्त",
      totalInterest: "कुल देय ब्याज",
      totalCost: "कुल वित्तपोषण लागत",
      maxLoanAmount: "अधिकतम उपलब्ध ऋण",
      postLoanCltv: "अंतिम सीएलटीवी",
      trueApr: "वास्तविक प्रभावी APR",
      interestSavings: "अतिरिक्त भुगतान से ब्याज बचत"
    }
  },
  pt: {
    title: "Calculadora de Empréstimo com Garantia de Imóvel (Home Equity)",
    metaDesc: "Calcule parcelas fixas de empréstimos com garantia de imóvel, CLTV, taxa efetiva anual (TAEG), tabela de amortização e capacidade máxima de crédito.",
    keywords: ["calculadora de home equity", "segunda hipoteca", "calculadora cltv", "emprestimo com garantia de imovel"],
    faqs: [
      { question: "O que é um empréstimo com garantia de imóvel e como funciona?", answer: "É uma segunda hipoteca com taxa fixa em que você obtém um montante à vista utilizando o patrimônio acumulado no seu imóvel como garantia." },
      { question: "Quanto posso pegar emprestado sobre o patrimônio do meu imóvel?", answer: "A maioria das instituições financeiras permite um CLTV máximo de 80% a 85% do valor de avaliação do imóvel, deduzindo o saldo da sua primeira hipoteca." },
      { question: "O que é CLTV e como é calculado?", answer: "O CLTV (Combined Loan-to-Value) é a soma de todos os financiamentos sobre a propriedade dividida pelo valor de mercado avaliado do imóvel." },
      { question: "Como é calculada a parcela mensal do empréstimo?", answer: "Calcula-se por meio da fórmula padrão de amortização com base no saldo devedor, na taxa de juros periódica e no prazo em meses." },
      { question: "Qual pontuação de crédito (score) é exigida?", answer: "Normalmente exige-se pontuação a partir de 620, sendo que as taxas mais vantajosas requerem pontuação acima de 700." },
      { question: "Qual a diferença entre um empréstimo com garantia e uma linha HELOC?", answer: "O empréstimo entrega um montante integral com parcelas e taxa fixas, enquanto a HELOC é uma linha de crédito rotativa com taxa variável." },
      { question: "Qual a diferença em relação ao refinanciamento com saque (cash-out)?", answer: "O refinanciamento substitui seu financiamento original por um novo, enquanto o empréstimo com garantia mantém sua primeira hipoteca inalterada." },
      { question: "Os juros do empréstimo são dedutíveis no imposto de renda?", answer: "De acordo com as regras fiscais vigentes, os juros só são dedutíveis se os recursos forem utilizados na compra, construção ou reforma estrutural do imóvel." },
      { question: "Posso amortizar o empréstimo antecipadamente?", answer: "Sim, a grande maioria dos contratos permite amortizações extraordinárias para reduzir prazo e juros totais sem cobrança de penalidades." },
      { question: "Quais são os custos de fechamento típicos de uma segunda hipoteca?", answer: "Geralmente variam de 2% a 5% do valor financiado (avaliação do imóvel, taxas de originação, registro e custas cartorárias)." },
      { question: "O que acontece se o valor do imóvel cair e a dívida superar o valor do bem?", answer: "O imóvel entra em patrimônio negativo (underwater). As parcelas mensais continuam iguais, mas para vender ou refinanciar será necessário aportar capital próprio." },
      { question: "Quanto tempo leva a aprovação e a liberação dos recursos?", answer: "O processo costuma levar de 2 a 6 semanas para conclusão da vistoria, análise de crédito e registro da garantia." }
    ],
    pIntro: "Calcule parcelas fixas de empréstimo com garantia de imóvel, capacidade máxima de crédito, relação empréstimo-valor combinada (CLTV), custo efetivo total, tabela de amortização, economia por pagamentos extras e índice de endividamento (DTI).",
    sec1_h2: "1. O que é uma Calculadora de Empréstimo com Garantia de Imóvel?",
    sec1_p1: "Uma calculadora de home equity estima o limite de crédito disponível com base no valor líquido do seu imóvel e projeta as parcelas mensais de uma segunda hipoteca com taxa fixa.",
    sec1_p2: "Distingue-se de uma linha rotativa (HELOC). O empréstimo com garantia entrega uma quantia única amortizável com parcelas fixas.",
    sec1_noticeTitle: "Aviso do Modelo de Análise",
    sec1_noticeText: "Os resultados apresentados são simulações matemáticas e não constituem proposta vinculante de financiamento.",
    sec2_h2: "2. Como Usar a Calculadora de Empréstimo com Garantia",
    sec2_p: "Siga estes passos para simular seu planejamento financeiro :",
    sec2_steps: [
      "1. Informe o valor de mercado estimado do imóvel.",
      "2. Digite o saldo devedor atual do primeiro financiamento.",
      "3. Escolha o limite máximo de CLTV (80% padrão, 85% ou 90%).",
      "4. Selecione o Modo A (valor desejado) ou Modo B (capacidade máxima).",
      "5. Insira a taxa de juros fixa anual e o prazo em anos (15 ou 30 anos).",
      "6. Informe os custos iniciais de fechamento estimados.",
      "7. Escolha a forma de pagamento dos custos (À vista, Deduzido ou Financiado).",
      "8. Analise o valor da parcela mensal fixa.",
      "9. Verifique o limite disponível, o novo CLTV e o custo efetivo total (TAEG).",
      "10. Inspecione a tabela de amortização e exporte em formato CSV.",
      "11. Simule pagamentos extras para calcular a economia de juros.",
      "12. Compare o resultado com cenários de HELOC e refinanciamento.",
      "13. Avalie o índice DTI e as deduções fiscais aplicáveis.",
      "14. Salve a simulação no histórico local."
    ],
    sec3_h2: "3. Patrimônio Líquido e Índice Empréstimo-Valor Combinado (CLTV)",
    sec3_p1: "A capacidade máxima de endividamento baseia-se no teto de CLTV estabelecido :",
    sec3_f1: "Dívida Máxima Total = Valor do Imóvel × Limite CLTV",
    sec3_f2: "Crédito Máximo Disponível = Dívida Máxima Total - Saldo 1º Financiamento",
    sec3_p2: "Exemplo : Para um imóvel avaliado em 500.000 $ com saldo devedor de 275.000 $ e limite de 80% de CLTV, a dívida total autorizada é de 400.000 $. Deduzindo os 275.000 $, o limite disponível para a segunda hipoteca é de 125.000 $ com CLTV final de 80,0% e 20,0% (100.000 $) de patrimônio líquido protegido.",
    sec3_p3: "Isso assegura uma margem de segurança patrimonial contra variações imobiliárias.",
    sec4_h2: "4. Modo A vs Modo B: Valor Específico ou Limite Máximo",
    sec4_p: "A ferramenta dispõe de dois modos de simulação :",
    sec4_h3_1: "Modo A — Valor de Empréstimo Específico",
    sec4_p_1: "Permite indicar uma quantia exata (ex.: 125.000 $) para reformas ou quitação de dívidas e calcular a parcela exata.",
    sec4_h3_2: "Modo B — Capacidade Máxima por CLTV",
    sec4_p_2: "Calcula o valor máximo contratável até o limite de CLTV permitido.",
    sec5_h2: "5. Fórmula da Parcela Mensal Fixa",
    sec5_p1: "A prestação mensal fixa (M) é obtida pela fórmula de amortização financeira :",
    sec5_p2: "M = P × [r(1+r)^n] / [(1+r)^n - 1], onde P é o principal, r é a taxa mensal e n é o número de parcelas. Para 125.000 $ a 8,50% em 15 anos (180 meses), a parcela é de 1.230,94 $.",
    sec6_h2: "6. Simulação com Taxa de Juros Zero",
    sec6_p1: "Em campanhas com taxa de 0%, a divisão é linear simples : M = P / n.",
    sec6_p2: "Para 125.000 $ em 15 anos a 0% de juros, a parcela é de 694,44 $ sem custos de juros.",
    sec7_h2: "7. Tabela de Amortização da Segunda Hipoteca",
    sec7_p1: "O demonstrativo detalha mês a mês o montante pago em juros e amortização.",
    sec7_p2: "No primeiro mês de um empréstimo de 125.000 $ a 8,50%, da parcela de 1.230,94 $, 885,42 $ são juros e 345,52 $ abatem o principal, reduzindo o saldo para 124.654,48 $.",
    sec8_h2: "8. Custo Efetivo Total (TAEG) e Custos Iniciais",
    sec8_p1: "O custo efetivo incorpora as despesas iniciais de contratação para apresentar a taxa real do empréstimo.",
    sec8_p2: "Para 125.000 $ a 8,50% com 2.500 $ em despesas pagas à vista, o custo efetivo anual (TAEG) é de 8,82%.",
    sec9_h2: "9. Opções de Pagamento dos Custos de Fechamento",
    sec9_p1: "Três modalidades de liquidação de despesas estão disponíveis :",
    sec9_p2: "1. Pago à Vista : Liquidado na assinatura sem alterar o saldo devedor. 2. Deduzido do Valor : O valor contratado é 125.000 $ e você recebe 122.500 $ líquidos. 3. Financiado : O saldo inicial sobe para 127.500 $, elevando a parcela para 1.255,56 $.",
    sec9_p3: "Analise essas alternativas para preservar seu fluxo de caixa.",
    sec10_h2: "10. Índice de Endividamento (DTI) e Análise de Crédito",
    sec10_p1: "As instituições avaliam o índice DTI pós-operação para medir a capacidade de pagamento :",
    sec10_p2: "DTI = (Gastos Habitacionais Totais + Outras Dívidas) / Renda Bruta Mensal. Níveis até 36% são excelentes, enquanto entre 43% e 50% exigem garantias adicionais.",
    sec10_p3: "Com 8.500 $ de renda, 1.850 $ de primeira hipoteca e 500 $ em compromissos, a nova parcela de 1.230,94 $ resulta em DTI de 42,1%, compatível com aprovação regular.",
    sec11_h2: "11. Score de Crédito e Faixas de CLTV",
    sec11_p1: "Sua pontuação de crédito define a taxa e o percentual de CLTV acessível :",
    sec11_p2: "Scores acima de 740 alcançam CLTV de 85%–90% com taxas preferenciais, 680–739 até 80%–85%, e 620–679 limitam-se a 80%.",
    sec12_h2: "12. Empréstimo com Garantia vs HELOC",
    sec12_p1: "O empréstimo com garantia oferece previsibilidade total com taxas e parcelas fixas.",
    sec12_p2: "A HELOC proporciona saques rotativos flexíveis a taxas variáveis, porém com risco de oscilação de juros e salto no valor das parcelas.",
    sec13_h2: "13. Empréstimo com Garantia vs Refinanciamento com Saque",
    sec13_p1: "O empréstimo com garantia mantém intacta a taxa vantajosa do seu financiamento atual.",
    sec13_p2: "O refinanciamento com saque altera toda a dívida para a taxa de mercado vigente, o que pode ser desfavorável se sua taxa atual for baixa.",
    sec14_h2: "14. Amortizações Extraordinárias e Economia de Juros",
    sec14_p1: "Efetuar pagamentos adicionais reduz o saldo principal e encurta a duração total do empréstimo.",
    sec14_p2: "Em 125.000 $ a 8,50%, um aporte extra de 100 $ por mês reduz o prazo em 24 meses e economiza mais de 16.400 $ em juros.",
    sec15_h2: "15. Dedução Fiscal de Juros",
    sec15_p1: "Os juros só podem ser deduzidos se os recursos forem destinados à aquisição, construção ou reforma da residência.",
    sec15_p2: "Se usados para consumo ou consolidação de outras dívidas, não há dedutibilidade fiscal.",
    sec15_p3: "Para quem está na alíquota marginal de 24% com 9.800 $ de juros no primeiro ano, a economia tributária é de aproximadamente 2.352 $.",
    sec16_h2: "16. Valorização Imobiliária com Reformas",
    sec16_p1: "Melhorias estruturais no imóvel elevam o valor de avaliação e recompõem seu patrimônio.",
    sec16_p2: "Uma reforma de 50.000 $ com retorno de 70% agrega 35.000 $ ao valor de mercado da casa.",
    sec17_h2: "17. Riscos do Empréstimo com Garantia de Imóvel",
    sec17_p1: "O imóvel é a garantia real da operação, de modo que inadimplências graves podem acarretar execução da garantia.",
    sec17_p2: "Planeje o orçamento para honrar simultaneamente o primeiro financiamento, a nova parcela, o IPTU e o condomínio.",
    sec18_h2: "18. Patrimônio Líquido Negativo",
    sec18_p: "Se o mercado imobiliário recuar e o saldo das dívidas ultrapassar o valor do imóvel, haverá patrimônio negativo. O pagamento mensal permanece inalterado, mas a venda exigirá recursos próprios.",
    sec19_h2: "19. Penalidades por Liquidação Antecipada",
    sec19_p: "A maioria dos contratos atuais não aplica multas por quitação antecipada, mas sempre revise as cláusulas contratuais.",
    sec20_h2: "20. Custos de Fechamento e Prazos",
    sec20_p: "Os custos variam de 2% a 5% (1.500 $ a 4.000 $) e o prazo médio de liberação é de 2 a 6 semanas.",
    sec21_h2: "21. Erros Comuns a Evitar",
    sec21_mistakes: [
      "Confundir patrimônio total com capacidade máxima de empréstimo (instituições exigem margem de 15% a 20%).",
      "Esquecer de subtrair o saldo do primeiro financiamento no cálculo do CLTV.",
      "Achar que 80% de CLTV é um teto uniforme em todas as instituições.",
      "Assumir aprovação garantida pelo score sem avaliar o índice DTI.",
      "Comparar a parcela sem computar o custo da troca de taxa na primeira hipoteca.",
      "Ignorar as custas iniciais ao verificar o custo efetivo global.",
      "Presumir dedução fiscal sem aplicação comprovada em reformas do imóvel.",
      "Acreditar que cada real investido em obras valoriza 100% o imóvel.",
      "Assumir dívidas sem reserva de emergência para imprevistos.",
      "Tomar decisões sem simular previamente os impactos financeiros."
    ],
    sec22_h2: "22. Resumo das Fórmulas Principais",
    sec22_formulas: [
      "Dívida Máxima Total: Valor do Imóvel × Limite CLTV",
      "Crédito Máximo Disponível: max(0, Dívida Máxima - Saldo 1º Financiamento)",
      "CLTV Pós-Empréstimo: (Saldo 1 + Saldo 2) / Valor do Imóvel × 100",
      "Patrimônio Protegido: 100% - CLTV Pós-Empréstimo",
      "Parcela Mensal Fixa: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Índice DTI Pós-Empréstimo: (Gastos Moradia + Dívidas) / Renda Bruta × 100",
      "Economia Fiscal Estimada: Juros Dedutíveis Anuais × Alíquota Marginal"
    ],
    sec23_noticeTitle: "Orientação Educacional e Aviso Legal",
    sec23_noticeText: "Operações com garantia imobiliária são regidas pelas normas do sistema financeiro. Esta ferramenta fornece simulações matemáticas para fins informativos.",
    overlayInputs: {
      homeValue: "Valor Estimado do Imóvel",
      currentMortgageBalance: "Saldo do Financiamento Atual",
      loanAmount: "Valor do Empréstimo Pretendido",
      interestRate: "Taxa de Juros Fixa Anual",
      loanTerm: "Prazo do Empréstimo (Anos)",
      closingCosts: "Custos de Fechamento Estimados",
      closingCostMode: "Forma de Pagamento dos Custos",
      mode: "Modo de Cálculo (Valor / Capacidade)",
      cltvLimit: "Limite Máximo de CLTV",
      extraMonthlyPayment: "Amortização Mensal Extra de Principal",
      grossMonthlyIncome: "Renda Bruta Mensal",
      monthlyDebtPayments: "Outros Compromissos Mensais"
    },
    overlayOutputs: {
      monthlyPayment: "Parcela Mensal Fixa",
      totalInterest: "Juros Totais a Pagar",
      totalCost: "Custo Total Financiado",
      maxLoanAmount: "Capacidade Máxima de Crédito",
      postLoanCltv: "CLTV Resultante",
      trueApr: "Custo Efetivo Anual (TAEG)",
      interestSavings: "Economia com Pagamentos Extras"
    }
  }
};

for (const loc of LOCALES) {
  const d = DATA[loc];
  const contentCode = `"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(d.faqs, null, 2)};

export const seo = {
  title: "${d.title} — ${d.sec22_formulas[0].split(':')[0]}",
  description: "${d.metaDesc}",
  keywords: ${JSON.stringify(d.keywords)}
};

export const ContentComponent = function HomeEquityContent${loc.toUpperCase()}() {
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

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec1_h2}
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec1_p1}
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec1_p2}
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

      {/* 2. HOW TO USE */}
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

      {/* 3. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec3_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec3_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"${d.sec3_f1}"}</div>
          <div>{"${d.sec3_f2}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec3_p2}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec3_p3}
        </p>
      </section>

      {/* 4. MODE A VS B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec4_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec4_p}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">${d.sec4_h3_1}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">${d.sec4_p_1}</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">${d.sec4_h3_2}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">${d.sec4_p_2}</p>
          </div>
        </div>
      </section>

      {/* 5. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec5_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec5_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\\\times \\\\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec5_p2}
        </p>
      </section>

      {/* 6. ZERO INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec6_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec6_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec6_p2}
        </p>
      </section>

      {/* 7. AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec7_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec7_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Beginning Balance / Saldo Inicial"}: $125,000</div>
          <div>• {"Annual Payment / Pago Anual"}: $14,335</div>
          <div>• {"Principal Paid / Capital"}: $4,497</div>
          <div>• {"Interest Paid / Intereses"}: $9,837</div>
          <div>• {"Ending Balance / Saldo Final"}: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec7_p2}
        </p>
      </section>

      {/* 8. APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec8_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec8_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Financed Loan"}: $125,000 | {"Nominal Rate"}: 8.0% | {"Term"}: 15 Years</div>
          <div>• {"Closing Costs"}: $2,500</div>
          <div>• {"Displayed True APR"}: <strong>8.10% / 8.82%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec8_p2}
        </p>
      </section>

      {/* 9. CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec9_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec9_p1}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Paid Upfront in Cash"}</div>
            <p className="text-slate-600 dark:text-slate-400">${d.sec9_p2}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Deducted from Proceeds"}</div>
            <p className="text-slate-600 dark:text-slate-400">${d.sec9_p3}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Financed into Loan"}</div>
            <p className="text-slate-600 dark:text-slate-400">${d.sec9_p2}</p>
          </div>
        </div>
      </section>

      {/* 10. DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec10_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec10_p1}
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"DTI % = [(Housing Payments + Other Debts) / Gross Income] × 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec10_p2}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec10_p3}
        </p>
      </section>

      {/* 11. CREDIT TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec11_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec11_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec11_p2}
        </p>
      </section>

      {/* 12. HELOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec12_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec12_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage: $717 - $1,231/mo</div>
          <div>• HELOC (Interest-Only Draw): $578/mo</div>
          <div>• Cash-Out Refinance: $2,296/mo</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec12_p2}
        </p>
      </section>

      {/* 13. HELOAN VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec13_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec13_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec13_p2}
        </p>
      </section>

      {/* 14. EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec14_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec14_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $100 - $150/month</div>
          <div>• Accelerated Term: 146 - 156 months</div>
          <div>• Time Saved: 24 - 34 months shaved off</div>
          <div>• Lifetime Interest Saved: $16,400 - $19,341</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec14_p2}
        </p>
      </section>

      {/* 15. IRS TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec15_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec15_p1}
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Tax Savings = Deductible Interest × Marginal Tax Rate"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec15_p2}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec15_p3}
        </p>
      </section>

      {/* 16. RENOVATION ROI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec16_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec16_p1}
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: $535,000</div>
          <div>• Resulting Net Home Equity: $210,000</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec16_p2}
        </p>
      </section>

      {/* 17. RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec17_h2}
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Security Warning & Foreclosure Risk</span>
          </div>
          <p>${d.sec17_p1}</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec17_p2}
        </p>
      </section>

      {/* 18. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec18_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec18_p}
        </p>
      </section>

      {/* 19. PREPAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec19_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec19_p}
        </p>
      </section>

      {/* 20. TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec20_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec20_p}
        </p>
      </section>

      {/* 21. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec21_h2}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            ${d.sec21_mistakes.map(m => `<li>${m}</li>`).join("\n            ")}
          </ul>
        </div>
      </section>

      {/* 22. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec22_h2}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          ${d.sec22_formulas.map(f => `<div>• <strong>${f.split(':')[0]}:</strong> ${f.split(':')[1] || ''}</div>`).join("\n          ")}
        </div>
      </section>

      {/* 23. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>${d.sec23_noticeTitle}</span>
        </div>
        <p>
          ${d.sec23_noticeText}
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/home-equity/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_HOME_EQUITY_OVERLAY = {
  title: "${d.title}",
  description: "${d.metaDesc}",
  inputs: ${JSON.stringify(d.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(d.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_HOME_EQUITY_OVERLAY;
`;
  writeFile(`src/i18n/overlays/home-equity/${loc}.ts`, overlayCode);
}
console.log("✓ Deep Home Equity content generation complete.");
