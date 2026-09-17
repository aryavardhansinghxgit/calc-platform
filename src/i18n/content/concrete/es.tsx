import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const ES_CONCRETE_SEO = {
  title: "Calculadora de Hormigón | Calcular Metros y Yardas Cúbicas de Hormigón",
  description: "Calcula con precisión el volumen de hormigón para losas, zapatas, columnas, muros y escaleras. Obtén metros cúbicos, sacos necesarios y estimación con margen de merma.",
  keywords: ["calculadora de hormigon", "calcular metros cubicos de hormigon", "calcular sacos de hormigon", "hormigon para losa", "calculo de volumen hormigon"],
};

export const ES_CONCRETE_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Cómo se calcula la cantidad de hormigón necesaria para una losa?",
    answer:
      "Se calcula multiplicando la longitud por la anchura y por el espesor (todos en la misma unidad de medida, como metros o pies). Para obtener el volumen en metros cúbicos: Largo (m) × Ancho (m) × Espesor (m). En unidades imperiales, se divide el volumen en pies cúbicos entre 27 para obtener yardas cúbicas.",
  },
  {
    question: "¿Cuánto margen de desperdicio o merma se debe añadir al pedir hormigón?",
    answer:
      "Se recomienda habitualmente añadir entre un 5% y un 10% adicional para compensar irregularidades del terreno, deformación del encofrado, derrame durante el vertido y compactación.",
  },
  {
    question: "¿Cuántos sacos de hormigón premezclado equivalen a un metro o yarda cúbica?",
    answer:
      "Una yarda cúbica equivale a aproximadamente 45 sacos de 80 libras (36 kg) o 60 sacos de 60 libras (27 kg). Un metro cúbico equivale a aproximadamente 1,308 yardas cúbicas (~59 sacos de 80 lb).",
  },
  {
    question: "¿Qué espesor estándar debe tener una losa de hormigón?",
    answer:
      "Para aceras y patios peatonales, un espesor de 10 cm (4 pulgadas) es habitual. Para entradas de vehículos residenciales ligeros se recomiendan 12,5 a 15 cm (5 a 6 pulgadas) con refuerzo de malla o varilla.",
  },
];

export function EsConcreteContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introducción al Cálculo de Hormigón y Mezclas Estructurales
        </h2>
        <p>
          El cálculo exacto del volumen de hormigón es crucial en obras de construcción civil, reformas residenciales y pavimentación. El hormigón es un material compuesto por aglomerante (cemento Portland), agregados finos (arena), agregados gruesos (grava) y agua. Ordenar una cantidad insuficiente provoca juntas frías estructuralmente débiles, mientras que un exceso genera sobrecostes y residuos no reciclables.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Fundamentos Geométricos del Volumen
        </h2>
        <p>
          El cálculo del volumen depende de la geometría del elemento constructivo:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Prismas rectangulares (Losas, zapatas, muros):</strong> Volumen = Longitud × Anchura × Espesor.</li>
          <li><strong>Cilindros circulares (Columnas, pilotes Sonotube):</strong> Volumen = π × (Diámetro / 2)² × Altura.</li>
          <li><strong>Cilindros huecos (Tubos, anillos de pozo):</strong> Volumen = π × [(Diámetro_Exterior/2)² − (Diámetro_Interior/2)²] × Altura.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Fórmulas de Conversión de Unidades
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Yardas Cúbicas:</strong> yd³ = [Largo (pies) × Ancho (pies) × Espesor (pulgadas / 12)] / 27</p>
          <p><strong>Metros Cúbicos:</strong> m³ = Largo (m) × Ancho (m) × Espesor (m)</p>
          <p><strong>Factor de Conversión:</strong> 1 m³ ≈ 1,30795 yd³ | 1 yd³ ≈ 0,764555 m³</p>
          <p><strong>Volumen con Merma:</strong> Volumen_Total = Volumen_Teórico × (1 + %Desperdicio / 100)</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Ejemplos Prácticos de Obra
        </h2>
        <div className="space-y-4">
          <div className="border border-slate-200 dark:border-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-900 dark:text-white">Ejemplo: Losa para terraza de 6 m × 4 m con 10 cm de espesor</h3>
            <p className="text-sm mt-1">
              <strong>Cálculo:</strong> 6,0 m × 4,0 m × 0,10 m = 2,40 m³.<br />
              <strong>Con 10% de merma:</strong> 2,40 × 1,10 = <strong>2,64 m³</strong>.<br />
              <strong>Equivalencia en sacos (25 kg):</strong> ~145 sacos premezclados o pedir camión hormigonera de 3 m³.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Errores Frecuentes
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Mezclar unidades (por ejemplo, multiplicar pies por pulgadas sin dividir entre 12).</li>
          <li>No contemplar la flecha o deformación del encofrado bajo el peso del hormigón fresco.</li>
          <li>Olvidar el margen de seguridad del 5-10% por irregularidades de la excavación.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. Resumen Técnico
        </h2>
        <p>
          Calcule siempre las dimensiones netas con precisión milimétrica o en fracciones de pie, añada el margen de merma adecuado al método de vertido y planifique la logística de colocación y curado del hormigón.
        </p>
      </section>
    </article>
  );
}
