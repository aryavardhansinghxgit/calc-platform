/**
 * Spanish Authoritative Content and SEO Definitions for Mortgage Calculator
 */

export interface MortgageFaqItem {
  question: string;
  answer: string;
}

export const SPANISH_MORTGAGE_SEO = {
  title: "Calculadora de Hipoteca",
  description:
    "Calcule sus pagos mensuales de hipoteca (capital e intereses), impuestos sobre la propiedad, seguro de vivienda, PMI y cuotas de HOA. Simule pagos adicionales a capital, planes quincenales y tabla de amortización completa.",
  category: "Finanzas",
  keywords: [
    "calculadora de hipoteca",
    "préstamo hipotecario",
    "pago mensual de hipoteca",
    "tabla de amortización",
    "intereses hipotecarios",
    "seguro pmi",
    "impuestos sobre la propiedad",
    "seguro de vivienda",
    "cuotas de hoa",
    "pagos quincenales",
  ],
};

export const SPANISH_MORTGAGE_FAQS: MortgageFaqItem[] = [
  {
    question: "¿Cómo se calcula el pago mensual de capital e intereses?",
    answer:
      "Su pago base se calcula mediante la fórmula de amortización de tasa fija: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], donde P es el monto del préstamo, r es la tasa de interés mensual (tasa nominal anual dividida entre 12) y n es el número total de períodos de pago mensuales (ej. 360 meses para una hipoteca a 30 años).",
  },
  {
    question: "¿Cuál es la diferencia entre PITI y el Desembolso Mensual Total de Vivienda?",
    answer:
      "PITI es el estándar bancario tradicional que agrupa Capital, Intereses, Impuestos sobre la propiedad y Seguro de vivienda. El Desembolso Mensual Total es una cifra de presupuesto personal integral que incluye PITI más el Seguro Hipotecario Privado (PMI), cuotas de la Asociación de Propietarios (HOA), reservas auxiliares de mantenimiento y pagos adicionales voluntarios a capital.",
  },
  {
    question: "¿Cuál es la diferencia entre la tasa de interés nominal y el APR (TAE)?",
    answer:
      "La tasa de interés nominal (note rate) es el porcentaje anual que se cobra sobre el saldo de capital no pagado. La Tasa de Porcentaje Anual (APR/TAE) refleja la tasa nominal más las tarifas de originación del prestamista, puntos de descuento y costos de cierre obligatorios expresados como un porcentaje anualizado.",
  },
  {
    question: "¿Cuándo se puede cancelar el Seguro Hipotecario Privado (PMI)?",
    answer:
      "Bajo la Ley de Protección a Propietarios de 1998 (HPA), los prestatarios de préstamos convencionales tienen el derecho legal de solicitar la cancelación del PMI por escrito una vez que el saldo de capital alcanza el 80% del valor original de la vivienda. Asimismo, los administradores deben cancelarlo automáticamente cuando el saldo programado alcance el 78% LTV, siempre que los pagos estén al corriente.",
  },
  {
    question: "¿Cómo acortan los pagos extraordinarios el plazo de liquidación de la hipoteca?",
    answer:
      "Los pagos extraordinarios se aplican al 100% directamente a la reducción del saldo de capital no pagado. Como los intereses futuros se calculan sobre este saldo menor, los cargos por interés disminuyen de forma permanente, permitiendo que los pagos fijos liquiden la deuda restante años antes de lo previsto.",
  },
  {
    question: "¿Cómo ahorra intereses un programa de pagos quincenales?",
    answer:
      "Un plan quincenal divide el pago mensual de capital e intereses a la mitad (M / 2) y se paga cada dos semanas. Al haber 52 semanas en un año, se realizan 26 medios pagos, lo que equivale a 13 pagos mensuales completos al año. Este pago mensual adicional aplicado directamente al capital reduce el plazo de 30 años en varios años y ahorra miles en intereses acumulados.",
  },
];
