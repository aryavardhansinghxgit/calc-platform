import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const PORTUGUESE_PERCENTAGE_SEO = {
  title: "Calculadora de Porcentagem",
  description:
    "Calcule porcentagens, equações de 3 variáveis, variação percentual, aumentos, descontos e proporções matemáticas.",
  category: "Matemática",
  keywords: [
    "calculadora de porcentagem",
    "porcentagem",
    "calcular porcentagem",
    "diferença percentual",
    "variação percentual",
    "desconto",
  ],
};

export const PORTUGUESE_PERCENTAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "O que é uma porcentagem e como ela é calculada?",
    answer:
      "Uma porcentagem é uma razão adimensional expressa como uma fração de 100. É calculada dividindo a parte pelo todo e multiplicando por 100: Porcentagem = (Parte / Todo) × 100.",
  },
  {
    question: "Como calcular qual porcentagem um número representa em relação a outro?",
    answer:
      "Para determinar qual porcentagem A representa de B, divida A por B e multiplique por 100: P = (A / B) × 100. Por exemplo, 8 em relação a 2 é 400%. Se B for 0, a operação é indefinida.",
  },
  {
    question: "Qual é a diferença entre variação percentual e diferença percentual?",
    answer:
      "A variação percentual é direcional e compara um valor final com um valor inicial base: ((V2 - V1) / V1) × 100. A diferença percentual é simétrica e compara dois valores em relação à média aritmética deles.",
  },
  {
    question: "Como calcular um aumento ou desconto percentual?",
    answer:
      "Para um aumento de P%, multiplique o valor inicial por (1 + P / 100). Para um desconto de P%, multiplique por (1 - P / 100). Por exemplo, 100 com 10% de desconto resulta em 100 × 0,90 = 90.",
  },
  {
    question: "Por que uma porcentagem é indefinida quando a base é zero?",
    answer:
      "Na matemática, a divisão por zero não é definida. Como a base atua como denominador, não existe número real que satisfaça a equação.",
  },
];

export function PortuguesePercentageContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          O que é uma porcentagem?
        </h2>
        <p>
          Na matemática, uma porcentagem é uma razão adimensional expressa como uma fração de 100. Ela fornece um método padronizado para comparar proporções relativas em relação a uma base fixa. Originada do latim <em>per centum</em> (&quot;por cento&quot;), a porcentagem é indispensável em finanças, estatística e ciências.
        </p>
        <p>
          Qualquer porcentagem pode ser convertida em número decimal dividindo por 100 ou em fração simplificada. Por exemplo, 35% equivale ao decimal 0,35 e à fração 7/20.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Fórmula fundamental da porcentagem
        </h2>
        <p>
          A relação matemática fundamental conecta três variáveis principais pela equação:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P × V<sub>1</sub> = V<sub>2</sub>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 font-sans tabular-nums text-xs">
          <li><strong>Calcular a parte (V<sub>2</sub>):</strong> V<sub>2</sub> = (P / 100) × V<sub>1</sub></li>
          <li><strong>Calcular a taxa percentual (P%):</strong> P = (V<sub>2</sub> / V<sub>1</sub>) × 100%</li>
          <li><strong>Calcular a base (V<sub>1</sub>):</strong> V<sub>1</sub> = V<sub>2</sub> / (P / 100)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Diferença percentual vs. Variação percentual
        </h2>
        <p>
          A <strong>diferença percentual</strong> mede a variação simétrica entre dois números dividida pela média aritmética deles:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Diferença = (|V<sub>1</sub> - V<sub>2</sub>| / ((V<sub>1</sub> + V<sub>2</sub>) / 2)) × 100%
        </div>
        <p>
          A <strong>variação percentual</strong> mede a evolução direcional de um valor inicial V<sub>1</sub> para um valor final V<sub>2</sub>:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded font-sans tabular-nums font-semibold text-center text-xs">
          Variação = ((V<sub>2</sub> - V<sub>1</sub>) / V<sub>1</sub>) × 100%
        </div>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Tabela de conversão de porcentagens frequentes
        </h2>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded max-w-xl">
          <table className="w-full text-xs text-left border-collapse font-sans tabular-nums">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Fração</th>
                <th className="p-2 border-r border-slate-300 dark:border-slate-700">Decimal</th>
                <th className="p-2">Porcentagem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/2</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,5</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">50%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,25</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">25%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/5</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,2</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">20%</td></tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30"><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">1/10</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,1</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">10%</td></tr>
              <tr><td className="p-2 border-r border-slate-200 dark:border-slate-800 font-bold">3/4</td><td className="p-2 border-r border-slate-200 dark:border-slate-800">0,75</td><td className="p-2 font-bold text-blue-600 dark:text-blue-400">75%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Resumo Educacional</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          As porcentagens são ferramentas indispensáveis para compreender taxas relativas, acréscimos comerciais e proporções com rigor matemático.
        </p>
      </section>
    </article>
  );
}
