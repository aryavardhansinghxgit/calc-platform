"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "O que é uma linha HELOC e como funciona?",
    "answer": "A HELOC é uma linha de crédito rotativa garantida pelo valor líquido do imóvel que permite saques conforme a necessidade durante a fase de utilização."
  },
  {
    "question": "Qual o limite de crédito máximo que posso obter?",
    "answer": "A maioria das instituições permite entre 80% e 85% do valor avaliado do imóvel, subtraindo o saldo da primeira hipoteca."
  },
  {
    "question": "Qual a diferença entre a fase de saque e a de amortização?",
    "answer": "Na fase de saque paga-se apenas os juros mensais sobre o valor utilizado. Na fase de amortização paga-se capital e juros obrigatórios."
  },
  {
    "question": "O que é o salto de parcela (payment shock)?",
    "answer": "É o aumento súbito na prestação quando termina o período de apenas juros e inicia a amortização obrigatória do principal."
  },
  {
    "question": "Qual a taxa de juros aplicada?",
    "answer": "Normalmente aplica-se taxa variável indexada à taxa básica de juros acrescida de uma margem do banco."
  },
  {
    "question": "Quais taxas incidem na operação?",
    "answer": "Podem incluir anuidade de manutenção (50 $ a 100 $), custos de contratação e avaliação."
  },
  {
    "question": "Os juros são dedutíveis no imposto de renda?",
    "answer": "Apenas se os recursos forem comprovadamente aplicados na reforma ou melhoria estrutural do imóvel."
  },
  {
    "question": "O banco pode reduzir ou congelar a linha?",
    "answer": "Sim, caso o valor de mercado caia substancialmente ou ocorra deterioração cadastral."
  },
  {
    "question": "O que acontece se eu não utilizar o crédito disponível?",
    "answer": "Não incidem juros sobre saldo não utilizado."
  },
  {
    "question": "Posso amortizar o principal durante a fase de saque?",
    "answer": "Sim, amortizações voluntárias podem ser feitas a qualquer momento para restabelecer o limite."
  },
  {
    "question": "Qual a pontuação de crédito exigida?",
    "answer": "Geralmente exige-se score a partir de 660 a 680, e 720+ para as melhores condições."
  },
  {
    "question": "Qual o impacto de aumentos na taxa de juros?",
    "answer": "Por ter taxa variável, qualquer alta eleva imediatamente as parcelas de juros e o custo total."
  }
];

export const seo = {
  title: "Calculadora de Linha de Crédito HELOC — Dívida Total Máxima",
  description: "Calcule limite de crédito HELOC, parcelas de juros na fase de saque, amortização na fase de pagamento e simulações de alta de juros.",
  keywords: ["calculadora heloc","linha de credito com garantia","credito rotativo imobiliario","home equity line"]
};

export const ContentComponent = function HELOCContentPT() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Linha de Crédito HELOC
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Estime a capacidade de crédito HELOC, relação empréstimo-valor (CLTV), parcelas de juros na fase de saque, amortização na fase de pagamento, salto de parcela e cenários de estresse de juros.
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. O que é uma Calculadora HELOC?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A calculadora de HELOC projeta o limite rotativo disponível com garantia imobiliária e simula as parcelas ao longo das fases de utilização e amortização.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ao contrário do empréstimo fixo, a HELOC dispõe de um período flexível de saques (10 anos) e um período estruturado de amortização (20 anos).
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Aviso do Modelo Financeiro</span>
          </div>
          <p>
            Os valores apresentados constituem simulações matemáticas para fins de planejamento.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Como Usar a Calculadora HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Siga este roteiro para simular sua linha de crédito :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Informe o valor de mercado estimado do imóvel.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Digite o saldo devedor da primeira hipoteca.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Escolha o limite máximo de CLTV (80% padrão ou 85%).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Defina o limite de crédito HELOC pretendido.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Insira a taxa de juros variável inicial.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Escolha a duração da fase de saque (5, 10, 15 anos) e de pagamento (10, 15, 20 anos).</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Informe os custos iniciais e a anuidade de manutenção.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Selecione a modalidade de pagamento na fase de saque.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Analise o limite disponível, a parcela de saque e a de amortização.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Inspecione o plano de amortização em duas fases.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simule cenários de alta de juros (+1%, +2%, +3%).</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Teste novos saques e amortizações extraordinárias.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Compare com o empréstimo com garantia de taxa fixa.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Verifique as deduções fiscais cabíveis.</span>
            </div>
        </div>
      </section>

      {/* 3. CAPACITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Cálculo da Capacidade de Crédito HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A capacidade máxima baseia-se na dívida combinada admitida pelo limite de CLTV :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Dívida Total Máxima = Valor de Mercado × Limite CLTV %"}</div>
          <div>{"Limite HELOC Máximo = max(0, Dívida Total Máxima - Saldo 1ª Hipoteca)"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Exemplo : Para um imóvel de 500.000 $ com 260.000 $ de primeira hipoteca e 80% de CLTV, a dívida total permitida é 400.000 $. Deduzindo 260.000 $, o limite HELOC é de 140.000 $. Uma linha de 50.000 $ resulta em CLTV utilizado de 62,0%.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Isso assegura uma margem patrimonial equilibrada.
        </p>
      </section>

      {/* 4. DRAW VS REPAY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Fase de Saque vs. Fase de Amortização
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC divide-se em duas etapas operacionais :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Na fase de saque (10 anos), saca-se livremente pagando apenas juros. Na fase de amortização (20 anos), o limite fecha e inicia-se o pagamento de capital e juros.
        </p>
      </section>

      {/* 5. INTEREST ONLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Pagamento de Apenas Juros na Fase de Saque
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A parcela mensal de juros (I) calcula-se por :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          I = Saldo Utilizado × (Taxa Anual / 12). Para 50.000 $ a 8,50%, a parcela é de 354,17 $.
        </p>
      </section>

      {/* 6. FULL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Parcelas Integrais na Fase de Amortização
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Na fase de amortização, a prestação torna-se constante :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para 50.000 $ a 8,50% em 20 anos (240 meses), a parcela é de 433,91 $.
        </p>
      </section>

      {/* 7. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Análise do Salto de Parcela (Payment Shock)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Mede o impacto financeiro da transição para a amortização.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A parcela sobe de 354,17 $ para 433,91 $ (+22,5%). Em prazo de 10 anos, subiria para 620,06 $ (+75,1%).
        </p>
      </section>

      {/* 8. STRESS TEST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Simulação de Estresse de Taxas Variáveis
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Aumentos na taxa básica encarecem as parcelas :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Uma alta de +2% (para 10,50%) eleva a parcela de saque para 437,50 $ (+23,5%) e a de amortização para 498,98 $ (+15,0%).
        </p>
      </section>

      {/* 9. ANNUAL FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Anuidades e Custo Global
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Custos anuais de manutenção (50 $ a 100 $) integram o custo efetivo.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Em 30 anos, 75 $ anuais acumulam 2.250 $ em despesas.
        </p>
      </section>

      {/* 10. MULTI DRAW */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Ciclo Multisaque e Aportes Extras
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Amortizações adicionais voluntárias reduzem substancialmente os juros.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Um aporte extra de 100 $ por mês economiza milhares de dólares em juros.
        </p>
      </section>

      {/* 11. HELOC VS HELOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. HELOC vs. Empréstimo Fixo com Garantia
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC destaca-se pela flexibilidade para gastos graduais.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O empréstimo fixo garante previsibilidade total nas parcelas.
        </p>
      </section>

      {/* 12. HELOC VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. HELOC vs. Refinanciamento com Saque
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A HELOC preserva a taxa original da sua primeira hipoteca.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O refinanciamento altera toda a dívida para a taxa de mercado atual.
        </p>
      </section>

      {/* 13. CREDIT QUAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Requisitos de Aprovação
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Recomenda-se índice DTI abaixo de 43% e score a partir de 680.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Avaliação imobiliária consistente é fundamental para CLTV de 85%.
        </p>
      </section>

      {/* 14. TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Dedução de Juros no Imposto
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Permitida apenas se aplicada em reformas do próprio imóvel.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Gastos de consumo pessoal não geram benefício tributário.
        </p>
      </section>

      {/* 15. FREEZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Risco de Congelamento da Linha
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O banco pode suspender saques se o mercado imobiliário recuar.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Mantenha uma reserva financeira independente.
        </p>
      </section>

      {/* 16. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Patrimônio Negativo
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Em desvalorizações imobiliárias, a linha é suspensa.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          As obrigações de pagamento continuam vigentes.
        </p>
      </section>

      {/* 17. FIXED RATE LOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Opção de Trava de Taxa Fixa
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Permite converter parcelas do saldo em tranches com taxa fixa.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Protege contra aumentos na taxa básica.
        </p>
      </section>

      {/* 18. CLOSING AND EARLY CLOSURE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Custos Iniciais e Encerramento Antecipado
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Taxas de abertura variam de 500 $ a 2.500 $.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Encerrar a linha nos primeiros anos pode gerar multa contratual.
        </p>
      </section>

      {/* 19. STRATEGIC USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Uso Financeiro Consciente
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Priorizar investimentos que valorizem o patrimônio garante solidez financeira.
        </p>
      </section>

      {/* 20. TRANSITION PLANNING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Preparação para a Amortização
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Adequar o orçamento com antecedência evita aperto de caixa.
        </p>
      </section>

      {/* 21. OPTIMIZATION TIPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Boas Práticas na HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Abater o principal na fase de saque reduz a base de juros futuros.
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Erros Comuns a Evitar na HELOC
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Pagar apenas juros por 10 anos sem planejar a fase de amortização.</li>
            <li>Usar o crédito para gastos de consumo efêmeros.</li>
            <li>Subestimar o risco de aumentos nas taxas variáveis.</li>
            <li>Supor que a linha nunca sofrerá restrições do banco.</li>
            <li>Desconsiderar anuidades no cálculo do custo total.</li>
            <li>Achar que todos os juros são dedutíveis sem comprovação.</li>
            <li>Deixar de comparar com o empréstimo fixo de garantia.</li>
            <li>Usar 100% do limite sem margem de segurança.</li>
            <li>Encerrar a linha sem verificar penalidades de cancelamento.</li>
            <li>Não rodar simulações de estresse de juros antes de contratar.</li>
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. Resumo das Fórmulas da HELOC
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Dívida Total Máxima:</strong>  Valor de Mercado × Limite CLTV %</div>
          <div>• <strong>Limite HELOC Máximo:</strong>  max(0, Dívida Total Máxima - Saldo 1ª Hipoteca)</div>
          <div>• <strong>CLTV Utilizado:</strong>  (Saldo 1ª Hipoteca + Saldo HELOC) / Valor de Mercado × 100</div>
          <div>• <strong>Parcela de Apenas Juros:</strong>  Saldo Utilizado × (Taxa Anual / 12)</div>
          <div>• <strong>Parcela de Amortização:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Salto de Parcela:</strong>  (Parcela Amortização - Parcela Saque) / Parcela Saque × 100</div>
          <div>• <strong>Economia Fiscal Estimada:</strong>  Juros Dedutíveis Anuais × Alíquota Marginal</div>
        </div>
      </section>

      {/* 24. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientação Educacional e Aviso Legal</span>
        </div>
        <p>
          As linhas de crédito rotativas sobre imóveis são reguladas pelo sistema financeiro. Esta ferramenta fornece simulações para fins de planejamento financeiro.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "pt",
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
