import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const ES_CURRENCY_SEO = {
  title: "Conversor de Divisas | Tipos de Cambio en Directo y Comparador",
  description: "Convierte al instante entre más de 160 monedas del mundo con tipos de cambio reales. Calcula comisiones bancarias, márgenes ocultos y matrices multidivisa.",
  keywords: ["conversor de divisas", "tipo de cambio euro dolar", "cambio de moneda", "convertir monedas", "calculadora de divisas"],
};

export const ES_CURRENCY_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Qué es el tipo de cambio interbancario o de mercado medio?",
    answer:
      "El tipo de cambio interbancario (mid-market rate) es el punto medio exacto entre los precios de compra (bid) y venta (ask) de divisas en los mercados financieros mayoristas globales. Es el valor real de referencia sin recargos comerciales.",
  },
  {
    question: "¿Cómo ocultan los bancos comisiones en el cambio de divisas?",
    answer:
      "Muchas entidades promocionan 'cero comisiones' pero aplican un diferencial (spread) de entre el 1,5% y el 4% sobre el tipo de cambio real, cobrando un coste implícito al cliente en cada conversión.",
  },
  {
    question: "¿Cómo afecta la inflación a los tipos de cambio?",
    answer:
      "Según la teoría de la paridad del poder adquisitivo (PPA), los países con tasas de inflación sostenidamente más altas tienden a ver depreciada su moneda frente a aquellas con menor inflación para equilibrar los precios relativos de bienes y servicios.",
  },
];

export function EsCurrencyContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introducción al Mercado de Divisas (Forex)
        </h2>
        <p>
          El mercado de divisas es el mercado financiero más grande y líquido del mundo, con billones de dólares negociados diariamente. Permite a particulares, empresas multinacionales, inversores y bancos centrales convertir una divisa nacional en otra para comercio internacional, turismo e inversión de capital.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Conceptos Financieros Fundamentales
        </h2>
        <p>
          El valor relativo de dos monedas se expresa siempre como un par de divisas (por ejemplo, EUR/USD):
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Moneda base:</strong> La primera divisa del par (EUR). Representa una unidad.</li>
          <li><strong>Moneda cotizada:</strong> La segunda divisa del par (USD). Indica cuántas unidades de esta divisa equivalen a una unidad de la divisa base.</li>
          <li><strong>Diferencial (Spread):</strong> La diferencia entre el precio de compra y el precio de venta aplicado por intermediarios financieros.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Fórmulas de Conversión
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Conversión Directa:</strong> Importe_Destino = Importe_Origen × Tipo_de_Cambio</p>
          <p><strong>Tipo Inverso:</strong> Tipo_Inverso = 1 / Tipo_Directo</p>
          <p><strong>Coste por Diferencial Oculto:</strong> Coste_Spread = Importe × (Tipo_Mercado − Tipo_Banco) / Tipo_Mercado</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Errores Comunes en el Cambio de Moneda
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Cambiar moneda en quioscos de aeropuertos y estaciones con diferenciales que superan el 10-15%.</li>
          <li>Aceptar la 'conversión dinámica de divisas' (DCC) en TPV extranjeros, pagando tipos desfavorables.</li>
          <li>Confundir el tipo interbancario de referencia con el tipo de venta minorista al consumidor.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Resumen
        </h2>
        <p>
          Compare siempre el tipo ofertado con el tipo de mercado interbancario oficial para calcular el coste real y la comisión efectiva de cualquier transferencia internacional.
        </p>
      </section>
    </article>
  );
}
