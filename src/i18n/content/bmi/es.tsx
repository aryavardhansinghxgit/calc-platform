"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/calculators/types";

export const SPANISH_BMI_SEO = {
  title: "Calculadora de IMC (Índice de Masa Corporal) | Calci",
  description:
    "Calcule su Índice de Masa Corporal (IMC) y composición corporal con percentiles CDC para niños y categorías de la OMS para adultos.",
  category: "Salud",
  keywords: [
    "calculadora de imc",
    "índice de masa corporal",
    "calcular imc",
    "tabla de imc",
    "peso saludable",
    "imc niños percentiles",
    "categorías oms imc",
  ],
};

export const SPANISH_BMI_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Qué es el Índice de Masa Corporal (IMC)?",
    answer:
      "El Índice de Masa Corporal (IMC) es una métrica de detección antropométrica estandarizada que evalúa la masa corporal en relación con la estatura. Se calcula dividiendo el peso en kilogramos entre la estatura en metros al cuadrado (kg/m²), o en el sistema estadounidense multiplicando el peso en libras por 703 y dividiendo entre la estatura en pulgadas al cuadrado.",
  },
  {
    question: "¿Cuál es un IMC saludable para adultos?",
    answer:
      "Bajo las directrices de los CDC para adultos mayores de 20 años, un IMC entre 18.5 y 24.9 kg/m² se clasifica dentro de la categoría de Peso Saludable. El IMC es un marco de cribado y debe interpretarse junto con otros indicadores clínicos.",
  },
  {
    question: "¿El IMC se calcula de manera diferente para hombres y mujeres?",
    answer:
      "La fórmula matemática del IMC es idéntica para hombres y mujeres. No obstante, el sexo biológico se utiliza en cálculos secundarios como el porcentaje estimado de grasa corporal, la TMB y los percentiles de crecimiento pediátrico.",
  },
  {
    question: "¿Cómo funciona el IMC en niños y adolescentes?",
    answer:
      "Para niños y adolescentes de 2 a 19 años, el IMC bruto se interpreta mediante percentiles de IMC para la edad y el sexo de los CDC. Un percentil entre el 5 y el 84.9 indica una trayectoria de desarrollo de peso saludable.",
  },
  {
    question: "¿Qué es el IMC Prime?",
    answer:
      "Un IMC Prime inferior a 1.0 indica un IMC menor a 25 kg/m², mientras que 1.0 corresponde exactamente a 25 kg/m². El IMC Prime es una normalización matemática respecto al límite superior saludable, no un diagnóstico médico separado.",
  },
  {
    question: "¿Qué es el Índice Ponderal y en qué se diferencia del IMC?",
    answer:
      "El Índice Ponderal (Índice de Corpulencia) mide la masa respecto a la estatura al cubo (kg/m³). Al considerar el volumen tridimensional, proporciona comparaciones útiles para personas de estaturas atípicas (muy altas o bajas).",
  },
  {
    question: "¿Por qué el IMC puede clasificar a deportistas musculosos como con sobrepeso u obesidad?",
    answer:
      "El IMC no distingue entre masa muscular magra y tejido adiposo. Dado que el músculo esquelético denso contribuye al peso corporal, una persona con gran desarrollo muscular puede tener un IMC elevado sin presentar exceso de grasa.",
  },
  {
    question: "¿Qué riesgos para la salud se asocian con un IMC bajo (Bajo peso < 18.5)?",
    answer:
      "Un IMC inferior a 18.5 se asocia a nivel poblacional con deficiencias nutricionales y problemas de salud. Las causas individuales varían, por lo que debe evaluarse en conjunto con antecedentes médicos y nutricionales.",
  },
  {
    question: "¿Qué riesgos para la salud se vinculan con un IMC elevado (Sobrepeso y Obesidad)?",
    answer:
      "Un IMC elevado se asocia a nivel poblacional con una mayor prevalencia de hipertensión, diabetes tipo 2, enfermedades cardiovasculares, apnea del sueño y artrosis. El IMC es una medida de detección y no define por sí solo el riesgo individual.",
  },
  {
    question: "¿Cuál es la diferencia entre el IMC y el Porcentaje de Grasa Corporal?",
    answer:
      "El IMC es una relación entre peso y estatura para cribado poblacional, mientras que el porcentaje de grasa cuantifica específicamente la proporción de masa corporal compuesta por tejido adiposo.",
  },
  {
    question: "¿El IMC tiene el mismo significado en adultos mayores?",
    answer:
      "Las investigaciones indican que la relación entre el IMC y algunos resultados de salud puede diferir en adultos mayores, pero esto no crea una tabla oficial separada de los CDC para mayores de 65 años. Se deben considerar masa muscular, fragilidad y estado nutricional.",
  },
  {
    question: "¿A qué velocidad es recomendable modificar el peso corporal?",
    answer:
      "Una pauta habitual de planificación para el control de peso sostenible es de 0.5 a 1.0 kg (1 a 2 libras) por semana. El ritmo adecuado varía individualmente y debe consultarse con profesionales de la salud.",
  },
  {
    question: "¿Qué es el Índice Cintura-Estatura (WHtR) y por qué usarlo junto al IMC?",
    answer:
      "El Índice Cintura-Estatura evalúa la grasa abdominal visceral dividiendo la circunferencia de la cintura entre la estatura. Mantener la cintura por debajo de la mitad de la estatura (ratio < 0.50) es una valiosa medida complementaria.",
  },
  {
    question: "¿Cuáles son las cuatro fórmulas de peso ideal de referencia?",
    answer:
      "Las fórmulas clásicas de Devine (1974), Robinson (1983), Miller (1983) y Hamwi (1964) estiman pesos de referencia para adultos de más de 5 pies, utilizadas históricamente en dosificación farmacocinética.",
  },
  {
    question: "¿Qué es la fórmula de Deurenberg para la estimación de grasa corporal?",
    answer:
      "Es una ecuación de regresión estadística que estima el porcentaje de grasa corporal a partir del IMC, la edad y el sexo biológico: %Grasa = 1.20 × IMC + 0.23 × Edad - 10.8 × Sexo (Hombres=1, Mujeres=0) - 5.4.",
  },
  {
    question: "¿El IMC varía según el origen étnico?",
    answer:
      "La fórmula matemática del IMC es universal, pero algunas organizaciones clínicas sugieren umbrales de acción cardiometabólica más bajos (ej., sobrepeso ≥ 23.0, obesidad ≥ 27.5) para poblaciones de origen asiático.",
  },
  {
    question: "¿Qué es la Tasa Metabólica Basal (TMB / BMR)?",
    answer:
      "La Tasa Metabólica Basal estima las calorías basales que el organismo gasta en reposo absoluto para sostener funciones vitales como la respiración y la circulación.",
  },
  {
    question: "¿Cómo se relaciona el Gasto Energético Total (TDEE) con el control del IMC?",
    answer:
      "El TDEE incorpora la actividad física a la TMB. Mantener un balance energético en el nivel del TDEE estabiliza el peso corporal, mientras que un déficit calórico respecto al TDEE promueve la pérdida de peso.",
  },
  {
    question: "¿Pueden las mujeres embarazadas utilizar calculadoras de IMC estándar?",
    answer:
      "El IMC puede calcularse durante el embarazo, pero las categorías estándar de adultos no constituyen una guía autónoma para la ganancia de peso gestacional. La atención prenatal se guía por el IMC previo al embarazo y pautas específicas de obstetricia.",
  },
  {
    question: "¿Con qué frecuencia se debe verificar el IMC?",
    answer:
      "Comprobar el IMC cada 2 a 4 semanas ofrece una evaluación clara de las tendencias de peso a largo plazo sin interferencia de las fluctuaciones diarias de líquidos y glucógeno.",
  },
];

export function SpanishBmiContent() {
  return (
    <article className="space-y-12 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
      {/* SECCIÓN 1: ¿QUÉ ES EL ÍNDICE DE MASA CORPORAL (IMC)? */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. ¿Qué es el Índice de Masa Corporal (IMC / BMI)?
        </h2>
        <p>
          El Índice de Masa Corporal (IMC o BMI por sus siglas en inglés) es una métrica de detección antropométrica estandarizada utilizada por organizaciones de salud pública y profesionales médicos para evaluar la masa corporal de un individuo en relación con su estatura. Formulado por primera vez en el siglo XIX por el matemático belga Lambert Adolphe Jacques Quetelet, el IMC proporciona un método accesible y no invasivo para identificar categorías de estado de peso en poblaciones amplias.
        </p>
        <p>
          El IMC sirve como una medida de cribado o detección, no como una herramienta diagnóstica definitiva. En la práctica clínica, los proveedores de salud utilizan el IMC como un marco de evaluación inicial junto con antecedentes médicos familiares, presión arterial, paneles de lípidos, niveles de glucosa en sangre, patrones dietéticos y evaluaciones de actividad física. Si bien el IMC se correlaciona de manera moderada con mediciones directas de adiposidad, no mide directamente la composición corporal ni diagnostica afecciones médicas por sí solo.
        </p>
      </section>

      {/* SECCIÓN 2: CÓMO SE CALCULA EL IMC: FÓRMULAS Y DEDUCCIONES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Cómo se calcula el IMC: Fórmulas y deducciones
        </h2>
        <p>
          El IMC expresa la relación matemática entre el peso corporal y la estatura. Debido a que la masa corporal humana escala con la altura, dividir el peso entre la estatura al cuadrado (m²) normaliza la masa a través de diferentes estaturas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Ecuación métrica estándar</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">El estándar internacional adoptado por los CDC y la OMS:</p>
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold text-sm border border-zinc-200 dark:border-zinc-800">
              IMC = Peso (kg) / [Estatura (m)]²
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <p><strong>Ejemplo:</strong> Estatura = 1.78 m (178 cm), Peso = 75 kg</p>
              <p className="font-mono">IMC = 75 / (1.78)² = 75 / 3.1684 = 23.67 kg/m²</p>
              <p className="text-emerald-700 dark:text-emerald-400 font-semibold">Clasificación: Peso saludable (Visualización: 23.7)</p>
            </div>
          </div>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2.5 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Ecuación en sistema consuetudinario de EE. UU.</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Utiliza libras y pulgadas con el factor de conversión 703:</p>
            <div className="p-3 bg-white dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold text-sm border border-zinc-200 dark:border-zinc-800">
              IMC = 703 × Peso (lbs) / [Estatura (in)]²
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
              <p><strong>Ejemplo:</strong> Estatura = 5&apos;10&quot; (70 in), Peso = 165 lbs</p>
              <p className="font-mono">IMC = (703 × 165) / (70)² = 115,995 / 4900 = 23.67 kg/m²</p>
              <p className="text-emerald-700 dark:text-emerald-400 font-semibold">Clasificación: Peso saludable (Visualización: 23.7)</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          <em>Nota sobre precisión numérica:</em> La calculadora computa los valores utilizando precisión completa en coma flotante. La determinación de categorías evalúa el IMC exacto sin redondear, mientras que los valores mostrados se redondean a un decimal para mayor claridad visual.
        </p>
      </section>

      {/* SECCIÓN 3: CATEGORÍAS DE IMC PARA ADULTOS (ESTÁNDAR CDC) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Categorías de IMC para adultos (Estándar CDC)
        </h2>
        <p>
          Para adultos mayores de 20 años, los Centros para el Control y la Prevención de Enfermedades (CDC) utilizan seis categorías de detección de peso. Estos intervalos estandarizados permiten un monitoreo poblacional uniforme:
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm my-3">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold text-[11px] border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Categoría de estado de peso (CDC)</th>
                <th className="py-3 px-4">Rango de IMC en adultos (kg/m²)</th>
                <th className="py-3 px-4">Rango de IMC Prime</th>
                <th className="py-3 px-4">Contexto de salud pública y detección</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-sky-700 dark:text-sky-400">Bajo peso</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&lt; 18.5</td>
                <td className="py-3 px-4 font-sans tabular-nums">&lt; 0.74</td>
                <td className="py-3 px-4 text-sky-900 dark:text-sky-300">Indicador de cribado para evaluación nutricional o médica adicional.</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20 font-medium">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">Peso saludable</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18.5 a &lt; 25.0</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">0.74 a &lt; 1.00</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300">Referencia estándar de base para el estado de peso en adultos.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-yellow-700 dark:text-yellow-400">Sobrepeso</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">25.0 a &lt; 30.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.00 a &lt; 1.20</td>
                <td className="py-3 px-4 text-yellow-800 dark:text-yellow-300">Indicador de masa corporal elevada en relación con la estatura.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-orange-700 dark:text-orange-400">Obesidad (Clase 1)</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">30.0 a &lt; 35.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.20 a &lt; 1.40</td>
                <td className="py-3 px-4 text-orange-800 dark:text-orange-300">Clasificación de obesidad de primer nivel para seguimiento médico.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Obesidad (Clase 2)</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">35.0 a &lt; 40.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">1.40 a &lt; 1.60</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300">Clasificación de obesidad intermedia asociada con mayor perfil de riesgo.</td>
              </tr>
              <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                <td className="py-3 px-4 font-semibold text-rose-900 dark:text-rose-300">Obesidad (Clase 3)</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&ge; 40.0</td>
                <td className="py-3 px-4 font-sans tabular-nums">&ge; 1.60</td>
                <td className="py-3 px-4 text-rose-900 dark:text-rose-300 font-semibold">Obesidad severa que justifica una evaluación clínica integral.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Los CDC utilizan las categorías de IMC como marco de detección en adultos. El IMC debe evaluarse conjuntamente con otros parámetros de salud y factores clínicos individuales, más que como una garantía diagnóstica absoluta.
        </p>
      </section>

      {/* SECCIÓN 4: IMC PARA LA EDAD EN NIÑOS Y ADOLESCENTES (2 A 19 AÑOS) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. IMC para la edad en niños y adolescentes (2 a 19 años)
        </h2>
        <p>
          En medicina pediátrica, la composición corporal cambia dinámicamente con el desarrollo físico, y los patrones de adiposidad difieren de manera marcada entre niños y niñas durante la infancia y la pubertad. En consecuencia, los números brutos de IMC no pueden compararse con los umbrales fijos de adultos. En su lugar, los CDC proporcionan <strong>percentiles de IMC para la edad y el sexo</strong> para niños y adolescentes de 2 a 19 años.
        </p>

        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 shadow-sm my-3">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 uppercase font-bold text-[11px] border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Categoría de peso pediátrico</th>
                <th className="py-3 px-4">Rango de percentil de crecimiento (CDC)</th>
                <th className="py-3 px-4">Interpretación del desarrollo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
              <tr>
                <td className="py-3 px-4 font-semibold text-sky-700 dark:text-sky-400">Bajo peso</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&lt; percentil 5</td>
                <td className="py-3 px-4">La trayectoria de peso se sitúa por debajo de las referencias de desarrollo esperadas para sus pares.</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">Peso saludable</td>
                <td className="py-3 px-4 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">Percentil 5 a &lt; 85</td>
                <td className="py-3 px-4">El peso está alineado con los parámetros típicos de crecimiento y desarrollo.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-yellow-700 dark:text-yellow-400">Sobrepeso</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">Percentil 85 a &lt; 95</td>
                <td className="py-3 px-4">El peso se ubica por encima de la mediana de crecimiento para su edad y sexo.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">Obesidad</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&ge; percentil 95</td>
                <td className="py-3 px-4">El peso para la edad excede los percentiles estándar de crecimiento pediátrico.</td>
              </tr>
              <tr className="bg-rose-50/40 dark:bg-rose-950/20">
                <td className="py-3 px-4 font-semibold text-rose-900 dark:text-rose-300">Obesidad severa</td>
                <td className="py-3 px-4 font-sans tabular-nums font-medium">&ge; 120% del percentil 95 O IMC &ge; 35 kg/m²</td>
                <td className="py-3 px-4">Definición de referencia ampliada de los CDC para la obesidad pediátrica severa.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Los percentiles indican la posición relativa del IMC de un niño respecto a una población de referencia nacional de compañeros de su misma edad y sexo. Por ejemplo, un niño de 10 años cuyo IMC se ubica en el percentil 65 tiene un IMC superior al 65% de los niños de 10 años en la muestra de referencia de los CDC.
        </p>
      </section>

      {/* SECCIÓN 5: RANGO DE PESO SALUDABLE SEGÚN LA ESTATURA */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Rango de peso saludable según la estatura
        </h2>
        <p>
          Para cualquier estatura de adulto, se puede calcular matemáticamente un intervalo de peso saludable correspondiente al rango de la categoría de Peso Saludable de los CDC (18.5 a &lt; 25.0 kg/m²):
        </p>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg text-center font-sans tabular-nums text-emerald-700 dark:text-emerald-400 font-bold text-sm max-w-lg mx-auto border border-zinc-200 dark:border-zinc-800">
          Peso Mínimo = 18.5 × [Estatura (m)]² &nbsp;|&nbsp; Peso Máximo = 24.99 × [Estatura (m)]²
        </div>
        <p>
          Por ejemplo, un adulto con una estatura de 5 pies 10 pulgadas (1.78 metros) tiene un rango de peso saludable derivado de aproximadamente <strong>129 a 174 libras</strong> (58.6 a 79.2 kg). Puede evaluar intervalos de estatura y complexión ósea utilizando nuestra{" "}
          <Link href="/calculators/healthy-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de peso saludable
          </Link>.
        </p>
      </section>

      {/* SECCIÓN 6: ÍNDICES DE NORMALIZACIÓN ANTROPOMÉTRICA */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Índices de normalización antropométrica
        </h2>
        <p>
          Para complementar la evaluación física ante proporciones corporales atípicas, los investigadores han desarrollado índices matemáticos adicionales:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">IMC Prime</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              El IMC Prime normaliza el IMC calculado contra el límite de referencia superior saludable de 25.0 kg/m²:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-950 rounded-lg text-center font-mono font-bold text-sky-700 dark:text-sky-400 text-xs border border-zinc-200 dark:border-zinc-800">
              IMC Prime = IMC / 25.0
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Un valor entre 0.74 y 0.99 representa una proporción de peso saludable, mientras que valores &ge; 1.0 indican exceso de masa respecto al límite superior de cribado.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Índice Ponderal (Índice de Corpulencia)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Divide la masa corporal entre la estatura al cubo ($m^3$) para reflejar el escalado volumétrico tridimensional:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-950 rounded-lg text-center font-mono font-bold text-indigo-700 dark:text-indigo-400 text-xs border border-zinc-200 dark:border-zinc-800">
              Índice Ponderal = Peso (kg) / [Estatura (m)]³
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Dado que el escalado cúbico se adapta al volumen tridimensional, el Índice Ponderal se comporta de manera diferente al IMC estándar para individuos en estaturas extremas (menos de 1.50 m o más de 1.88 m).
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: ESTIMACIONES DE PESO DE REFERENCIA BASADAS EN FÓRMULAS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Estimaciones de peso de referencia basadas en fórmulas
        </h2>
        <p>
          En farmacocinética clínica e investigación médica, se desarrollaron históricamente cuatro fórmulas para calcular pesos de referencia para la dosificación de medicamentos en adultos:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
          <li><strong>Fórmula de Devine (1974):</strong> Hombres = 50.0 kg + 2.3 kg por pulgada sobre 5 pies; Mujeres = 45.5 kg + 2.3 kg por pulgada sobre 5 pies.</li>
          <li><strong>Fórmula de Robinson (1983):</strong> Hombres = 52.0 kg + 1.9 kg por pulgada sobre 5 pies; Mujeres = 49.0 kg + 1.7 kg por pulgada sobre 5 pies.</li>
          <li><strong>Fórmula de Miller (1983):</strong> Hombres = 56.2 kg + 1.41 kg por pulgada sobre 5 pies; Mujeres = 53.1 kg + 1.36 kg por pulgada sobre 5 pies.</li>
          <li><strong>Fórmula de Hamwi (1964):</strong> Hombres = 48.0 kg + 2.7 kg por pulgada sobre 5 pies; Mujeres = 45.5 kg + 2.2 kg por pulgada sobre 5 pies.</li>
        </ul>
        <p>
          Estas ecuaciones representan <em>estimaciones de referencia basadas en fórmulas históricas</em> más que pesos ideales universales o garantizados. Para explorar cálculos individualizados con las cuatro fórmulas, consulte nuestra{" "}
          <Link href="/calculators/ideal-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de peso ideal
          </Link>.
        </p>
      </section>

      {/* SECCIÓN 8: % DE GRASA CORPORAL ESTIMADO, TMB Y GASTO ENERGÉTICO */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. % de grasa corporal estimado, TMB y gasto energético
        </h2>
        <p>
          Para ofrecer un contexto fisiológico más completo, la calculadora integra estimaciones secundarias:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-xs">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-sky-700 dark:text-sky-400 block font-bold text-sm">% de Grasa Corporal Estimado</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              Derivado de la ecuación de regresión estadística de Deurenberg a partir de IMC, edad y sexo. Es una estimación estadística, no una medición directa.
            </p>
            <Link href="/calculators/body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block pt-1">
              Calculadora de grasa corporal →
            </Link>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-emerald-700 dark:text-emerald-400 block font-bold text-sm">Tasa Metabólica Basal (TMB / BMR)</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              Gasto energético en reposo estimado mediante la ecuación de Mifflin-St Jeor, que representa las calorías diarias basales requeridas en reposo absoluto.
            </p>
            <Link href="/calculators/bmr-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block pt-1">
              Calculadora de TMB / BMR →
            </Link>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
            <strong className="text-purple-700 dark:text-purple-400 block font-bold text-sm">GET (TDEE) y Calorías</strong>
            <p className="text-zinc-600 dark:text-zinc-400">
              El Gasto Energético Total Diario incorpora la actividad física a la TMB. Para modelar déficit y superávit calórico, use nuestras herramientas:
            </p>
            <div className="space-y-0.5 pt-1">
              <Link href="/calculators/tdee-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block">
                Calculadora de TDEE →
              </Link>
              <Link href="/calculators/calorie-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline block">
                Calculadora de calorías →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 9: CONTEXTO DE SALUD Y CONSIDERACIONES SEGÚN EL SEXO BIOLÓGICO */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Contexto de salud y consideraciones según el sexo biológico
        </h2>
        <p>
          La fórmula matemática fundamental del IMC ($kg/m^2$) es idéntica para hombres y mujeres. La estatura y el peso total determinan la puntuación de IMC independientemente del sexo.
        </p>
        <p>
          Sin embargo, el sexo biológico desempeña un papel clave en los cálculos secundarios de composición corporal:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
          <li><strong>Requerimientos de grasa esencial:</strong> Las mujeres requieren naturalmente una mayor proporción de grasa esencial (aproximadamente 10%–13%) para funciones endocrinas y reproductivas que los hombres (2%–5%).</li>
          <li><strong>Distribución adiposa:</strong> Los hombres acumulan con mayor frecuencia tejido adiposo en compartimentos viscerales abdominales (patrón androide), mientras que las mujeres acumulan con mayor frecuencia grasa subcutánea en caderas y muslos (patrón ginoide).</li>
          <li><strong>Variables de métricas secundarias:</strong> El sexo biológico se utiliza en esta calculadora para calcular el porcentaje de grasa corporal estimado, la TMB, los pesos de referencia farmacocinéticos y los percentiles de crecimiento pediátrico.</li>
        </ul>
      </section>

      {/* SECCIÓN 10: LIMITACIONES DEL IMC Y CONTEXTO POBLACIONAL */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Limitaciones del IMC y contexto poblacional
        </h2>
        <p>
          Si bien el IMC es un instrumento de detección establecido para poblaciones, presenta limitaciones notables al evaluar individuos:
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">A. Atletas musculosos y masa magra alta</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              El IMC no distingue entre masa muscular magra y tejido adiposo, por lo que personas musculosas pueden registrar un IMC elevado sin tener exceso de grasa corporal. Militares y atletas de fuerza a menudo se benefician de mediciones por circunferencia como la{" "}
              <Link href="/calculators/army-body-fat-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de grasa corporal del ejército
              </Link>.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">B. Adultos mayores (65+ años)</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Las investigaciones en adultos mayores muestran que la relación entre el IMC y los resultados de salud puede diferir de la observada en adultos jóvenes. Reservas moderadas de peso pueden brindar protección contra la fragilidad, sarcopenia y pérdida ósea durante enfermedades agudas. No obstante, esto representa contexto epidemiológico observacional y no una clasificación separada oficial de los CDC para adultos mayores.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">C. Contexto en el embarazo</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              El IMC se puede calcular durante el embarazo, pero las categorías estándar no son una guía autónoma para la ganancia de peso recomendada durante la gestación. La atención prenatal considera el IMC previo al embarazo junto con las pautas de aumento de peso gestacional del Colegio Americano de Obstetras y Ginecólogos (ACOG) y el Instituto de Medicina (IOM).
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">D. Consideraciones de riesgo poblacionales y étnicas</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Algunas organizaciones clínicas e investigaciones utilizan umbrales de acción de IMC más bajos (ej., &ge; 23.0 kg/m² para riesgo elevado, &ge; 27.5 kg/m² para alto riesgo) en poblaciones de origen asiático debido a diferencias observadas en el porcentaje de grasa corporal y acumulación de grasa visceral con IMC más bajos. Estas consideraciones proveen contexto clínico sin alterar la fórmula matemática universal del IMC.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 11: PREGUNTAS FRECUENTES */}
      <section className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          11. Preguntas frecuentes
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          A continuación se responden 20 preguntas clínicas y educativas sobre el cálculo del IMC, percentiles pediátricos, rangos de referencia en adultos y metodologías antropométricas:
        </p>
      </section>
    </article>
  );
}

export const BmiContentEs = SpanishBmiContent;
export default SpanishBmiContent;
