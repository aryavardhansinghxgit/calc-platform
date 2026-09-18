"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "É melhor alugar ou comprar um imóvel?",
    "answer": "Depende do tempo de permanência pretendido, do preço do imóvel, do nível dos aluguéis e do retorno dos seus investimentos."
  },
  {
    "question": "O que é o ponto de equilíbrio (breakeven)?",
    "answer": "O número de anos necessários para que a compra se torne financeiramente mais vantajosa do que o aluguel equivalente."
  },
  {
    "question": "O que é a regra dos 5%?",
    "answer": "Soma os custos irrecuperáveis do imóvel próprio: juros do financiamento, impostos (IPTU) e manutenção anual."
  },
  {
    "question": "Como a valorização do imóvel afeta o resultado?",
    "answer": "Aumenta o patrimônio líquido do proprietário ao longo do tempo, embora varie conforme os ciclos imobiliários."
  },
  {
    "question": "Qual o impacto do aumento dos aluguéis?",
    "answer": "Aluguéis crescentes elevam os gastos acumulados do inquilino, tornando a parcela fixa de compra mais atrativa."
  },
  {
    "question": "O que é o custo de oportunidade da entrada?",
    "answer": "O rendimento financeiro que você deixa de ganhar ao imobilizar o dinheiro na entrada em vez de mantê-lo investido."
  },
  {
    "question": "Quais são os custos ocultos da compra?",
    "answer": "Custos de registro/ITBI (2% a 5%), condomínio, IPTU, manutenção (1% ao ano) e comissão de corretagem na revenda."
  },
  {
    "question": "O que é o índice preço/aluguel (Price-to-Rent)?",
    "answer": "Preço do imóvel dividido pelo aluguel anual; valores abaixo de 15 favorecem a compra e acima de 20 o aluguel."
  },
  {
    "question": "Como os benefícios fiscais são calculados?",
    "answer": "Deduções legais reduzem o custo efetivo tributário dos proprietários qualificados."
  },
  {
    "question": "Por que o tempo de moradia é determinante?",
    "answer": "Porque os custos iniciais de aquisição exigem alguns anos de amortização e valorização para serem compensados."
  },
  {
    "question": "Como fica o patrimônio líquido após 30 anos?",
    "answer": "O comprador possui um imóvel quitado, enquanto o inquilino acumula uma carteira de investimentos."
  },
  {
    "question": "Como conduzir uma análise de sensibilidade?",
    "answer": "Simule cenários alternando a valorização imobiliária, o reajuste de aluguéis e a rentabilidade financeira."
  }
];

export const seo = {
  title: "Calculadora Alugar ou Comprar Imóvel (Rent vs Buy) — Índice = Preço de Compra / Aluguel Anual Total (Base",
  description: "Compare alugar e comprar imóvel: parcelas de financiamento, valorização, reajuste de aluguel, custo de oportunidade e ponto de equilíbrio.",
  keywords: ["calculadora alugar ou comprar","rent vs buy calculadora","vale a pena alugar ou comprar","comparativo aluguel financiamento"]
};

export const ContentComponent = function RentVsBuyContentPT() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora Alugar ou Comprar Imóvel (Rent vs Buy)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Compare alugar e comprar imóvel com análise abrangente de parcelas de financiamento, inflação de aluguéis, valorização do imóvel, impostos, manutenção e custo de oportunidade.
        </p>
      </div>

      {/* 2. What Does it Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. O Que Faz Realmente uma Calculadora de Alugar vs Comprar?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A escolha entre morar de aluguel ou comprar imóvel não se limita a comparar a mensalidade do aluguel com a prestação do financiamento. Um modelo consistente inclui entrada, juros, amortização de principal, IPTU, seguro residencial, manutenção, condomínio, custos de escritura, ITBI, valorização do imóvel, reajuste do aluguel e custo de oportunidade dos recursos.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Esta ferramenta é um modelo matemático de apoio à decisão. No cenário padrão validado, o ponto de equilíbrio ocorre em aproximadamente 4,8 anos a favor da aquisição.
        </p>
      </section>

      {/* 3. Total Economics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. Compare a Economia Global, Não Apenas a Parcela Mensal
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A prestação habitacional compõe-se de custo financeiro (juros) e formação de patrimônio (amortização). O inquilino não arca com despesas estruturais, mas enfrenta reajustes anuais de aluguel e pode aplicar seu capital no mercado financeiro.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Por isso, o comparador avalia custos irrecuperáveis, patrimônio líquido acumulado e fluxo de caixa ao longo de até 30 anos.
        </p>
      </section>

      {/* 4. How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. Como Utilizar a Calculadora
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Digite o valor de compra do imóvel e o percentual de entrada.</li>
          <li>Insira a taxa de juros do financiamento e o prazo em anos.</li>
          <li>Informe o IPTU, seguro residencial, taxa de manutenção e condomínio.</li>
          <li>Adicione os custos de escritura/fechamento e custos futuros de venda.</li>
          <li>Insira o aluguel mensal inicial e a taxa de reajuste anual.</li>
          <li>Adicione seguro-fiança ou seguro do inquilino.</li>
          <li>Defina a taxa de retorno esperada para investimentos alternativos.</li>
          <li>Analise o demonstrativo detalhado de custos de cada opção.</li>
          <li>Inspecione o ponto de equilíbrio (breakeven) e a tabela de permanência.</li>
          <li>Avalie o índice preço/aluguel e a regra dos 5%.</li>
          <li>Compare a evolução do patrimônio líquido em 10, 20 e 30 anos.</li>
          <li>Salve simulações para confrontar premissas de mercado.</li>
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Detalhamento dos Parâmetros de Entrada
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.1 Preço do Imóvel e Entrada</h3>
            <p className="mt-1 leading-relaxed">Definem o valor financiado. Em um imóvel de 500.000 $ com 20% de entrada, aportam-se 100.000 $ e financiam-se 400.000 $.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.2 Taxa de Financiamento e Prazo</h3>
            <p className="mt-1 leading-relaxed">Estabelecem o plano de amortização com parcelas fixas. Juros maiores elevam o custo irrecuperável.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.3 IPTU, Seguro, Manutenção e Condomínio</h3>
            <p className="mt-1 leading-relaxed">Custos recorrentes que não geram patrimônio, corrigidos anualmente pela inflação.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.4 Aluguel Inicial e Reajuste Anual</h3>
            <p className="mt-1 leading-relaxed">O aluguel cresce todo ano, encarecendo cumulativamente a moradia alugada.</p>
          </div>
        </div>
      </section>

      {/* 6. How Mortgage Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Como Funciona a Amortização Imobiliária
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Cada prestação divide-se em juros decrescentes e amortização crescente do saldo devedor.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Com o passar dos anos, a maior parte da parcela passa a amortizar o principal.
        </p>
      </section>

      {/* 7. Buying Costs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Custos da Compra Além da Prestação
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Ser proprietário envolve despesas perdidas: IPTU, manutenção periódica e taxas cartorárias/corretagem na revenda (5% a 6%).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Por isso, permanências curtas são desfavoráveis: são necessários anos de valorização para cobrir esses custos.
        </p>
      </section>

      {/* 8. Stay Length */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. A Importância do Tempo de Permanência
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Custos de transação ocorrem no início e no fim, enquanto a amortização e a valorização acumulam-se com o tempo.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          No modelo padrão, o breakeven é de 4,8 anos. Para estadias menores que 3 anos, alugar costuma ser mais vantajoso.
        </p>
      </section>

      {/* 9. Breakeven Point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. O Ponto de Equilíbrio (Breakeven)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          O momento em que o custo acumulado de comprar torna-se menor que o de alugar.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Em 30 anos, o custo líquido acumulado é de 726.761 $ na compra contra 1.721.379 $ no aluguel no modelo de referência.
        </p>
      </section>

      {/* 10. Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          10. Valorização Imobiliária
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A valorização anual composta expande o patrimônio imobiliário do proprietário.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A 3% ao ano, um imóvel de 500.000 $ ultrapassa 1.200.000 $ em 30 anos.
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          11. Inflação dos Aluguéis
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Um aluguel de 3.000 $ com 3% de reajuste anual atinge 7.280 $/mês após 30 anos.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Isso evidencia a vantagem da parcela fixa de financiamento a longo prazo.
        </p>
      </section>

      {/* 12. Opportunity Cost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Custo de Oportunidade da Entrada
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A entrada imobiliza capital que poderia render em aplicações financeiras.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A 5% ao ano, 100.000 $ aplicados rendem mais de 432.000 $ em 30 anos.
        </p>
      </section>

      {/* 13. Price-to-Rent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Índice Preço/Aluguel (Price-to-Rent)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Calculado dividindo o preço pelo aluguel anual (500.000 $ / 36.000 $ = 13,9).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Resultados abaixo de 15 apontam mercado favorável à compra.
        </p>
      </section>

      {/* 14. 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          14. A Regra dos 5% de Custos Irrecuperáveis
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Soma juros líquidos, IPTU e custos de manutenção anual.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Em 500.000 $, o custo irrecuperável mensal é de 4.013 $ frente ao aluguel.
        </p>
      </section>

      {/* 15. Tax Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          15. Aspectos Tributários
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Deduções fiscais legais podem amortecer o custo financeiro.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          O modelo estima uma economia fiscal ilustrativa de cerca de 1.007 $ no primeiro ano.
        </p>
      </section>

      {/* 16. Net Worth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          16. Patrimônio Líquido: Imóvel vs Carteira de Investimentos
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A comparação final confronta o valor líquido acumulado em cada caminho.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Em 10 anos, o patrimônio imobiliário é de 359.958 $ contra 162.889 $ na carteira do inquilino.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Em 30 anos, o imóvel quitado representa um ativo integral de grande solidez.
        </p>
      </section>

      {/* 17. Scenario Drivers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          17. Por Que Comprar Vence em um Cenário e Alugar em Outro
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Longo prazo, valorização consistente e alta de aluguéis favorecem a compra.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Mobilidade frequente e rentabilidade financeira elevada favorecem o aluguel.
        </p>
      </section>

      {/* 18. Short vs Long */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          18. Decisões de Curto vs Longo Prazo
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Alugar oferece agilidade e liberdade de mudança rápida.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Comprar estabiliza os custos habitacionais e constrói patrimônio seguro.
        </p>
      </section>

      {/* 19. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          19. Erros Comuns a Evitar
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Comparar apenas o valor do aluguel com a prestação da casa.</li>
          <li>Considerar a parcela da hipoteca como gasto 100% perdido.</li>
          <li>Esquecer despesas de IPTU, condomínio, seguro e manutenção.</li>
          <li>Ignorar custos de escritura na compra e corretagem na venda.</li>
          <li>Presumir que o imóvel sempre valorizará linearmente.</li>
          <li>Acreditar em retornos financeiros sem oscilações de mercado.</li>
          <li>Usar apenas o índice preço/aluguel para decidir.</li>
          <li>Subestimar o impacto do reajuste acumulado do aluguel em 20 anos.</li>
          <li>Não rodar testes de sensibilidade com diferentes prazos de permanência.</li>
        </ul>
      </section>

      {/* 20. Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          20. Análise de Cenários: A Melhor Estratégia
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Crie um cenário de referência, um cenário prudente de compra e um de aluguel.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Altere uma premissa de cada vez para testar a consistência da sua decisão.
        </p>
      </section>

      {/* 21. Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          21. Metodologia e Fórmulas Principais
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.1 Parcela do Financiamento</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              M = P × [r(1+r)^n] / [(1+r)^n - 1]
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.2 Valorização Futura do Imóvel</h3>
            <p className="mt-0.5 leading-relaxed">Valor(t) = Valor(0) × (1 + r_valorizacao)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.3 Reajuste Futuro do Aluguel</h3>
            <p className="mt-0.5 leading-relaxed">Aluguel(t) = Aluguel(0) × (1 + r_reajuste)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.4 Índice Preço/Aluguel</h3>
            <p className="mt-0.5 leading-relaxed">Índice = Preço de Compra / Aluguel Anual Total (Base: 13.9)</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.5 Custo de Oportunidade</h3>
            <p className="mt-0.5 leading-relaxed">Carteira(t) = Entrada Inicial × (1 + r_investimento)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.6 Economia Fiscal Estimada</h3>
            <p className="mt-0.5 leading-relaxed">Economia = max(0, Deduções - Padrão) × Alíquota Marginal</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "pt",
  calculatorSlug: "rent-vs-buy-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
