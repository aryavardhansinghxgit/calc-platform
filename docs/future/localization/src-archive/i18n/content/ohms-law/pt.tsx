import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const PT_OHMS_LAW_SEO = {
  title: "Calculadora da Lei de Ohm | Tensão, Corrente, Resistência e Potência",
  description: "Calcule tensão (V), corrente (I), resistência (R) e potência elétrica (P / Watts) com a Lei de Ohm e a Lei de Joule. Inclui divisor de tensão e resistor LED.",
  keywords: ["calculadora lei de ohm", "calcular tensao corrente resistencia", "formula lei de ohm", "potencia eletrica watts", "divisor de tensao"],
};

export const PT_OHMS_LAW_FAQS: CalculatorFAQ[] = [
  {
    question: "O que diz a Lei de Ohm?",
    answer:
      "A Lei de Ohm estabelece que a corrente elétrica (I) que percorre um condutor é diretamente proporcional à tensão (V) e inversamente proporcional à resistência (R): V = I × R.",
  },
  {
    question: "Como calcular a potência elétrica?",
    answer:
      "A potência elétrica em Watts é obtida pelas fórmulas P = V × I = R × I² = V² / R.",
  },
];

export function PtOhmsLawContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introdução à Lei de Ohm
        </h2>
        <p>
          Formulada por Georg Simon Ohm, esta lei é o pilar fundamental da engenharia elétrica e eletrônica para circuitos de corrente contínua e alternada.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Fórmulas Principais
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Tensão (V):</strong> V = I × R</p>
          <p><strong>Corrente (I):</strong> I = V / R</p>
          <p><strong>Resistência (R):</strong> R = V / I</p>
          <p><strong>Potência (P):</strong> P = V × I</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Resumo
        </h2>
        <p>
          Utilize as equações da Lei de Ohm para dimensionar condutores, disjuntores e fontes de alimentação com total segurança.
        </p>
      </section>
    </article>
  );
}
