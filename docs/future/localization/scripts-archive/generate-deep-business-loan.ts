import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface BusinessLoanTexts {
  title: string;
  metaDesc: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  pIntro: string;
  
  sec1_h2: string;
  sec1_p1: string;
  sec1_p2: string;
  sec1_p3: string;
  
  sec2_h2: string;
  sec2_p1: string;
  sec2_p2: string;
  sec2_p3: string;
  
  sec3_h2: string;
  sec3_p1: string;
  sec3_formula: string;
  sec3_vars: string;
  sec3_p2: string;
  sec3_exampleTitle: string;
  sec3_exampleItems: string[];
  
  sec4_h2: string;
  sec4_p1: string;
  sec4_tableHeaders: [string, string];
  sec4_tableRows: { name: string; amount: string; highlight?: boolean; color?: string }[];
  sec4_p2: string;
  
  sec5_h2: string;
  sec5_p1: string;
  sec5_card1_title: string;
  sec5_card1_text: string;
  sec5_card2_title: string;
  sec5_card2_text: string;
  sec5_p2: string;
  sec5_p3: string;
  
  sec6_h2: string;
  sec6_p1: string;
  sec6_tableHeaders: [string, string, string, string, string];
  sec6_tableRows: { period: string; beg: string; interest: string; principal: string; end: string }[];
  sec6_p2: string;
  
  sec7_h2: string;
  sec7_p1: string;
  sec7_bullets: string[];
  sec7_p2: string;
  
  sec8_h2: string;
  sec8_p1: string;
  sec8_formula: string;
  sec8_p2: string;
  sec8_exampleItems: string[];
  sec8_p3: string;
  
  sec9_h2: string;
  sec9_p1: string;
  sec9_cards: { title: string; text: string }[];
  sec9_p2: string;
  
  sec10_h2: string;
  sec10_mistakes: string[];
  
  sec11_h2: string;
  sec11_p: string;
  sec11_links: { title: string; desc: string; href: string }[];
  
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const DATA: Record<typeof LOCALES[number], BusinessLoanTexts> = {
  es: {
    title: "Calculadora de Préstamos para Empresas — Cuotas, Intereses, Comisiones, TAE y Análisis Comercial",
    metaDesc: "Calcule cuotas mensuales de préstamos comerciales, intereses totales, comisiones bancarias, TAE actuarial real, opciones SBA y ratio de cobertura DSCR.",
    keywords: ["calculadora de prestamo empresarial", "prestamo comercial", "calculadora prestamo sba", "tae real prestamo negocio", "dscr empresarial"],
    faqs: [
      { question: "¿Qué es una calculadora de préstamos para empresas?", answer: "Una calculadora de préstamos comerciales estima el coste financiero de la deuda empresarial a partir del capital, tipo de interés, plazo y comisiones de apertura o formalización." },
      { question: "¿Cómo se calcula la cuota de un préstamo comercial?", answer: "En préstamos con amortización constante se calcula mediante la fórmula de anualidades: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], donde r es el tipo mensual y n el número de meses." },
      { question: "¿Cuántos intereses pagaré por un préstamo empresarial?", answer: "El total de intereses equivale a la suma de todas las cuotas programadas menos el capital principal prestado, suponiendo que no existan amortizaciones anticipadas extraordinarias." },
      { question: "¿Afectan las comisiones de apertura y gestión al coste real?", answer: "Sí. Las comisiones de apertura y de formalización documental reducen el importe neto disponible y elevan sustancialmente el coste efectivo anual (TAE)." },
      { question: "¿Cuál es la diferencia entre el tipo nominal y la TAE comercial?", answer: "El tipo de interés nominal se aplica sobre el saldo deudor insoluto, mientras que la TAE actuarial incorpora todos los gastos iniciales y refleja el rendimiento financiero mediante TIR." },
      { question: "¿Es la TAE de un préstamo comercial idéntica a la de un consumidor?", answer: "No siempre. El crédito empresarial suele estar exento de la normativa de crédito al consumo (como la Regulación Z en EE.UU.), por lo que la TAE de la calculadora es una referencia económica actuarial." },
      { question: "¿Qué es el ratio DSCR en un préstamo comercial?", answer: "El DSCR (Debt Service Coverage Ratio) mide la capacidad del flujo de caja operativo para cubrir las cuotas de la deuda: DSCR = Beneficio Operativo Neto (NOI) / Servicio Anual de Deuda." },
      { question: "¿Se exige siempre un DSCR mínimo de 1,25x para aprobar el crédito?", answer: "No. Aunque 1,25x es el estándar de referencia más común en banca comercial, cada entidad y tipo de producto financiero establece sus propios criterios de suscripción." },
      { question: "¿Qué es un préstamo garantizado SBA 7(a)?", answer: "Es el programa principal de préstamos de la Small Business Administration (hasta 5M $) para capital de trabajo, adquisición de activos, compra de empresas y refinanciación de deuda elegible." },
      { question: "¿Qué es un préstamo SBA 504?", answer: "Es una estructura de financiación a largo plazo a tipo fijo de hasta 5,5M $ destinada a la compra de bienes inmuebles comerciales y maquinaria pesada a través de CDCs." },
      { question: "¿Qué es un micropréstamo SBA?", answer: "Son préstamos de menor cuantía (hasta 50.000 $) canalizados a través de intermediarios comunitarios para cubrir necesidades inmediatas de capital circulante o inventario." },
      { question: "¿Garantiza la SBA el 100% del importe del préstamo?", answer: "No. La SBA garantiza un porcentaje del préstamo (habitualmente entre el 75% y el 85%), asumiendo el banco prestamista el riesgo de la fracción restante." },
      { question: "¿Puedo destinar un préstamo comercial a capital de trabajo?", answer: "Sí, la mayoría de los préstamos y líneas de crédito comerciales permiten financiar compras de existencias, tesorería operativa, nóminas y gastos corrientes." },
      { question: "¿Un plazo de amortización más largo reduce los intereses totales?", answer: "No. Un plazo más largo reduce la cuota mensual pero incrementa notablemente el total de intereses pagados al devengarse intereses durante más periodos." },
      { question: "¿Son deducibles de impuestos los intereses del préstamo empresarial?", answer: "En general, los intereses de la deuda comercial utilizada para actividades del negocio son deducibles como gasto financiero, con sujeción a los límites fiscales vigentes." }
    ],
    pIntro: "Calcule cuotas mensuales de préstamos empresariales, intereses totales acumulados, comisiones comerciales, TAE actuarial real, opciones SBA, tablas de amortización y ratio de cobertura de deuda (DSCR).",
    sec1_h2: "1. ¿Qué es una Calculadora de Préstamos para Empresas?",
    sec1_p1: "Un préstamo empresarial puede parecer económico si solo se observa el tipo de interés anunciado. Sin embargo, el coste real puede ser sustancialmente diferente una vez que se integran el plazo de devolución, las comisiones de apertura, los gastos de formalización documental y otros costes financieros.",
    sec1_p2: "Esta calculadora unifica todas estas variables en un único modelo de análisis: calcula la cuota periódica, el total de intereses, el coste financiero global, el calendario de amortización, las condiciones de préstamos SBA y la cobertura de flujo de caja DSCR.",
    sec1_p3: "Los resultados son estimaciones financieras con fines de planificación y comparativa de mercado. Las condiciones definitivas dependen de la política de riesgos de la entidad prestamista.",
    sec2_h2: "2. ¿Qué es un Préstamo Comercial o Empresarial?",
    sec2_p1: "Un préstamo comercial es una operación de financiación concertada para fines empresariales como capital de trabajo, adquisición de maquinaria, inventario, compra o reforma de inmuebles, adquisición de empresas o refinanciación de pasivos.",
    sec2_p2: "Existen múltiples modalidades: préstamos tradicionales a plazo fijo con cuotas periódicas, líneas de crédito renovables para tesorería, y programas avalados como los préstamos 7(a) de la SBA que reducen el riesgo bancario mediante garantías públicas.",
    sec2_p3: "La estructura financiera elegida es determinante, ya que dos préstamos con idéntico tipo de interés nominal pueden presentar costes económicos muy distintos según sus comisiones y plazos de amortización.",
    sec3_h2: "3. Cómo se Calcula la Cuota de un Préstamo Empresarial",
    sec3_p1: "Para préstamos totalmente amortizables mediante cuotas iguales, el cálculo se basa en la fórmula estándar de anualidades financieras:",
    sec3_formula: "PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]",
    sec3_vars: "Donde: P = capital principal prestado, r = tipo de interés mensual (tipo anual / 12), n = número total de pagos mensuales, PMT = cuota mensual regular.",
    sec3_p2: "El plazo de amortización influye decisivamente en el coste: ampliar el plazo reduce la carga mensual inmediata pero incrementa el total de intereses devengados.",
    sec3_exampleTitle: "Ejemplo Práctico: Préstamo de 10.000 $ al 10% a 5 Años (60 Meses)",
    sec3_exampleItems: [
      "Cuota Mensual Fija (PMT): 212,47 $ al mes",
      "Total de Pagos Programados (60 meses): 60 × 212,47 $ = 12.748,23 $",
      "Capital Principal Amortizado: 10.000,00 $",
      "Total de Intereses Pagados: 2.748,23 $"
    ],
    sec4_h2: "4. El Coste Total es Más que los Intereses: Comisiones Comerciales",
    sec4_p1: "En la financiación comercial es esencial diferenciar entre el gasto por intereses y el coste total de la financiación. Las entidades suelen aplicar comisiones de apertura, gastos de estudio, formalización notarial y comisiones de garantía.",
    sec4_tableHeaders: ["Componente del Coste", "Importe ($)"],
    sec4_tableRows: [
      { name: "Capital Principal Prestado", amount: "10.000,00 $" },
      { name: "Total de Intereses Pagados", amount: "2.748,23 $", highlight: true, color: "text-rose-600" },
      { name: "Comisión de Apertura (5,0%)", amount: "500,00 $", color: "text-amber-600" },
      { name: "Gastos de Formalización y Documentación", amount: "750,00 $", color: "text-amber-600" },
      { name: "Otros Gastos Iniciales", amount: "0,00 $" },
      { name: "Total Comisiones Comerciales:", amount: "1.250,00 $", highlight: true, color: "text-amber-600" },
      { name: "Coste Financiero Global (Intereses + Comisiones):", amount: "3.998,23 $", highlight: true, color: "text-indigo-600" }
    ],
    sec4_p2: "Así, aunque el tipo nominal sea del 10%, la operación genera 3.998,23 $ en costes acumulados, demostrando por qué comparar únicamente el tipo de interés resulta insuficiente.",
    sec5_h2: "5. TAE Comercial: Tipo Nominal frente a Coste Efectivo Real",
    sec5_p1: "El cálculo de la Tasa Anual Equivalente (TAE) en el crédito comercial requiere distinguir dos métricas fundamentales:",
    sec5_card1_title: "Tipo de Interés Nominal (10,00%)",
    sec5_card1_text: "Es el tipo pactado aplicado sobre el saldo vivo del préstamo en cada periodo según el cuadro de amortización.",
    sec5_card2_title: "TAE Actuarial Real / TIR (15,933%)",
    sec5_card2_text: "Calcula el rendimiento financiero efectivo tratando los fondos netos recibidos (8.750 $) y los pagos mensuales (212,47 $) como flujos de caja mediante la Tasa Interna de Retorno (TIR).",
    sec5_p2: "Esta cifra difiere de las aproximaciones lineales de recargo de comisiones (12,50%), ya que la TIR descuenta el valor temporal del dinero en cada mensualidad.",
    sec5_p3: "Las empresas deben prestar especial atención a este indicador, ya que la legislación de consumo no siempre obliga al prestamista a publicar una TAE normalizada en contratos comerciales.",
    sec6_h2: "6. Cómo Funciona el Cuadro de Amortización Comercial",
    sec6_p1: "La amortización desglosa cada cuota en amortización de capital e intereses devengados. Al inicio, la cuota contiene más intereses debido al mayor saldo deudor:",
    sec6_tableHeaders: ["Periodo", "Saldo Inicial", "Intereses", "Capital Amortizado", "Saldo Final"],
    sec6_tableRows: [
      { period: "Mes 1", beg: "10.000,00 $", interest: "83,33 $", principal: "129,14 $", end: "9.870,86 $" },
      { period: "Mes 2", beg: "9.870,86 $", interest: "82,26 $", principal: "130,21 $", end: "9.740,65 $" },
      { period: "Mes 3", beg: "9.740,65 $", interest: "81,17 $", principal: "131,30 $", end: "9.609,35 $" },
      { period: "Mes 60 (Final)", beg: "210,71 $", interest: "1,76 $", principal: "210,71 $", end: "0,00 $" }
    ],
    sec6_p2: "Al finalizar el plazo convenido, el saldo final se reduce exactamente a 0,00 $, cuadrando las cifras acumuladas de capital e intereses.",
    sec7_h2: "7. Plazo Corto frente a Plazo Largo en Préstamos Comerciales",
    sec7_p1: "La elección del plazo de amortización impacta simultáneamente en la tesorería mensual y en el coste financiero global:",
    sec7_bullets: [
      "Plazo más corto: Cuota mensual más elevada + menor coste total por intereses devengados.",
      "Plazo más largo: Cuota mensual reducida + mayor coste total en intereses durante la vida del crédito."
    ],
    sec7_p2: "La elección óptima depende de la capacidad de generación de caja del negocio, sus necesidades de liquidez y el retorno esperado de la inversión financiada.",
    sec8_h2: "8. ¿Qué es el Ratio de Cobertura del Servicio de la Deuda (DSCR)?",
    sec8_p1: "El DSCR mide la solidez del flujo de caja operativo de la empresa respecto a sus obligaciones anuales de deuda:",
    sec8_formula: "DSCR = Beneficio Operativo Neto (NOI) / Servicio Anual de Deuda",
    sec8_p2: "Ejemplo: Para un NOI anual de 150.000 $, deuda existente de 30.000 $/año y nueva deuda de 25.000 $/año:",
    sec8_exampleItems: [
      "Servicio Total de Deuda Anual: 30.000 $ + 25.000 $ = 55.000,00 $/año",
      "DSCR Resultante: 150.000 $ / 55.000 $ = 2,73x (Excelente Cobertura)",
      "Capacidad Máxima de Deuda (al umbral 1,25x): 150.000 $ / 1,25 = 120.000,00 $/año"
    ],
    sec8_p3: "Un ratio superior a 1,25x suele considerarse un nivel de seguridad adecuado para la mayoría de los departamentos de riesgos bancarios.",
    sec9_h2: "9. Diferencias en Préstamos SBA (7(a), CDC/504 y Microcréditos)",
    sec9_p1: "La Small Business Administration (SBA) actúa como entidad avalista que mitiga el riesgo de las entidades financieras asociadas:",
    sec9_cards: [
      { title: "Programa SBA 7(a)", text: "Financiación principal de hasta 5M $ para capital de trabajo, adquisición de activos, compra de empresas y refinanciación." },
      { title: "SBA 504 Bienes Raíces", text: "Créditos a tipo fijo a largo plazo de hasta 5,5M $ para inmuebles y maquinaria pesada canalizados por CDCs." },
      { title: "Micropréstamos SBA", text: "Líneas de hasta 50.000 $ para micropymes y emprendedores gestionadas por entidades intermediarias sin ánimo de lucro." }
    ],
    sec9_p2: "Los préstamos SBA devengan comisiones de garantía proporcionales al importe financiado que deben incorporarse al presupuesto inicial.",
    sec10_h2: "10. Errores Frecuentes al Calcular un Préstamo Comercial",
    sec10_mistakes: [
      "Comparar únicamente los tipos de interés nominales e ignorar las comisiones de apertura y gastos de formalización.",
      "Elegir el plazo más largo solo para reducir la cuota mensual sin calcular el sobrecoste en intereses totales.",
      "Asumir que la TAE comercial se calcula igual que la TAE de un préstamo para particulares.",
      "Creer que un ratio DSCR de 1,25x es el único requisito para la aprobación bancaria.",
      "No consultar la normativa tributaria sobre límites a la deducibilidad de gastos financieros empresariales."
    ],
    sec11_h2: "11. Calculadoras Financieras y Comerciales Relacionadas",
    sec11_p: "Explore estas herramientas complementarias para una planificación empresarial integral:",
    sec11_links: [
      { title: "Calculadora de Préstamos", desc: "Simulación general de amortización.", href: "/calculators/loan-calculator" },
      { title: "Préstamos Personales", desc: "Comparativa con financiación personal.", href: "/calculators/personal-loan-calculator" },
      { title: "Calculadora de Hipotecas", desc: "Financiación de bienes inmuebles.", href: "/calculators/mortgage-calculator" },
      { title: "Calculadora de ROI", desc: "Retorno sobre la inversión del capital.", href: "/calculators/roi-calculator" },
      { title: "Periodo de Recuperación", desc: "Plazo de amortización de proyectos.", href: "/calculators/payback-period-calculator" },
      { title: "Calculadora de Márgenes", desc: "Margen de beneficio y recargos.", href: "/calculators/margin-calculator" },
      { title: "Interés Compuesto", desc: "Crecimiento e inversión de tesorería.", href: "/calculators/compound-interest-calculator" },
      { title: "Préstamos Auto", desc: "Financiación de flotas comerciales.", href: "/calculators/auto-loan-calculator" }
    ],
    overlayInputs: {
      loanAmount: "Importe del Préstamo Comercial",
      interestRate: "Tipo de Interés Fijo Anual (APR %)",
      loanTermYears: "Plazo de Amortización (Años)",
      originationFeePercent: "Comisión de Apertura (%)",
      documentationFeeDollar: "Gastos de Formalización y Gestión ($)"
    },
    overlayOutputs: {
      paybackAmount: "Cuota Mensual Fija",
      totalInterestPaid: "Total de Intereses a Pagar",
      totalInterestAndFees: "Coste Total (Intereses + Comisiones)",
      realAprPercent: "TAE Actuarial Real Efectiva"
    }
  },
  fr: {
    title: "Calculateur de Prêt Professionnel — Mensualités, Intérêts, Frais, TAEG et Analyse Commerciale",
    metaDesc: "Calculez les mensualités de prêts commerciaux, les intérêts totaux, les frais d'origination, le TAEG réel, les options SBA et le ratio de couverture DSCR.",
    keywords: ["calculateur de pret professionnel", "pret commercial", "calculateur pret sba", "taeg pret entreprise", "ratio dscr"],
    faqs: [
      { question: "Qu'est-ce qu'un calculateur de prêt professionnel ?", answer: "Un calculateur de prêt commercial évalue le coût de remboursement d'un financement d'entreprise en intégrant le capital, le taux d'intérêt, la durée et les frais annexes." },
      { question: "Comment calcule-t-on la mensualité d'un prêt d'entreprise ?", answer: "Pour un prêt amortissable à annuités constantes, on applique la formule : PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], avec r le taux mensuel et n le nombre de mensualités." },
      { question: "Combien d'intérêts vais-je payer sur mon prêt commercial ?", answer: "Le coût total des intérêts correspond à la somme de toutes les échéances prévues moins le capital emprunté initialement." },
      { question: "Les frais d'origination et de dossier ont-ils un impact majeur ?", answer: "Oui. Ces frais réduisent le montant net disponible et augmentent significativement le coût effectif global (TAEG réel)." },
      { question: "Quelle est la différence entre taux nominal et TAEG commercial ?", answer: "Le taux nominal s'applique sur le capital restant dû, alors que le TAEG actuariel intègre l'ensemble des frais initiaux selon la méthode du taux de rendement interne (TRI)." },
      { question: "Le TAEG d'un prêt professionnel est-il identique à celui d'un crédit à la consommation ?", answer: "Pas nécessairement. Les crédits commerciaux sont souvent exemptés des règles de protection des consommateurs ; le TAEG du calculateur constitue une mesure actuarielle comparative." },
      { question: "Qu'est-ce que le ratio DSCR pour un prêt d'entreprise ?", answer: "Le DSCR (Debt Service Coverage Ratio) mesure la capacité du résultat d'exploitation net à couvrir le service annuel de la dette : DSCR = Revenu Net d'Exploitation (NOI) / Service Annuel de la Dette." },
      { question: "Un DSCR de 1,25x est-il obligatoire pour tout emprunt commercial ?", answer: "Non. Bien que 1,25x soit un seuil d'analyse classique en banque, chaque établissement fixe ses propres critères de risque." },
      { question: "Qu'est-ce qu'un prêt garanti SBA 7(a) ?", answer: "C'est le principal programme de financement de la SBA (jusqu'à 5 M$) pour le fonds de roulement, l'achat d'équipements, l'immobilier et le rachat d'entreprises." },
      { question: "Qu'est-ce qu'un prêt SBA 504 ?", answer: "C'est un financement à long terme à taux fixe (jusqu'à 5,5 M$) dédié aux immobilisations lourdes et bâtiments commerciaux via des CDC agréées." },
      { question: "Qu'est-ce qu'un microcrédit SBA ?", answer: "Il s'agit de prêts d'un montant maximal de 50 000 $ accordés par des organismes intermédiaires pour les petites entreprises et indépendants." },
      { question: "La SBA garantit-elle 100 % du montant emprunté ?", answer: "Non. La SBA garantit une fraction du prêt (souvent entre 75 % et 85 %), la banque conservant le risque sur le solde restant." },
      { question: "Puis-je utiliser un prêt commercial pour financer le fonds de roulement ?", answer: "Oui, la majorité des financements professionnels et lignes de trésorerie autorisent le financement des stocks et des dépenses d'exploitation courantes." },
      { question: "Une durée de prêt plus longue réduit-elle le coût total des intérêts ?", answer: "Non. Une durée plus longue réduit la mensualité mais augmente le montant global des intérêts versés sur la durée totale du crédit." },
      { question: "Les intérêts d'un prêt commercial sont-ils déductibles fiscalement ?", answer: "En règle générale, les intérêts d'emprunt d'une entreprise sont déductibles de son résultat imposable, sous réserve des plafonds fiscaux applicables." }
    ],
    pIntro: "Calculez les mensualités de prêts professionnels, le coût total des intérêts, les frais de dossier, le TAEG réel actuariel, les options de financement SBA et le ratio de couverture de dette (DSCR).",
    sec1_h2: "1. Qu'est-ce qu'un Calculateur de Prêt Professionnel ?",
    sec1_p1: "Un crédit d'entreprise peut sembler avantageux à première vue si l'on ne regarde que son taux d'intérêt facial. Cependant, le coût réel dépend grandement de la durée de remboursement, des frais d'origination et des frais de dossier.",
    sec1_p2: "Ce calculateur rassemble toutes ces données : calcul de la mensualité, total des intérêts, coût global de financement, tableau d'amortissement, options SBA et ratio de couverture de flux de trésorerie DSCR.",
    sec1_p3: "Ces résultats sont fournis à titre de simulation financière prévisionnelle. Les conditions définitives dépendent des critères de souscription de chaque organisme prêteur.",
    sec2_h2: "2. Qu'est-ce qu'un Financement Commercial ou Professionnel ?",
    sec2_p1: "Un prêt d'entreprise est un crédit destiné à couvrir des besoins commerciaux : fonds de roulement, acquisition d'équipements, stocks, travaux, expansion ou rachat de société.",
    sec2_p2: "Il existe plusieurs formats : prêts à terme amortissables, marges de crédit renouvelables ou prêts avec garantie publique tels que le programme SBA 7(a).",
    sec2_p3: "La structure du financement est primordiale, car deux prêts avec le même taux facial peuvent avoir des coûts économiques très différents selon les frais et échéances retenus.",
    sec3_h2: "3. Calcul de la Mensualité d'un Prêt Professionnel",
    sec3_p1: "Pour un prêt amortissable à échéances constantes, la formule mathématique des annuités s'applique :",
    sec3_formula: "PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]",
    sec3_vars: "Où : P = principal emprunté, r = taux mensuel (taux annuel / 12), n = nombre total d'échéances mensuelles, PMT = mensualité constante.",
    sec3_p2: "La durée du prêt joue un rôle déterminant : allonger la durée allège la trésorerie mensuelle mais augmente le coût total des intérêts.",
    sec3_exampleTitle: "Exemple Pratique : Prêt de 10 000 $ à 10 % sur 5 Ans (60 Mois)",
    sec3_exampleItems: [
      "Mensualité Constante (PMT) : 212,47 $ par mois",
      "Total des Versements (60 mois) : 60 × 212,47 $ = 12 748,23 $",
      "Capital Remboursé : 10 000,00 $",
      "Total des Intérêts Payés : 2 748,23 $"
    ],
    sec4_h2: "4. Le Coût Global : Au-delà des Intérêts et Frais Annexes",
    sec4_p1: "Dans un prêt professionnel, il convient de distinguer la dépense d'intérêts et le coût global de financement (frais d'origination, frais de dossier, enregistrement).",
    sec4_tableHeaders: ["Composante du Coût", "Montant ($)"],
    sec4_tableRows: [
      { name: "Capital Principal Emprunté", amount: "10 000,00 $" },
      { name: "Total des Intérêts Payés", amount: "2 748,23 $", highlight: true, color: "text-rose-600" },
      { name: "Frais d'Origination (5,0 %)", amount: "500,00 $", color: "text-amber-600" },
      { name: "Frais de Dossier et Documentation", amount: "750,00 $", color: "text-amber-600" },
      { name: "Autres Frais Initiaux", amount: "0,00 $" },
      { name: "Total des Frais Bancaires :", amount: "1 250,00 $", highlight: true, color: "text-amber-600" },
      { name: "Coût Global du Financement (Intérêts + Frais) :", amount: "3 998,23 $", highlight: true, color: "text-indigo-600" }
    ],
    sec4_p2: "Ainsi, pour un taux facial de 10 %, le coût total s'élève à 3 998,23 $, démontrant la nécessité d'une analyse globale.",
    sec5_h2: "5. TAEG Réel : Taux Nominal vs Coût Actuariel Effectif",
    sec5_p1: "L'analyse comparative du crédit commercial nécessite de distinguer :",
    sec5_card1_title: "Taux d'Intérêt Nominal (10,00 %)",
    sec5_card1_text: "Taux annuel contractuel appliqué sur le solde restant dû à chaque échéance.",
    sec5_card2_title: "TAEG Actuariel Réel / TRI (15,933 %)",
    sec5_card2_text: "Taux de rendement interne calculé d'après les fonds nets reçus (8 750 $) et les 60 mensualités de 212,47 $.",
    sec5_p2: "Ce taux diffère du calcul linéaire simplifié des frais (12,50 %) car il intègre la valeur temporelle de l'argent.",
    sec5_p3: "Ce calcul est essentiel pour arbitrer entre plusieurs propositions de financement bancaire.",
    sec6_h2: "6. Fonctionnement du Tableau d'Amortissement Commercial",
    sec6_p1: "L'amortissement détaille mois par mois la part du paiement allouée aux intérêts et au remboursement du capital :",
    sec6_tableHeaders: ["Période", "Solde Initial", "Intérêts", "Amortissement Capital", "Solde Final"],
    sec6_tableRows: [
      { period: "Mois 1", beg: "10 000,00 $", interest: "83,33 $", principal: "129,14 $", end: "9 870,86 $" },
      { period: "Mois 2", beg: "9 870,86 $", interest: "82,26 $", principal: "130,21 $", end: "9 740,65 $" },
      { period: "Mois 3", beg: "9 740,65 $", interest: "81,17 $", principal: "131,30 $", end: "9 609,35 $" },
      { period: "Mois 60 (Final)", beg: "210,71 $", interest: "1,76 $", principal: "210,71 $", end: "0,00 $" }
    ],
    sec6_p2: "Au terme des 60 mensualités, le solde de la dette atteint exactement 0,00 $.",
    sec7_h2: "7. Durée Courte vs Longue Durée pour un Prêt Commercial",
    sec7_bullets: [
      "Durée plus courte : Mensualités plus lourdes + coût total des intérêts minimisé.",
      "Durée plus longue : Mensualités allégées + intérêts totaux cumulés plus importants."
    ],
    sec7_p1: "La durée du prêt conditionne directement la trésorerie et la rentabilité :",
    sec7_p2: "Le choix optimal dépend de la capacité d'autofinancement et du retour sur investissement du projet.",
    sec8_h2: "8. Ratio de Couverture du Service de la Dette (DSCR)",
    sec8_p1: "Le ratio DSCR mesure la capacité de votre résultat d'exploitation à honorer les échéances d'emprunt :",
    sec8_formula: "DSCR = Résultat Net d'Exploitation (NOI) / Service Annuel de la Dette",
    sec8_p2: "Exemple : Avec 150 000 $ de résultat d'exploitation, 30 000 $ de dette existante et 25 000 $ de nouvelle dette :",
    sec8_exampleItems: [
      "Service Total de Dette Annuelle : 30 000 $ + 25 000 $ = 55 000,00 $/an",
      "DSCR Calculé : 150 000 $ / 55 000 $ = 2,73x (Couverture Solide)",
      "Capacité Maximale d'Endettement (seuil 1,25x) : 150 000 $ / 1,25 = 120 000,00 $/an"
    ],
    sec8_p3: "Un ratio supérieur à 1,25x constitue un critère bancaire rassurant.",
    sec9_h2: "9. Spécificités des Prêts SBA (7(a), CDC/504 et Microcrédits)",
    sec9_p1: "La Small Business Administration apporte des garanties d'État pour faciliter l'accès au crédit :",
    sec9_cards: [
      { title: "Programme SBA 7(a)", text: "Financement principal jusqu'à 5 M$ pour le fonds de roulement, le matériel et les acquisitions." },
      { title: "SBA 504 Immobilier", text: "Prêts à taux fixe à long terme jusqu'à 5,5 M$ pour les actifs immobiliers et machines lourdes." },
      { title: "Microcrédits SBA", text: "Financements d'appoint jusqu'à 50 000 $ pour les microentreprises via des intermédiaires agréés." }
    ],
    sec9_p2: "Les garanties SBA s'accompagnent de frais spécifiques à intégrer dans votre budget.",
    sec10_h2: "10. Erreurs Fréquentes dans le Calcul d'un Prêt Professionnel",
    sec10_mistakes: [
      "Se concentrer sur le taux nominal sans comptabiliser les frais d'origination et de dossier.",
      "Allonger la durée uniquement pour abaisser l'échéance sans mesurer le surcoût d'intérêts.",
      "Confondre le taux annuel d'un crédit particulier avec la TAEG d'un prêt commercial.",
      "Considérer le ratio DSCR de 1,25x comme une condition automatique d'approbation.",
      "Négliger les règles fiscales locales sur la déductibilité des intérêts d'emprunt d'entreprise."
    ],
    sec11_h2: "11. Calculateurs Financiers et Professionnels Associés",
    sec11_p: "Explorez nos autres outils d'analyse financière d'entreprise :",
    sec11_links: [
      { title: "Calculateur de Prêt", desc: "Simulation d'amortissement standard.", href: "/calculators/loan-calculator" },
      { title: "Prêt Personnel", desc: "Comparatif avec les crédits aux particuliers.", href: "/calculators/personal-loan-calculator" },
      { title: "Calculateur Hypothécaire", desc: "Financement immobilier d'entreprise.", href: "/calculators/mortgage-calculator" },
      { title: "Calculateur de ROI", desc: "Rentabilité des investissements en capital.", href: "/calculators/roi-calculator" },
      { title: "Délai de Récupération", desc: "Temps de retour sur investissement.", href: "/calculators/payback-period-calculator" },
      { title: "Calculateur de Marge", desc: "Calcul de marge brute et nette.", href: "/calculators/margin-calculator" },
      { title: "Intérêts Composés", desc: "Modélisation des placements de trésorerie.", href: "/calculators/compound-interest-calculator" },
      { title: "Prêt Auto", desc: "Financement de flotte de véhicules.", href: "/calculators/auto-loan-calculator" }
    ],
    overlayInputs: {
      loanAmount: "Montant du Prêt Professionnel",
      interestRate: "Taux d'Intérêt Annuel Fixe (APR %)",
      loanTermYears: "Durée de Remboursement (Années)",
      originationFeePercent: "Frais d'Origination / Dossier (%)",
      documentationFeeDollar: "Frais de Gestion et Formalisation ($)"
    },
    overlayOutputs: {
      paybackAmount: "Mensualité Constante",
      totalInterestPaid: "Total des Intérêts à Payer",
      totalInterestAndFees: "Coût Global (Intérêts + Frais)",
      realAprPercent: "TAEG Actuariel Réel Effectif"
    }
  },
  de: {
    title: "Geschäftskredit-Rechner — Raten, Zinsen, Gebühren, Effektivzins & Gewerbliche Finanzierungsanalyse",
    metaDesc: "Berechnen Sie monatliche Raten für Firmenkredite, Gesamtzinsen, Bearbeitungsgebühren, versicherungsmathematischen Effektivzins, SBA-Kredite und DSCR-Deckung.",
    keywords: ["geschaeftskredit rechner", "firmenkredit berechnen", "sba darlehen", "effektiver jahreszins firmenkredit", "dscr rechner"],
    faqs: [
      { question: "Was ist ein Geschäftskredit-Rechner?", answer: "Ein Geschäftskredit-Rechner ermittelt die Gesamtkosten einer gewerblichen Finanzierung anhand von Darlehenssumme, Zinssatz, Laufzeit und anfallenden Nebenkosten." },
      { question: "Wie wird die monatliche Rate eines Firmenkredits berechnet?", answer: "Bei Annuitätendarlehen gilt die finanzmathematische Formel: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], wobei r der Monatszinssatz und n die Gesamtzahl der Raten ist." },
      { question: "Wie viel Zinsen zahle ich für einen Geschäftskredit?", answer: "Die Zinsgesamtkosten entsprechen der Summe aller planmäßigen Ratenzahlungen abzüglich des ursprünglichen Nettodarlehensbetrags." },
      { question: "Spielen Bearbeitungs- und Bereitstellungsgebühren eine Rolle?", answer: "Ja, Nebenkosten wie Abschlussgebühren reduzieren den Auszahlungsbetrag und erhöhen den effektiven Jahreszins der Finanzierung spürbar." },
      { question: "Was unterscheidet den Sollzins vom gewerblichen Effektivzins?", answer: "Der Sollzins wird auf die verbleibende Restschuld angewendet, während der Effektivzins über die interne Zinsfuß-Methode (IRR) sämtliche Nebenkosten einbezieht." },
      { question: "Gilt für Firmenkredite derselbe Effektivzins wie für Verbraucherdarlehen?", answer: "Nicht zwingend. Gewerbliche Finanzierungen fallen oft nicht unter das Verbraucherkreditgesetz; der Effektivzins dient hier dem wirtschaftlichen Renditevergleich." },
      { question: "Was bedeutet die Kennzahl DSCR bei einem Firmenkredit?", answer: "Die Debt Service Coverage Ratio (DSCR) misst das Verhältnis zwischen dem operativen Betriebsergebnis (NOI) und dem jährlichen Schuldendienst: DSCR = NOI / Schuldendienst." },
      { question: "Wird für jeden Geschäftskredit ein DSCR von mindestens 1,25x verlangt?", answer: "Nein. 1,25x ist ein gängiger banküblicher Richtwert, die konkreten Bonitätsanforderungen variieren jedoch je nach Kreditinstitut und Branche." },
      { question: "Was ist ein SBA 7(a)-Förderdarlehen?", answer: "Das Hauptförderprogramm der US-SBA (bis zu 5 Mio. $) für Betriebsmittel, Anlagegüter, Unternehmenskäufe und Umschuldungen." },
      { question: "Was ist ein SBA 504-Darlehen?", answer: "Eine langfristige Festzinsfinanzierung (bis 5,5 Mio. $) für Gewerbeimmobilien und schwere Maschinen über zertifizierte Entwicklungsgesellschaften (CDCs)." },
      { question: "Was ist ein SBA-Mikrokredit?", answer: "Kleinkredite bis zu 50.000 $ über gemeinnützige Partner für kleinere Anschaffungen, Warenlager und Startkapital." },
      { question: "Garantiert die SBA den Kredit zu 100 %?", answer: "Nein. Die staatliche Bürgschaft deckt in der Regel 75 % bis 85 % des Kreditbetrags ab, das Restrisiko verbleibt bei der finanzierenden Bank." },
      { question: "Kann ein Geschäftskredit als Betriebsmittelkredit genutzt werden?", answer: "Ja, Betriebsmittelfinanzierungen für Wareneinkäufe, Personal und laufende Betriebskosten sind eine der häufigsten Verwendungsformen." },
      { question: "Senkt eine längere Laufzeit die Zinslast?", answer: "Nein. Eine längere Laufzeit verringert zwar die Monatsrate, erhöht jedoch die kumulierte Gesamtzinsbelastung über die Darlehenslaufzeit." },
      { question: "Sind Zinsen für Firmenkredite steuerlich absetzbar?", answer: "Zinsen für betriebliche Darlehen können in der Regel als Betriebsausgaben geltend gemacht werden, vorbehaltlich geltender steuerlicher Obergrenzen." }
    ],
    pIntro: "Berechnen Sie monatliche Raten für Firmenkredite, Gesamtzinsen, Bearbeitungskosten, effektiven Jahreszins, Tilgungsverlauf, Förderoptionen und Schuldendienst-Deckungsquote (DSCR).",
    sec1_h2: "1. Was ist ein Geschäftskredit-Rechner?",
    sec1_p1: "Ein Firmenkredit kann auf den ersten Blick günstig erscheinen, wenn man nur den reinen Sollzinssatz betrachtet. Die tatsächlichen Gesamtkosten hängen jedoch maßgeblich von Laufzeit, Bearbeitungsgebühren und Nebenkosten ab.",
    sec1_p2: "Dieser Rechner führt alle Finanzierungsparameter zusammen: Ratenermittlung, Gesamtzinsen, Nebenkosten, Tilgungspläne, SBA-Förderkonditionen und die DSCR-Tragfähigkeitsprüfung.",
    sec1_p3: "Die Ergebnisse stellen mathematische Modellrechnungen für die betriebliche Planung dar. Verbindliche Konditionen hängen von der Risikoprüfung der Bank ab.",
    sec2_h2: "2. Was ist ein gewerblicher Firmenkredit?",
    sec2_p1: "Ein Geschäftskredit dient der Finanzierung gewerblicher Vorhaben wie Betriebsmittel, Maschinen, Fuhrpark, Immobilien, Unternehmensnachfolgen oder Umschuldungen.",
    sec2_p2: "Es gibt verschiedene Finanzierungsformen: klassische Annuitätendarlehen, revolvierende Kontokorrentlinien sowie staatlich verbürgte Förderkredite (wie SBA-Darlehen).",
    sec2_p3: "Die Wahl der Struktur ist entscheidend, da zwei Darlehen mit identischem Sollzins je nach Gebührenstruktur sehr unterschiedliche Effektivkosten aufweisen.",
    sec3_h2: "3. Wie wird die monatliche Firmenkreditrate berechnet?",
    sec3_p1: "Bei ratierlicher Tilgung mit gleichbleibenden Zahlungen gilt die klassische Annuitätenformel :",
    sec3_formula: "PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]",
    sec3_vars: "Wobei : P = Darlehensbetrag, r = Monatszins (Jahreszins / 12), n = Laufzeit in Monaten, PMT = feste Monatsrate.",
    sec3_p2: "Die Laufzeit beeinflusst das Ergebnis spürbar: Längere Laufzeiten schonen die Liquidität, treiben aber die Gesamtzinskosten in die Höhe.",
    sec3_exampleTitle: "Beispielrechnung : 10.000 $ Firmenkredit zu 10 % über 5 Jahre (60 Monate)",
    sec3_exampleItems: [
      "Feste monatliche Rate (PMT) : 212,47 $ pro Monat",
      "Summe aller Raten (60 Monate) : 60 × 212,47 $ = 12.748,23 $",
      "Getilgter Darlehensbetrag : 10.000,00 $",
      "Gezahlte Gesamtzinsen : 2.748,23 $"
    ],
    sec4_h2: "4. Gesamtkostenanalyse : Mehr als reine Zinsen",
    sec4_p1: "Im gewerblichen Kreditgeschäft muss klar zwischen reinen Zinskosten und den Gesamtkosten der Finanzierung (inkl. Abschluss- und Verwaltungsgebühren) unterschieden werden.",
    sec4_tableHeaders: ["Kostenkomponente", "Betrag ($)"],
    sec4_tableRows: [
      { name: "Kreditbetrag (Nettodarlehen)", amount: "10.000,00 $" },
      { name: "Gezahlte Gesamtzinsen", amount: "2.748,23 $", highlight: true, color: "text-rose-600" },
      { name: "Abschlussgebühr / Origination Fee (5,0 %)", amount: "500,00 $", color: "text-amber-600" },
      { name: "Dokumentations- und Bearbeitungsgebühr", amount: "750,00 $", color: "text-amber-600" },
      { name: "Sonstige Gebühren", amount: "0,00 $" },
      { name: "Summe aller Nebenkosten :", amount: "1.250,00 $", highlight: true, color: "text-amber-600" },
      { name: "Gesamte Finanzierungskosten (Zinsen + Gebühren) :", amount: "3.998,23 $", highlight: true, color: "text-indigo-600" }
    ],
    sec4_p2: "Bei 10 % Sollzins entstehen somit 3.998,23 $ Gesamtkosten, was die Notwendigkeit einer umfassenden Wirtschaftlichkeitsprüfung unterstreicht.",
    sec5_h2: "5. Effektiver Jahreszins : Sollzins vs. versicherungsmathematischer Effektivzins",
    sec5_p1: "Bei gewerblichen Krediten unterscheidet das Modell :",
    sec5_card1_title: "Nominaler Sollzinssatz (10,00 %)",
    sec5_card1_text: "Vertraglicher Sollzinssatz, der auf die verbleibende Restschuld angewandt wird.",
    sec5_card2_title: "Effektiver Jahreszins / IRR (15,933 %)",
    sec5_card2_text: "Interne Zinsfußrendite basierend auf dem tatsächlichen Nettoauszahlungsbetrag (8.750 $) und den 60 Monatsraten zu 212,47 $.",
    sec5_p2: "Dieser Wert unterscheidet sich von linearen Näherungsrechnungen (12,50 %), da er den Zeitwert des Geldes exakt berücksichtigt.",
    sec5_p3: "Gewerbekunden sollten diesen Wert als objektiven Vergleichsmaßstab für Bankangebote heranziehen.",
    sec6_h2: "6. Tilgungsverlauf im gewerblichen Kredit",
    sec6_p1: "Der Tilgungsplan zeigt Monat für Monat die Aufteilung der Rate in Zins- und Tilgungsanteile :",
    sec6_tableHeaders: ["Periode", "Anfangsbestand", "Zinsanteil", "Tilgungsanteil", "Endbestand"],
    sec6_tableRows: [
      { period: "Monat 1", beg: "10.000,00 $", interest: "83,33 $", principal: "129,14 $", end: "9.870,86 $" },
      { period: "Monat 2", beg: "9.870,86 $", interest: "82,26 $", principal: "130,21 $", end: "9.740,65 $" },
      { period: "Monat 3", beg: "9.740,65 $", interest: "81,17 $", principal: "131,30 $", end: "9.609,35 $" },
      { period: "Monat 60 (Ende)", beg: "210,71 $", interest: "1,76 $", principal: "210,71 $", end: "0,00 $" }
    ],
    sec6_p2: "Nach 60 Monaten ist das Darlehen vollständig auf 0,00 $ getilgt.",
    sec7_h2: "7. Kurze vs. lange Laufzeiten bei Firmenkrediten",
    sec7_bullets: [
      "Kürzere Laufzeit : Höhere Monatsrate + minimale Gesamtzinsbelastung.",
      "Längere Laufzeit : Niedrigere Monatsrate + höhere Gesamtzinskosten."
    ],
    sec7_p1: "Die Laufzeit bestimmt maßgeblich Liquidität und Zinskosten :",
    sec7_p2: "Wählen Sie die Laufzeit passend zum Cashflow und zur Amortisationszeit der finanzierten Investition.",
    sec8_h2: "8. Schuldendienst-Deckungsquote (DSCR)",
    sec8_p1: "Die DSCR misst die Fähigkeit des operativen Betriebsergebnisses zur Deckung des Schuldendienstes :",
    sec8_formula: "DSCR = Operatives Betriebsergebnis (NOI) / Jährlicher Schuldendienst",
    sec8_p2: "Beispiel : Bei 150.000 $ NOI, 30.000 $ Altschulden und 25.000 $ Neuschulden :",
    sec8_exampleItems: [
      "Gesamter jährlicher Schuldendienst : 30.000 $ + 25.000 $ = 55.000,00 $/Jahr",
      "Errechneter DSCR : 150.000 $ / 55.000 $ = 2,73x (Sehr solide Tragfähigkeit)",
      "Maximaler Schuldendienst (bei 1,25x Grenze) : 150.000 $ / 1,25 = 120.000,00 $/Jahr"
    ],
    sec8_p3: "Ein DSCR ab 1,25x gilt bei Kreditprüfungen allgemein als stabiler Richtwert.",
    sec9_h2: "9. Besonderheiten bei SBA-Förderkrediten (7(a), CDC/504 & Mikrokredite)",
    sec9_p1: "Die Small Business Administration bietet staatliche Bürgschaften zur Erleichterung der Kreditaufnahme :",
    sec9_cards: [
      { title: "SBA 7(a)-Programm", text: "Hauptprogramm bis 5 Mio. $ für Betriebsmittel, Maschinen, Zukäufe und Umschuldungen." },
      { title: "SBA 504 Immobilien", text: "Langfristige Festzinsdarlehen bis 5,5 Mio. $ für Immobilien und schwere Anlagen." },
      { title: "SBA-Mikrokredite", text: "Finanzierungen bis 50.000 $ für Kleinunternehmen über gemeinnützige Träger." }
    ],
    sec9_p2: "Staatliche Bürgschaften erfordern spezielle Garantiegebühren, die im Budget zu berücksichtigen sind.",
    sec10_h2: "10. Typische Fehler bei der Firmenkredit-Kalkulation",
    sec10_mistakes: [
      "Nur den Sollzins vergleichen und Abschlussgebühren unberücksichtigt lassen.",
      "Laufzeiten künstlich strecken, ohne die Zinsmehrkosten zu berechnen.",
      "Verbraucherkredit-Maßstäbe eins zu eins auf Gewerbekredite übertragen.",
      "Den DSCR von 1,25x als automatische Kreditzusage missverstehen.",
      "Steuerliche Grenzen der Zinsabzugsfähigkeit für Unternehmen ignorieren."
    ],
    sec11_h2: "11. Verwandte Finanzierungs- und Unternehmensrechner",
    sec11_p: "Nutzen Sie unsere weiteren Rechenwerkzeuge für die betriebliche Finanzplanung :",
    sec11_links: [
      { title: "Kreditrechner", desc: "Allgemeine Annuitätentilgung berechnen.", href: "/calculators/loan-calculator" },
      { title: "Privatkredit", desc: "Vergleich mit Konsumentenkrediten.", href: "/calculators/personal-loan-calculator" },
      { title: "Hypothekenrechner", desc: "Finanzierung gewerblicher Immobilien.", href: "/calculators/mortgage-calculator" },
      { title: "ROI-Rechner", desc: "Kapitalrendite betrieblicher Investitionen.", href: "/calculators/roi-calculator" },
      { title: "Amortisationszeit", desc: "Payback-Dauer von Projekten ermitteln.", href: "/calculators/payback-period-calculator" },
      { title: "Margenrechner", desc: "Deckungsbeiträge und Margen kalkulieren.", href: "/calculators/margin-calculator" },
      { title: "Zinseszinsrechner", desc: "Liquiditätsanlagen und Zinseszins.", href: "/calculators/compound-interest-calculator" },
      { title: "Autokredit", desc: "Fuhrpark- und Nutzfahrzeugfinanzierung.", href: "/calculators/auto-loan-calculator" }
    ],
    overlayInputs: {
      loanAmount: "Geschäftskreditbetrag",
      interestRate: "Fester Jahreszinssatz (APR %)",
      loanTermYears: "Kreditlaufzeit (Jahre)",
      originationFeePercent: "Abschluss- / Bearbeitungsgebühr (%)",
      documentationFeeDollar: "Dokumentations- und Verwaltungsgebühr ($)"
    },
    overlayOutputs: {
      paybackAmount: "Monatliche Rate",
      totalInterestPaid: "Gezahlte Gesamtzinsen",
      totalInterestAndFees: "Gesamtkosten (Zinsen + Gebühren)",
      realAprPercent: "Effektiver Jahreszins (Effektiv-APR)"
    }
  },
  hi: {
    title: "बिजनेस लोन कैलकुलेटर — ईएमआई, ब्याज, शुल्क, वास्तविक APR और वाणिज्यिक ऋण विश्लेषण",
    metaDesc: "व्यावसायिक ऋण की मासिक ईएमआई, कुल ब्याज, प्रोसेसिंग शुल्क, वास्तविक actuarial APR, SBA लोन और DSCR कैश-फ्लो कवरेज की गणना करें।",
    keywords: ["बिजनेस लोन कैलकुलेटर", "व्यावसायिक ऋण", "business loan calculator", "dscr calculator", "commercial loan apr"],
    faqs: [
      { question: "बिजनेस लोन कैलकुलेटर क्या है?", answer: "यह कैलकुलेटर ऋण राशि, ब्याज दर, अवधि और शुल्कों के आधार पर वाणिज्यिक ऋण की मासिक किस्त, कुल ब्याज और कुल लागत का सटीक अनुमान लगाता है।" },
      { question: "बिजनेस लोन की ईएमआई की गणना कैसे की जाती है?", answer: "नियमित किस्तों वाले ऋण के लिए सूत्र है: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], जहां r मासिक ब्याज दर और n महीनों की कुल संख्या है।" },
      { question: "बिजनेस लोन पर मुझे कितना ब्याज देना होगा?", answer: "कुल ब्याज सभी निर्धारित मासिक भुगतानों के योग में से मूलधन घटाकर निकाला जाता है।" },
      { question: "क्या प्रोसेसिंग और दस्तावेज़ीकरण शुल्क महत्वपूर्ण हैं?", answer: "हाँ, अपफ्रंट शुल्क आपके हाथ में आने वाली शुद्ध राशि को कम करते हैं और ऋण की वास्तविक वार्षिक लागत (APR) को बढ़ा देते हैं।" },
      { question: "सांकेतिक ब्याज दर और वास्तविक APR में क्या अंतर है?", answer: "सांकेतिक दर केवल बकाया ऋण पर लागू होती है, जबकि वास्तविक actuarial APR सभी शुल्कों और कैश-फ्लो के समय को ध्यान में रखकर निकाला जाता है।" },
      { question: "क्या बिजनेस लोन का APR उपभोक्ता लोन जैसा ही होता है?", answer: "हमेशा नहीं। व्यावसायिक ऋण उपभोक्ता संरक्षण नियमों के दायरे से बाहर हो सकते हैं, इसलिए कैलकुलेटर का APR आर्थिक तुलनात्मक साधन है।" },
      { question: "बिजनेस लोन में DSCR का क्या अर्थ है?", answer: "DSCR (डेट सर्विस कवरेज रेशियो) यह मापता है कि व्यवसाय का शुद्ध परिचालन लाभ (NOI) ऋण की वार्षिक किस्तों को चुकाने के लिए कितना पर्याप्त है।" },
      { question: "क्या हर बिजनेस लोन के लिए 1.25x DSCR अनिवार्य है?", answer: "नहीं। 1.25x एक सामान्य वित्तीय बेंचमार्क है, लेकिन विभिन्न बैंक अपनी नीतियों के अनुसार अलग मानक तय करते हैं।" },
      { question: "SBA 7(a) लोन क्या है?", answer: "यह यूएस स्मॉल बिजनेस एडमिनिस्ट्रेशन का प्रमुख ऋण कार्यक्रम (50 लाख डॉलर तक) है जो कार्यशील पूंजी, उपकरण और व्यवसाय विस्तार के लिए दिया जाता है।" },
      { question: "SBA 504 लोन क्या है?", answer: "यह अचल संपत्तियों जैसे वाणिज्यिक रियल एस्टेट और भारी मशीनरी के लिए लंबी अवधि का फिक्स्ड-रेट ऋण (55 लाख डॉलर तक) है।" },
      { question: "SBA माइक्रोलोन क्या है?", answer: "यह छोटे व्यवसायों के लिए 50,000 डॉलर तक का लघु ऋण है जो मध्यस्थ वित्तीय संस्थानों के माध्यम से उपलब्ध कराया जाता है।" },
      { question: "क्या SBA लोन की 100% गारंटी देता है?", answer: "नहीं। SBA आमतौर पर 75% से 85% हिस्से की गारंटी देता है, बाकी जोखिम बैंक का होता है।" },
      { question: "क्या बिजनेस लोन का उपयोग वर्किंग कैपिटल के लिए किया जा सकता है?", answer: "हाँ, अधिकांश व्यावसायिक ऋण उत्पाद दैनिक कार्यशील पूंजी और इन्वेंट्री की खरीद की अनुमति देते हैं।" },
      { question: "क्या लंबी अवधि चुनने से कुल ब्याज कम होता है?", answer: "नहीं। लंबी अवधि से मासिक किस्त तो घटती है लेकिन कुल ब्याज का भुगतान बहुत अधिक बढ़ जाता है।" },
      { question: "क्या बिजनेस लोन का ब्याज टैक्स में कटौती योग्य है?", answer: "हाँ, व्यावसायिक उपयोग के लिए लिए गए ऋण का ब्याज सामान्यतः व्यावसायिक व्यय के रूप में टैक्स में छूट योग्य होता है।" }
    ],
    pIntro: "व्यावसायिक ऋणों की मासिक किस्त, कुल ब्याज लागत, प्रोसेसिंग फीस, वास्तविक प्रभावी APR, SBA योजनाएं और DSCR कवरेज की विस्तृत गणना करें।",
    sec1_h2: "1. बिजनेस लोन कैलकुलेटर क्या है?",
    sec1_p1: "केवल विज्ञापित ब्याज दर देखकर बिजनेस लोन लेना भ्रामक हो सकता है। ऋण की वास्तविक लागत अवधि, प्रोसेसिंग शुल्क और दस्तावेज़ीकरण खर्चों पर निर्भर करती है।",
    sec1_p2: "यह कैलकुलेटर सभी वित्तीय पहलुओं को एक साथ विश्लेषित करता है: मासिक ईएमआई, कुल ब्याज, कुल लागत, अमोर्टाइजेशन शेड्यूल और DSCR विश्लेषण।",
    sec1_p3: "गणना के परिणाम वित्तीय योजना और तुलनात्मक अध्ययन के लिए हैं। अंतिम शर्तें ऋणदाता बैंक द्वारा निर्धारित की जाती हैं।",
    sec2_h2: "2. व्यावसायिक ऋण (Business Loan) क्या है?",
    sec2_p1: "बिजनेस लोन व्यावसायिक उद्देश्यों जैसे वर्किंग कैपिटल, मशीनरी खरीद, इन्वेंट्री, रियल एस्टेट या व्यवसाय विस्तार के लिए लिया जाने वाला ऋण है।",
    sec2_p2: "यह विभिन्न रूपों में मिलता है: सावधि ऋण (टर्म लोन), रिवॉल्विंग क्रेडिट लाइन और सरकारी गारंटी वाले SBA 7(a) ऋण।",
    sec2_p3: "ऋण संरचना का चुनाव महत्वपूर्ण है क्योंकि समान ब्याज दर वाले दो ऋणों की कुल लागत शुल्कों के कारण भिन्न हो सकती है।",
    sec3_h2: "3. बिजनेस लोन ईएमआई की गणना कैसे होती है?",
    sec3_p1: "समान मासिक किस्तों वाले ऋण के लिए मानक वित्तीय सूत्र का उपयोग किया जाता है:",
    sec3_formula: "PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]",
    sec3_vars: "जहां: P = मूलधन, r = मासिक ब्याज दर (वार्षिक दर / 12), n = कुल महीनों की संख्या, PMT = मासिक ईएमआई।",
    sec3_p2: "ऋण की अवधि लागत को सीधे प्रभावित करती है: अवधि बढ़ाने से ईएमआई कम होती है लेकिन कुल ब्याज बढ़ जाता है।",
    sec3_exampleTitle: "उदाहरण: 10,000 $ का ऋण, 10% ब्याज, 5 वर्ष (60 महीने)",
    sec3_exampleItems: [
      "मासिक ईएमआई (PMT): 212.47 $ प्रति माह",
      "कुल भुगतान (60 महीने): 60 × 212.47 $ = 12,748.23 $",
      "चुकाया गया मूलधन: 10,000.00 $",
      "कुल ब्याज भुगतान: 2,748.23 $"
    ],
    sec4_h2: "4. कुल लागत केवल ब्याज नहीं: वाणिज्यिक शुल्क",
    sec4_p1: "व्यावसायिक ऋण में ब्याज व्यय और कुल वित्तीय लागत के अंतर को समझना आवश्यक है। बैंक ओरिजिनेशन और फाइल शुल्क भी जोड़ते हैं।",
    sec4_tableHeaders: ["लागत घटक", "राशि ($)"],
    sec4_tableRows: [
      { name: "ऋण का मूलधन", amount: "10,000.00 $" },
      { name: "कुल ब्याज भुगतान", amount: "2,748.23 $", highlight: true, color: "text-rose-600" },
      { name: "ओरिजिनेशन शुल्क (5.0%)", amount: "500.00 $", color: "text-amber-600" },
      { name: "दस्तावेज़ीकरण शुल्क", amount: "750.00 $", color: "text-amber-600" },
      { name: "अन्य प्रारंभिक शुल्क", amount: "0.00 $" },
      { name: "कुल वाणिज्यिक शुल्क:", amount: "1,250.00 $", highlight: true, color: "text-amber-600" },
      { name: "कुल वित्तीय लागत (ब्याज + शुल्क):", amount: "3,998.23 $", highlight: true, color: "text-indigo-600" }
    ],
    sec4_p2: "इस प्रकार 10% की नाममात्र दर पर कुल वित्तीय लागत 3,998.23 $ हो जाती है।",
    sec5_h2: "5. वास्तविक APR: नाममात्र दर बनाम प्रभावी लागत",
    sec5_p1: "वाणिज्यिक ऋण विश्लेषण में दो दरों को अलग रखा जाता है:",
    sec5_card1_title: "नाममात्र ब्याज दर (10.00%)",
    sec5_card1_text: "यह अनुबंध में उल्लिखित दर है जो बकाया मूलधन पर लागू होती है।",
    sec5_card2_title: "वास्तविक Actuarial APR / IRR (15.933%)",
    sec5_card2_text: "यह शुद्ध प्राप्त राशि (8,750 $) और 60 मासिक किस्तों (212.47 $) के आधार पर आंतरिक प्रतिफल दर (IRR) से निकाला गया वास्तविक APR है।",
    sec5_p2: "यह मान सामान्य लीनियर फॉर्मूले (12.50%) से अधिक सटीक है।",
    sec5_p3: "बिजनेस ग्राहकों को विभिन्न बैंकों के प्रस्तावों की तुलना इसी प्रभावी दर के आधार पर करनी चाहिए।",
    sec6_h2: "6. वाणिज्यिक ऋण अमोर्टाइजेशन कैसे कार्य करता है?",
    sec6_p1: "शुरुआत में बकाया राशि अधिक होने के कारण किस्त में ब्याज का हिस्सा अधिक और मूलधन का हिस्सा कम होता है:",
    sec6_tableHeaders: ["अवधि", "प्रारंभिक शेष", "ब्याज", "मूलधन कटौती", "अंतिम शेष"],
    sec6_tableRows: [
      { period: "माह 1", beg: "10,000.00 $", interest: "83.33 $", principal: "129.14 $", end: "9,870.86 $" },
      { period: "माह 2", beg: "9,870.86 $", interest: "82.26 $", principal: "130.21 $", end: "9,740.65 $" },
      { period: "माह 3", beg: "9,740.65 $", interest: "81.17 $", principal: "131.30 $", end: "9,609.35 $" },
      { period: "माह 60 (अंतिम)", beg: "210.71 $", interest: "1.76 $", principal: "210.71 $", end: "0.00 $" }
    ],
    sec6_p2: "60वें महीने के अंत में ऋण पूरी तरह शून्य (0.00 $) हो जाता है।",
    sec7_h2: "7. छोटी बनाम लंबी ऋण अवधि का चयन",
    sec7_bullets: [
      "छोटी अवधि: अधिक मासिक ईएमआई + सबसे कम कुल ब्याज लागत।",
      "लंबी अवधि: कम मासिक ईएमआई + बहुत अधिक कुल ब्याज लागत।"
    ],
    sec7_p1: "ऋण की अवधि आपके कैश-फ्लो और मुनाफे को निर्धारित करती है:",
    sec7_p2: "उचित अवधि का चुनाव अपने व्यवसाय के मासिक कैश-फ्लो और लाभप्रदता के अनुसार करें।",
    sec8_h2: "8. ऋण सेवा कवरेज अनुपात (DSCR) क्या है?",
    sec8_p1: "DSCR यह दर्शाता है कि आपकी कंपनी का मुनाफा ऋण की किस्तों को चुकाने के लिए कितना मजबूत है:",
    sec8_formula: "DSCR = शुद्ध परिचालन आय (NOI) / वार्षिक कुल ऋण सेवा",
    sec8_p2: "उदाहरण: 150,000 $ वार्षिक आय, 30,000 $ पुराना ऋण और 25,000 $ नया ऋण:",
    sec8_exampleItems: [
      "कुल वार्षिक ऋण सेवा: 30,000 $ + 25,000 $ = 55,000.00 $/वर्ष",
      "गणना किया गया DSCR: 150,000 $ / 55,000 $ = 2.73x (मजबूत कवरेज)",
      "अधिकतम वहन क्षमता (1.25x सीमा पर): 150,000 $ / 1.25 = 120,000.00 $/वर्ष"
    ],
    sec8_p3: "1.25x से अधिक DSCR बैंक स्वीकृति के लिए सुरक्षित माना जाता है।",
    sec9_h2: "9. SBA ऋण योजनाएं (7(a), CDC/504 और माइक्रोलोन)",
    sec9_p1: "यूएस स्मॉल बिजनेस एडमिनिस्ट्रेशन (SBA) व्यवसायों को अनुकूल शर्तों पर ऋण प्राप्त करने के लिए सरकारी गारंटी प्रदान करता है:",
    sec9_cards: [
      { title: "SBA 7(a) योजना", text: "वर्किंग कैपिटल, मशीनरी और विस्तार हेतु 50 लाख $ तक का प्रमुख ऋण।" },
      { title: "SBA 504 रियल एस्टेट", text: "अचल संपत्तियों और भारी उपकरणों के लिए 55 लाख $ तक का फिक्स्ड-रेट ऋण।" },
      { title: "SBA माइक्रोलोन", text: "छोटे उद्यमों के लिए 50,000 $ तक का लघु वित्तपोषण।" }
    ],
    sec9_p2: "सरकारी गारंटी वाले ऋणों में विशेष गारंटी शुल्क लागू होते हैं।",
    sec10_h2: "10. बिजनेस लोन में होने वाली सामान्य गलतियाँ",
    sec10_mistakes: [
      "केवल ब्याज दर देखना और प्रोसेसिंग व अन्य छुपे शुल्कों को नजरअंदाज करना।",
      "ईएमआई कम करने के लिए अत्यधिक लंबी अवधि चुनना जिससे ब्याज बहुत बढ़ जाए।",
      "व्यावसायिक ऋणों पर उपभोक्ता लोन के नियम लागू होने की गलत धारणा रखना।",
      "1.25x DSCR होने पर बिना अन्य शर्तों के ऋण स्वीकृति मान लेना।",
      "व्यावसायिक ब्याज पर टैक्स कटौती के स्थानीय नियमों की अनदेखी करना।"
    ],
    sec11_h2: "11. संबंधित व्यावसायिक वित्तीय कैलकुलेटर",
    sec11_p: "व्यावसायिक वित्तीय योजना के लिए हमारे अन्य कैलकुलेटर देखें:",
    sec11_links: [
      { title: "ऋण कैलकुलेटर", desc: "सामान्य ऋण ईएमआई और अमोर्टाइजेशन।", href: "/calculators/loan-calculator" },
      { title: "पर्सनल लोन", desc: "व्यक्तिगत ऋणों के साथ तुलना।", href: "/calculators/personal-loan-calculator" },
      { title: "मॉर्गेज कैलकुलेटर", desc: "वाणिज्यिक और आवासीय संपत्ति ऋण।", href: "/calculators/mortgage-calculator" },
      { title: "ROI कैलकुलेटर", desc: "व्यावसायिक निवेश पर प्रतिफल दर।", href: "/calculators/roi-calculator" },
      { title: "पेबैक अवधि", desc: "निवेश वसूली का समय निर्धारण।", href: "/calculators/payback-period-calculator" },
      { title: "मार्जिन कैलकुलेटर", desc: "लाभ मार्जिन और मार्कअप की गणना।", href: "/calculators/margin-calculator" },
      { title: "चक्रवृद्धि ब्याज", desc: "कैश रिजर्व और निवेश वृद्धि।", href: "/calculators/compound-interest-calculator" },
      { title: "ऑटो लोन", desc: "वाणिज्यिक वाहन और फ्लीट फाइनेंसिंग।", href: "/calculators/auto-loan-calculator" }
    ],
    overlayInputs: {
      loanAmount: "व्यावसायिक ऋण राशि",
      interestRate: "वार्षिक ब्याज दर (APR %)",
      loanTermYears: "ऋण अवधि (वर्ष)",
      originationFeePercent: "प्रोसेसिंग / ओरिजिनेशन फीस (%)",
      documentationFeeDollar: "दस्तावेज़ीकरण व फाइल शुल्क ($)"
    },
    overlayOutputs: {
      paybackAmount: "मासिक ईएमआई",
      totalInterestPaid: "कुल देय ब्याज",
      totalInterestAndFees: "कुल लागत (ब्याज + शुल्क)",
      realAprPercent: "वास्तविक प्रभावी APR"
    }
  },
  pt: {
    title: "Calculadora de Empréstimo Empresarial — Parcelas, Juros, Taxas, CET e Análise Comercial",
    metaDesc: "Calcule parcelas mensais de empréstimos empresariais, juros totais, taxas de originação, CET/APR atuarial real, opções SBA e cobertura DSCR.",
    keywords: ["calculadora de emprestimo empresarial", "emprestimo comercial", "calculadora emprestimo sba", "cet emprestimo empresa", "dscr empresarial"],
    faqs: [
      { question: "O que é uma calculadora de empréstimo empresarial?", answer: "Uma calculadora de empréstimo comercial estima o custo de quitação do crédito para pessoas jurídicas com base no valor financiado, taxa de juros, prazo e taxas administrativas." },
      { question: "Como é calculada a parcela de um empréstimo comercial?", answer: "Para financiamentos com amortização constante aplica-se a fórmula de anuidade: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], onde r é a taxa mensal e n o número de parcelas." },
      { question: "Quanto pagarei de juros em um empréstimo empresarial?", answer: "O total de juros equivale à soma de todas as parcelas programadas menos o valor principal contratado." },
      { question: "As taxas de abertura e documentação fazem diferença?", answer: "Sim. As taxas iniciais reduzem o valor líquido creditado e elevam o Custo Efetivo Total (CET / APR atuarial)." },
      { question: "Qual é a diferença entre taxa nominal e taxa efetiva (APR/CET)?", answer: "A taxa nominal incide sobre o saldo devedor, enquanto a taxa efetiva real incorpora todas as tarifas iniciais através do cálculo de Taxa Interna de Retorno (TIR)." },
      { question: "O APR de um empréstimo empresarial é igual ao de pessoa física?", answer: "Nem sempre. O crédito comercial costuma ter regras específicas de mercado; o APR do simulador representa uma métrica atuarial de comparação de custos." },
      { question: "O que é o índice DSCR em um financiamento empresarial?", answer: "O DSCR (Índice de Cobertura do Serviço da Dívida) afere a capacidade do lucro operacional líquido (NOI) cobrir as parcelas da dívida : DSCR = NOI / Serviço Anual da Dívida." },
      { question: "É exigido um DSCR mínimo de 1,25x para todo empréstimo comercial?", answer: "Não. Embora 1,25x seja uma referência clássica na análise de risco bancário, cada instituição financeira define seus critérios próprios." },
      { question: "O que é um empréstimo SBA 7(a)?", answer: "É o principal programa de crédito da SBA (até US$ 5 milhões) para capital de giro, compra de máquinas, imóveis, aquisições e refinanciamento de dívidas." },
      { question: "O que é um financiamento SBA 504?", answer: "É uma linha de longo prazo com taxa fixa (até US$ 5,5 milhões) para aquisição de imóveis comerciais e maquinário pesado via CDCs." },
      { question: "O que é um microcrédito SBA?", answer: "São empréstimos de até US$ 50.000 operados por instituições intermediárias para microempresas e necessidades imediatas de caixa." },
      { question: "A SBA garante 100% do empréstimo?", answer: "Não. A SBA garante normalmente entre 75% e 85% do valor, cabendo ao banco o risco da fração restante." },
      { question: "Posso utilizar um empréstimo empresarial para capital de giro?", answer: "Sim, a maior parte das linhas de crédito permite financiar estoques, fluxo de caixa e custos operacionais." },
      { question: "Um prazo mais longo reduz o total de juros pagos?", answer: "Não. Prazos mais longos reduzem o valor da parcela mensal, mas aumentam significativamente os juros acumulados ao longo do contrato." },
      { question: "Os juros do empréstimo empresarial são dedutíveis de impostos?", answer: "Em regra, os juros de dívidas operacionais são dedutíveis na apuração do lucro tributável da empresa, segundo as normas fiscais aplicáveis." }
    ],
    pIntro: "Calcule parcelas mensais de empréstimos empresariais, juros totais, taxas de originação, taxa efetiva real (CET/APR), opções de crédito SBA e índice de cobertura DSCR.",
    sec1_h2: "1. O que é uma Calculadora de Empréstimo Empresarial?",
    sec1_p1: "Um financiamento empresarial pode parecer atraente quando se analisa apenas a taxa de juros nominal anunciada. Contudo, o custo real varia consideravelmente em função do prazo de pagamento, tarifas de abertura e despesas de documentação.",
    sec1_p2: "Esta calculadora integra todos os parâmetros essenciais : cálculo da parcela mensal, juros acumulados, tarifas de estruturação, cronograma de amortização, opções SBA e análise de capacidade de pagamento (DSCR).",
    sec1_p3: "Os valores calculados representam simulações financeiras para planejamento. As condições definitivas dependem da análise de crédito da instituição financeira.",
    sec2_h2: "2. O que é um Empréstimo Comercial ou Empresarial?",
    sec2_p1: "Um empréstimo empresarial é um financiamento destinado a investimentos do negócio como capital de giro, compra de equipamentos, estoque, reformas, imóveis ou consolidação de dívidas.",
    sec2_p2: "Apresenta-se sob várias modalidades : empréstimos com parcelas fixas, linhas de crédito rotativas ou financiamentos com garantia pública como o programa SBA 7(a).",
    sec2_p3: "A estrutura contratual é fundamental, pois dois empréstimos com a mesma taxa nominal podem apresentar custos financeiros totais muito distintos dependendo das tarifas aplicadas.",
    sec3_h2: "3. Como se Calcula a Parcela de um Empréstimo Empresarial",
    sec3_p1: "Para empréstimos totalmente amortizáveis com pagamentos periódicos constantes, adota-se a fórmula padrão de anuidades :",
    sec3_formula: "PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]",
    sec3_vars: "Onde : P = principal financiado, r = taxa de juros mensal (taxa anual / 12), n = número de parcelas mensais, PMT = valor da parcela fixa.",
    sec3_p2: "O prazo de amortização é decisivo : prazos mais longos reduzem o desembolso mensal, mas aumentam o volume total de juros pagos.",
    sec3_exampleTitle: "Exemplo Prático : Financiamento de US$ 10.000 a 10% em 5 Anos (60 Parcelas)",
    sec3_exampleItems: [
      "Parcela Mensal Fixa (PMT) : US$ 212,47 por mês",
      "Total das Parcelas (60 meses) : 60 × US$ 212,47 = US$ 12.748,23",
      "Principal Amortizado : US$ 10.000,00",
      "Total de Juros Pagos : US$ 2.748,23"
    ],
    sec4_h2: "4. O Custo Total Vai Além dos Juros : Tarifas Comerciais",
    sec4_p1: "No crédito comercial é indispensável separar a despesa com juros do custo global do financiamento (taxas de abertura, análise documental e estruturação).",
    sec4_tableHeaders: ["Componente do Custo", "Valor ($)"],
    sec4_tableRows: [
      { name: "Valor Principal Financiado", amount: "US$ 10.000,00" },
      { name: "Total de Juros Pagos", amount: "US$ 2.748,23", highlight: true, color: "text-rose-600" },
      { name: "Taxa de Originação (5,0%)", amount: "US$ 500,00", color: "text-amber-600" },
      { name: "Taxa de Documentação e Cadastro", amount: "US$ 750,00", color: "text-amber-600" },
      { name: "Outras Despesas Iniciais", amount: "US$ 0,00" },
      { name: "Total de Tarifas Bancárias :", amount: "US$ 1.250,00", highlight: true, color: "text-amber-600" },
      { name: "Custo Financeiro Total (Juros + Taxas) :", amount: "US$ 3.998,23", highlight: true, color: "text-indigo-600" }
    ],
    sec4_p2: "Assim, mesmo com juros nominais de 10%, o financiamento gera US$ 3.998,23 em custos totais, comprovando a importância de avaliar todas as tarifas.",
    sec5_h2: "5. Taxa Efetiva Real : Taxa Nominal vs Custo Atuarial (CET/APR)",
    sec5_p1: "Na análise de crédito para empresas distinguem-se duas grandezas :",
    sec5_card1_title: "Taxa de Juros Nominal (10,00%)",
    sec5_card1_text: "Taxa contratada aplicada periodicamente sobre o saldo devedor remanescente.",
    sec5_card2_title: "Taxa Efetiva Atuarial / TIR (15,933%)",
    sec5_card2_text: "Taxa Interna de Retorno (TIR) calculada sobre os recursos líquidos recebidos (US$ 8.750) e os 60 pagamentos de US$ 212,47.",
    sec5_p2: "Essa taxa difere de aproximações lineares (12,50%) por considerar o valor do dinheiro no tempo.",
    sec5_p3: "Utilize esse indicador para comparar propostas de diferentes instituições bancárias de forma objetiva.",
    sec6_h2: "6. Funcionamento da Tabela de Amortização Comercial",
    sec6_p1: "O quadro de amortização discrimina mensalmente a parcela entre juros e amortização do saldo devedor :",
    sec6_tableHeaders: ["Período", "Saldo Inicial", "Juros", "Amortização Principal", "Saldo Final"],
    sec6_tableRows: [
      { period: "Mês 1", beg: "US$ 10.000,00", interest: "US$ 83,33", principal: "US$ 129,14", end: "US$ 9.870,86" },
      { period: "Mês 2", beg: "US$ 9.870,86", interest: "US$ 82,26", principal: "US$ 130,21", end: "US$ 9.740,65" },
      { period: "Mês 3", beg: "US$ 9.740,65", interest: "US$ 81,17", principal: "US$ 131,30", end: "US$ 9.609,35" },
      { period: "Mês 60 (Final)", beg: "US$ 210,71", interest: "US$ 1,76", principal: "US$ 210,71", end: "US$ 0,00" }
    ],
    sec6_p2: "No último mês, o saldo devedor é integralmente liquidado para US$ 0,00.",
    sec7_h2: "7. Prazo Curto vs Prazo Longo no Crédito Empresarial",
    sec7_bullets: [
      "Prazo mais curto : Parcela mensal maior + menor custo acumulado de juros.",
      "Prazo mais longo : Parcela mensal menor + maior encargo total de juros."
    ],
    sec7_p1: "A escolha do prazo equilibra liquidez imediata e custo total :",
    sec7_p2: "Defina o prazo de acordo com a geração de caixa operacional da empresa e o retorno do investimento.",
    sec8_h2: "8. O que é o Índice de Cobertura do Serviço da Dívida (DSCR)?",
    sec8_p1: "O DSCR afere se o resultado operacional líquido suporta as obrigações anuais com empréstimos :",
    sec8_formula: "DSCR = Lucro Operacional Líquido (NOI) / Serviço Anual da Dívida",
    sec8_p2: "Exemplo : Para um NOI de US$ 150.000, dívida atual de US$ 30.000/ano e nova dívida de US$ 25.000/ano :",
    sec8_exampleItems: [
      "Serviço Anual Total da Dívida : US$ 30.000 + US$ 25.000 = US$ 55.000,00/ano",
      "DSCR Calculado : US$ 150.000 / US$ 55.000 = 2,73x (Excelente Cobertura)",
      "Capacidade Máxima de Dívida (limite 1,25x) : US$ 150.000 / 1,25 = US$ 120.000,00/ano"
    ],
    sec8_p3: "Um DSCR a partir de 1,25x é considerado saudável pelos comitês de crédito.",
    sec9_h2: "9. Modalidades de Empréstimos SBA (7(a), CDC/504 e Microcréditos)",
    sec9_p1: "A Small Business Administration oferece garantias governamentais para viabilizar o crédito a pequenas e médias empresas :",
    sec9_cards: [
      { title: "Programa SBA 7(a)", text: "Linha principal até US$ 5M para capital de giro, compra de equipamentos, imóveis e aquisições." },
      { title: "SBA 504 Imobiliário", text: "Crédito a longo prazo com taxa fixa até US$ 5,5M para imóveis e maquinário pesado via CDCs." },
      { title: "Microcréditos SBA", text: "Financiamentos até US$ 50.000 para pequenos empreendedores via instituições parceiras." }
    ],
    sec9_p2: "As garantias governamentais possuem taxas próprias que devem ser previstas no orçamento.",
    sec10_h2: "10. Erros Comuns no Cálculo de Financiamentos para Empresas",
    sec10_mistakes: [
      "Comparar somente as taxas nominais sem calcular o impacto das taxas de abertura e cadastro.",
      "Optar por prazos muito longos sem calcular o montante adicional de juros pagos.",
      "Supor que as regras de crédito a pessoas físicas se aplicam integralmente a contratos empresariais.",
      "Considerar que ter DSCR de 1,25x garante aprovação automática do crédito.",
      "Desconsiderar a legislação tributária local quanto aos limites de dedução de despesas financeiras."
    ],
    sec11_h2: "11. Calculadoras Financeiras e Empresariais Relacionadas",
    sec11_p: "Consulte outras ferramentas financeiras para a gestão da sua empresa :",
    sec11_links: [
      { title: "Calculadora de Empréstimos", desc: "Simulação de amortização geral.", href: "/calculators/loan-calculator" },
      { title: "Empréstimo Pessoal", desc: "Comparação com linhas para pessoa física.", href: "/calculators/personal-loan-calculator" },
      { title: "Calculadora de Hipoteca", desc: "Financiamento de imóveis comerciais.", href: "/calculators/mortgage-calculator" },
      { title: "Calculadora de ROI", desc: "Retorno sobre investimentos da empresa.", href: "/calculators/roi-calculator" },
      { title: "Prazo de Retorno", desc: "Tempo de recuperação do capital investido.", href: "/calculators/payback-period-calculator" },
      { title: "Calculadora de Margem", desc: "Cálculo de margem de lucro e markup.", href: "/calculators/margin-calculator" },
      { title: "Juros Compostos", desc: "Projeção de investimentos de caixa.", href: "/calculators/compound-interest-calculator" },
      { title: "Financiamento de Veículos", desc: "Crédito para frotas comerciais.", href: "/calculators/auto-loan-calculator" }
    ],
    overlayInputs: {
      loanAmount: "Valor do Empréstimo Comercial",
      interestRate: "Taxa de Juros Anual Fixa (APR %)",
      loanTermYears: "Prazo de Pagamento (Anos)",
      originationFeePercent: "Taxa de Abertura / Originação (%)",
      documentationFeeDollar: "Tarifa de Cadastro e Documentação ($)"
    },
    overlayOutputs: {
      paybackAmount: "Parcela Mensal Fixa",
      totalInterestPaid: "Total de Juros a Pagar",
      totalInterestAndFees: "Custo Total (Juros + Tarifas)",
      realAprPercent: "Taxa Efetiva Real (CET/APR)"
    }
  }
};

for (const loc of LOCALES) {
  const d = DATA[loc];
  
  const contentCode = `"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Scale,
  Calculator,
} from "lucide-react";
import { CalculatorLocalizedContent, FAQItem } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(d.faqs, null, 2)};

export const seo = {
  title: "${d.title}",
  description: "${d.metaDesc}",
  keywords: ${JSON.stringify(d.keywords)}
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
            ${d.sec1_h2}
          </h2>
          <p>
            ${d.sec1_p1}
          </p>
          <p>
            ${d.sec1_p2}
          </p>
          <p>
            ${d.sec1_p3}
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec2_h2}
          </h2>
          <p>
            ${d.sec2_p1}
          </p>
          <p>
            ${d.sec2_p2}
          </p>
          <p>
            ${d.sec2_p3}
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec3_h2}
          </h2>
          <p>
            ${d.sec3_p1}
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            ${d.sec3_formula}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec3_vars}
          </p>
          <p>
            ${d.sec3_p2}
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              ${d.sec3_exampleTitle}
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              ${d.sec3_exampleItems.map(item => `<li>${item}</li>`).join("\n              ")}
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec4_h2}
          </h2>
          <p>
            ${d.sec4_p1}
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{${JSON.stringify(d.sec4_tableHeaders[0])}}</th>
                  <th className="p-2.5 border-b text-right">{${JSON.stringify(d.sec4_tableHeaders[1])}}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                ${d.sec4_tableRows.map(row => `
                <tr className="${row.highlight ? 'bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100' : ''}">
                  <td className="p-2.5 ${row.highlight ? 'font-bold' : ''}">{${JSON.stringify(row.name)}}</td>
                  <td className="p-2.5 text-right ${row.color || ''}">{${JSON.stringify(row.amount)}}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec4_p2}
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec5_h2}
          </h2>
          <p>
            ${d.sec5_p1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ${d.sec5_card1_title}
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                ${d.sec5_card1_text}
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                ${d.sec5_card2_title}
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                ${d.sec5_card2_text}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec5_p2}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec5_p3}
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec6_h2}
          </h2>
          <p>
            ${d.sec6_p1}
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{${JSON.stringify(d.sec6_tableHeaders[0])}}</th>
                  <th className="p-2.5 border-b">{${JSON.stringify(d.sec6_tableHeaders[1])}}</th>
                  <th className="p-2.5 border-b text-rose-600">{${JSON.stringify(d.sec6_tableHeaders[2])}}</th>
                  <th className="p-2.5 border-b text-emerald-600">{${JSON.stringify(d.sec6_tableHeaders[3])}}</th>
                  <th className="p-2.5 border-b">{${JSON.stringify(d.sec6_tableHeaders[4])}}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                ${d.sec6_tableRows.map((row, idx) => `
                <tr className="${idx === d.sec6_tableRows.length - 1 ? 'bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100' : ''}">
                  <td className="p-2.5 font-bold">{${JSON.stringify(row.period)}}</td>
                  <td className="p-2.5">{${JSON.stringify(row.beg)}}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{${JSON.stringify(row.interest)}}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{${JSON.stringify(row.principal)}}</td>
                  <td className="p-2.5 font-bold ${idx === d.sec6_tableRows.length - 1 ? 'text-emerald-600' : ''}">{${JSON.stringify(row.end)}}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec6_p2}
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec7_h2}
          </h2>
          <p>
            ${d.sec7_p1}
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            ${d.sec7_bullets.map(b => `<li>${b}</li>`).join("\n            ")}
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec7_p2}
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec8_h2}
          </h2>
          <p>
            ${d.sec8_p1}
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            ${d.sec8_formula}
          </div>
          <p>
            ${d.sec8_p2}
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            ${d.sec8_exampleItems.map(item => `<p>${item}</p>`).join("\n            ")}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec8_p3}
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec9_h2}
          </h2>
          <p>
            ${d.sec9_p1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            ${d.sec9_cards.map(c => `
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{${JSON.stringify(c.title)}}</strong>
              <p className="text-slate-600 dark:text-slate-400">{${JSON.stringify(c.text)}}</p>
            </div>`).join("")}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec9_p2}
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec10_h2}
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            ${d.sec10_mistakes.map(m => `<li>${m}</li>`).join("\n            ")}
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${d.sec11_h2}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            ${d.sec11_p}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            ${d.sec11_links.map(l => `
            <Link
              href="${l.href}"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{${JSON.stringify(l.title)}}</span>
              <span className="text-slate-500 text-[11px]">{${JSON.stringify(l.desc)}}</span>
            </Link>`).join("")}
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
                    className={\`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 \${
                      isOpen ? "rotate-180" : ""
                    }\`}
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
  locale: "${loc}",
  calculatorSlug: "business-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/business-loan/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_BUSINESS_LOAN_OVERLAY = {
  title: "${d.title}",
  description: "${d.metaDesc}",
  inputs: ${JSON.stringify(d.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(d.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_BUSINESS_LOAN_OVERLAY;
`;
  writeFile(`src/i18n/overlays/business-loan/${loc}.ts`, overlayCode);
}
console.log("✓ Deep Business Loan generation complete.");
