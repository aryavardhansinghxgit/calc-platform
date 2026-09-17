"use client";

import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const SPANISH_PERCENTAGE_SEO = {
  title: "Calculadora de Porcentajes | Calci",
  description:
    "Calcule valores porcentuales, ecuaciones de 3 variables, cambios porcentuales, aumentos, disminuciones, diferencias y proporciones con precisión matemática.",
  category: "Matemáticas",
  keywords: [
    "calculadora de porcentajes",
    "calcular porcentaje",
    "cambio porcentual",
    "aumento porcentual",
    "descuento porcentual",
    "diferencia porcentual",
    "proporciones",
  ],
};

export const SPANISH_PERCENTAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Qué es un porcentaje y cómo se calcula?",
    answer:
      "Un porcentaje es una razón adimensional expresada como una fracción de 100. Se calcula dividiendo la parte entre el todo y multiplicando el cociente por 100: Porcentaje = (Parte / Todo) × 100. Por ejemplo, 25 de 50 es (25 / 50) × 100 = 50%.",
  },
  {
    question: "¿Cómo calculo qué porcentaje representa un número respecto a otro?",
    answer:
      "Para determinar qué porcentaje representa el número A respecto al número B, divida A entre B y multiplique por 100: P = (A / B) × 100. Por ejemplo, para saber qué porcentaje es 8 de 2: (8 / 2) × 100 = 400%. Si B es 0, el porcentaje queda matemáticamente indefinido.",
  },
  {
    question: "¿Cómo hallo un porcentaje específico de un número?",
    answer:
      "Para calcular el P% de un valor V, convierta el porcentaje en decimal dividiéndolo entre 100 y luego multiplíquelo por V: Resultado = (P / 100) × V. Por ejemplo, el 4% de 6 es (4 / 100) × 6 = 0.04 × 6 = 0.24.",
  },
  {
    question: "¿Cómo encuentro el total cuando conozco un porcentaje y su parte resultante?",
    answer:
      "Para hallar el total (valor base) cuando sabe que la parte A representa el P% del mismo, divida la parte entre la tasa porcentual decimal: Total = A / (P / 100). Por ejemplo, si 20 es el 25% de un número, el total es 20 / 0.25 = 80.",
  },
  {
    question: "¿Cuál es la diferencia entre cambio porcentual y diferencia porcentual?",
    answer:
      "El cambio porcentual es direccional y compara un nuevo valor respecto a un valor base inicial específico: ((V2 - V1) / V1) × 100. La diferencia porcentual es simétrica y compara dos valores relativos a su promedio aritmético cuando ninguno actúa como base: (|V1 - V2| / ((V1 + V2) / 2)) × 100.",
  },
  {
    question: "¿Cómo calculo un incremento o aumento porcentual?",
    answer:
      "Para incrementar un número V en un P%, multiplique V por (1 + P / 100). Por ejemplo, 50 incrementado en 25% es 50 × (1 + 0.25) = 50 × 1.25 = 62.5.",
  },
  {
    question: "¿Cómo calculo una disminución o descuento porcentual?",
    answer:
      "Para disminuir un número V en un P%, multiplique V por (1 - P / 100). Por ejemplo, 100 disminuido en 10% es 100 × (1 - 0.10) = 100 × 0.90 = 90.",
  },
  {
    question: "¿Cómo se calcula la diferencia porcentual entre dos números?",
    answer:
      "Para hallar la diferencia porcentual entre V1 y V2, compute la diferencia absoluta dividida entre su media aritmética multiplicada por 100: Diferencia Porcentual = (|V1 - V2| / ((V1 + V2) / 2)) × 100. Para 5 y 9: |5 - 9| / ((5 + 9) / 2) × 100 = 4 / 7 × 100 ≈ 57.142857%.",
  },
  {
    question: "¿Cómo convierto un número decimal a porcentaje?",
    answer:
      "Para convertir un decimal en porcentaje, multiplique el valor decimal por 100 y añada el símbolo de porcentaje (%). Por ejemplo, 0.35 × 100 = 35%, y 0.0025 × 100 = 0.25%.",
  },
  {
    question: "¿Cómo convierto una fracción a porcentaje?",
    answer:
      "Para convertir una fracción en porcentaje, divida el numerador entre el denominador para obtener el valor decimal y multiplique por 100. Por ejemplo, 3/4 = 0.75, y 0.75 × 100 = 75%. Para 1/3, 1 ÷ 3 ≈ 0.333333, que equivale a 33.333333%.",
  },
  {
    question: "¿Por qué los cálculos de porcentaje quedan indefinidos cuando el valor base es cero?",
    answer:
      "Las fórmulas porcentuales donde el valor base actúa como denominador —como resolver la tasa porcentual (A / B × 100) o el cambio porcentual ((V2 - V1) / V1 × 100)— requieren dividir entre el valor inicial. En matemáticas, la división por cero no está definida porque ningún número finito multiplicado por cero puede generar un numerador distinto de cero.",
  },
  {
    question: "¿Por qué esta calculadora de porcentajes puede diferir de un cálculo manual redondeado?",
    answer:
      "Los cálculos manuales suelen redondear fracciones o decimales intermedios (como usar 0.33 en vez de 1/3 o 0.57 en vez de 4/7), lo que acumula errores de redondeo. Esta calculadora mantiene precisión completa IEEE-754 de 64 bits en punto flotante a lo largo de todos los pasos intermedios y solo formatea en la capa visual final.",
  },
];

export function SpanishPercentageContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">

      {/* 1. ¿QUÉ ES UN PORCENTAJE? */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          ¿Qué es un porcentaje?
        </h2>
        <p>
          En matemáticas, un porcentaje es una razón o número adimensional expresado como una fracción de 100. Sirve como un método estandarizado para comparar partes proporcionales respecto a un total de referencia fijo. Derivado del término en latín <em>per centum</em>, que significa &quot;por cada cien&quot;, los porcentajes proporcionan un lenguaje universal para analizar razones, tasas de crecimiento, descuentos, rendimientos de intereses financieros y distribuciones estadísticas.
        </p>
        <p>
          Los porcentajes se denotan mediante el símbolo de porcentaje &quot;%&quot; o la abreviatura &quot;pct.&quot; Cualquier porcentaje puede convertirse en un decimal equivalente dividiéndolo entre 100, o expresarse como una fracción simplificada. Por ejemplo, el 35% corresponde al decimal 0.35 y a la fracción simplificada <span className="inline-flex items-center align-middle mx-1"><sup>7</sup>&frasl;<sub>20</sub></span>.
        </p>
        <p>
          Para calcular un porcentaje a partir de datos muestrales sin procesar, multiplique la razón de la parte respecto al todo por 100. Por ejemplo, si 25 de 50 estudiantes en un aula son hombres, la proporción es <span className="inline-flex items-center align-middle mx-1"><sup>25</sup>&frasl;<sub>50</sub></span> = 0.5. Al multiplicar esta proporción por 100 se obtiene la tasa porcentual:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          0.5 × 100 = 50%
        </div>
      </section>

      {/* 2. FÓRMULA DEL PORCENTAJE */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Fórmula del porcentaje
        </h2>
        <p>
          La relación porcentual fundamental se expresa como una ecuación algebraica lineal simple que vincula tres variables clave:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <p>
          Aquí, <strong>P</strong> es la tasa porcentual en forma decimal (donde 100% = 1.0), <strong>V<sub>1</sub></strong> representa el valor base inicial (el total del 100%), y <strong>V<sub>2</sub></strong> representa el valor resultante de la parte. Dependiendo de cuáles dos variables sean conocidas, la fórmula se reorganiza en tres formas operativas distintas:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>Despejando la Parte (V<sub>2</sub>):</strong> V<sub>2</sub> = (P / 100) × V<sub>1</sub></li>
          <li><strong>Despejando la Tasa Porcentual (P%):</strong> P = (V<sub>2</sub> / V<sub>1</sub>) × 100%</li>
          <li><strong>Despejando la Base Total (V<sub>1</sub>):</strong> V<sub>1</sub> = V<sub>2</sub> / (P / 100)</li>
        </ul>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>EJ: P × 30 = 1.5</p>
          <p>P = <span className="inline-flex items-center align-middle mx-1"><sup>1.5</sup>&frasl;<sub>30</sub></span> = 0.05 × 100 = 5%</p>
        </div>
      </section>

      {/* 3. FÓRMULA DE DIFERENCIA PORCENTUAL */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Fórmula de diferencia porcentual
        </h2>
        <p>
          La diferencia porcentual mide la variación relativa entre dos números cuando ninguno de ellos sirve como línea base oficial o punto de referencia inicial. En lugar de comparar contra un valor inicial, la diferencia porcentual evalúa la distancia absoluta entre los dos valores relativa a su media aritmética:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-2">
          <p>Diferencia Porcentual = <span className="inline-flex items-center align-middle mx-1"><sup>|V<sub>1</sub> - V<sub>2</sub>|</sup>&frasl;<sub>(V<sub>1</sub> + V<sub>2</sub>)/2</sub></span> × 100%</p>
          <p>EJ: <span className="inline-flex items-center align-middle mx-1"><sup>|10 - 6|</sup>&frasl;<sub>(10 + 6)/2</sub></span> = <span className="inline-flex items-center align-middle mx-1"><sup>4</sup>&frasl;<sub>8</sub></span> = 0.5 = 50%</p>
        </div>
        <p>
          El uso de la media de referencia garantiza que la diferencia porcentual calculada sea simétrica, produciendo exactamente el mismo resultado independientemente de qué número se designe como V<sub>1</sub> o V<sub>2</sub>.
        </p>
      </section>

      {/* 4. FÓRMULA DE CAMBIO PORCENTUAL */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Fórmula de cambio porcentual
        </h2>
        <p>
          El cambio porcentual cuantifica el crecimiento direccional relativo (aumento) o decrecimiento (disminución) desde un valor de partida inicial V<sub>1</sub> hasta un valor resultante final V<sub>2</sub>. A diferencia de la diferencia porcentual, el cambio porcentual divide estrictamente la diferencia neta entre el valor inicial de partida V<sub>1</sub>:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>Cambio Porcentual = <span className="inline-flex items-center align-middle mx-1"><sup>(V<sub>2</sub> - V<sub>1</sub>)</sup>&frasl;<sub>V<sub>1</sub></sub></span> × 100%</p>
        </div>
        <p>
          Al aplicar un incremento o decremento porcentual directamente a un número base V<sub>1</sub>, convierta el porcentaje en un factor decimal (P / 100) y súmelo o réstelo de 1:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1.5">
          <p>EJ: 500 incrementado en 10% (0.1)</p>
          <p>500 × (1 + 0.1) = 550</p>
          <p>EJ: 500 disminuido en 10%</p>
          <p>500 × (1 - 0.1) = 450</p>
        </div>
      </section>

      {/* 5. TABLA DE REFERENCIA DE CONVERSIONES PORCENTUALES COMUNES */}
      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Referencia de conversiones porcentuales comunes
        </h2>
        <p>
          A continuación se presenta una tabla de referencia que muestra conversiones matemáticas rápidas para fracciones de referencia comunes, decimales y sus equivalentes porcentuales:
        </p>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded max-w-xl">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Fracción</th>
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Decimal</th>
                <th className="p-2">Porcentaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/2</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.5</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/3</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.333333...</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">33.333...%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.25</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/5</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.2</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/8</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.125</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">12.5%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/10</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.1</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">3/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0.75</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. RESUMEN EDUCATIVO */}
      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Resumen educativo</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Los porcentajes sirven como una herramienta proporcional estándar para calcular razones relativas, variaciones de tasas, crecimiento direccional y diferencias absolutas en la ciencia, las finanzas y las matemáticas cotidianas.
        </p>
      </section>

    </article>
  );
}

export const PercentageContentEs = SpanishPercentageContent;
export default SpanishPercentageContent;
