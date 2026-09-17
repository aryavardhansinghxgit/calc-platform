import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const PT_AUTO_LOAN_SEO = {
  title: "Calculadora de Financiamento de Veículos | Simulação de Parcelas e Juros",
  description: "Simule o financiamento do seu carro novo ou usado: calcule o valor da parcela mensal, custo total de juros e veja a tabela de amortização completa.",
  keywords: ["calculadora financiamento veiculo", "simulador financiamento auto", "parcela financiamento carro", "juros financiamento auto"],
};

export const PT_AUTO_LOAN_FAQS: CalculatorFAQ[] = [
  {
    question: "Como é calculado o valor da parcela do financiamento de veículo?",
    answer:
      "A parcela é calculada pela Tabela Price / sistema de amortização francês a partir do valor financiado, taxa de juros mensal e prazo contratado.",
  },
  {
    question: "Qual o valor ideal de entrada para financiar um carro?",
    answer:
      "Recomenda-se dar pelo menos 20% do valor do veículo como entrada para baratear os juros e mitigar o impacto da depreciação inicial.",
  },
];

export function PtAutoLoanContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introdução ao Financiamento de Veículos
        </h2>
        <p>
          O crédito para aquisição de automóveis permite diluir o pagamento do veículo em parcelas fixas mensais mediante incidência de juros contratuais.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Fórmula da Parcela
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Parcela Mensal:</strong> P_mensal = P × [r(1 + r)^n] / [(1 + r)^n − 1]</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Resumo
        </h2>
        <p>
          Priorize prazos de até 48 meses para evitar que a dívida acumulada supere o valor de revenda do veículo no mercado.
        </p>
      </section>
    </article>
  );
}
