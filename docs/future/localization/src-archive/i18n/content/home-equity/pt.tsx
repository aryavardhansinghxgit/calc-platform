"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "O que é um empréstimo com garantia de imóvel e como funciona?",
    "answer": "É uma segunda hipoteca com taxa fixa em que você obtém um montante à vista utilizando o patrimônio acumulado no seu imóvel como garantia."
  },
  {
    "question": "Quanto posso pegar emprestado sobre o patrimônio do meu imóvel?",
    "answer": "A maioria das instituições financeiras permite um CLTV máximo de 80% a 85% do valor de avaliação do imóvel, deduzindo o saldo da sua primeira hipoteca."
  },
  {
    "question": "O que é CLTV e como é calculado?",
    "answer": "O CLTV (Combined Loan-to-Value) é a soma de todos os financiamentos sobre a propriedade dividida pelo valor de mercado avaliado do imóvel."
  },
  {
    "question": "Como é calculada a parcela mensal do empréstimo?",
    "answer": "Calcula-se por meio da fórmula padrão de amortização com base no saldo devedor, na taxa de juros periódica e no prazo em meses."
  },
  {
    "question": "Qual pontuação de crédito (score) é exigida?",
    "answer": "Normalmente exige-se pontuação a partir de 620, sendo que as taxas mais vantajosas requerem pontuação acima de 700."
  },
  {
    "question": "Qual a diferença entre um empréstimo com garantia e uma linha HELOC?",
    "answer": "O empréstimo entrega um montante integral com parcelas e taxa fixas, enquanto a HELOC é uma linha de crédito rotativa com taxa variável."
  },
  {
    "question": "Qual a diferença em relação ao refinanciamento com saque (cash-out)?",
    "answer": "O refinanciamento substitui seu financiamento original por um novo, enquanto o empréstimo com garantia mantém sua primeira hipoteca inalterada."
  },
  {
    "question": "Os juros do empréstimo são dedutíveis no imposto de renda?",
    "answer": "De acordo com as regras fiscais vigentes, os juros só são dedutíveis se os recursos forem utilizados na compra, construção ou reforma estrutural do imóvel."
  },
  {
    "question": "Posso amortizar o empréstimo antecipadamente?",
    "answer": "Sim, a grande maioria dos contratos permite amortizações extraordinárias para reduzir prazo e juros totais sem cobrança de penalidades."
  },
  {
    "question": "Quais são os custos de fechamento típicos de uma segunda hipoteca?",
    "answer": "Geralmente variam de 2% a 5% do valor financiado (avaliação do imóvel, taxas de originação, registro e custas cartorárias)."
  },
  {
    "question": "O que acontece se o valor do imóvel cair e a dívida superar o valor do bem?",
    "answer": "O imóvel entra em patrimônio negativo (underwater). As parcelas mensais continuam iguais, mas para vender ou refinanciar será necessário aportar capital próprio."
  },
  {
    "question": "Quanto tempo leva a aprovação e a liberação dos recursos?",
    "answer": "O processo costuma levar de 2 a 6 semanas para conclusão da vistoria, análise de crédito e registro da garantia."
  }
];

export const seo = {
  title: "Calculadora de Empréstimo com Garantia de Imóvel (Home Equity) — Dívida Máxima Total",
  description: "Calcule parcelas fixas de empréstimos com garantia de imóvel, CLTV, taxa efetiva anual (TAEG), tabela de amortização e capacidade máxima de crédito.",
  keywords: ["calculadora de home equity","segunda hipoteca","calculadora cltv","emprestimo com garantia de imovel"]
};

export const ContentComponent = function HomeEquityContentPT() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Empréstimo com Garantia de Imóvel (Home Equity)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calcule parcelas fixas de empréstimo com garantia de imóvel, capacidade máxima de crédito, relação empréstimo-valor combinada (CLTV), custo efetivo total, tabela de amortização, economia por pagamentos extras e índice de endividamento (DTI).
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. O que é uma Calculadora de Empréstimo com Garantia de Imóvel?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Uma calculadora de home equity estima o limite de crédito disponível com base no valor líquido do seu imóvel e projeta as parcelas mensais de uma segunda hipoteca com taxa fixa.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Distingue-se de uma linha rotativa (HELOC). O empréstimo com garantia entrega uma quantia única amortizável com parcelas fixas.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Aviso do Modelo de Análise</span>
          </div>
          <p>
            Os resultados apresentados são simulações matemáticas e não constituem proposta vinculante de financiamento.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Como Usar a Calculadora de Empréstimo com Garantia
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Siga estes passos para simular seu planejamento financeiro :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Informe o valor de mercado estimado do imóvel.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Digite o saldo devedor atual do primeiro financiamento.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Escolha o limite máximo de CLTV (80% padrão, 85% ou 90%).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Selecione o Modo A (valor desejado) ou Modo B (capacidade máxima).</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Insira a taxa de juros fixa anual e o prazo em anos (15 ou 30 anos).</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Informe os custos iniciais de fechamento estimados.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Escolha a forma de pagamento dos custos (À vista, Deduzido ou Financiado).</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Analise o valor da parcela mensal fixa.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Verifique o limite disponível, o novo CLTV e o custo efetivo total (TAEG).</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Inspecione a tabela de amortização e exporte em formato CSV.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simule pagamentos extras para calcular a economia de juros.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Compare o resultado com cenários de HELOC e refinanciamento.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Avalie o índice DTI e as deduções fiscais aplicáveis.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Salve a simulação no histórico local.</span>
            </div>
        </div>
      </section>

      {/* 3. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Patrimônio Líquido e Índice Empréstimo-Valor Combinado (CLTV)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A capacidade máxima de endividamento baseia-se no teto de CLTV estabelecido :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Dívida Máxima Total = Valor do Imóvel × Limite CLTV"}</div>
          <div>{"Crédito Máximo Disponível = Dívida Máxima Total - Saldo 1º Financiamento"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Exemplo : Para um imóvel avaliado em 500.000 $ com saldo devedor de 275.000 $ e limite de 80% de CLTV, a dívida total autorizada é de 400.000 $. Deduzindo os 275.000 $, o limite disponível para a segunda hipoteca é de 125.000 $ com CLTV final de 80,0% e 20,0% (100.000 $) de patrimônio líquido protegido.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Isso assegura uma margem de segurança patrimonial contra variações imobiliárias.
        </p>
      </section>

      {/* 4. MODE A VS B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Modo A vs Modo B: Valor Específico ou Limite Máximo
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A ferramenta dispõe de dois modos de simulação :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Modo A — Valor de Empréstimo Específico</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Permite indicar uma quantia exata (ex.: 125.000 $) para reformas ou quitação de dívidas e calcular a parcela exata.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Modo B — Capacidade Máxima por CLTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Calcula o valor máximo contratável até o limite de CLTV permitido.</p>
          </div>
        </div>
      </section>

      {/* 5. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Fórmula da Parcela Mensal Fixa
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A prestação mensal fixa (M) é obtida pela fórmula de amortização financeira :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          M = P × [r(1+r)^n] / [(1+r)^n - 1], onde P é o principal, r é a taxa mensal e n é o número de parcelas. Para 125.000 $ a 8,50% em 15 anos (180 meses), a parcela é de 1.230,94 $.
        </p>
      </section>

      {/* 6. ZERO INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Simulação com Taxa de Juros Zero
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Em campanhas com taxa de 0%, a divisão é linear simples : M = P / n.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para 125.000 $ em 15 anos a 0% de juros, a parcela é de 694,44 $ sem custos de juros.
        </p>
      </section>

      {/* 7. AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Tabela de Amortização da Segunda Hipoteca
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O demonstrativo detalha mês a mês o montante pago em juros e amortização.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Beginning Balance / Saldo Inicial"}: $125,000</div>
          <div>• {"Annual Payment / Pago Anual"}: $14,335</div>
          <div>• {"Principal Paid / Capital"}: $4,497</div>
          <div>• {"Interest Paid / Intereses"}: $9,837</div>
          <div>• {"Ending Balance / Saldo Final"}: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          No primeiro mês de um empréstimo de 125.000 $ a 8,50%, da parcela de 1.230,94 $, 885,42 $ são juros e 345,52 $ abatem o principal, reduzindo o saldo para 124.654,48 $.
        </p>
      </section>

      {/* 8. APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Custo Efetivo Total (TAEG) e Custos Iniciais
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O custo efetivo incorpora as despesas iniciais de contratação para apresentar a taxa real do empréstimo.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Financed Loan"}: $125,000 | {"Nominal Rate"}: 8.0% | {"Term"}: 15 Years</div>
          <div>• {"Closing Costs"}: $2,500</div>
          <div>• {"Displayed True APR"}: <strong>8.10% / 8.82%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para 125.000 $ a 8,50% com 2.500 $ em despesas pagas à vista, o custo efetivo anual (TAEG) é de 8,82%.
        </p>
      </section>

      {/* 9. CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Opções de Pagamento dos Custos de Fechamento
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Três modalidades de liquidação de despesas estão disponíveis :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Paid Upfront in Cash"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Pago à Vista : Liquidado na assinatura sem alterar o saldo devedor. 2. Deduzido do Valor : O valor contratado é 125.000 $ e você recebe 122.500 $ líquidos. 3. Financiado : O saldo inicial sobe para 127.500 $, elevando a parcela para 1.255,56 $.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Deducted from Proceeds"}</div>
            <p className="text-slate-600 dark:text-slate-400">Analise essas alternativas para preservar seu fluxo de caixa.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Financed into Loan"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Pago à Vista : Liquidado na assinatura sem alterar o saldo devedor. 2. Deduzido do Valor : O valor contratado é 125.000 $ e você recebe 122.500 $ líquidos. 3. Financiado : O saldo inicial sobe para 127.500 $, elevando a parcela para 1.255,56 $.</p>
          </div>
        </div>
      </section>

      {/* 10. DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Índice de Endividamento (DTI) e Análise de Crédito
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          As instituições avaliam o índice DTI pós-operação para medir a capacidade de pagamento :
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"DTI % = [(Housing Payments + Other Debts) / Gross Income] × 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          DTI = (Gastos Habitacionais Totais + Outras Dívidas) / Renda Bruta Mensal. Níveis até 36% são excelentes, enquanto entre 43% e 50% exigem garantias adicionais.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Com 8.500 $ de renda, 1.850 $ de primeira hipoteca e 500 $ em compromissos, a nova parcela de 1.230,94 $ resulta em DTI de 42,1%, compatível com aprovação regular.
        </p>
      </section>

      {/* 11. CREDIT TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Score de Crédito e Faixas de CLTV
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Sua pontuação de crédito define a taxa e o percentual de CLTV acessível :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Scores acima de 740 alcançam CLTV de 85%–90% com taxas preferenciais, 680–739 até 80%–85%, e 620–679 limitam-se a 80%.
        </p>
      </section>

      {/* 12. HELOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Empréstimo com Garantia vs HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O empréstimo com garantia oferece previsibilidade total com taxas e parcelas fixas.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage: $717 - $1,231/mo</div>
          <div>• HELOC (Interest-Only Draw): $578/mo</div>
          <div>• Cash-Out Refinance: $2,296/mo</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC proporciona saques rotativos flexíveis a taxas variáveis, porém com risco de oscilação de juros e salto no valor das parcelas.
        </p>
      </section>

      {/* 13. HELOAN VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Empréstimo com Garantia vs Refinanciamento com Saque
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O empréstimo com garantia mantém intacta a taxa vantajosa do seu financiamento atual.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O refinanciamento com saque altera toda a dívida para a taxa de mercado vigente, o que pode ser desfavorável se sua taxa atual for baixa.
        </p>
      </section>

      {/* 14. EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Amortizações Extraordinárias e Economia de Juros
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Efetuar pagamentos adicionais reduz o saldo principal e encurta a duração total do empréstimo.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $100 - $150/month</div>
          <div>• Accelerated Term: 146 - 156 months</div>
          <div>• Time Saved: 24 - 34 months shaved off</div>
          <div>• Lifetime Interest Saved: $16,400 - $19,341</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Em 125.000 $ a 8,50%, um aporte extra de 100 $ por mês reduz o prazo em 24 meses e economiza mais de 16.400 $ em juros.
        </p>
      </section>

      {/* 15. IRS TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Dedução Fiscal de Juros
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Os juros só podem ser deduzidos se os recursos forem destinados à aquisição, construção ou reforma da residência.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Tax Savings = Deductible Interest × Marginal Tax Rate"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Se usados para consumo ou consolidação de outras dívidas, não há dedutibilidade fiscal.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para quem está na alíquota marginal de 24% com 9.800 $ de juros no primeiro ano, a economia tributária é de aproximadamente 2.352 $.
        </p>
      </section>

      {/* 16. RENOVATION ROI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Valorização Imobiliária com Reformas
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Melhorias estruturais no imóvel elevam o valor de avaliação e recompõem seu patrimônio.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: $535,000</div>
          <div>• Resulting Net Home Equity: $210,000</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Uma reforma de 50.000 $ com retorno de 70% agrega 35.000 $ ao valor de mercado da casa.
        </p>
      </section>

      {/* 17. RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Riscos do Empréstimo com Garantia de Imóvel
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Security Warning & Foreclosure Risk</span>
          </div>
          <p>O imóvel é a garantia real da operação, de modo que inadimplências graves podem acarretar execução da garantia.</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Planeje o orçamento para honrar simultaneamente o primeiro financiamento, a nova parcela, o IPTU e o condomínio.
        </p>
      </section>

      {/* 18. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Patrimônio Líquido Negativo
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Se o mercado imobiliário recuar e o saldo das dívidas ultrapassar o valor do imóvel, haverá patrimônio negativo. O pagamento mensal permanece inalterado, mas a venda exigirá recursos próprios.
        </p>
      </section>

      {/* 19. PREPAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Penalidades por Liquidação Antecipada
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A maioria dos contratos atuais não aplica multas por quitação antecipada, mas sempre revise as cláusulas contratuais.
        </p>
      </section>

      {/* 20. TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Custos de Fechamento e Prazos
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Os custos variam de 2% a 5% (1.500 $ a 4.000 $) e o prazo médio de liberação é de 2 a 6 semanas.
        </p>
      </section>

      {/* 21. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Erros Comuns a Evitar
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Confundir patrimônio total com capacidade máxima de empréstimo (instituições exigem margem de 15% a 20%).</li>
            <li>Esquecer de subtrair o saldo do primeiro financiamento no cálculo do CLTV.</li>
            <li>Achar que 80% de CLTV é um teto uniforme em todas as instituições.</li>
            <li>Assumir aprovação garantida pelo score sem avaliar o índice DTI.</li>
            <li>Comparar a parcela sem computar o custo da troca de taxa na primeira hipoteca.</li>
            <li>Ignorar as custas iniciais ao verificar o custo efetivo global.</li>
            <li>Presumir dedução fiscal sem aplicação comprovada em reformas do imóvel.</li>
            <li>Acreditar que cada real investido em obras valoriza 100% o imóvel.</li>
            <li>Assumir dívidas sem reserva de emergência para imprevistos.</li>
            <li>Tomar decisões sem simular previamente os impactos financeiros.</li>
          </ul>
        </div>
      </section>

      {/* 22. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Resumo das Fórmulas Principais
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Dívida Máxima Total:</strong>  Valor do Imóvel × Limite CLTV</div>
          <div>• <strong>Crédito Máximo Disponível:</strong>  max(0, Dívida Máxima - Saldo 1º Financiamento)</div>
          <div>• <strong>CLTV Pós-Empréstimo:</strong>  (Saldo 1 + Saldo 2) / Valor do Imóvel × 100</div>
          <div>• <strong>Patrimônio Protegido:</strong>  100% - CLTV Pós-Empréstimo</div>
          <div>• <strong>Parcela Mensal Fixa:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Índice DTI Pós-Empréstimo:</strong>  (Gastos Moradia + Dívidas) / Renda Bruta × 100</div>
          <div>• <strong>Economia Fiscal Estimada:</strong>  Juros Dedutíveis Anuais × Alíquota Marginal</div>
        </div>
      </section>

      {/* 23. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientação Educacional e Aviso Legal</span>
        </div>
        <p>
          Operações com garantia imobiliária são regidas pelas normas do sistema financeiro. Esta ferramenta fornece simulações matemáticas para fins informativos.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "pt",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
