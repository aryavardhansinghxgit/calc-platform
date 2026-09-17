import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const PORTUGUESE_SCIENTIFIC_SEO = {
  title: "Calculadora Científica Online",
  description:
    "Calculadora científica avançada para trigonometria, logaritmos, potências, raízes n-ésimas, combinatória e estatística com alta precisão.",
  category: "Matemática",
  keywords: [
    "calculadora cientifica",
    "trigonometria",
    "logaritmos",
    "potencias e raizes",
    "combinatoria",
    "estatistica",
  ],
};

export const PORTUGUESE_SCIENTIFIC_FAQS: CalculatorFAQ[] = [
  {
    question: "Quais funções estão disponíveis nesta calculadora científica?",
    answer:
      "Ela inclui funções trigonométricas (sen, cos, tan), logaritmos (ln, log₁₀, log₂), raízes, potências, fatoriais, permutações (nPr), combinações (nCr), MDC, MMC e cálculos estatísticos.",
  },
  {
    question: "Como alternar entre graus (Deg) e radianos (Rad)?",
    answer:
      "Selecione o botão de modo angular (Deg / Rad / Grad) localizado acima do teclado numérico.",
  },
  {
    question: "Qual precisão matemática o motor utiliza?",
    answer:
      "O motor executa cálculos com precisão de ponto flutuante IEEE 754 de 64 bits e algoritmo Shunting-Yard.",
  },
  {
    question: "Como calcular logaritmos em bases arbitrárias?",
    answer:
      "Use a relação log_b(a) = ln(a) / ln(b) ou insira a função com dois argumentos log(x, base).",
  },
  {
    question: "Por que ocorre um erro de domínio em certas operações?",
    answer:
      "Raízes pares de números negativos e logaritmos de valores menores ou iguais a zero não são definidos no conjunto dos números reais.",
  },
];

export function PortugueseScientificContent() {
  return (
    <article className="space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          O que é uma calculadora científica?
        </h2>
        <p>
          Uma calculadora científica é uma ferramenta avançada projetada para solucionar equações complexas de engenharia, física e matemática aplicada.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Modos angulares
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Graus (Deg):</strong> Uma volta completa equivale a 360°.</li>
          <li><strong>Radianos (Rad):</strong> Unidade padrão do SI onde uma volta equivale a 2π radianos.</li>
          <li><strong>Gradianos (Grad):</strong> Sistema onde uma volta equivale a 400 grados.</li>
        </ul>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Resumo Educacional</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          O cálculo científico rigoroso permite analisar fenômenos da natureza e estruturas de engenharia com confiabilidade matemática.
        </p>
      </section>
    </article>
  );
}
