import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const ES_OHMS_LAW_SEO = {
  title: "Calculadora de la Ley de Ohm | Voltaje, Corriente, Resistencia y Potencia",
  description: "Calcula tensión (V), corriente (I), resistencia (R) y potencia eléctrica (P) con la ley de Ohm y la ley de Joule. Incluye divisor de tensión y resistencia para LED.",
  keywords: ["ley de ohm calculadora", "calcular voltaje corriente resistencia", "formula ley de ohm", "potencia electrica calculadora", "divisor de tension"],
};

export const ES_OHMS_LAW_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Qué establece la Ley de Ohm?",
    answer:
      "La Ley de Ohm establece que la corriente eléctrica (I) que fluye a través de un conductor entre dos puntos es directamente proporcional a la diferencia de potencial o tensión (V) e inversamente proporcional a la resistencia (R): V = I × R.",
  },
  {
    question: "¿Cómo se calcula la potencia eléctrica con la Ley de Ohm?",
    answer:
      "Combinando la ley de Ohm con la ley de Joule, la potencia eléctrica se calcula con P = V × I, P = I² × R o P = V² / R, expresándose en vatios (W).",
  },
  {
    question: "¿Cuándo NO se cumple la Ley de Ohm?",
    answer:
      "No se cumple en componentes no lineales u óhmicos no ideales, tales como diodos, transistores, tubos de descarga de gas o termistores donde la resistencia varía con la temperatura o el voltaje aplicado.",
  },
];

export function EsOhmsLawContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introducción a la Ley de Ohm y la Electrotecnia
        </h2>
        <p>
          Formulada por el físico alemán Georg Simon Ohm en 1827, la Ley de Ohm es la relación fundamental que gobierna el comportamiento de los circuitos eléctricos de corriente continua (CC) y alterna (CA). Permite relacionar las cuatro magnitudes eléctricas esenciales: tensión, intensidad de corriente, resistencia y potencia.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Fórmulas de la Rueda de la Ley de Ohm y Joule
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Tensión (V):</strong> V = I × R = P / I = √(P × R)</p>
          <p><strong>Corriente (I):</strong> I = V / R = P / V = √(P / R)</p>
          <p><strong>Resistencia (R):</strong> R = V / I = V² / P = P / I²</p>
          <p><strong>Potencia (P):</strong> P = V × I = I² × R = V² / R</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Divisores de Tensión y Resistencia LED
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Divisor de Tensión:</strong> V_salida = V_entrada × [R2 / (R1 + R2)]</li>
          <li><strong>Resistencia para LED:</strong> R = (V_fuente − V_led) / I_led</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Errores Comunes
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Olvidar convertir miliamperios (mA) a amperios (A) antes de multiplicar.</li>
          <li>No verificar la potencia nominal de las resistencias (por ejemplo, usar 1/4 W cuando se disipan 2 W).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Resumen
        </h2>
        <p>
          Conocer dos parámetros cualquiera permite calcular con exactitud los otros dos, dimensionando de forma segura fuentes de alimentación, cableado y componentes de protección.
        </p>
      </section>
    </article>
  );
}
