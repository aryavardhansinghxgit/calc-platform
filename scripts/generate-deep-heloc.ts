import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface HELOCTexts {
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
  sec4_p1: string;
  sec4_p2: string;
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
  sec10_h2: string;
  sec10_p1: string;
  sec10_p2: string;
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
  sec16_h2: string;
  sec16_p1: string;
  sec16_p2: string;
  sec17_h2: string;
  sec17_p1: string;
  sec17_p2: string;
  sec18_h2: string;
  sec18_p1: string;
  sec18_p2: string;
  sec19_h2: string;
  sec19_p: string;
  sec20_h2: string;
  sec20_p: string;
  sec21_h2: string;
  sec21_p: string;
  sec22_h2: string;
  sec22_mistakes: string[];
  sec23_h2: string;
  sec23_formulas: string[];
  sec24_noticeTitle: string;
  sec24_noticeText: string;
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const HELOC_DATA: Record<typeof LOCALES[number], HELOCTexts> = {
  es: {
    title: "Calculadora de Línea de Crédito HELOC",
    metaDesc: "Calcule la capacidad de endeudamiento HELOC, pagos de solo interés, cuotas de amortización, impacto por salto de pago y pruebas de estrés.",
    keywords: ["calculadora heloc", "linea de credito con garantia hipotecaria", "interes heloc", "calculadora credito vivienda"],
    faqs: [
      { question: "¿Qué es una línea de crédito HELOC y cómo funciona?", answer: "Una HELOC es una línea de crédito rotativa garantizada por el valor neto de su vivienda que permite disponer de fondos según sea necesario durante un periodo de disposición." },
      { question: "¿Cuánto puedo obtener en una línea HELOC?", answer: "La mayoría de los prestamistas aprueban entre el 80% y el 85% del valor tasado de la vivienda menos el saldo de su primera hipoteca." },
      { question: "¿Cómo se calculan los pagos en la fase de disposición frente a la fase de amortización?", answer: "Durante la fase de disposición solo se pagan intereses mensuales sobre el saldo utilizado. En la fase de amortización se paga capital e intereses para liquidar la deuda." },
      { question: "¿Qué es el salto de pago (payment shock) en una HELOC?", answer: "Es el aumento brusco en la cuota mensual cuando finaliza el periodo de disposición de solo interés y comienza el periodo obligatorio de amortización de principal." },
      { question: "¿Qué tipo de interés se aplica a una HELOC?", answer: "Generalmente se aplica un tipo de interés variable vinculado al tipo preferencial (Prime Rate) más un margen fijado por el prestamista." },
      { question: "¿Qué comisiones suelen acompañar a una HELOC?", answer: "Pueden incluir comisiones de apertura, cuotas de mantenimiento anual (50 $ a 100 $), comisiones por inactividad y costes de tasación." },
      { question: "¿Se pueden deducir los intereses de una HELOC?", answer: "Solo son deducibles si los fondos se utilizan para adquirir, construir o mejorar sustancialmente la vivienda habitual que garantiza la línea." },
      { question: "¿Se puede congelar o reducir una línea HELOC?", answer: "Sí, los prestamistas se reservan el derecho de reducir o congelar la línea si el valor del inmueble disminuye significativamente o su perfil crediticio se deteriora." },
      { question: "¿Qué ocurre si no utilizo la línea de crédito aprobada?", answer: "No se devengan intereses si el saldo dispuesto es cero, aunque pueden aplicar comisiones de mantenimiento anual según la entidad." },
      { question: "¿Puedo amortizar el principal durante la fase de disposición?", answer: "Sí, puede realizar pagos voluntarios de capital en cualquier momento durante la fase de disposición para restablecer su límite de crédito." },
      { question: "¿Qué puntuación de crédito se necesita para una HELOC?", answer: "Se requiere habitualmente un score de 660 a 680 para calificar, y más de 720 para acceder a los mejores márgenes sobre el tipo preferencial." },
      { question: "¿Cómo afecta una subida de tipos de interés a mi cuota?", answer: "Al tener tipos variables, cualquier aumento en el tipo de referencia incrementa directamente su cuota mensual tanto en la fase de disposición como en la de amortización." }
    ],
    pIntro: "Estime la capacidad máxima de crédito HELOC, ratio combinado (CLTV), cuotas de solo interés en fase de disposición, pagos en fase de amortización, impacto por salto de pago (payment shock), escenarios de estrés por tipos variables y deducción fiscal.",
    sec1_h2: "1. ¿Qué es una Calculadora HELOC?",
    sec1_p1: "Una calculadora de línea de crédito con garantía hipotecaria (HELOC) estima cuánto crédito renovable puede obtener contra el valor acumulado en su vivienda y modela el comportamiento de las cuotas en ambas fases (disposición y amortización).",
    sec1_p2: "A diferencia de un préstamo fijo sobre el valor líquido, la HELOC tiene una fase de disposición (generalmente 10 años) con pagos de solo intereses opcionales, seguida de una fase de amortización obligatoria (generalmente 20 años) con pagos de capital e intereses.",
    sec1_noticeTitle: "Aviso del Modelo de Planificación",
    sec1_noticeText: "Esta herramienta es un modelo de planificación matemática y no constituye una aprobación formal de crédito. Los límites y tipos reales varían según el prestamista.",
    sec2_h2: "2. Cómo Utilizar la Calculadora HELOC",
    sec2_p: "Siga estos pasos estructurados para evaluar su línea de crédito renovable :",
    sec2_steps: [
      "1. Introduzca el valor de mercado estimado de la vivienda.",
      "2. Introduzca el saldo actual de la primera hipoteca.",
      "3. Seleccione el límite máximo de CLTV (80% estándar u 85% financiamiento alto).",
      "4. Indique el límite de crédito HELOC deseado.",
      "5. Introduzca el tipo de interés variable inicial.",
      "6. Elija la duración del periodo de disposición (5, 10 o 15 años) y de amortización (10, 15 o 20 años).",
      "7. Introduzca las comisiones de apertura y mantenimiento anual estimadas.",
      "8. Seleccione la estructura de pago en la fase de disposición (Solo Interés o Capital + Interés).",
      "9. Revise la capacidad máxima, el CLTV dispuesto, la cuota de disposición y la cuota de amortización.",
      "10. Inspeccione el plan de amortización en dos fases y expórtelo a CSV.",
      "11. Simule escenarios de estrés de tipos variables (+1%, +2%, +3% o Techo Máximo).",
      "12. Pruebe el simulador de ciclo de vida con disposiciones futuras y pagos extra.",
      "13. Compare la HELOC con un préstamo fijo de segunda hipoteca y una refinanciación cash-out.",
      "14. Compruebe la estimación de deducción fiscal del IRS de forma independiente."
    ],
    sec3_h2: "3. Cómo se Calcula la Capacidad de Endeudamiento HELOC",
    sec3_p1: "La capacidad máxima parte de la deuda combinada permitida por el límite de CLTV seleccionado :",
    sec3_f1: "Deuda Combinada Máxima = Valor de Mercado × Límite CLTV %",
    sec3_f2: "Línea HELOC Máxima = max(0, Deuda Combinada Máxima - Saldo 1ª Hipoteca)",
    sec3_p2: "Ejemplo : Para una vivienda de 500.000 $ con una primera hipoteca de 260.000 $ y un CLTV máximo del 80%, la deuda combinada permitida es de 400.000 $. Restando los 260.000 $, la línea HELOC máxima calculada es de 140.000 $. Una línea solicitada de 50.000 $ genera un CLTV dispuesto del 62,0%.",
    sec3_p3: "Esto permite conocer con precisión el margen disponible sin comprometer la estabilidad financiera del hogar.",
    sec4_h2: "4. Fase de Disposición vs. Fase de Amortización",
    sec4_p1: "La vida de una HELOC se divide en dos fases con dinámicas de pago totalmente distintas :",
    sec4_p2: "Durante la fase de disposición (típicamente 10 años), el prestatario puede retirar y reembolsar fondos según necesite, pagando únicamente los intereses devengados por el saldo utilizado. Al expirar la fase de disposición, la línea se cierra a nuevas disposiciones y entra en la fase de amortización (10 a 20 años), donde se paga capital e intereses obligatorios.",
    sec5_h2: "5. Pagos de Solo Interés en la Fase de Disposición",
    sec5_p1: "La cuota mensual de solo interés (I) se calcula multiplicando el saldo dispuesto por el tipo mensual :",
    sec5_p2: "I = Saldo Dispuesto × (Tipo Anual / 12). Para 50.000 $ al 8,50%, el pago de solo interés durante la fase de disposición es de 354,17 $ al mes.",
    sec6_h2: "6. Pagos Completos en la Fase de Amortización",
    sec6_p1: "Al comenzar la fase de amortización, el saldo pendiente se financia mediante cuotas fijas amortizables :",
    sec6_p2: "M = P × [r(1+r)^n] / [(1+r)^n - 1]. Para un saldo de 50.000 $ al 8,50% en una fase de amortización de 20 años (240 meses), la cuota mensual pasa a ser de 433,91 $.",
    sec7_h2: "7. Análisis del Salto de Pago (Payment Shock)",
    sec7_p1: "El salto de pago representa el incremento porcentual y absoluto al pasar de solo interés a amortización completa.",
    sec7_p2: "En el ejemplo de 50.000 $ al 8,50%, la cuota salta de 354,17 $ a 433,91 $, lo que supone un aumento de 79,74 $ (+22,5%). En periodos de amortización más cortos (10 años), la cuota subiría a 620,06 $ (+75,1%).",
    sec8_h2: "8. Escenarios de Estrés por Tipos de Interés Variables",
    sec8_p1: "Dado que las HELOC tienen tipos variables, el prestatario debe modelar posibles subidas de tipos :",
    sec8_p2: "Si el tipo sube del 8,50% al 10,50% (+2%), la cuota de disposición aumenta de 354,17 $ a 437,50 $ (+23,5%) y la cuota de amortización sube a 498,98 $ (+15,0%).",
    sec9_h2: "9. Comisiones Anuales y Coste Total de Mantenimiento",
    sec9_p1: "Las líneas HELOC suelen incluir una comisión anual de mantenimiento (50 $ a 100 $ al año).",
    sec9_p2: "A lo largo de un ciclo completo de 30 años, 75 $ anuales acumulan 2.250 $ en comisiones que incrementan el coste efectivo total.",
    sec10_h2: "10. Ciclo de Vida Multidispuesto y Pagos Extra",
    sec10_p1: "El prestatario puede simular nuevas disposiciones durante la fase de apertura o pagos voluntarios de capital.",
    sec10_p2: "Aportar 100 $ adicionales de capital al mes durante la fase de amortización ahorra miles de dólares en intereses y recorta varios años del plazo total.",
    sec11_h2: "11. HELOC vs. Préstamo Fijo con Garantía Hipotecaria",
    sec11_p1: "La HELOC destaca por su flexibilidad para gastos graduales o imprevistos con coste financiero solo por lo utilizado.",
    sec11_p2: "El préstamo fijo sobre el valor líquido es preferible para gastos únicos con importe conocido, ofreciendo certidumbre total frente a subidas de tipos.",
    sec12_h2: "12. HELOC vs. Refinanciación Cash-Out",
    sec12_p1: "Una HELOC preserva intacta la primera hipoteca y su tipo de interés original.",
    sec12_p2: "La refinanciación con retiro de efectivo cambia toda la deuda al tipo actual, lo que resulta perjudicial si su hipoteca principal tiene un tipo muy ventajoso.",
    sec13_h2: "13. Requisitos Crediticios y Criterios de Calificación",
    sec13_p1: "Los prestamistas exigen un ratio DTI inferior al 43% y puntuaciones de crédito de 680 o superiores para condiciones óptimas.",
    sec13_p2: "Valores de tasación sólidos e ingresos estables son indispensables para acceder a techos de CLTV del 85%.",
    sec14_h2: "14. Deducibilidad Fiscal de los Intereses HELOC",
    sec14_p1: "Bajo la normativa del IRS, los intereses solo son deducibles si el dinero se destina a mejoras sustanciales en la vivienda que garantiza la línea.",
    sec14_p2: "Los fondos utilizados para pagar tarjetas de crédito o gastos personales no generan deducción fiscal.",
    sec15_h2: "15. Riesgo de Congelación o Reducción de la Línea",
    sec15_p1: "Los bancos pueden congelar el límite disponible si el mercado inmobiliario cae o se deteriora la solvencia del titular.",
    sec15_p2: "Mantener un colchón de seguridad evita depender exclusivamente de la línea de crédito ante emergencias.",
    sec16_h2: "16. Escenarios de Patrimonio Negativo",
    sec16_p1: "Si el valor del inmueble baja y el saldo total supera el valor de mercado, no se podrán solicitar nuevas disposiciones.",
    sec16_p2: "Las obligaciones de pago continúan vigentes según el calendario pactado.",
    sec17_h2: "17. Opciones de Fijación de Tipo en HELOC",
    sec17_p1: "Algunas entidades ofrecen opciones de tipo fijo (Fixed-Rate Lock) para convertir parte del saldo dispuesto en un préstamo a tipo fijo.",
    sec17_p2: "Esto permite protegerse de subidas en el tipo preferencial mientras se mantiene la flexibilidad del saldo restante.",
    sec18_h2: "18. Costes de Cierre y Cancelación",
    sec18_p1: "Los costes de cierre oscilan entre 500 $ y 2.500 $ (o gratuitos en promociones bancarias con permanencia).",
    sec18_p2: "Cerrar la línea antes de 2 a 3 años puede acarrear una comisión por cancelación anticipada (early closure fee).",
    sec19_h2: "19. Gestión Responsable del Crédito Rotativo",
    sec19_p: "Utilizar la HELOC como fondo de maniobra para inversiones de valor añadido (reformas) y no para gastos corrientes garantiza un crecimiento patrimonial sostenible.",
    sec20_h2: "20. Planificación Financiera para la Fase de Amortización",
    sec20_p: "Planificar con años de antelación el incremento de la cuota al término de la fase de disposición evita tensiones de tesorería y asegura una transición financiera sin sobresaltos.",
    sec21_h2: "21. Consejos Prácticos para Optimizar su HELOC",
    sec21_p: "Realizar amortizaciones voluntarias en la fase de disposición reduce la base de devengo de intereses y maximiza la liquidez disponible para futuras necesidades.",
    sec22_h2: "22. Errores Frecuentes que Deben Evitarse en una HELOC",
    sec22_mistakes: [
      "Pagar solo intereses durante 10 años sin prever el salto brusco de cuota al iniciar la amortización.",
      "Utilizar la línea de crédito para gastos corrientes de consumo no patrimoniales.",
      "Ignorar el riesgo de subida de tipos de interés en contratos a tipo variable.",
      "Suponer que el límite de crédito estará siempre disponible sin considerar cláusulas de congelación bancaria.",
      "Olvidar sumar las comisiones anuales de mantenimiento en el coste total del crédito.",
      "Creer que los intereses son deducibles sin importar el destino de los fondos.",
      "No comparar el coste total con un préstamo de segunda hipoteca a tipo fijo.",
      "Disponer del 100% de la capacidad sin margen de seguridad ante caídas del valor de tasación.",
      "Cerrar la línea anticipadamente sin comprobar posibles penalizaciones por cancelación rápida.",
      "No simular escenarios de estrés de tipos antes de formalizar la operación."
    ],
    sec23_h2: "23. Resumen de Fórmulas Fundamentales HELOC",
    sec23_formulas: [
      "Deuda Combinada Máxima: Valor de Mercado × Límite CLTV %",
      "Línea HELOC Máxima: max(0, Deuda Combinada Máxima - Saldo 1ª Hipoteca)",
      "CLTV Dispuesto: (Saldo 1ª Hipoteca + Saldo Dispuesto HELOC) / Valor de Mercado × 100",
      "Cuota de Solo Interés: Saldo Dispuesto × (Tipo Anual / 12)",
      "Cuota de Amortización: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Salto de Pago: (Cuota Amortización - Cuota Disposición) / Cuota Disposición × 100",
      "Ahorro Fiscal Estimado: Intereses Deducibles Anuales × Tipo Impositivo Marginal"
    ],
    sec24_noticeTitle: "Orientación Educativa y Aviso Regulatorio",
    sec24_noticeText: "Las líneas de crédito con garantía hipotecaria están sujetas a la normativa TILA/RESPA y directrices bancarias. Esta herramienta proporciona cálculos matemáticos simulados con fines de planificación.",
    overlayInputs: {
      homeValue: "Valor de Mercado de la Vivienda",
      currentMortgageBalance: "Saldo Actual de Primera Hipoteca",
      helocLineAmount: "Límite de Línea HELOC Solicitado",
      interestRate: "Tipo de Interés Inicial Variable",
      drawPeriodYears: "Periodo de Disposición (Años)",
      repayPeriodYears: "Periodo de Amortización (Años)",
      closingCosts: "Costes de Cierre Iniciales",
      annualFee: "Comisión Anual de Mantenimiento",
      drawPaymentType: "Tipo de Pago en Disposición",
      cltvLimit: "Límite Máximo de CLTV",
      interestRateStress: "Simulación de Subida de Tipos",
      extraMonthlyPrincipal: "Pago Extra Mensual de Capital"
    },
    overlayOutputs: {
      maxBorrowingPower: "Capacidad Máxima HELOC",
      drawnCltv: "CLTV con Saldo Dispuesto",
      drawMonthlyPayment: "Cuota en Fase de Disposición",
      repaymentMonthlyPayment: "Cuota en Fase de Amortización",
      paymentShockIncrease: "Salto de Pago (Payment Shock)",
      totalLifetimeInterest: "Intereses Totales Estimados"
    }
  },
  fr: {
    title: "Calculateur de Marge de Crédit HELOC",
    metaDesc: "Calculez la capacité d'emprunt HELOC, les mensualités d'intérêts seuls, les paiements en phase de remboursement et les scénarios de hausse de taux.",
    keywords: ["calculateur heloc", "marge de credit hypothecaire", "interet heloc", "credit valeur domiciliaire"],
    faqs: [
      { question: "Qu'est-ce qu'une marge de crédit HELOC et comment fonctionne-t-elle ?", answer: "Une HELOC est une ligne de crédit renouvelable garantie par votre propriété, permettant des retraits échelonnés selon vos besoins durant la période d'utilisation." },
      { question: "Quel montant puis-je obtenir avec une HELOC ?", answer: "La plupart des institutions autorisent un CLTV de 80 % à 85 % de la valeur marchande du bien, déduction faite du solde de votre première hypothèque." },
      { question: "Comment se calculent les paiements en période de tirage et de remboursement ?", answer: "Pendant la phase de tirage, vous ne payez que les intérêts mensuels sur les sommes utilisées. En phase de remboursement, vous remboursez le capital et les intérêts." },
      { question: "Qu'est-ce que le choc de paiement (payment shock) ?", answer: "C'est la hausse soudaine de la mensualité lorsque prend fin la période d'intérêts seuls et que débute l'amortissement obligatoire du capital." },
      { question: "Quel type de taux s'applique à une HELOC ?", answer: "Il s'agit généralement d'un taux variable indexé sur le taux préférentiel majoré d'une marge définie par le prêteur." },
      { question: "Quels frais sont associés à une marge HELOC ?", answer: "Ils peuvent inclure des frais de dossier, des frais annuels de gestion (50 $ à 100 $), des frais d'évaluation et de clôture." },
      { question: "Les intérêts d'une HELOC sont-ils déductibles d'impôt ?", answer: "Ils ne sont déductibles que si les montants empruntés servent à acquérir, construire ou rénover substantiellement la résidence principale." },
      { question: "La banque peut-elle réduire ou geler ma marge HELOC ?", answer: "Oui, le prêteur se réserve le droit de restreindre ou geler la ligne en cas de baisse notable de la valeur marchande ou de dégradation financière." },
      { question: "Que se passe-t-il si je n'utilise pas ma marge disponible ?", answer: "Aucun intérêt n'est facturé tant que le solde utilisé est nul, bien que des frais annuels puissent s'appliquer." },
      { question: "Puis-je rembourser le capital pendant la période de tirage ?", answer: "Oui, vous pouvez effectuer des versements volontaires de capital à tout moment pour reconstituer votre réserve de crédit." },
      { question: "Quel score de crédit est requis ?", answer: "Un score de 660 à 680 est généralement requis, et plus de 720 pour bénéficier des meilleures marges tarifaires." },
      { question: "Quel est l'impact d'une hausse des taux d'intérêt ?", answer: "Toute hausse du taux de référence augmente immédiatement le coût de vos intérêts et vos mensualités futures." }
    ],
    pIntro: "Estimez la capacité maximale d'emprunt HELOC, le ratio combiné (CLTV), les mensualités d'intérêts seuls, les paiements en phase d'amortissement, le choc de paiement et les scénarios de stress de taux.",
    sec1_h2: "1. Qu'est-ce qu'un Calculateur HELOC ?",
    sec1_p1: "Un calculateur de marge de crédit sur valeur domiciliaire (HELOC) évalue le crédit renouvelable accessible à partir de votre équité immobilière et modélise vos paiements lors des phases d'utilisation et de remboursement.",
    sec1_p2: "Contrairement à un prêt à terme fixe, la HELOC offre une période de tirage flexible (ex. 10 ans) suivie d'une période de remboursement structurée (ex. 20 ans).",
    sec1_noticeTitle: "Avis sur le Modèle Financier",
    sec1_noticeText: "Les résultats fournis constituent des simulations financières mathématiques indicatives.",
    sec2_h2: "2. Comment Utiliser le Calculateur HELOC",
    sec2_p: "Suivez ces étapes pour simuler votre marge de crédit :",
    sec2_steps: [
      "1. Saisissez la valeur estimée de votre propriété.",
      "2. Indiquez le solde restant dû de la première hypothèque.",
      "3. Choisissez le ratio maximal de CLTV (80 % standard ou 85 % élevé).",
      "4. Indiquez le montant de marge HELOC souhaité.",
      "5. Entrez le taux d'intérêt variable initial.",
      "6. Définissez la durée de tirage (5, 10, 15 ans) et de remboursement (10, 15, 20 ans).",
      "7. Précisez les frais initiaux et les frais annuels de gestion.",
      "8. Sélectionnez la structure de paiement en période de tirage.",
      "9. Analysez la capacité d'emprunt, la mensualité de tirage et celle de remboursement.",
      "10. Consultez le tableau d'amortissement complet en deux phases.",
      "11. Simulez des hausses de taux d'intérêt (+1 %, +2 %, +3 %).",
      "12. Testez des tirages additionnels et des remboursements accélérés.",
      "13. Comparez avec un prêt sur valeur nette à taux fixe.",
      "14. Évaluez la déductibilité fiscale applicable."
    ],
    sec3_h2: "3. Calcul de la Capacité d'Emprunt HELOC",
    sec3_p1: "La capacité d'emprunt est fonction de l'endettement maximal permis par le ratio CLTV :",
    sec3_f1: "Dette Totale Autorisée = Valeur Marchande × Plafond CLTV %",
    sec3_f2: "Marge HELOC Maximale = max(0, Dette Totale Autorisée - Solde 1ère Hypothèque)",
    sec3_p2: "Exemple : Pour une maison de 500 000 $ avec une hypothèque de 260 000 $ et un CLTV de 80 %, la dette autorisée est de 400 000 $. En soustrayant 260 000 $, la marge HELOC maximale est de 140 000 $. Une ligne de 50 000 $ donne un CLTV utilisé de 62,0 %.",
    sec3_p3: "Ce modèle assure une visibilité complète sur la flexibilité financière disponible.",
    sec4_h2: "4. Période de Tirage vs Période de Remboursement",
    sec4_p1: "La durée de vie d'une HELOC s'articule en deux étapes distinctes :",
    sec4_p2: "Pendant le tirage (10 ans), vous empruntez selon vos besoins en payant uniquement les intérêts. En phase de remboursement (20 ans), la ligne est fermée et vous remboursez capital et intérêts.",
    sec5_h2: "5. Paiements d'Intérêts Seuls en Phase de Tirage",
    sec5_p1: "La mensualité d'intérêts seuls (I) s'établit ainsi :",
    sec5_p2: "I = Solde Utilisé × (Taux Annuel / 12). Pour 50 000 $ à 8,50 %, la mensualité est de 354,17 $.",
    sec6_h2: "6. Paiements Complets en Phase de Remboursement",
    sec6_p1: "À l'entrée en phase d'amortissement, le paiement passe en annuité constante :",
    sec6_p2: "Pour 50 000 $ à 8,50 % sur 20 ans (240 mois), la mensualité s'élève à 433,91 $.",
    sec7_h2: "7. Analyse du Choc de Paiement (Payment Shock)",
    sec7_p1: "Le choc de paiement mesure le saut financier lors de la transition vers le remboursement.",
    sec7_p2: "Dans cet exemple, la mensualité passe de 354,17 $ à 433,91 $ (+22,5 %). Sur 10 ans de remboursement, elle atteindrait 620,06 $ (+75,1 %).",
    sec8_h2: "8. Scénarios de Stress de Taux Variables",
    sec8_p1: "En cas de resserrement monétaire, les mensualités augmentent :",
    sec8_p2: "Une hausse de taux de +2 % (à 10,50 %) porte la mensualité de tirage à 437,50 $ (+23,5 %) et celle de remboursement à 498,98 $ (+15,0 %).",
    sec9_h2: "9. Frais Annuels et Coût Global",
    sec9_p1: "Les frais annuels de gestion (50 $ à 100 $) s'ajoutent au coût global du crédit.",
    sec9_p2: "Sur 30 ans, 75 $ par an représentent 2 250 $ de frais cumulés.",
    sec10_h2: "10. Gestion du Cycle de Vie et Remboursements Anticipés",
    sec10_p1: "Effectuer des versements volontaires de capital permet de réduire les intérêts débiteurs.",
    sec10_p2: "Un versement supplémentaire de 100 $ par mois en phase d'amortissement génère d'importantes économies d'intérêts.",
    sec11_h2: "11. HELOC vs Prêt sur Valeur Nette Fixe",
    sec11_p1: "La HELOC privilégie la souplesse de trésorerie pour des dépenses échelonnées.",
    sec11_p2: "Le prêt fixe garantit une sécurité totale sur le montant des mensualités.",
    sec12_h2: "12. HELOC vs Refinancement avec Retrait d'Équité",
    sec12_p1: "La HELOC conserve le taux d'intérêt avantageux de votre première hypothèque.",
    sec12_p2: "Le refinancement global convertit toute la dette au taux actuel du marché.",
    sec13_h2: "13. Critères d'Admissibilité et Ratios",
    sec13_p1: "Un ratio d'endettement DTI inférieur à 43 % et un score de crédit de 680+ sont recommandés.",
    sec13_p2: "Une expertise immobilière favorable est requise pour débloquer les plafonds de 85 % de CLTV.",
    sec14_h2: "14. Déductibilité Fiscale des Intérêts",
    sec14_p1: "Les intérêts ne sont déductibles que si les fonds servent à l'amélioration du bien immobilier.",
    sec14_p2: "L'utilisation pour des dépenses courantes ne donne droit à aucune déduction fiscale.",
    sec15_h2: "15. Risque de Gel de la Ligne de Crédit",
    sec15_p1: "Le prêteur peut bloquer de nouveaux tirages si les prix immobiliers chutent.",
    sec15_p2: "Il est prudent de maintenir une épargne de précaution distincte.",
    sec16_h2: "16. Scénarios d'Équité Négative",
    sec16_p1: "En cas de dépréciation du marché, la marge disponible est suspendue.",
    sec16_p2: "Le service des intérêts et remboursements reste dû.",
    sec17_h2: "17. Options de Verrouillage à Taux Fixe",
    sec17_p1: "Certains contrats permettent de convertir une partie du solde en tranche à taux fixe.",
    sec17_p2: "Cela permet de se prémunir contre la volatilité des taux variables.",
    sec18_h2: "18. Frais de Clôture et Fermeture Anticipée",
    sec18_p1: "Les frais d'ouverture varient de 500 $ à 2 500 $.",
    sec18_p2: "Résilier la ligne dans les premières années peut entraîner des pénalités de clôture anticipée.",
    sec19_h2: "19. Utilisation Stratégique du Crédit",
    sec19_p: "Consacrer la HELOC à des projets valorisant le patrimoine maximise le rendement du capital.",
    sec20_h2: "20. Anticipation de la Phase de Remboursement",
    sec20_p: "Préparer la hausse de mensualité plusieurs années avant la fin du tirage évite les tensions financières.",
    sec21_h2: "21. Bonnes Pratiques de Gestion",
    sec21_p: "Amortir régulièrement le capital permet de limiter les intérêts débiteurs cumulés.",
    sec22_h2: "22. Erreurs à Éviter avec une HELOC",
    sec22_mistakes: [
      "Ne payer que les intérêts sans anticiper le saut de mensualité en phase de remboursement.",
      "Utiliser la marge pour financer des dépenses de consommation non productives.",
      "Négliger l'impact potentiel des hausses de taux d'intérêt variables.",
      "Supposer que la ligne restera ouverte sans risque de gel par l'institution.",
      "Oublier les frais annuels de gestion dans le coût total du financement.",
      "Croire que les intérêts sont automatiquement déductibles sans justificatif.",
      "Omettre de comparer avec un prêt fixe de seconde hypothèque.",
      "Utiliser 100 % de la marge sans conserver de marge de sécurité.",
      "Fermer la ligne prématurément sans vérifier les frais de clôture anticipée.",
      "Ne pas tester de scénarios de stress de taux avant la souscription."
    ],
    sec23_h2: "23. Synthèse des Formules Mathématiques HELOC",
    sec23_formulas: [
      "Dette Totale Autorisée : Valeur Marchande × Plafond CLTV %",
      "Marge HELOC Maximale : max(0, Dette Totale - Solde 1ère Hypothèque)",
      "CLTV Utilisé : (Solde 1ère Hypothèque + Solde HELOC) / Valeur Marchande × 100",
      "Mensualité Intérêts Seuls : Solde Utilisé × (Taux Annuel / 12)",
      "Mensualité de Remboursement : P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Choc de Paiement : (Mensualité Remboursement - Mensualité Tirage) / Mensualité Tirage × 100",
      "Économie Fiscale Estimée : Intérêts Déductibles Annuels × Taux Marginal d'Imposition"
    ],
    sec24_noticeTitle: "Orientation Pédagogique et Avis Réglementaire",
    sec24_noticeText: "Les marges de crédit sur valeur domiciliaire sont encadrées par la réglementation financière. Cette calculatrice fournit des simulations indicatives à des fins éducatives.",
    overlayInputs: {
      homeValue: "Valeur Marchande de la Propriété",
      currentMortgageBalance: "Solde de la Première Hypothèque",
      helocLineAmount: "Montant de la Marge HELOC Souhaité",
      interestRate: "Taux d'Intérêt Variable Initial",
      drawPeriodYears: "Durée de la Période de Tirage (Ans)",
      repayPeriodYears: "Durée de la Période de Remboursement (Ans)",
      closingCosts: "Frais de Clôture Initiaux",
      annualFee: "Frais Annuels de Gestion",
      drawPaymentType: "Structure de Paiement en Tirage",
      cltvLimit: "Plafond Maximal de CLTV",
      interestRateStress: "Scénario de Hausse des Taux",
      extraMonthlyPrincipal: "Versement Mensuel Extra de Capital"
    },
    overlayOutputs: {
      maxBorrowingPower: "Capacité d'Emprunt Maximale",
      drawnCltv: "CLTV avec Solde Utilisé",
      drawMonthlyPayment: "Mensualité en Période de Tirage",
      repaymentMonthlyPayment: "Mensualité en Phase de Remboursement",
      paymentShockIncrease: "Choc de Paiement (Payment Shock)",
      totalLifetimeInterest: "Total des Intérêts Estimés"
    }
  },
  de: {
    title: "HELOC-Rechner (Rahmenkredit auf Eigenheimkapital)",
    metaDesc: "Berechnen Sie HELOC-Kreditrahmen, reine Zinszahlungen in der Abrufphase, Tilgungsraten in der Rückzahlungsphase und Zinserhöhungsszenarien.",
    keywords: ["heloc rechner", "rahmenkredit eigenheim", "immobilien rahmenkredit", "abrufkredit immobilie"],
    faqs: [
      { question: "Was ist ein HELOC-Rahmenkredit und wie funktioniert er?", answer: "Ein HELOC ist ein revolvierender Rahmenkredit auf Basis Ihres gebundenen Immobilien-Eigenkapitals, bei dem Sie während der Abrufphase flexibel Geld abrufen können." },
      { question: "Wie hoch ist der maximale HELOC-Kreditrahmen?", answer: "Die meisten Banken erlauben einen Beleihungsauslauf (CLTV) von 80 % bis 85 % des Immobilienwerts abzüglich der Restschuld Ihrer Ersthypothek." },
      { question: "Wie unterscheiden sich Zahlungen in der Abruf- und Rückzahlungsphase?", answer: "In der Abrufphase zahlen Sie meist nur die anfallenden Zinsen auf den abgerufenen Betrag. In der Rückzahlungsphase zahlen Sie feste Tilgungs- und Zinsraten." },
      { question: "Was versteht man unter dem Zahlungsschock (Payment Shock)?", answer: "Der abrupte Anstieg der monatlichen Rate beim Übergang von der reinen Zinsphase zur verbindlichen Kapitaltilgung." },
      { question: "Welche Zinsen fallen bei einem HELOC an?", answer: "In der Regel gilt ein variabler Zinssatz, der an den Leitzins zuzüglich einer individuellen Bankmarge gekoppelt ist." },
      { question: "Welche Nebenkosten entstehen bei einem HELOC?", answer: "Mögliche Kosten umfassen Abschlussgebühren, jährliche Kontoführungsgebühren (50 $ bis 100 $) sowie Wertermittlungsgebühren." },
      { question: "Sind HELOC-Zinsen steuerlich absetzbar?", answer: "Zinsen sind nur absetzbar, wenn die Mittel nachweislich zur Modernisierung oder Instandhaltung der Immobilie eingesetzt werden." },
      { question: "Kann die Bank den Kreditrahmen kürzen oder sperren?", answer: "Ja, bei signifikantem Wertverlust der Immobilie oder Bonitätsverschlechterung kann der Kreditrahmen eingefroren werden." },
      { question: "Was passiert, wenn ich den Kreditrahmen nicht in Anspruch nehme?", answer: "Es fallen keine Zinsen an, solange kein Guthaben in Anspruch genommen wird." },
      { question: "Kann ich während der Abrufphase Tilgungszahlungen leisten?", answer: "Ja, freiwillige Tilgungen sind jederzeit möglich, um den verfügbaren Kreditrahmen wieder aufzufüllen." },
      { question: "Welche Bonitätsanforderungen gelten?", answer: "Üblich sind Bonitätswerte ab 660 bis 680, für Bestkonditionen ab 720." },
      { question: "Wie wirken sich Zinserhöhungen aus?", answer: "Aufgrund des variablen Zinses steigen die monatlichen Zinskosten direkt mit jeder Zinserhöhung der Notenbank." }
    ],
    pIntro: "Ermitteln Sie den maximalen HELOC-Kreditrahmen, den Beleihungsauslauf (CLTV), Zinszahlungen in der Abrufphase, Raten in der Rückzahlungsphase, den Zahlungsschock und Zinsszenarien.",
    sec1_h2: "1. Was ist ein HELOC-Rechner?",
    sec1_p1: "Ein HELOC-Rechner simuliert das verfügbare revolvierende Kreditvolumen auf Basis Ihres Immobilienvermögens und modelliert Zahlungen über Abruf- und Rückzahlungsphasen hinweg.",
    sec1_p2: "Im Gegensatz zum festen Eigenheimkredit bietet der HELOC flexible Abrufmöglichkeiten mit variablen Zinsen während der Abrufphase (z. B. 10 Jahre).",
    sec1_noticeTitle: "Hinweis zum Modell",
    sec1_noticeText: "Die Ergebnisse stellen unverbindliche finanzmathematische Berechnungen dar.",
    sec2_h2: "2. Bedienung des HELOC-Rechners",
    sec2_p: "Befolgen Sie diese Schritte zur Berechnung Ihres Kreditrahmens :",
    sec2_steps: [
      "1. Tragen Sie den geschätzten Marktwert Ihrer Immobilie ein.",
      "2. Geben Sie die Restschuld der Ersthypothek an.",
      "3. Wählen Sie die maximale CLTV-Beleihungsgrenze (80 % Standard oder 85 %).",
      "4. Geben Sie den gewünschten HELOC-Kreditrahmen ein.",
      "5. Tragen Sie den variablen Einstiegszinssatz ein.",
      "6. Wählen Sie die Dauer der Abruf- (5, 10, 15 Jahre) und Rückzahlungsphase (10, 15, 20 Jahre).",
      "7. Tragen Sie Abschlusskosten und Jahresgebühren ein.",
      "8. Wählen Sie die Zahlungsart in der Abrufphase (nur Zinsen oder Zins + Tilgung).",
      "9. Überprüfen Sie Kreditrahmen, Abrufrate und Rückzahlungsrate.",
      "10. Prüfen Sie den zweiphasigen Tilgungsplan.",
      "11. Simulieren Sie Zinsanstiege (+1 %, +2 %, +3 %).",
      "12. Testen Sie Sondertilgungen und spätere Abrufe.",
      "13. Vergleichen Sie mit dem festverzinslichen Eigenheimkredit.",
      "14. Prüfen Sie steuerliche Rahmenbedingungen."
    ],
    sec3_h2: "3. Berechnung der HELOC-Kreditkapazität",
    sec3_p1: "Der maximale Kreditrahmen basiert auf dem zulässigen CLTV-Beleihungsauslauf :",
    sec3_f1: "Maximal zulässige Gesamtschuld = Immobilienwert × CLTV-Grenze %",
    sec3_f2: "Maximaler HELOC-Rahmen = max(0, Gesamtschuld - Restschuld Ersthypothek)",
    sec3_p2: "Beispiel : Bei 500.000 $ Immobilienwert, 260.000 $ Ersthypothek und 80 % CLTV beträgt die Gesamtschuld 400.000 $. Nach Abzug von 260.000 $ verbleibt ein maximaler Rahmen von 140.000 $. Ein Rahmen von 50.000 $ führt zu einem CLTV von 62,0 %.",
    sec3_p3: "Dies sichert einen risikoadäquaten Eigenkapitalpuffer.",
    sec4_h2: "4. Abrufphase im Vergleich zur Rückzahlungsphase",
    sec4_p1: "Ein HELOC gliedert sich in zwei grundverschiedene Phasen :",
    sec4_p2: "In der Abrufphase (10 Jahre) können Sie flexibel Beträge abrufen und zahlen nur Zinsen. In der Rückzahlungsphase (20 Jahre) erfolgt die verbindliche Gesamttilgung in festen Raten.",
    sec5_h2: "5. Reine Zinszahlungen in der Abrufphase",
    sec5_p1: "Die monatliche Zinsrate (I) berechnet sich wie folgt :",
    sec5_p2: "I = Abgerufener Betrag × (Jahreszins / 12). Bei 50.000 $ zu 8,50 % beträgt die Monatsrate 354,17 $.",
    sec6_h2: "6. Gesamtraten in der Rückzahlungsphase",
    sec6_p1: "In der Tilgungsphase wird die Annuität über die Restlaufzeit berechnet :",
    sec6_p2: "Für 50.000 $ zu 8,50 % auf 20 Jahre (240 Monate) beträgt die Monatsrate 433,91 $.",
    sec7_h2: "7. Analyse des Zahlungsschocks (Payment Shock)",
    sec7_p1: "Der Zahlungsschock beschreibt den Ratenanstieg bei Beginn der Tilgungsphase.",
    sec7_p2: "Die Rate steigt von 354,17 $ auf 433,91 $ (+22,5 %). Bei 10 Jahren Tilgungsdauer stiege sie auf 620,06 $ (+75,1 %).",
    sec8_h2: "8. Zinsszenarien bei variablen Zinssätzen",
    sec8_p1: "Steigende Leitzinsen verteuern die Monatsraten :",
    sec8_p2: "Ein Zinsanstieg um +2 % (auf 10,50 %) erhöht die Zinsrate auf 437,50 $ (+23,5 %) und die Tilgungsrate auf 498,98 $ (+15,0 %).",
    sec9_h2: "9. Jahresgebühren und Gesamtkosten",
    sec9_p1: "Laufende Jahresgebühren (50 $ bis 100 $) erhöhen die Gesamtkosten.",
    sec9_p2: "Über 30 Jahre summieren sich 75 $ Jahresgebühr auf 2.250 $.",
    sec10_h2: "10. Mehrfache Abrufe und Sondertilgungen",
    sec10_p1: "Zusätzliche Tilgungen senken die Zinslast spürbar.",
    sec10_p2: "Eine monatliche Sondertilgung von 100 $ in der Tilgungsphase spart erhebliche Zinskosten ein.",
    sec11_h2: "11. HELOC im Vergleich zum festen Eigenheimkredit",
    sec11_p1: "HELOC bietet maximale Flexibilität für schrittweise Renovierungskosten.",
    sec11_p2: "Der feste Eigenheimkredit bietet Zinssicherheit und feste Raten von Beginn an.",
    sec12_h2: "12. HELOC im Vergleich zur Cash-Out-Umschuldung",
    sec12_p1: "HELOC erhält die günstigen Zinskonditionen Ihrer Erstfinanzierung.",
    sec12_p2: "Eine Umschuldung ersetzt die Gesamthypothek zum aktuellen Marktzins.",
    sec13_h2: "13. Bonitätskriterien und Genehmigungsvoraussetzungen",
    sec13_p1: "Ein DTI-Verhältnis unter 43 % und Bonitätswerte ab 680 sind ratsam.",
    sec13_p2: "Solide Wertermittlungen sind Basis für hohe CLTV-Grenzen.",
    sec14_h2: "14. Steuerliche Absetzbarkeit von Zinsen",
    sec14_p1: "Zinsen sind steuerlich nur absetzbar bei werterhaltenden Modernisierungsmaßnahmen.",
    sec14_p2: "Konsumausgaben berechtigen nicht zum Schuldzinsenabzug.",
    sec15_h2: "15. Risiko von Kreditrahmensperrungen",
    sec15_p1: "Banken können den Verfügungsrahmen bei Markteinbrüchen einfrieren.",
    sec15_p2: "Eine unabhängige Liquiditätsreserve bleibt unverzichtbar.",
    sec16_h2: "16. Unterdeckungs-Szenarien",
    sec16_p1: "Bei fallenden Immobilienpreisen wird der Abrufrahmen gesperrt.",
    sec16_p2: "Die Rückzahlungsverpflichtungen bleiben unverändert bestehen.",
    sec17_h2: "17. Zinsbindungsoptionen (Fixed-Rate Lock)",
    sec17_p1: "Einige Verträge gestatten die Umwandlung von Teilbeträgen in feste Zinstilgungstranchen.",
    sec17_p2: "Dies schützt vor Zinssteigerungen.",
    sec18_h2: "18. Abschlusskosten und vorzeitige Schließung",
    sec18_p1: "Die Einrichtungskosten liegen meist bei 500 $ bis 2.500 $.",
    sec18_p2: "Eine vorzeitige Kündigung innerhalb der ersten Jahre kann Vorfälligkeitsgebühren auslösen.",
    sec19_h2: "19. Strategischer Krediteinsatz",
    sec19_p: "Die Nutzung für wertsteigernde Investitionen maximiert den finanziellen Ertrag.",
    sec20_h2: "20. Vorbereitung auf die Rückzahlungsphase",
    sec20_p: "Planen Sie die Ratenanhebung frühzeitig ein, um Liquiditätsengpässe zu vermeiden.",
    sec21_h2: "21. Optimierungstipps für Ihren HELOC",
    sec21_p: "Freiwillige Zwischentilgungen in der Abrufphase reduzieren Zinskosten und halten den Rahmen offen.",
    sec22_h2: "22. Typische Fehler bei HELOC-Krediten",
    sec22_mistakes: [
      "10 Jahre lang nur Zinsen zahlen, ohne die hohe Tilgungsrate einzuplanen.",
      "Den Rahmenkredit für kurzlebigen Konsum verwenden.",
      "Zinsänderungsrisiken bei variablen Zinssätzen unterschätzen.",
      "Annehmen, dass der Kreditrahmen garantiert unbegrenzt offen bleibt.",
      "Laufende Jahresgebühren bei der Gesamtrechnung übersehen.",
      "Steuerliche Abzugsfähigkeit ohne Nachweis voraussetzen.",
      "Den Vergleich mit festverzinslichen Alternativen versäumen.",
      "Den Rahmen zu 100 % ausschöpfen ohne Sicherheitsreserve.",
      "Vorzeitige Schließungsgebühren ignorieren.",
      "Keine Zinserhöhungsszenarien vor Vertragsschluss durchrechnen."
    ],
    sec23_h2: "23. Übersicht der HELOC-Kernformeln",
    sec23_formulas: [
      "Maximal zulässige Gesamtschuld: Immobilienwert × CLTV-Grenze %",
      "Maximaler HELOC-Rahmen: max(0, Gesamtschuld - Restschuld Ersthypothek)",
      "Genutzter CLTV: (Restschuld 1 + Abgerufener Betrag) / Immobilienwert × 100",
      "Monatliche Zinsrate: Abgerufener Betrag × (Jahreszins / 12)",
      "Monatliche Tilgungsrate: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Zahlungsschock: (Tilgungsrate - Zinsrate) / Zinsrate × 100",
      "Geschätzte Steuerersparnis: Abzugsfähige Jahreszinsen × Grenzsteuersatz"
    ],
    sec24_noticeTitle: "Pädagogischer Hinweis und Rechtlicher Rahmen",
    sec24_noticeText: "HELOC-Rahmenkredite unterliegen gesetzlichen Informationspflichten und Bankenregularien. Dieser Rechner stellt unverbindliche Modellrechnungen bereit.",
    overlayInputs: {
      homeValue: "Marktwert der Immobilie",
      currentMortgageBalance: "Restschuld der Ersthypothek",
      helocLineAmount: "Gewünschter HELOC-Kreditrahmen",
      interestRate: "Variabler Einstiegszinssatz",
      drawPeriodYears: "Dauer der Abrufphase (Jahre)",
      repayPeriodYears: "Dauer der Rückzahlungsphase (Jahre)",
      closingCosts: "Abschlusskosten",
      annualFee: "Jährliche Kontoführungsgebühr",
      drawPaymentType: "Zahlungsart in der Abrufphase",
      cltvLimit: "Maximale CLTV-Beleihungsgrenze",
      interestRateStress: "Simulierter Zinsanstieg",
      extraMonthlyPrincipal: "Monatliche Sondertilgung"
    },
    overlayOutputs: {
      maxBorrowingPower: "Maximaler HELOC-Kreditrahmen",
      drawnCltv: "CLTV mit in Anspruch genommenem Betrag",
      drawMonthlyPayment: "Monatsrate in der Abrufphase",
      repaymentMonthlyPayment: "Monatsrate in der Rückzahlungsphase",
      paymentShockIncrease: "Zahlungsschock (Payment Shock)",
      totalLifetimeInterest: "Geschätzte Gesamtzinsen"
    }
  },
  hi: {
    title: "हेलॉक क्रेडिट लाइन कैलकुलेटर (HELOC Calculator)",
    metaDesc: "हेलॉक (HELOC) ऋण क्षमता, केवल-ब्याज ड्रॉ भुगतान, पुनर्भुगतान चरण की किस्तें और परिवर्तनीय ब्याज दर परिदृश्यों की गणना करें।",
    keywords: ["हेलॉक कैलकुलेटर", "होम इक्विटी लाइन ऑफ क्रेडिट", "गृह इक्विटी क्रेडिट लाइन", "हेलॉक ब्याज दर"],
    faqs: [
      { question: "हेलॉक (HELOC) क्या है और यह कैसे काम करता है?", answer: "हेलॉक आपके घर की इक्विटी पर आधारित एक परिवर्तनीय दर वाली क्रेडिट लाइन है जिसमें आप ड्रॉ अवधि के दौरान आवश्यकतानुसार धनराशि निकाल सकते हैं।" },
      { question: "मुझे कितनी अधिकतम क्रेडिट लाइन मिल सकती है?", answer: "अधिकांश ऋणदाता घर के मूल्यांकन मूल्य का 80% से 85% सीएलटीवी (CLTV) और पहली मॉर्गेज की शेष राशि घटाकर क्रेडिट लाइन स्वीकृत करते हैं।" },
      { question: "ड्रॉ अवधि और पुनर्भुगतान अवधि के भुगतानों में क्या अंतर है?", answer: "ड्रॉ अवधि में आप केवल उपयोग की गई राशि पर मासिक ब्याज देते हैं। पुनर्भुगतान अवधि में मूलधन और ब्याज दोनों की निश्चित किस्त देनी होती है।" },
      { question: "पेमेंट शॉक (Payment Shock) क्या है?", answer: "जब ड्रॉ अवधि समाप्त होती है और अनिवार्य मूलधन पुनर्भुगतान शुरू होता है, तो मासिक किस्त में आने वाले अचानक उछाल को पेमेंट शॉक कहते हैं।" },
      { question: "हेलॉक पर क्या ब्याज दर लागू होती है?", answer: "आमतौर पर प्राइम रेट से जुड़ी परिवर्तनीय ब्याज दर लागू होती है।" },
      { question: "हेलॉक से जुड़े शुल्क क्या हैं?", answer: "इसमें वार्षिक रखरखाव शुल्क (50 $ से 100 $), मूल्यांकन शुल्क और क्लोजिंग लागत शामिल हो सकती है।" },
      { question: "क्या हेलॉक का ब्याज कर-मुक्त है?", answer: "यह केवल तभी कर-कटौती योग्य है जब राशि घर के नवीनीकरण या सुधार में लगाई गई हो।" },
      { question: "क्या बैंक क्रेडिट लाइन को फ्रीज कर सकता है?", answer: "हाँ, घर का बाजार मूल्य गिरने या साख कमजोर होने पर बैंक लाइन फ्रीज कर सकता है।" },
      { question: "यदि मैं क्रेडिट का उपयोग न करूँ तो क्या होगा?", answer: "अप्रयुक्त राशि पर कोई ब्याज नहीं लगता।" },
      { question: "क्या ड्रॉ अवधि में मूलधन चुकाया जा सकता है?", answer: "हाँ, आप क्रेडिट सीमा बहाल करने के लिए कभी भी स्वैच्छिक भुगतान कर सकते हैं।" },
      { question: "कितना क्रेडिट स्कोर आवश्यक है?", answer: "660–680 का स्कोर न्यूनतम और 720+ सर्वोत्तम दरों के लिए आवश्यक है।" },
      { question: "ब्याज दर बढ़ने का क्या असर होता है?", answer: "दर बढ़ने पर मासिक ब्याज और भविष्य की किस्तें तुरंत बढ़ जाती हैं।" }
    ],
    pIntro: "हेलॉक ऋण क्षमता, संयुक्त ऋण-से-मूल्य (CLTV), केवल-ब्याज ड्रॉ भुगतान, पुनर्भुगतान किस्तें, पेमेंट शॉक और ब्याज दर वृद्धि परिदृश्यों का विश्लेषण करें।",
    sec1_h2: "1. हेलॉक (HELOC) कैलकुलेटर क्या है?",
    sec1_p1: "हेलॉक कैलकुलेटर यह अनुमान लगाता है कि आप अपनी होम इक्विटी के आधार पर कितनी क्रेडिट लाइन ले सकते हैं और दोनों चरणों में किस्तों का व्यवहार कैसा रहेगा।",
    sec1_p2: "फिक्स्ड लोन के विपरीत, हेलॉक में 10 साल की ड्रॉ अवधि और 20 साल की पुनर्भुगतान अवधि होती है।",
    sec1_noticeTitle: "योजना मॉडल सूचना",
    sec1_noticeText: "यह एक गणितीय सिमुलेशन है और ऋणदाता की औपचारिक स्वीकृति नहीं है।",
    sec2_h2: "2. हेलॉक कैलकुलेटर का उपयोग कैसे करें",
    sec2_p: "क्रेडिट लाइन के विश्लेषण के लिए इन चरणों का पालन करें :",
    sec2_steps: [
      "1. घर का अनुमानित बाजार मूल्य दर्ज करें।",
      "2. पहले मॉर्गेज का शेष दर्ज करें।",
      "3. अधिकतम सीएलटीवी सीमा (80% मानक या 85%) चुनें।",
      "4. इच्छित हेलॉक क्रेडिट लाइन दर्ज करें।",
      "5. प्रारंभिक परिवर्तनीय ब्याज दर दर्ज करें।",
      "6. ड्रॉ अवधि (5, 10, 15 वर्ष) और पुनर्भुगतान अवधि (10, 15, 20 वर्ष) चुनें।",
      "7. क्लोजिंग लागत और वार्षिक शुल्क दर्ज करें।",
      "8. ड्रॉ भुगतान प्रकार चुनें (केवल ब्याज या मूलधन + ब्याज)।",
      "9. अधिकतम क्षमता, ड्रॉ किस्त और पुनर्भुगतान किस्त की समीक्षा करें।",
      "10. दो-चरणीय परिशोधन तालिका का निरीक्षण करें।",
      "11. ब्याज दर वृद्धि परिदृश्यों (+1%, +2%, +3%) का परीक्षण करें।",
      "12. भविष्य के आहरण और अतिरिक्त भुगतानों का अनुकरण करें।",
      "13. फिक्स्ड होम इक्विटी लोन से तुलना करें।",
      "14. कर कटौती पात्रता की जांच करें।"
    ],
    sec3_h2: "3. हेलॉक उधार क्षमता की गणना",
    sec3_p1: "अधिकतम सीमा सीएलटीवी के आधार पर निर्धारित होती है :",
    sec3_f1: "अधिकतम अनुमेय ऋण = बाजार मूल्य × सीएलटीवी %",
    sec3_f2: "अधिकतम हेलॉक लाइन = max(0, अधिकतम अनुमेय ऋण - पहली मॉर्गेज)",
    sec3_p2: "उदाहरण : 500,000 $ के घर पर 260,000 $ पहली मॉर्गेज और 80% सीएलटीवी होने पर अधिकतम क्रेडिट लाइन 140,000 $ बनती है। 50,000 $ की लाइन पर सीएलटीवी 62.0% रहता है।",
    sec3_p3: "यह सुरक्षा बफर बनाए रखने में मदद करता है।",
    sec4_h2: "4. ड्रॉ अवधि बनाम पुनर्भुगतान अवधि",
    sec4_p1: "हेलॉक दो अलग-अलग चरणों में विभाजित होता है :",
    sec4_p2: "ड्रॉ चरण (10 वर्ष) में केवल ब्याज दिया जाता है। पुनर्भुगतान चरण (20 वर्ष) में अनिवार्य रूप से मूलधन और ब्याज चुकाया जाता है।",
    sec5_h2: "5. केवल-ब्याज ड्रॉ भुगतान",
    sec5_p1: "मासिक ब्याज किस्त (I) का सूत्र :",
    sec5_p2: "I = उपयोग की गई राशि × (वार्षिक दर / 12)। 50,000 $ पर 8.50% की दर से मासिक किस्त 354.17 $ होती है।",
    sec6_h2: "6. पुनर्भुगतान चरण में पूर्ण किस्त",
    sec6_p1: "पुनर्भुगतान चरण में मानक एन्युइटी किस्त लागू होती है :",
    sec6_p2: "50,000 $ पर 8.50% की दर से 20 वर्षों के लिए मासिक किस्त 433.91 $ होगी।",
    sec7_h2: "7. पेमेंट शॉक (Payment Shock) विश्लेषण",
    sec7_p1: "पेमेंट शॉक पुनर्भुगतान चरण शुरू होने पर किस्त में आने वाली बढ़ोतरी को दर्शाता है।",
    sec7_p2: "किस्त 354.17 $ से बढ़कर 433.91 $ (+22.5%) हो जाती है। 10 वर्ष की अवधि में यह 620.06 $ (+75.1%) हो जाएगी।",
    sec8_h2: "8. परिवर्तनीय दर तनाव परिदृश्य",
    sec8_p1: "ब्याज दर बढ़ने पर किस्तों पर असर पड़ता है :",
    sec8_p2: "+2% दर वृद्धि (10.50% पर) ड्रॉ किस्त को 437.50 $ (+23.5%) और पुनर्भुगतान किस्त को 498.98 $ (+15.0%) कर देती है।",
    sec9_h2: "9. वार्षिक रखरखाव शुल्क",
    sec9_p1: "वार्षिक शुल्क (50 $ से 100 $) कुल लागत बढ़ाते हैं।",
    sec9_p2: "30 वर्षों में 75 $ वार्षिक शुल्क कुल 2,250 $ बनता है।",
    sec10_h2: "10. अतिरिक्त मूलधन भुगतान",
    sec10_p1: "नियमित अतिरिक्त भुगतान ब्याज लागत को काफी कम कर देते हैं।",
    sec10_p2: "100 $ प्रति माह अतिरिक्त देने से हजारों डॉलर का ब्याज बचता है।",
    sec11_h2: "11. हेलॉक बनाम फिक्स्ड लोन",
    sec11_p1: "हेलॉक क्रमिक खर्चों के लिए लचीलापन देता है।",
    sec11_p2: "फिक्स्ड लोन स्थिर किस्तों की गारंटी देता है।",
    sec12_h2: "12. हेलॉक बनाम कैश-आउट रीफाइनेंस",
    sec12_p1: "हेलॉक पहले ऋण की कम ब्याज दर को सुरक्षित रखता है।",
    sec12_p2: "रीफाइनेंस पूरे ऋण को मौजूदा बाजार दर पर बदल देता है।",
    sec13_h2: "13. पात्रता मानदंड",
    sec13_p1: "DTI अनुपात 43% से कम और 680+ क्रेडिट स्कोर होना चाहिए।",
    sec13_p2: "संपत्ति का मजबूत मूल्यांकन आवश्यक है।",
    sec14_h2: "14. कर कटौती नियम",
    sec14_p1: "केवल घर के सुधार में प्रयुक्त राशि पर कर छूट मिलती है।",
    sec14_p2: "व्यक्तिगत खर्चों पर कोई कर लाभ नहीं मिलता।",
    sec15_h2: "15. क्रेडिट लाइन फ्रीज होने का जोखिम",
    sec15_p1: "बाजार मूल्य गिरने पर बैंक लाइन रोक सकता है।",
    sec15_p2: "अलग से आपातकालीन फंड रखना आवश्यक है।",
    sec16_h2: "16. नकारात्मक इक्विटी",
    sec16_p1: "मूल्य गिरने पर अतिरिक्त आहरण बंद हो जाते हैं।",
    sec16_p2: "भुगतान दायित्व जारी रहते हैं।",
    sec17_h2: "17. फिक्स्ड-रेट लॉक विकल्प",
    sec17_p1: "कुछ बैंक उपयोग किए गए हिस्से को फिक्स्ड दर में बदलने का विकल्प देते हैं।",
    sec17_p2: "यह दर वृद्धि से सुरक्षा प्रदान करता है।",
    sec18_h2: "18. क्लोजिंग व कैंसिलेशन शुल्क",
    sec18_p1: "प्रारंभिक शुल्क 500 $ से 2,500 $ होते हैं।",
    sec18_p2: "जल्दी बंद करने पर शुल्क लग सकता है।",
    sec19_h2: "19. रणनीतिक वित्तीय उपयोग",
    sec19_p: "मूल्य संवर्धन परियोजनाओं के लिए उपयोग करना सर्वोत्तम है।",
    sec20_h2: "20. पुनर्भुगतान की पूर्व-योजना",
    sec20_p: "किस्त वृद्धि के लिए पहले से बजट बनाना आवश्यक है।",
    sec21_h2: "21. हेलॉक प्रबंधन सुझाव",
    sec21_p: "ड्रॉ अवधि में भी मूलधन चुकाने से ब्याज कम होता है।",
    sec22_h2: "22. बचने योग्य सामान्य गलतियाँ",
    sec22_mistakes: [
      "10 साल तक केवल ब्याज देना और किस्त उछाल की तैयारी न करना।",
      "क्रेडिट लाइन का उपयोग गैर-उत्पादक उपभोग के लिए करना।",
      "ब्याज दर बढ़ने के जोखिम को अनदेखा करना।",
      "लाइन कभी फ्रीज न होने का अति-विश्वास।",
      "वार्षिक रखरखाव शुल्कों की अनदेखी करना।",
      "सभी ब्याज को बिना शर्त कर-मुक्त मान लेना।",
      "फिक्स्ड लोन विकल्पों से तुलना न करना।",
      "सुरक्षा बफर रखे बिना 100% क्रेडिट का उपयोग करना।",
      "समय पूर्व बंदी शुल्क की जांच न करना।",
      "तनाव परिदृश्यों का परीक्षण न करना।"
    ],
    sec23_h2: "23. हेलॉक मुख्य सूत्रों का सारांश",
    sec23_formulas: [
      "अधिकतम अनुमेय ऋण: बाजार मूल्य × सीएलटीवी %",
      "अधिकतम हेलॉक लाइन: max(0, अधिकतम अनुमेय ऋण - पहली मॉर्गेज)",
      "उपयोग उपरांत सीएलटीवी: (पहली मॉर्गेज + उपयोग राशि) / बाजार मूल्य × 100",
      "मासिक ब्याज किस्त: उपयोग राशि × (वार्षिक दर / 12)",
      "पुनर्भुगतान किस्त: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "पेमेंट शॉक: (पुनर्भुगतान किस्त - ड्रॉ किस्त) / ड्रॉ किस्त × 100",
      "अनुमानित कर बचत: कटौती योग्य ब्याज × कर दर"
    ],
    sec24_noticeTitle: "शैक्षणिक मार्गदर्शन एवं विनियामक सूचना",
    sec24_noticeText: "हेलोक ऋण उपभोक्ता संरक्षण कानूनों के अधीन हैं। यह कैलकुलेटर केवल नियोजन उद्देश्यों के लिए गणितीय सिमुलेशन प्रदान करता है।",
    overlayInputs: {
      homeValue: "घर का बाजार मूल्य",
      currentMortgageBalance: "पहले मॉर्गेज का शेष",
      helocLineAmount: "इच्छित हेलॉक क्रेडिट लाइन",
      interestRate: "प्रारंभिक परिवर्तनीय ब्याज दर",
      drawPeriodYears: "ड्रॉ अवधि (वर्ष)",
      repayPeriodYears: "पुनर्भुगतान अवधि (वर्ष)",
      closingCosts: "प्रारंभिक क्लोजिंग लागत",
      annualFee: "वार्षिक रखरखाव शुल्क",
      drawPaymentType: "ड्रॉ अवधि भुगतान प्रकार",
      cltvLimit: "अधिकतम सीएलटीवी सीमा",
      interestRateStress: "ब्याज दर वृद्धि सिमुलेशन",
      extraMonthlyPrincipal: "अतिरिक्त मासिक मूलधन"
    },
    overlayOutputs: {
      maxBorrowingPower: "अधिकतम हेलॉक क्षमता",
      drawnCltv: "उपयोग उपरांत सीएलटीवी",
      drawMonthlyPayment: "ड्रॉ अवधि की मासिक किस्त",
      repaymentMonthlyPayment: "पुनर्भुगतान चरण की मासिक किस्त",
      paymentShockIncrease: "पेमेंट शॉक (किस्त उछाल)",
      totalLifetimeInterest: "कुल अनुमानित ब्याज"
    }
  },
  pt: {
    title: "Calculadora de Linha de Crédito HELOC",
    metaDesc: "Calcule limite de crédito HELOC, parcelas de juros na fase de saque, amortização na fase de pagamento e simulações de alta de juros.",
    keywords: ["calculadora heloc", "linha de credito com garantia", "credito rotativo imobiliario", "home equity line"],
    faqs: [
      { question: "O que é uma linha HELOC e como funciona?", answer: "A HELOC é uma linha de crédito rotativa garantida pelo valor líquido do imóvel que permite saques conforme a necessidade durante a fase de utilização." },
      { question: "Qual o limite de crédito máximo que posso obter?", answer: "A maioria das instituições permite entre 80% e 85% do valor avaliado do imóvel, subtraindo o saldo da primeira hipoteca." },
      { question: "Qual a diferença entre a fase de saque e a de amortização?", answer: "Na fase de saque paga-se apenas os juros mensais sobre o valor utilizado. Na fase de amortização paga-se capital e juros obrigatórios." },
      { question: "O que é o salto de parcela (payment shock)?", answer: "É o aumento súbito na prestação quando termina o período de apenas juros e inicia a amortização obrigatória do principal." },
      { question: "Qual a taxa de juros aplicada?", answer: "Normalmente aplica-se taxa variável indexada à taxa básica de juros acrescida de uma margem do banco." },
      { question: "Quais taxas incidem na operação?", answer: "Podem incluir anuidade de manutenção (50 $ a 100 $), custos de contratação e avaliação." },
      { question: "Os juros são dedutíveis no imposto de renda?", answer: "Apenas se os recursos forem comprovadamente aplicados na reforma ou melhoria estrutural do imóvel." },
      { question: "O banco pode reduzir ou congelar a linha?", answer: "Sim, caso o valor de mercado caia substancialmente ou ocorra deterioração cadastral." },
      { question: "O que acontece se eu não utilizar o crédito disponível?", answer: "Não incidem juros sobre saldo não utilizado." },
      { question: "Posso amortizar o principal durante a fase de saque?", answer: "Sim, amortizações voluntárias podem ser feitas a qualquer momento para restabelecer o limite." },
      { question: "Qual a pontuação de crédito exigida?", answer: "Geralmente exige-se score a partir de 660 a 680, e 720+ para as melhores condições." },
      { question: "Qual o impacto de aumentos na taxa de juros?", answer: "Por ter taxa variável, qualquer alta eleva imediatamente as parcelas de juros e o custo total." }
    ],
    pIntro: "Estime a capacidade de crédito HELOC, relação empréstimo-valor (CLTV), parcelas de juros na fase de saque, amortização na fase de pagamento, salto de parcela e cenários de estresse de juros.",
    sec1_h2: "1. O que é uma Calculadora HELOC?",
    sec1_p1: "A calculadora de HELOC projeta o limite rotativo disponível com garantia imobiliária e simula as parcelas ao longo das fases de utilização e amortização.",
    sec1_p2: "Ao contrário do empréstimo fixo, a HELOC dispõe de um período flexível de saques (10 anos) e um período estruturado de amortização (20 anos).",
    sec1_noticeTitle: "Aviso do Modelo Financeiro",
    sec1_noticeText: "Os valores apresentados constituem simulações matemáticas para fins de planejamento.",
    sec2_h2: "2. Como Usar a Calculadora HELOC",
    sec2_p: "Siga este roteiro para simular sua linha de crédito :",
    sec2_steps: [
      "1. Informe o valor de mercado estimado do imóvel.",
      "2. Digite o saldo devedor da primeira hipoteca.",
      "3. Escolha o limite máximo de CLTV (80% padrão ou 85%).",
      "4. Defina o limite de crédito HELOC pretendido.",
      "5. Insira a taxa de juros variável inicial.",
      "6. Escolha a duração da fase de saque (5, 10, 15 anos) e de pagamento (10, 15, 20 anos).",
      "7. Informe os custos iniciais e a anuidade de manutenção.",
      "8. Selecione a modalidade de pagamento na fase de saque.",
      "9. Analise o limite disponível, a parcela de saque e a de amortização.",
      "10. Inspecione o plano de amortização em duas fases.",
      "11. Simule cenários de alta de juros (+1%, +2%, +3%).",
      "12. Teste novos saques e amortizações extraordinárias.",
      "13. Compare com o empréstimo com garantia de taxa fixa.",
      "14. Verifique as deduções fiscais cabíveis."
    ],
    sec3_h2: "3. Cálculo da Capacidade de Crédito HELOC",
    sec3_p1: "A capacidade máxima baseia-se na dívida combinada admitida pelo limite de CLTV :",
    sec3_f1: "Dívida Total Máxima = Valor de Mercado × Limite CLTV %",
    sec3_f2: "Limite HELOC Máximo = max(0, Dívida Total Máxima - Saldo 1ª Hipoteca)",
    sec3_p2: "Exemplo : Para um imóvel de 500.000 $ com 260.000 $ de primeira hipoteca e 80% de CLTV, a dívida total permitida é 400.000 $. Deduzindo 260.000 $, o limite HELOC é de 140.000 $. Uma linha de 50.000 $ resulta em CLTV utilizado de 62,0%.",
    sec3_p3: "Isso assegura uma margem patrimonial equilibrada.",
    sec4_h2: "4. Fase de Saque vs. Fase de Amortização",
    sec4_p1: "A HELOC divide-se em duas etapas operacionais :",
    sec4_p2: "Na fase de saque (10 anos), saca-se livremente pagando apenas juros. Na fase de amortização (20 anos), o limite fecha e inicia-se o pagamento de capital e juros.",
    sec5_h2: "5. Pagamento de Apenas Juros na Fase de Saque",
    sec5_p1: "A parcela mensal de juros (I) calcula-se por :",
    sec5_p2: "I = Saldo Utilizado × (Taxa Anual / 12). Para 50.000 $ a 8,50%, a parcela é de 354,17 $.",
    sec6_h2: "6. Parcelas Integrais na Fase de Amortização",
    sec6_p1: "Na fase de amortização, a prestação torna-se constante :",
    sec6_p2: "Para 50.000 $ a 8,50% em 20 anos (240 meses), a parcela é de 433,91 $.",
    sec7_h2: "7. Análise do Salto de Parcela (Payment Shock)",
    sec7_p1: "Mede o impacto financeiro da transição para a amortização.",
    sec7_p2: "A parcela sobe de 354,17 $ para 433,91 $ (+22,5%). Em prazo de 10 anos, subiria para 620,06 $ (+75,1%).",
    sec8_h2: "8. Simulação de Estresse de Taxas Variáveis",
    sec8_p1: "Aumentos na taxa básica encarecem as parcelas :",
    sec8_p2: "Uma alta de +2% (para 10,50%) eleva a parcela de saque para 437,50 $ (+23,5%) e a de amortização para 498,98 $ (+15,0%).",
    sec9_h2: "9. Anuidades e Custo Global",
    sec9_p1: "Custos anuais de manutenção (50 $ a 100 $) integram o custo efetivo.",
    sec9_p2: "Em 30 anos, 75 $ anuais acumulam 2.250 $ em despesas.",
    sec10_h2: "10. Ciclo Multisaque e Aportes Extras",
    sec10_p1: "Amortizações adicionais voluntárias reduzem substancialmente os juros.",
    sec10_p2: "Um aporte extra de 100 $ por mês economiza milhares de dólares em juros.",
    sec11_h2: "11. HELOC vs. Empréstimo Fixo com Garantia",
    sec11_p1: "A HELOC destaca-se pela flexibilidade para gastos graduais.",
    sec11_p2: "O empréstimo fixo garante previsibilidade total nas parcelas.",
    sec12_h2: "12. HELOC vs. Refinanciamento com Saque",
    sec12_p1: "A HELOC preserva a taxa original da sua primeira hipoteca.",
    sec12_p2: "O refinanciamento altera toda a dívida para a taxa de mercado atual.",
    sec13_h2: "13. Requisitos de Aprovação",
    sec13_p1: "Recomenda-se índice DTI abaixo de 43% e score a partir de 680.",
    sec13_p2: "Avaliação imobiliária consistente é fundamental para CLTV de 85%.",
    sec14_h2: "14. Dedução de Juros no Imposto",
    sec14_p1: "Permitida apenas se aplicada em reformas do próprio imóvel.",
    sec14_p2: "Gastos de consumo pessoal não geram benefício tributário.",
    sec15_h2: "15. Risco de Congelamento da Linha",
    sec15_p1: "O banco pode suspender saques se o mercado imobiliário recuar.",
    sec15_p2: "Mantenha uma reserva financeira independente.",
    sec16_h2: "16. Patrimônio Negativo",
    sec16_p1: "Em desvalorizações imobiliárias, a linha é suspensa.",
    sec16_p2: "As obrigações de pagamento continuam vigentes.",
    sec17_h2: "17. Opção de Trava de Taxa Fixa",
    sec17_p1: "Permite converter parcelas do saldo em tranches com taxa fixa.",
    sec17_p2: "Protege contra aumentos na taxa básica.",
    sec18_h2: "18. Custos Iniciais e Encerramento Antecipado",
    sec18_p1: "Taxas de abertura variam de 500 $ a 2.500 $.",
    sec18_p2: "Encerrar a linha nos primeiros anos pode gerar multa contratual.",
    sec19_h2: "19. Uso Financeiro Consciente",
    sec19_p: "Priorizar investimentos que valorizem o patrimônio garante solidez financeira.",
    sec20_h2: "20. Preparação para a Amortização",
    sec20_p: "Adequar o orçamento com antecedência evita aperto de caixa.",
    sec21_h2: "21. Boas Práticas na HELOC",
    sec21_p: "Abater o principal na fase de saque reduz a base de juros futuros.",
    sec22_h2: "22. Erros Comuns a Evitar na HELOC",
    sec22_mistakes: [
      "Pagar apenas juros por 10 anos sem planejar a fase de amortização.",
      "Usar o crédito para gastos de consumo efêmeros.",
      "Subestimar o risco de aumentos nas taxas variáveis.",
      "Supor que a linha nunca sofrerá restrições do banco.",
      "Desconsiderar anuidades no cálculo do custo total.",
      "Achar que todos os juros são dedutíveis sem comprovação.",
      "Deixar de comparar com o empréstimo fixo de garantia.",
      "Usar 100% do limite sem margem de segurança.",
      "Encerrar a linha sem verificar penalidades de cancelamento.",
      "Não rodar simulações de estresse de juros antes de contratar."
    ],
    sec23_h2: "23. Resumo das Fórmulas da HELOC",
    sec23_formulas: [
      "Dívida Total Máxima: Valor de Mercado × Limite CLTV %",
      "Limite HELOC Máximo: max(0, Dívida Total Máxima - Saldo 1ª Hipoteca)",
      "CLTV Utilizado: (Saldo 1ª Hipoteca + Saldo HELOC) / Valor de Mercado × 100",
      "Parcela de Apenas Juros: Saldo Utilizado × (Taxa Anual / 12)",
      "Parcela de Amortização: P × [r(1+r)^n] / [(1+r)^n - 1]",
      "Salto de Parcela: (Parcela Amortização - Parcela Saque) / Parcela Saque × 100",
      "Economia Fiscal Estimada: Juros Dedutíveis Anuais × Alíquota Marginal"
    ],
    sec24_noticeTitle: "Orientação Educacional e Aviso Legal",
    sec24_noticeText: "As linhas de crédito rotativas sobre imóveis são reguladas pelo sistema financeiro. Esta ferramenta fornece simulações para fins de planejamento financeiro.",
    overlayInputs: {
      homeValue: "Valor de Mercado do Imóvel",
      currentMortgageBalance: "Saldo da Primeira Hipoteca",
      helocLineAmount: "Limite HELOC Pretendido",
      interestRate: "Taxa Variável Inicial",
      drawPeriodYears: "Período de Saque (Anos)",
      repayPeriodYears: "Período de Amortização (Anos)",
      closingCosts: "Custos Iniciais de Fechamento",
      annualFee: "Anuidade de Manutenção",
      drawPaymentType: "Tipo de Pagamento no Saque",
      cltvLimit: "Limite Máximo de CLTV",
      interestRateStress: "Simulação de Alta de Juros",
      extraMonthlyPrincipal: "Amortização Mensal Extra"
    },
    overlayOutputs: {
      maxBorrowingPower: "Capacidade Máxima HELOC",
      drawnCltv: "CLTV com Saldo Utilizado",
      drawMonthlyPayment: "Parcela na Fase de Saque",
      repaymentMonthlyPayment: "Parcela na Fase de Amortização",
      paymentShockIncrease: "Salto de Parcela (Payment Shock)",
      totalLifetimeInterest: "Juros Totais Estimados"
    }
  }
};

for (const loc of LOCALES) {
  const d = HELOC_DATA[loc];
  const contentCode = `"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(d.faqs, null, 2)};

export const seo = {
  title: "${d.title} — ${d.sec23_formulas[0].split(':')[0]}",
  description: "${d.metaDesc}",
  keywords: ${JSON.stringify(d.keywords)}
};

export const ContentComponent = function HELOCContent${loc.toUpperCase()}() {
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

      {/* 3. CAPACITY */}
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

      {/* 4. DRAW VS REPAY */}
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

      {/* 5. INTEREST ONLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec5_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec5_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec5_p2}
        </p>
      </section>

      {/* 6. FULL PAYMENTS */}
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

      {/* 7. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec7_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec7_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec7_p2}
        </p>
      </section>

      {/* 8. STRESS TEST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec8_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec8_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec8_p2}
        </p>
      </section>

      {/* 9. ANNUAL FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec9_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec9_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec9_p2}
        </p>
      </section>

      {/* 10. MULTI DRAW */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec10_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec10_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec10_p2}
        </p>
      </section>

      {/* 11. HELOC VS HELOAN */}
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

      {/* 12. HELOC VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec12_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec12_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec12_p2}
        </p>
      </section>

      {/* 13. CREDIT QUAL */}
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

      {/* 14. TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec14_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec14_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec14_p2}
        </p>
      </section>

      {/* 15. FREEZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec15_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec15_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec15_p2}
        </p>
      </section>

      {/* 16. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec16_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec16_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec16_p2}
        </p>
      </section>

      {/* 17. FIXED RATE LOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec17_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec17_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec17_p2}
        </p>
      </section>

      {/* 18. CLOSING AND EARLY CLOSURE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec18_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec18_p1}
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec18_p2}
        </p>
      </section>

      {/* 19. STRATEGIC USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec19_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec19_p}
        </p>
      </section>

      {/* 20. TRANSITION PLANNING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec20_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec20_p}
        </p>
      </section>

      {/* 21. OPTIMIZATION TIPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec21_h2}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${d.sec21_p}
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec22_h2}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            ${d.sec22_mistakes.map(m => `<li>${m}</li>`).join("\n            ")}
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.sec23_h2}
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          ${d.sec23_formulas.map(f => `<div>• <strong>${f.split(':')[0]}:</strong> ${f.split(':')[1] || ''}</div>`).join("\n          ")}
        </div>
      </section>

      {/* 24. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>${d.sec24_noticeTitle}</span>
        </div>
        <p>
          ${d.sec24_noticeText}
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/heloc/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_HELOC_OVERLAY = {
  title: "${d.title}",
  description: "${d.metaDesc}",
  inputs: ${JSON.stringify(d.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(d.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_HELOC_OVERLAY;
`;
  writeFile(`src/i18n/overlays/heloc/${loc}.ts`, overlayCode);
}
console.log("✓ Deep HELOC generation complete.");
