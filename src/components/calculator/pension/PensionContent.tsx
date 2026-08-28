"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Landmark,
  Heart,
  Briefcase,
  Percent,
  TrendingUp,
  Scale,
  Calendar,
  DollarSign,
  AlertTriangle,
  Layers,
  ArrowRight,
} from "lucide-react";
import { pensionFaqs } from "@/calculators/finance/pension/faq";

export function PensionContent() {
  // All 15 FAQs open by default (matching 401(k) / Traditional IRA calculator formatting)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: pensionFaqs.length }, (_, i) => i))
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
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pension Calculator – Lump Sum, Monthly Pension, Survivor &amp; Retirement Comparison
          </h2>
          <p>
            Choosing a pension payout is one of the most important financial decisions you may make at retirement. A pension can provide predictable lifetime income, while a lump-sum payout gives you control over a pool of money that can be invested, spent, transferred, or passed to heirs. The right comparison depends on more than the size of the monthly check or the size of the lump sum.
          </p>
          <p>
            This Pension Calculator compares those choices using the assumptions that matter most: your retirement age, expected longevity, monthly pension, cost-of-living adjustment (COLA), lump-sum value, investment return, survivor benefits, and the timing of retirement.
          </p>
          <p>
            The calculator goes beyond a simple &ldquo;monthly payment &times; years&rdquo; comparison. It can estimate the present value of a pension, project cumulative pension income, compare a pension against an invested lump sum, identify a modeled breakeven age, compare single-life and joint-and-survivor options, evaluate retiring earlier versus working longer, and calculate a defined-benefit pension from salary, service years, and a benefit multiplier.
          </p>
          <p>
            Use the results as a planning model rather than as an official pension election calculation. Actual pension options are determined by your plan document and may use actuarial assumptions, interest rates, mortality tables, early-retirement adjustments, survivor reductions, and other provisions that differ from this calculator.
          </p>
        </section>

        {/* Section 2: What Is a Pension? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is a Pension?
          </h2>
          <p>
            A pension is generally a series of payments made after retirement, often based on a worker&apos;s compensation and years of service. In a defined-benefit pension, the plan determines a benefit according to a formula and typically pays it as a lifetime annuity.
          </p>
          <p>A pension may be offered as:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>a single-life annuity,</li>
            <li>a joint-and-survivor annuity,</li>
            <li>another survivor or guaranteed-period option, or</li>
            <li>when permitted by the plan, a lump-sum distribution.</li>
          </ul>
          <p>
            The important distinction is that a pension annuity converts retirement wealth into a stream of income, while a lump sum transfers more investment and longevity responsibility to the retiree.
          </p>
          <p>
            The U.S. Department of Labor explains that defined-benefit plans generally provide retirement benefits in the form of an annuity, while plan-specific payment options can include survivor protection.
          </p>
        </section>

        {/* Section 3: Lump Sum vs. Monthly Pension: The Core Decision */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Lump Sum vs. Monthly Pension: The Core Decision
          </h2>
          <p>
            A lump sum and a monthly pension are not directly comparable by looking only at their headline dollar amounts.
          </p>
          <p>Suppose a plan offers either:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li>an $800,000 lump sum, or</li>
            <li>a $5,000 monthly pension that increases by 3.5% annually.</li>
          </ul>
          <p>
            The monthly pension begins at $60,000 per year, but future payments may become substantially larger because of the assumed COLA. Meanwhile, the $800,000 lump sum could grow if invested.
          </p>
          <p>That creates two different financial paths:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-xs font-bold uppercase tracking-wider">
                Monthly Pension Path
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Retirement income &rarr; COLA increases &rarr; cumulative pension payments &rarr; survivor provisions
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-emerald-600 dark:text-emerald-400 block text-xs font-bold uppercase tracking-wider">
                Lump Sum Path
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Initial capital &rarr; investment returns &rarr; withdrawals/spending &rarr; remaining portfolio value
              </p>
            </div>
          </div>
          <p>
            The economically meaningful comparison depends on how long the pension is expected to be received and what return the lump sum could reasonably earn.
          </p>
          <p>
            The calculator therefore separates lifetime nominal pension income from present value, allowing the user to see both the total projected payments and their modeled value in today&apos;s terms.
          </p>
        </section>

        {/* Section 4: How the Pension Calculator Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How the Pension Calculator Works
          </h2>
          <p>The calculator models pension decisions through several related calculations:</p>
          <div className="space-y-2 pl-1">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">1. Pension versus lump sum</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">The calculator estimates the future pension payment stream and compares it with the value of the lump sum under the selected investment-return assumption.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">2. Present value of the pension</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">Future pension payments are discounted back to the retirement date, answering: <em>&ldquo;What is the modeled value today of the future pension payment stream?&rdquo;</em></p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">3. COLA-adjusted pension growth</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">When a COLA is entered, future pension payments grow according to the assumed annual adjustment. For example, a $5,000 monthly pension with a 3.5% annual COLA produces $60,000 in Year 1 and $60,000 &times; 1.035 = $62,100 in Year 2.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">4. Breakeven analysis</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">The calculator identifies a modeled crossover age at which the cumulative economic value of one option exceeds the other under the selected assumptions.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">5. Survivor analysis</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">The calculator can compare a single-life pension with a joint-and-survivor pension and model the continuation of payments after the worker&apos;s death.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">6. Work-longer analysis</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">A higher pension resulting from working longer can be compared with the income sacrificed by delaying retirement.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-0.5">7. Defined-benefit formula</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">For plans that use a salary/service/multiplier formula, the calculator estimates: Annual Pension = Final Average Salary &times; Years of Service &times; Benefit Multiplier.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Present Value of a Pension */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Present Value of a Pension
          </h2>
          <p>
            Present value is one of the most useful concepts when comparing a pension with a lump sum.
          </p>
          <p>
            A pension may promise hundreds of thousands or even millions of dollars in future payments. But those payments arrive over many years. Money received later is not economically equivalent to money available today because today&apos;s money can potentially be invested and because future payments are affected by timing and longevity.
          </p>
          <p>
            The calculator therefore discounts future pension payments using the selected return or discount-rate assumption.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PV = &sum; [PMT &times; 12 &times; (1 + COLA)<sup>t &minus; 1</sup> / (1 + r)<sup>t</sup>]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            where: <strong>PV</strong> = modeled present value of pension income, <strong>PMT</strong> = monthly pension, <strong>COLA</strong> = annual cost-of-living adjustment assumption, <strong>r</strong> = annual discount/investment-return assumption, and <strong>t</strong> = projection year.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs">Why Present Value Matters</strong>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Consider two offers: <strong>Option A:</strong> $800,000 today vs. <strong>Option B:</strong> a growing pension paying monthly income for life. Option B can have a projected lifetime payment total well above $800,000 while still having a different present value because the payments are received gradually over time. The Pension Calculator deliberately displays both figures so users do not confuse nominal lifetime income with present value.
            </p>
          </div>
        </section>

        {/* Section 6: Lifetime Pension Income vs. Present Value */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Lifetime Pension Income vs. Present Value
          </h2>
          <p>These two numbers answer different questions:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-blue-600 dark:text-blue-400 block text-xs font-bold uppercase tracking-wider">
                Lifetime Pension Total
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This is the cumulative amount of pension payments under the modeled lifespan and COLA assumptions. For our baseline (Age 65, Life Expectancy 85, $5,000/mo, 3.5% COLA), the modeled lifetime pension total is <strong>$1,696,780.91</strong>.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-emerald-600 dark:text-emerald-400 block text-xs font-bold uppercase tracking-wider">
                Present Value (PV)
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The same future payment stream discounted at 5.0% has a modeled present value of <strong>$1,000,278.02</strong>. The difference is not an error: lifetime total adds nominal dollars, while PV recognizes that future dollars occur later.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: How COLA Changes a Pension */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How COLA Changes a Pension
          </h2>
          <p>
            A cost-of-living adjustment can substantially alter the long-term value of a pension.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Without a COLA:</strong> a $5,000 monthly pension remains $5,000/month throughout retirement.</li>
            <li><strong>With a 3.5% annual COLA:</strong> Year 1: $5,000/mo ($60,000/yr), Year 2: $5,175/mo ($62,100/yr), Year 3: ~$5,356/mo ($64,274/yr), Year 10: ~$6,817/mo ($81,804/yr).</li>
          </ul>
          <p>
            Compounding COLAs can therefore have a major effect on lifetime income, especially for someone who expects a long retirement. However, a plan&apos;s actual COLA provisions may differ substantially. Some pensions have no COLA, some use a fixed percentage, and others use a formula tied to inflation or plan-specific rules.
          </p>
        </section>

        {/* Section 8: Pension Breakeven Age */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pension Breakeven Age
          </h2>
          <p>
            Breakeven analysis asks when one retirement choice catches up with another under a defined set of assumptions.
          </p>
          <p>
            For example, a pension may begin paying $5,000 per month while the alternative is an $800,000 lump sum. Early in retirement, the lump sum may appear more attractive because the retiree immediately controls a large amount of capital. Over time, however, cumulative pension payments increase. At some age, the modeled pension value overtakes the alternative.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            Baseline Modeled Crossover: Age 87
          </div>
          <p>
            This does not mean age 87 is a universal pension breakeven age. Change the pension, lump sum, return assumption, COLA, or life expectancy and the result can change materially. A breakeven calculation is best viewed as a sensitivity point rather than a prediction of how long someone will live.
          </p>
        </section>

        {/* Section 9: Tradeoffs of Choosing Lump Sum vs Monthly Pension */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Happens if You Choose the Lump Sum or Monthly Pension?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-emerald-600 dark:text-emerald-400 block text-xs font-bold uppercase tracking-wider">
                Choosing the Lump Sum
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Provides flexibility to invest, withdraw periodically, pay down debt, or preserve assets for heirs. However, the retiree assumes full responsibility for investment performance, withdrawal rates, longevity risk, market volatility, sequence-of-returns risk, and inflation.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-blue-600 dark:text-blue-400 block text-xs font-bold uppercase tracking-wider">
                Choosing the Monthly Pension
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Provides predictable lifetime retirement income without requiring the retiree to manage an investment portfolio. The tradeoff is reduced flexibility, limited access to underlying capital, and reduced inheritance potential.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10: Single-Life vs. Joint-and-Survivor Pension */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Single-Life vs. Joint-and-Survivor Pension
          </h2>
          <p>
            A single-life pension generally focuses on maximizing income while the participant is alive. A joint-and-survivor pension is designed to continue income to the surviving spouse after the participant&apos;s death.
          </p>
          <p>
            This creates an important tradeoff: <strong>higher payment while alive</strong> versus <strong>greater survivor protection</strong>.
          </p>
          <p>
            The calculator lets the user model different survivor percentages, including 50%, 66%, 75%, and 100%. For our secondary reference scenario:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Worker:</strong> Retires at 65, life expectancy 77 | <strong>Spouse:</strong> Age 62 at retirement, life expectancy 82</li>
            <li><strong>Single-life ($5,000/mo for 12 years):</strong> Lifetime income = $876,117.70</li>
            <li><strong>Joint-survivor ($3,000/mo for 12 years + 8 survivor years @ 100%):</strong> Lifetime income = $1,018,068.55</li>
            <li><strong>Recommended Option:</strong> Joint &amp; Survivor Pension (Provides +$141,950.85 in cumulative household protection)</li>
          </ul>
        </section>

        {/* Section 11: Working Longer vs. Retiring Earlier */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Working Longer vs. Retiring Earlier
          </h2>
          <p>
            Retirement timing can materially affect a defined-benefit pension. Working longer can produce a larger pension because additional service years and higher compensation affect the formula. But delaying retirement also means giving up several years of earlier pension income.
          </p>
          <p>For the reference case:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-1">Option A — Retire Earlier</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">Age: 60 | Pension: $2,500/month</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block mb-1">Option B — Work Longer</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">Age: 65 | Pension: $3,800/month</p>
            </div>
          </div>
          <p>
            The model produces: Additional Monthly Pension = <strong>+$1,300/mo</strong>, Foregone Early Pension = <strong>$160,873.98</strong>, Modeled Lifetime Advantage = <strong>$121,057.79</strong>, and Crossover Age = <strong>Age 78</strong>.
          </p>
        </section>

        {/* Section 12: Defined-Benefit Pension Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Defined-Benefit Pension Formula
          </h2>
          <p>
            Many defined-benefit pensions use a formula involving compensation, service, and a benefit multiplier:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            Annual Pension = Final Average Salary &times; Years of Service &times; Benefit Multiplier
          </div>
          <p>For example, with Final Average Salary = $80,000, Years of Service = 25, and Multiplier = 2%:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Annual Pension:</strong> $80,000 &times; 25 &times; 0.02 = <strong>$40,000.00</strong></li>
            <li><strong>Monthly Pension:</strong> $40,000 / 12 = <strong>$3,333.33</strong></li>
            <li><strong>Income Replacement Ratio:</strong> $40,000 / $80,000 = <strong>50.0%</strong></li>
          </ul>
        </section>

        {/* Section 13: Investment Return Assumptions & Purchasing Power */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Investment Return Assumptions, Inflation, and Taxes
          </h2>
          <p>
            When comparing a lump sum to a pension, the assumed investment return is one of the most influential inputs. A higher assumed return makes the lump sum more attractive in the model because the capital is assumed to grow faster, while a lower return makes guaranteed-style income more competitive.
          </p>
          <p>
            Additionally, a pension&apos;s COLA is not necessarily the same thing as inflation. Consider both nominal income and real purchasing power over your retirement horizon.
          </p>
          <p>
            Tax treatment also affects the economic comparison. The IRS notes that pension and annuity distributions can be taxable depending on whether payments are periodic or nonperiodic and whether the recipient has basis that may be recovered tax-free.
          </p>
        </section>

        {/* Section 14: Pension Decision Framework */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Pension Decision Framework
          </h2>
          <p>Use the calculator to evaluate several scenarios instead of one:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Conservative Scenario</strong>
              <p className="text-slate-600 dark:text-slate-400">Use low investment returns and longer life expectancy to test pension appeal when market growth is modest.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Moderate Scenario</strong>
              <p className="text-slate-600 dark:text-slate-400">Use central estimates for return, longevity, and COLA as your baseline retirement model.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Stress Scenario</strong>
              <p className="text-slate-600 dark:text-slate-400">Test lower investment returns, higher inflation, and long lifespans to check lump-sum resilience.</p>
            </div>
          </div>
        </section>

        {/* Section 15: Disclaimers */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Important Pension Planning Disclaimer
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Actuarial &amp; Legal Notice
            </div>
            <p>
              This calculator is an educational financial modeling tool. Its results are estimates based on the assumptions entered by the user and are not an official pension-plan calculation, actuarial valuation, investment recommendation, tax opinion or guarantee of future income.
            </p>
            <p>
              Actual pension benefits are governed by the applicable pension plan documents and may differ because of plan-specific actuarial factors, interest rates, mortality assumptions, retirement reductions, COLA provisions, survivor elections, eligibility rules and other provisions. Before making an irreversible pension election, review your official pension benefit estimate and plan documents and consider obtaining individualized financial and tax advice.
            </p>
          </div>
        </section>

        {/* Section 16: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Related Retirement &amp; Financial Calculators
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For a comprehensive retirement roadmap, explore these companion financial tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <Link
              href="/calculators/retirement-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Retirement Calculator</span>
              <span className="text-slate-500 text-[11px]">Model complete retirement spending, asset longevity, and nest egg targets.</span>
            </Link>
            <Link
              href="/calculators/401k-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">401(k) Calculator</span>
              <span className="text-slate-500 text-[11px]">Estimate employee deferrals, employer matching, and growth.</span>
            </Link>
            <Link
              href="/calculators/traditional-ira-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Traditional IRA Calculator</span>
              <span className="text-slate-500 text-[11px]">Calculate pre-tax growth, tax optimization, and Roth comparisons.</span>
            </Link>
            <Link
              href="/calculators/social-security-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Social Security Calculator</span>
              <span className="text-slate-500 text-[11px]">Determine optimal claiming ages (62, 67, 70) alongside your pension.</span>
            </Link>
            <Link
              href="/calculators/rmd-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">RMD Calculator</span>
              <span className="text-slate-500 text-[11px]">Estimate mandatory IRS distributions from rollover IRAs.</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">Compound Interest Calculator</span>
              <span className="text-slate-500 text-[11px]">Isolate pure exponential reinvestment compounding curves.</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (All 15 FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {pensionFaqs.map((faq, idx) => {
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
}

export default PensionContent;
