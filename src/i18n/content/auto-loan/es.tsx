import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const ES_AUTO_LOAN_SEO = {
  title: "Calculadora de Préstamo Coche | Cuota Mensual, Intereses y Amortización",
  description: "Calcula la cuota mensual de tu préstamo para coche, intereses totales, impuestos, valor de canje y coste total con tabla de amortización detallada.",
  keywords: ["calculadora prestamo coche", "calcular cuota coche", "prestamo auto simulador", "financiacion vehiculo", "intereses prestamo coche"],
};

export const ES_AUTO_LOAN_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Cómo se calcula la cuota mensual de un préstamo de coche?",
    answer:
      "Se calcula aplicando la fórmula estándar de amortización en cuotas constantes (sistema francés): Cuota = P × [r(1 + r)^n] / [(1 + r)^n − 1], donde P es el principal financiado, r es el tipo de interés mensual y n es el número total de meses.",
  },
  {
    question: "¿Es mejor elegir un plazo de préstamo más corto o más largo?",
    answer:
      "Un plazo más corto reduce drásticamente los intereses totales pagados y evita deber más de lo que vale el coche (patrimonio negativo), aunque exige una cuota mensual mayor. Un plazo largo reduce la cuota pero incrementa el coste total.",
  },
  {
    question: "¿Cómo influye la entrada inicial (enganche) en el coste del préstamo?",
    answer:
      "Dar una entrada de al menos el 10% al 20% reduce directamente el importe a financiar, disminuye el riesgo de depreciación acelerada y reduce el pago de intereses durante toda la vida del préstamo.",
  },
];

export function EsAutoLoanContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introducción a la Financiación de Vehículos
        </h2>
        <p>
          La compra de un automóvil representa uno de los mayores desembolsos financieros para familias y profesionales. Comprender la estructura de costes de un préstamo para coche —incluyendo principal, tipos de interés nominal (TIN), tasa anual equivalente (TAE), impuestos y comisiones de concesionario— permite tomar decisiones patrimoniales informadas y ahorrar miles de euros.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Concepto Matemático y Fórmula de Amortización
        </h2>
        <p>
          La mayoría de los préstamos para vehículos utilizan el sistema de amortización francés de cuota constante:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Cuota Mensual (M):</strong> M = P × [r(1 + r)^n] / [(1 + r)^n − 1]</p>
          <p><strong>Principal Financiado (P):</strong> P = Precio_Vehículo − Entrada − Valor_Canje + Impuestos + Gastos</p>
          <p><strong>Interés Mensual (r):</strong> r = (TIN anual %) / 12 / 100</p>
          <p><strong>Intereses Totales:</strong> Total_Intereses = (M × n) − P</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. La Regla Financiera 20/4/10 para Comprar Coche
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>20% de entrada:</strong> Aportar al menos el 20% del valor del vehículo al contado.</li>
          <li><strong>4 años de plazo máximo:</strong> Financiar el coche a un plazo no superior a 48 meses.</li>
          <li><strong>10% de ingresos:</strong> Mantener el coste mensual total (cuota + seguro + combustible) por debajo del 10% del sueldo neto.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Errores Frecuentes
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Fijarse únicamente en la cuota mensual sin calcular el coste total del crédito.</li>
          <li>Financiar plazos excesivos (72 a 84 meses) provocando patrimonio negativo.</li>
          <li>Añadir garantías extendidas o accesorios innecesarios al préstamo con intereses.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Resumen
        </h2>
        <p>
          Utilice la tabla de amortización para evaluar cómo los pagos anticipados reducen el principal y minimizan los costes financieros globales.
        </p>
      </section>
    </article>
  );
}
