import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const PT_CONCRETE_SEO = {
  title: "Calculadora de Concreto | Calcular Metros e Jardas Cúbicas de Concreto",
  description: "Calcule com precisão o volume de concreto para lajes, sapatas, pilares e escadas. Obtenha metros cúbicos, sacos necessários e margem de perda.",
  keywords: ["calculadora de concreto", "calcular metros cubicos de concreto", "concreto para laje", "quantidade de sacos concreto", "calculo volume concreto"],
};

export const PT_CONCRETE_FAQS: CalculatorFAQ[] = [
  {
    question: "Como calcular o volume de concreto para uma laje?",
    answer:
      "Multiplique o comprimento pela largura e pela espessura em metros: Comprimento (m) × Largura (m) × Espessura (m) = Volume em m³.",
  },
  {
    question: "Quanto de margem de perda adicionar ao concreto usinado?",
    answer:
      "Recomenda-se adicionar entre 5% e 10% para compensar desníveis de escavação, deformação de formas e perdas durante a concretagem.",
  },
];

export function PtConcreteContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introdução ao Dimensionamento de Concreto
        </h2>
        <p>
          O cálculo volumétrico rigoroso de concreto é indispensável na construção civil para evitar juntas frias e desperdício de materiais em fundações e lajes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Fórmulas de Cálculo
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Laje Retangular:</strong> V = Comprimento × Largura × Espessura</p>
          <p><strong>Pilar Redondo:</strong> V = π × (Raio)² × Altura</p>
          <p><strong>Volume Total:</strong> V_total = V_nominal × (1 + %perda / 100)</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Resumo
        </h2>
        <p>
          Verifique as medidas das formas e adicione sempre de 5 a 10% de folga técnica ao solicitar concreto usinado.
        </p>
      </section>
    </article>
  );
}
