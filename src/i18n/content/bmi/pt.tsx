import React from "react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const PORTUGUESE_BMI_SEO = {
  title: "Calculadora de IMC (Índice de Massa Corporal)",
  description:
    "Calcule seu Índice de Massa Corporal (IMC), faixa de peso saudável, percentis infantis e taxa metabólica basal conforme a OMS e o CDC.",
  category: "Saúde",
  keywords: [
    "calculadora de imc",
    "indice de massa corporal",
    "peso ideal",
    "tabela de imc",
    "imc infantil",
    "sobrepeso",
    "obesidade",
  ],
};

export const PORTUGUESE_BMI_FAQS: CalculatorFAQ[] = [
  {
    question: "O que é o Índice de Massa Corporal (IMC) e como ele é calculado?",
    answer:
      "O Índice de Massa Corporal (IMC) é uma métrica antropométrica internacional que relaciona o peso à altura: IMC = Peso (kg) / [Altura (m)]².",
  },
  {
    question: "Quais são as faixas de IMC para adultos segundo a OMS?",
    answer:
      "Para adultos: Abaixo do peso (< 18,5), Peso saudável (18,5 a < 25,0), Sobrepeso (25,0 a < 30,0), Obesidade Grau 1 (30,0 a < 35,0), Obesidade Grau 2 (35,0 a < 40,0) e Obesidade Grau 3 (≥ 40,0 kg/m²).",
  },
  {
    question: "Por que o IMC utiliza percentis em crianças e adolescentes?",
    answer:
      "A composição corporal na infância e adolescência (2 a 19 anos) varia com o desenvolvimento físico e o sexo biológico, exigindo tabelas de percentis específicas.",
  },
  {
    question: "Quais são as limitações clínicas do IMC?",
    answer:
      "O IMC não distingue a massa muscular magra do tecido adiposo gorduroso. Atletas e pessoas musculosas podem ter um IMC elevado sem excesso de gordura.",
  },
  {
    question: "O IMC é um diagnóstico médico conclusivo?",
    answer:
      "Não, o IMC é um instrumento de triagem preliminar e não substitui uma avaliação médica individualizada completa.",
  },
];

export function PortugueseBmiContent() {
  return (
    <article className="space-y-10 text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs sm:text-sm font-sans pt-4">
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          1. O que é o Índice de Massa Corporal (IMC)?
        </h2>
        <p>
          O Índice de Massa Corporal (IMC) é uma ferramenta antropométrica padronizada utilizada por organizações de saúde mundiais para estimar o estado ponderal em relação à estatura.
        </p>
        <p>
          Ele serve como parâmetro de triagem populacional e não como diagnóstico médico conclusivo isolado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          2. Fórmula de Cálculo do IMC
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 max-w-md">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Fórmula Métrica Padrão</h3>
          <div className="p-2.5 bg-white dark:bg-slate-950 rounded text-center font-bold text-blue-600 dark:text-blue-400 text-xs border border-slate-200 dark:border-slate-800">
            IMC = Peso (kg) / [Altura (m)]²
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          3. Categorias de IMC para Adultos (Padrão OMS)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs my-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Categoria</th>
                <th className="py-2.5 px-3">Intervalo de IMC (kg/m²)</th>
                <th className="py-2.5 px-3">Contexto Clínico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              <tr><td className="py-2.5 px-3 text-sky-700 dark:text-sky-400 font-bold">Abaixo do peso</td><td className="py-2.5 px-3 font-sans tabular-nums">&lt; 18,5</td><td className="py-2.5 px-3">Recomenda-se avaliação nutricional.</td></tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-950/20"><td className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-bold">Peso saudável</td><td className="py-2.5 px-3 font-sans tabular-nums font-bold text-emerald-800 dark:text-emerald-300">18,5 a &lt; 25,0</td><td className="py-2.5 px-3">Faixa de referência populacional.</td></tr>
              <tr><td className="py-2.5 px-3 text-yellow-700 dark:text-yellow-400 font-bold">Sobrepeso</td><td className="py-2.5 px-3 font-sans tabular-nums">25,0 a &lt; 30,0</td><td className="py-2.5 px-3">Acompanhamento preventivo indicado.</td></tr>
              <tr><td className="py-2.5 px-3 text-orange-700 dark:text-orange-400 font-bold">Obesidade (Grau 1)</td><td className="py-2.5 px-3 font-sans tabular-nums">30,0 a &lt; 35,0</td><td className="py-2.5 px-3">Risco moderado.</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-700 dark:text-rose-400 font-bold">Obesidade (Grau 2)</td><td className="py-2.5 px-3 font-sans tabular-nums">35,0 a &lt; 40,0</td><td className="py-2.5 px-3">Risco elevado.</td></tr>
              <tr><td className="py-2.5 px-3 text-rose-900 dark:text-rose-300 font-bold">Obesidade (Grau 3)</td><td className="py-2.5 px-3 font-sans tabular-nums">&ge; 40,0</td><td className="py-2.5 px-3">Obesidade severa.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h3 className="text-base font-bold text-blue-950 dark:text-blue-200">Aviso de Saúde</h3>
        <p className="text-xs text-blue-900 dark:text-blue-300">
          Esta ferramenta possui propósito exclusivamente educacional e informativo, não constituindo consulta ou diagnóstico médico.
        </p>
      </section>
    </article>
  );
}
