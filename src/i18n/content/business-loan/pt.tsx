"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Scale,
  Calculator,
} from "lucide-react";
import { CalculatorLocalizedContent, FAQItem } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "O que é uma calculadora de empréstimo empresarial?",
    "answer": "Uma calculadora de empréstimo comercial estima o custo de quitação do crédito para pessoas jurídicas com base no valor financiado, taxa de juros, prazo e taxas administrativas."
  },
  {
    "question": "Como é calculada a parcela de um empréstimo comercial?",
    "answer": "Para financiamentos com amortização constante aplica-se a fórmula de anuidade: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], onde r é a taxa mensal e n o número de parcelas."
  },
  {
    "question": "Quanto pagarei de juros em um empréstimo empresarial?",
    "answer": "O total de juros equivale à soma de todas as parcelas programadas menos o valor principal contratado."
  },
  {
    "question": "As taxas de abertura e documentação fazem diferença?",
    "answer": "Sim. As taxas iniciais reduzem o valor líquido creditado e elevam o Custo Efetivo Total (CET / APR atuarial)."
  },
  {
    "question": "Qual é a diferença entre taxa nominal e taxa efetiva (APR/CET)?",
    "answer": "A taxa nominal incide sobre o saldo devedor, enquanto a taxa efetiva real incorpora todas as tarifas iniciais através do cálculo de Taxa Interna de Retorno (TIR)."
  },
  {
    "question": "O APR de um empréstimo empresarial é igual ao de pessoa física?",
    "answer": "Nem sempre. O crédito comercial costuma ter regras específicas de mercado; o APR do simulador representa uma métrica atuarial de comparação de custos."
  },
  {
    "question": "O que é o índice DSCR em um financiamento empresarial?",
    "answer": "O DSCR (Índice de Cobertura do Serviço da Dívida) afere a capacidade do lucro operacional líquido (NOI) cobrir as parcelas da dívida : DSCR = NOI / Serviço Anual da Dívida."
  },
  {
    "question": "É exigido um DSCR mínimo de 1,25x para todo empréstimo comercial?",
    "answer": "Não. Embora 1,25x seja uma referência clássica na análise de risco bancário, cada instituição financeira define seus critérios próprios."
  },
  {
    "question": "O que é um empréstimo SBA 7(a)?",
    "answer": "É o principal programa de crédito da SBA (até US$ 5 milhões) para capital de giro, compra de máquinas, imóveis, aquisições e refinanciamento de dívidas."
  },
  {
    "question": "O que é um financiamento SBA 504?",
    "answer": "É uma linha de longo prazo com taxa fixa (até US$ 5,5 milhões) para aquisição de imóveis comerciais e maquinário pesado via CDCs."
  },
  {
    "question": "O que é um microcrédito SBA?",
    "answer": "São empréstimos de até US$ 50.000 operados por instituições intermediárias para microempresas e necessidades imediatas de caixa."
  },
  {
    "question": "A SBA garante 100% do empréstimo?",
    "answer": "Não. A SBA garante normalmente entre 75% e 85% do valor, cabendo ao banco o risco da fração restante."
  },
  {
    "question": "Posso utilizar um empréstimo empresarial para capital de giro?",
    "answer": "Sim, a maior parte das linhas de crédito permite financiar estoques, fluxo de caixa e custos operacionais."
  },
  {
    "question": "Um prazo mais longo reduz o total de juros pagos?",
    "answer": "Não. Prazos mais longos reduzem o valor da parcela mensal, mas aumentam significativamente os juros acumulados ao longo do contrato."
  },
  {
    "question": "Os juros do empréstimo empresarial são dedutíveis de impostos?",
    "answer": "Em regra, os juros de dívidas operacionais são dedutíveis na apuração do lucro tributável da empresa, segundo as normas fiscais aplicáveis."
  }
];

export const seo = {
  title: "Calculadora de Empréstimo Empresarial — Parcelas, Juros, Taxas, CET e Análise Comercial",
  description: "Calcule parcelas mensais de empréstimos empresariais, juros totais, taxas de originação, CET/APR atuarial real, opções SBA e cobertura DSCR.",
  keywords: ["calculadora de emprestimo empresarial","emprestimo comercial","calculadora emprestimo sba","cet emprestimo empresa","dscr empresarial"]
};

export const ContentComponent: React.FC = () => {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: faqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. O que é uma Calculadora de Empréstimo Empresarial?
          </h2>
          <p>
            Um financiamento empresarial pode parecer atraente quando se analisa apenas a taxa de juros nominal anunciada. Contudo, o custo real varia consideravelmente em função do prazo de pagamento, tarifas de abertura e despesas de documentação.
          </p>
          <p>
            Esta calculadora integra todos os parâmetros essenciais : cálculo da parcela mensal, juros acumulados, tarifas de estruturação, cronograma de amortização, opções SBA e análise de capacidade de pagamento (DSCR).
          </p>
          <p>
            Os valores calculados representam simulações financeiras para planejamento. As condições definitivas dependem da análise de crédito da instituição financeira.
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. O que é um Empréstimo Comercial ou Empresarial?
          </h2>
          <p>
            Um empréstimo empresarial é um financiamento destinado a investimentos do negócio como capital de giro, compra de equipamentos, estoque, reformas, imóveis ou consolidação de dívidas.
          </p>
          <p>
            Apresenta-se sob várias modalidades : empréstimos com parcelas fixas, linhas de crédito rotativas ou financiamentos com garantia pública como o programa SBA 7(a).
          </p>
          <p>
            A estrutura contratual é fundamental, pois dois empréstimos com a mesma taxa nominal podem apresentar custos financeiros totais muito distintos dependendo das tarifas aplicadas.
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Como se Calcula a Parcela de um Empréstimo Empresarial
          </h2>
          <p>
            Para empréstimos totalmente amortizáveis com pagamentos periódicos constantes, adota-se a fórmula padrão de anuidades :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Onde : P = principal financiado, r = taxa de juros mensal (taxa anual / 12), n = número de parcelas mensais, PMT = valor da parcela fixa.
          </p>
          <p>
            O prazo de amortização é decisivo : prazos mais longos reduzem o desembolso mensal, mas aumentam o volume total de juros pagos.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              Exemplo Prático : Financiamento de US$ 10.000 a 10% em 5 Anos (60 Parcelas)
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              <li>Parcela Mensal Fixa (PMT) : US$ 212,47 por mês</li>
              <li>Total das Parcelas (60 meses) : 60 × US$ 212,47 = US$ 12.748,23</li>
              <li>Principal Amortizado : US$ 10.000,00</li>
              <li>Total de Juros Pagos : US$ 2.748,23</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. O Custo Total Vai Além dos Juros : Tarifas Comerciais
          </h2>
          <p>
            No crédito comercial é indispensável separar a despesa com juros do custo global do financiamento (taxas de abertura, análise documental e estruturação).
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Componente do Custo"}</th>
                  <th className="p-2.5 border-b text-right">{"Valor ($)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 ">{"Valor Principal Financiado"}</td>
                  <td className="p-2.5 text-right ">{"US$ 10.000,00"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Total de Juros Pagos"}</td>
                  <td className="p-2.5 text-right text-rose-600">{"US$ 2.748,23"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Taxa de Originação (5,0%)"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"US$ 500,00"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Taxa de Documentação e Cadastro"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"US$ 750,00"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Outras Despesas Iniciais"}</td>
                  <td className="p-2.5 text-right ">{"US$ 0,00"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Total de Tarifas Bancárias :"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"US$ 1.250,00"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Custo Financeiro Total (Juros + Taxas) :"}</td>
                  <td className="p-2.5 text-right text-indigo-600">{"US$ 3.998,23"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Assim, mesmo com juros nominais de 10%, o financiamento gera US$ 3.998,23 em custos totais, comprovando a importância de avaliar todas as tarifas.
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Taxa Efetiva Real : Taxa Nominal vs Custo Atuarial (CET/APR)
          </h2>
          <p>
            Na análise de crédito para empresas distinguem-se duas grandezas :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Taxa de Juros Nominal (10,00%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Taxa contratada aplicada periodicamente sobre o saldo devedor remanescente.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Taxa Efetiva Atuarial / TIR (15,933%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Taxa Interna de Retorno (TIR) calculada sobre os recursos líquidos recebidos (US$ 8.750) e os 60 pagamentos de US$ 212,47.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Essa taxa difere de aproximações lineares (12,50%) por considerar o valor do dinheiro no tempo.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Utilize esse indicador para comparar propostas de diferentes instituições bancárias de forma objetiva.
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Funcionamento da Tabela de Amortização Comercial
          </h2>
          <p>
            O quadro de amortização discrimina mensalmente a parcela entre juros e amortização do saldo devedor :
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Período"}</th>
                  <th className="p-2.5 border-b">{"Saldo Inicial"}</th>
                  <th className="p-2.5 border-b text-rose-600">{"Juros"}</th>
                  <th className="p-2.5 border-b text-emerald-600">{"Amortização Principal"}</th>
                  <th className="p-2.5 border-b">{"Saldo Final"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mês 1"}</td>
                  <td className="p-2.5">{"US$ 10.000,00"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"US$ 83,33"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"US$ 129,14"}</td>
                  <td className="p-2.5 font-bold ">{"US$ 9.870,86"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mês 2"}</td>
                  <td className="p-2.5">{"US$ 9.870,86"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"US$ 82,26"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"US$ 130,21"}</td>
                  <td className="p-2.5 font-bold ">{"US$ 9.740,65"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mês 3"}</td>
                  <td className="p-2.5">{"US$ 9.740,65"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"US$ 81,17"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"US$ 131,30"}</td>
                  <td className="p-2.5 font-bold ">{"US$ 9.609,35"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Mês 60 (Final)"}</td>
                  <td className="p-2.5">{"US$ 210,71"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"US$ 1,76"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"US$ 210,71"}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{"US$ 0,00"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            No último mês, o saldo devedor é integralmente liquidado para US$ 0,00.
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Prazo Curto vs Prazo Longo no Crédito Empresarial
          </h2>
          <p>
            A escolha do prazo equilibra liquidez imediata e custo total :
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Prazo mais curto : Parcela mensal maior + menor custo acumulado de juros.</li>
            <li>Prazo mais longo : Parcela mensal menor + maior encargo total de juros.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Defina o prazo de acordo com a geração de caixa operacional da empresa e o retorno do investimento.
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. O que é o Índice de Cobertura do Serviço da Dívida (DSCR)?
          </h2>
          <p>
            O DSCR afere se o resultado operacional líquido suporta as obrigações anuais com empréstimos :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            DSCR = Lucro Operacional Líquido (NOI) / Serviço Anual da Dívida
          </div>
          <p>
            Exemplo : Para um NOI de US$ 150.000, dívida atual de US$ 30.000/ano e nova dívida de US$ 25.000/ano :
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            <p>Serviço Anual Total da Dívida : US$ 30.000 + US$ 25.000 = US$ 55.000,00/ano</p>
            <p>DSCR Calculado : US$ 150.000 / US$ 55.000 = 2,73x (Excelente Cobertura)</p>
            <p>Capacidade Máxima de Dívida (limite 1,25x) : US$ 150.000 / 1,25 = US$ 120.000,00/ano</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Um DSCR a partir de 1,25x é considerado saudável pelos comitês de crédito.
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Modalidades de Empréstimos SBA (7(a), CDC/504 e Microcréditos)
          </h2>
          <p>
            A Small Business Administration oferece garantias governamentais para viabilizar o crédito a pequenas e médias empresas :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"Programa SBA 7(a)"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Linha principal até US$ 5M para capital de giro, compra de equipamentos, imóveis e aquisições."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 504 Imobiliário"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Crédito a longo prazo com taxa fixa até US$ 5,5M para imóveis e maquinário pesado via CDCs."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"Microcréditos SBA"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Financiamentos até US$ 50.000 para pequenos empreendedores via instituições parceiras."}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            As garantias governamentais possuem taxas próprias que devem ser previstas no orçamento.
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Erros Comuns no Cálculo de Financiamentos para Empresas
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Comparar somente as taxas nominais sem calcular o impacto das taxas de abertura e cadastro.</li>
            <li>Optar por prazos muito longos sem calcular o montante adicional de juros pagos.</li>
            <li>Supor que as regras de crédito a pessoas físicas se aplicam integralmente a contratos empresariais.</li>
            <li>Considerar que ter DSCR de 1,25x garante aprovação automática do crédito.</li>
            <li>Desconsiderar a legislação tributária local quanto aos limites de dedução de despesas financeiras.</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Calculadoras Financeiras e Empresariais Relacionadas
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Consulte outras ferramentas financeiras para a gestão da sua empresa :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de Empréstimos"}</span>
              <span className="text-slate-500 text-[11px]">{"Simulação de amortização geral."}</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Empréstimo Pessoal"}</span>
              <span className="text-slate-500 text-[11px]">{"Comparação com linhas para pessoa física."}</span>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de Hipoteca"}</span>
              <span className="text-slate-500 text-[11px]">{"Financiamento de imóveis comerciais."}</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de ROI"}</span>
              <span className="text-slate-500 text-[11px]">{"Retorno sobre investimentos da empresa."}</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Prazo de Retorno"}</span>
              <span className="text-slate-500 text-[11px]">{"Tempo de recuperação do capital investido."}</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de Margem"}</span>
              <span className="text-slate-500 text-[11px]">{"Cálculo de margem de lucro e markup."}</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Juros Compostos"}</span>
              <span className="text-slate-500 text-[11px]">{"Projeção de investimentos de caixa."}</span>
            </Link>
            <Link
              href="/calculators/auto-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Financiamento de Veículos"}</span>
              <span className="text-slate-500 text-[11px]">{"Crédito para frotas comerciais."}</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "pt",
  calculatorSlug: "business-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
